import { motion } from 'framer-motion'
import { pageVariants } from './pageVariants'
import useReadStore from '../stores/readStores'
import { useState } from 'react'
import { toast } from 'react-toastify'
function Pick() {

    const isLoading = useReadStore(state => state.isLoading)
    const readingId = useReadStore(state => state.readingId)
    const pickCard = useReadStore(state => state.pickCard)
    const deckOrder = useReadStore(state => state.deckOrder)
    const spread = useReadStore(state => state.spread)
    const aiInterpret = useReadStore(state => state.aiInterpret)
    const setStep = useReadStore(state => state.setStep)
    const requiredCards = spread?.cardCount || 1;
    const [selectedCard, setSelectedCard] = useState([])

    const handlePickCard = (index) => {
        if (selectedCard.length >= requiredCards) return;
        if (selectedCard.includes(index)) return;

        setSelectedCard([...selectedCard, index]);
    };

    const handleDrawandInterpret = async () => {
        if (selectedCard.length < requiredCards) return;
        try {
            const selectedPayload = selectedCard.map(index => ({
                id: deckOrder[index].id,
                isReversed: deckOrder[index].isReversed
            }))
            const pickResp = await pickCard({
                readingId: readingId,
                selectId: selectedPayload
            })
            try {
                await aiInterpret({
                    readingId: readingId,
                    spreadType: pickResp.data.spreadType || "General Spread",
                    question: pickResp.data.question || "ไม่ระบุคำถาม",
                    card: pickResp.data.card
                })
            } catch {
                // aiError set in store — still proceed to show Result with Regenerate button
            }
            setStep('RESULT')
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.message;
            toast.error(errMsg || "เกิดข้อผิดพลาดในการทำนายผล");
        }
    }

    return (
        <motion.div key="p" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center gap-8 text-center w-full max-w-4xl mx-auto">
            <div>
                <h1 className="text-4xl font-bold tracking-wide uppercase font-cormorant text-gray-900 mb-2">Draw Your Cards</h1>
                <p className="text-gray-500 font-light mt-2 text-lg">ไพ่ถูกเตรียมพร้อมแล้ว โปรดเลือกไพ่จำนวน <span className="font-bold text-primary text-xl">{requiredCards}</span> ใบ</p>
                <p className="text-sm text-base-content/50 mt-1">
                    ( Selected {selectedCard.length} / {requiredCards} )
                </p>
            </div>

            <div className="bg-base-300 p-6 rounded-box border border-neutral shadow-inner h-[420px] overflow-y-auto w-full">
                <div className='gap-4 md:gap-8 flex flex-wrap justify-center'>
                    {deckOrder && deckOrder.map((_, index) => {
                        const isPicked = selectedCard.includes(index); // ไพ่ใบนี้ถูกเลือกหรือยัง ? ispicked === true ถ้าถูกเลือกแล้ว false ถ้ายังไม่ถูกเลือก
                        const isQuotaFull = selectedCard.length >= requiredCards; //โควต่าใน selectedCard เต้ม requiredCards แล้วหรือยัง ?
                        const shouldFadeOut = isQuotaFull && !isPicked; //เอาไว้สำหรับกรณีกดเลือกครบแล้วจะได้เปลี่ยน css ให้รู้สึกเหมือนทุกอย่างครบ
                        return(
                        <motion.div
                            key={index}
                            onClick={() => handlePickCard(index)}
                            animate={{
                                y: isPicked ? -15 : 0,
                                scale: isPicked ? 1.05 : 1,
                                opacity: shouldFadeOut ? 0.4 : 1 
                            }}
                            whileHover={(!isQuotaFull && !isPicked) ? { y: -8 } : {}} // ถ้าโควต้ายังไม่เต็ม และไพ่ยังไม่ถูกเลือก ให้ hover ได้ แต่ถ้าเลือกแล้วหรือโควต้าเต็ม hover ไม่เกิดอะไร
                            className={`w-16 h-24 md:w-20 md:h-28 rounded-lg shadow-md cursor-pointer transition-colors duration-300 border-2 ${isPicked
                                    ? 'border-accent shadow-accent/20 shadow-xl'
                                    : 'border-base-100 hover:border-primary'
                                }`}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1739475981246-a6d8be7081e2?q=80&w=709&auto=format&fit=crop"
                                alt="Card Back"
                                className="w-full h-full object-cover rounded-md opacity-90"
                            />

                            {isPicked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary/60 rounded-md backdrop-blur-sm">
                                    <span className="text-secondary-content font-bold text-2xl font-cormorant drop-shadow-md">
                                        {selectedCard.indexOf(index) + 1}
                                    </span>
                                </div>
                            )}
                        </motion.div>)
                    })}
                </div>
            </div>

            <button
                disabled={isLoading || selectedCard.length < requiredCards}
                onClick={handleDrawandInterpret}
                className='btn btn-secondary text-secondary-content px-12 h-14 rounded-full text-lg font-bold shadow-lg transition-all w-full max-w-sm disabled:opacity-50 disabled:bg-base-300 disabled:text-base-content/40 border-none'
            >
                {isLoading
                    ? <span className="flex items-center gap-3 font-light"><span className="loading loading-spinner"></span> BigBen is reading...</span>
                    : "Draw and Interpret"
                }
            </button>
        </motion.div>
    )
}

export default Pick