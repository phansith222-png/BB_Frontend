import { motion } from "framer-motion"
import { pageVariants } from "./pageVariants"
import useReadStore from "../stores/readStores"
import { useState } from "react"
import { toast } from "react-toastify"
function Shuffle() {
    // zustand
    const isLoading = useReadStore(state => state.isLoading)
    const readingId = useReadStore(state => state.readingId)
    const deckOrder = useReadStore(state => state.deckOrder)
    const isReversed = useReadStore(state=>state.isReversed)
    const shuffleCard = useReadStore(state => state.shuffleCard)
    const cutCard = useReadStore(state => state.cutCard)
    const setStep = useReadStore(state => state.setStep)
    // Shuffle component
    const [isShuffled, setIsShuffled] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [cutPosition, setCutPosition] = useState("");
    const [error, setError] = useState("")
    const hdlShuffle = async () => {
        if (isLoading || isAnimating) return;

        setIsAnimating(true);
        try {
            const resp = await shuffleCard({
                readingId: readingId,
                times: Math.floor(Math.random() * 100) + 1,
                allowReversed: isReversed
            });
            console.log(resp.data)
            setIsShuffled(true);
        } catch (error) {
            console.dir(err)
            const errMsg = err.response?.data.message || err.message
            toast.error(errMsg)
        } finally {
            setTimeout(() => {
                setIsAnimating(false)
            }, 1000);
        }
    }

    const hdlCut = async () => {
        if (!cutPosition || cutPosition < 1 || cutPosition > 78) {
            toast.error("please provide position to cut between 1-78");
            return
        }
        try {
            await cutCard({
                readingId: readingId,
                position: Number(cutPosition)
            });
            setStep('PICK')
        } catch (error) {
            // console.dir(error)
            const errMsg = err.response?.data.message || err.message
            toast.error(errMsg)
        }
    }

    const deckAnimation = isAnimating ? {
        x: [0, -60, 60, -30, 0],
        y: [0, -10, 15, -5, 0],
        rotate: [0, -15, 15, -5, 0],
        transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    } : { x: 0, y: 0, rotate: 0 };

    return (
        <motion.div key="s" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center gap-6 text-center max-w-xl mx-auto">
            <h1 className="text-4xl font-bold font-cormorant text-gray-900">Shuffle & Cut</h1>
            <p className='text-gray-500 font-light'>นึกถึงคำถามไว้ในใจ<br />แล้วเลือกตำแหน่งเพื่อตัดไพ่</p>

            <div onClick={hdlShuffle} className={`relative w-32 h-48 sm:w-40 sm:h-56 my-6 flex justify-center items-center transition-all duration-300 ${(!isLoading && !isAnimating)
                ? 'cursor-pointer hover:scale-110 hover:drop-shadow-2xl'
                : 'cursor-not-allowed opacity-90'
                }`}
                title="คลิกเพื่อสับไพ่"
            >
                <motion.div animate={isAnimating ? { x: [0, 50, -40, 0], rotate: [0, 10, -10, 0], transition: { duration: 1.5, repeat: Infinity } } : { rotate: 5, x: 10 }}
                    className="absolute w-28 h-44 sm:w-36 sm:h-52 bg-[#D1C4B5] border border-white rounded-xl shadow-sm" />
                <motion.div animate={isAnimating ? { x: [0, -50, 40, 0], rotate: [0, -10, 10, 0], transition: { duration: 0.5, repeat: Infinity } } : { rotate: -5, x: -10 }}
                    className="absolute w-28 h-44 sm:w-36 sm:h-52 bg-[#C2B29F] border border-white rounded-xl shadow-md" />
                <motion.div animate={deckAnimation}
                    className="absolute w-28 h-44 sm:w-36 sm:h-52 bg-[#B59F84] border-2 border-[#FAF8F5] rounded-xl shadow-xl flex items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1739475981246-a6d8be7081e2?q=80&w=709&auto=format&fit=crop"
                        alt="Card Back"
                        className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-[#FAF8F5] transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </motion.div>

            </div>
            <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: isShuffled ? 1 : 0.4 }}
                className={`w-full text-left transition-all duration-500`}
            >
                <div className="w-full text-left">
                    <p className="text-sm font-semibold text-gray-900 mb-2 ml-1">เลือกตำแหน่งตัดไพ่ (1-78)</p>
                    <input
                        type="number"
                        min="1" max="78"
                        placeholder="เช่น: 24"
                        value={cutPosition}
                        onChange={(e) => setCutPosition(e.target.value)}
                        className='w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B59F84] outline-none transition-all'
                    />
                </div>

                <button disabled={isLoading || isAnimating} onClick={hdlCut} className='w-full py-4 mt-6 text-xl bg-accent/40 text-secondary rounded-xl font-bold hover:bg-[#a08a70] shadow-lg transition-all disabled:opacity-50 disabled:bg-gray-400'>
                    {isLoading ? "กำลังตัดไพ่..." : "Confirm & Cut Card"}
                </button>
            </motion.div>
        </motion.div>
    )
}

export default Shuffle