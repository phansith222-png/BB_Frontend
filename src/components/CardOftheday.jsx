import { AnimatePresence, motion } from "framer-motion"
import useReadStore from "../stores/readStores"

function CardOftheday(props) {
    const { hdlTarotOftheday, isflipped, dailyCard } = props
    const card = dailyCard?.[0]
    const dailyIsreversed = useReadStore(state => state.dailyIsreversed)
    const dailyAi = useReadStore(state => state.dailyAi)
    console.log('card', card)
    console.log('dailyIsreversed', dailyIsreversed)
    const currentMeaning = dailyIsreversed ? card?.reverse_Mean : card?.upright_Mean;
    console.log(currentMeaning)
    // const meaningArray = currentMeaning.split(',')
    // const meaningSplited = meaningArray.map(item => item.trim())
    const meaningArray = currentMeaning ? currentMeaning.split(',').map(item => item.trim()) : []
    // console.log(meaningSplited)

    return (
        <>
            <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
                <div
                    onClick={hdlTarotOftheday}
                    className="relative w-64 h-96 sm:w-72 sm:h-[432px] cursor-pointer [perspective:1000px] group"
                >
                    <motion.div
                        className="relative w-full h-full [transform-style:preserve-3d]"
                        initial={false}
                        animate={{ rotateY: isflipped ? 180 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <figure className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                            <img
                                src="https://images.unsplash.com/photo-1739475981246-a6d8be7081e2?q=80&w=709&auto=format&fit=crop"
                                alt="Card Back"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-[#FAF8F5] transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                        </figure>
                        <figure className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            {card && (
                                <img
                                    src={card?.img_url}
                                    alt={card?.name}
                                    className={`w-full h-full object-cover rounded-2xl border-4 border-[#FAF8F5] ${dailyIsreversed ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            )}
                        </figure>
                    </motion.div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 w-full px-4 min-h-[40px]">
                    <AnimatePresence>
                        {isflipped &&
                            meaningArray.map((text) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.5 , duration: 0.4 }}
                                >
                                    <span className="px-5 py-2 bg-white/60 backdrop-blur-md rounded-full border border-gray-300/50 text-gray-800 text-sm font-medium shadow-sm">
                                        {text}
                                    </span>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>

                <div className="w-full px-4">
                    <AnimatePresence>
                        {isflipped && dailyAi && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="w-full bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center gap-4"
                            >
                                <div className="flex flex-col items-center gap-1 border-b border-gray-200 pb-4 w-full">
                                    <h3 className="text-xl font-bold font-cormorant text-gray-900 tracking-wide">
                                        BigBen's Insight
                                    </h3>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                        Mood Energy: <span className="text-[#B59F84]">{dailyAi.mood_score}%</span>
                                    </p>
                                </div>

                                <p className="font-light text-gray-700 leading-relaxed text-lg max-w-lg mt-2">
                                    {dailyAi.summary}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </>
    )
}

export default CardOftheday