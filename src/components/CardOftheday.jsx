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
            <div onClick={hdlTarotOftheday}
                className="relative w-64 h-96 cursor-pointer [perspective:1000px] ">
                <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d]"
                    initial={false}
                    animate={{ rotateY: isflipped ? 180 : 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    <figure className="absolute inset-0 w-full h-full [backface-visibility:hidden] ">
                        <img src="https://images.unsplash.com/photo-1739475981246-a6d8be7081e2?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card Back"
                            className="w-full h-full object-cover rounded-xl shadow-2xl border-4 border-off-white" />
                    </figure>
                    <figure className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        {card && (
                            <img
                                src={card?.img_url}
                                alt={card?.name}
                                className={`w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-500 ${dailyIsreversed ? 'rotate-180' : 'rotate-0'
                                    }`}
                            />
                        )}
                    </figure>
                </motion.div>
            </div>
            <div className="flex gap-2 p-4 w-full h-20 justify-center">
                <AnimatePresence>
                    {isflipped && meaningArray.map((text, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="px-3 py-1 bg-white/20 rounded-full border border-white/10 text-sm font-light backdrop-blur-sm h-full"
                        >
                            {text}
                        </motion.p>
                    ))}
                </AnimatePresence>
            </div>
            <div className="flex gap-2 p-4">
                <AnimatePresence>
                    {isflipped && dailyAi && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex"
                        >
                            <div>
                                <p> BigBen's </p>
                                <p>Mood : {dailyAi.mood_score} %</p>
                                <div>
                                    {dailyAi.summary}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default CardOftheday