import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { pageVariants } from './pageVariants'
import useReadStore from '../stores/readStores';
import useSaveReadingstore from '../stores/saveReadingStores';
import { toast } from 'react-toastify';
import ShareImageModal from './ShareImageModal';
function Result() {
    const setStep = useReadStore(state => state.setStep)
    const card = useReadStore(state => state.card)
    const aiReading = useReadStore(state => state.aiReading)
    const aiError = useReadStore(state => state.aiError)
    const isLoading = useReadStore(state => state.isLoading)
    const regenerateInterpret = useReadStore(state => state.regenerateInterpret)
    const readingId = useReadStore(state => state.readingId)
    const deckOrder = useReadStore(state => state.deckOrder)

    const saveReading = useSaveReadingstore(state => state.saveReading)

    const [isSaved, setIsSaved] = useState(false);
    const [note, setNote] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const handleSaveReading = async () => {
        try {
            const payload = {
            readingId:readingId,
            note:note
        }
        const resp = await saveReading(payload)
        setIsSaved(true)
        } catch (error) {
            console.error("Save failed",error)
            toast.error("Please try again later")
        }

    }

    const renderAiSection = () => {
        if (aiReading?.data) {
            return (
                <div className="flex flex-col gap-6 text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm w-full">
                        <span className="text-sm font-bold text-base-content/70 uppercase tracking-widest whitespace-nowrap">
                            พลังงานภาพรวม (Energy)
                        </span>
                        <progress
                            className={`progress w-full h-3 ${aiReading.data.mood_score >= 70 ? 'progress-success' :
                                    aiReading.data.mood_score >= 40 ? 'progress-warning' :
                                        'progress-error'
                                }`}
                            value={aiReading.data.mood_score}
                            max="100"
                        ></progress>
                        <span className="font-bold text-xl font-cormorant text-base-content w-12 text-right">
                            {aiReading.data.mood_score}%
                        </span>
                    </div>
                    <h3 className="text-base-content/80 leading-loose font-bold text-lg md:text-xl whitespace-pre-wrap">
                        "{aiReading.data.summary}"
                    </h3>
                    <div className="text-base-content/80 leading-loose font-light text-lg md:text-xl whitespace-pre-wrap">
                        {aiReading.data.detail}
                    </div>
                </div>
            )
        }
        if (aiError) {
            return (
                <div className="flex flex-col justify-center items-center py-12 gap-5 text-center">
                    <p className="font-cormorant text-xl text-base-content/70">BigBen couldn't reach the stars this time...</p>
                    <button
                        disabled={isLoading}
                        onClick={regenerateInterpret}
                        className="px-8 py-3 bg-[#B59F84] text-white rounded-full font-bold hover:bg-[#a08a70] shadow-md transition-all disabled:opacity-50"
                    >
                        {isLoading
                            ? <span className="flex items-center gap-2"><span className="loading loading-spinner loading-sm"></span> Trying again...</span>
                            : "Regenerate Reading"
                        }
                    </button>
                </div>
            )
        }
        return (
            <div className="flex flex-col justify-center items-center py-16 opacity-60 gap-4">
                <span className="loading loading-ring loading-lg text-primary"></span>
                <p className="font-cormorant text-xl animate-pulse">BigBen is writing your destiny...</p>
            </div>
        )
    }

    return (
        <motion.div key="r" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8 w-full text-center max-w-5xl mx-auto pb-20">
            <h1 className="text-4xl font-bold font-cormorant text-base-content tracking-wider uppercas">BigBen's Insight</h1>

            <div className="p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-200 text-left relative shadow-xl shadow-base-300/50">
                <p className="font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3 text-lg">ตามคำถามที่ตั้งไว้</p>

                <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
                    {card && card.map((c, index) => {
                        const matchedCardIndeck = deckOrder.find(deckcard => deckcard.id === c.id)
                        const isCardReversed = matchedCardIndeck ? matchedCardIndeck.isReversed : false;
                        return (
                            <div key={index} className='flex flex-col items-center gap-3 w-20 sm:w-24 md:w-36'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="relative rounded-xl shadow-lg border-2 border-base-200 overflow-hidden"
                                >
                                    <img
                                        src={c.img_url}
                                        alt={c.name}
                                        className={`w-full h-auto object-cover transition-transform duration-700 ${isCardReversed ? 'rotate-180' : ''}`}
                                    />
                                </motion.div>
                                <div className="text-center">
                                    <p className="text-sm md:text-base font-bold text-base-content font-cormorant leading-tight">
                                        {c.name}
                                    </p>
                                    {isCardReversed && (
                                        <span className="text-xs text-error font-medium tracking-widest uppercase mt-1 block">
                                            (Reversed)
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-base-200/50 p-4 sm:p-6 md:p-8 rounded-2xl border border-base-200 shadow-inner w-full">
                    {renderAiSection()}
                </div>
            </div>
            {/* Share button hidden temporarily */}
            {!isSaved ? (
                <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm text-left mx-auto w-full max-w-4xl">
                    <h3 className="text-2xl font-bold font-cormorant text-gray-900 mb-2">Save to Journal</h3>
                    <p className="text-sm text-gray-500 font-light mb-4">บันทึกคำทำนายนี้ไว้ในประวัติของคุณ พร้อมจดความรู้สึกหรือสิ่งที่เกิดขึ้น</p>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="เขียนบันทึกส่วนตัวของคุณที่นี่... (เช่น วันนี้รู้สึกตรงมาก, จะลองนำคำแนะนำไปใช้)"
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B59F84] outline-none transition-all resize-none h-28 mb-4"
                    ></textarea>

                    <button
                        onClick={handleSaveReading}
                        className="w-full py-3 bg-[#B59F84] text-white rounded-xl font-bold hover:bg-[#a08a70] shadow-md transition-all"
                    >
                        Save Reading
                    </button>
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-3xl mx-auto w-full max-w-2xl text-center">
                    <p className="font-semibold text-lg mb-1">✓ บันทึกการดูดวงเรียบร้อยแล้ว!</p>
                    <p className="text-sm opacity-80">คุณสามารถตรวจสอบประวัติย้อนหลังได้ที่หน้า Profile ของคุณ</p>
                </div>
            )}
            <button onClick={() => setStep('QUESTION')} className='px-8 py-3 border border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 hover:shadow-md transition-all mx-auto'>
                กลับไปหน้าหลัก
            </button>
            {/* <ShareImageModal readingId={readingId} isOpen={shareOpen} onClose={() => setShareOpen(false)} /> */}
        </motion.div>
    )
}

export default Result
