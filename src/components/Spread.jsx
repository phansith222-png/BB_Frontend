import React from 'react'
import { motion } from 'framer-motion'
import { Dropdown } from '../icons'
import { useNavigate } from 'react-router'
import { ArrowRight, Book } from 'lucide-react'
import useReadStore from '../stores/readStores'
function Spread(props) {
    const { id, name, cardCount, spreadType } = props

    const setStep = useReadStore(state=>state.setStep)

    const navigate = useNavigate()

    const handleSelectSpread = () => {
        window.scrollTo(0, 0)
        navigate(`/reading/session?spreadId=${id}`)
        setStep("QUESTION")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleSelectSpread}
            className="relative group bg-white border border-stone-200 rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-stone-300 hover:-translate-y-2 overflow-hidden">
            <span className="absolute top-4 right-4 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {cardCount} Cards
            </span>
            <div className="h-28 w-28 bg-stone-100 border-2 border-stone-200 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 duration-300 overflow-hidden shadow-inner">
                {spreadType?.icon ? (
                    <img src={spreadType?.icon} alt={name} className="h-20 w-20 object-contain" />
                ) : (
                    <Book/>
                )}
            </div>
            <div className="font-cormorant text-3xl font-bold text-stone-950 mb-3 leading-tight">
                {name}
            </div>
            <div className="font-light text-stone-700 text-sm leading-relaxed mb-6 flex-grow">
                {spreadType?.description || "No description available for this spread type."}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 transition-opacity duration-300 group-hover:opacity-100">
                Start Reading <ArrowRight size={16} />
            </div>
        </motion.div>
    )
}

export default Spread