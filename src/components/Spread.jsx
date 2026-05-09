import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import { ArrowRight, Book } from 'lucide-react'
import useReadStore from '../stores/readStores'

const getDifficultyBadge = (count) => {
  if (count === 1) return { label: "Quick · 5 min",        cls: "text-stone-500 bg-stone-100/80" }
  if (count <= 3)  return { label: "Easy · 10 min",        cls: "text-amber-800 bg-amber-50" }
  if (count <= 5)  return { label: "Deep · 15 min",        cls: "text-[#6C4620] bg-[#DFC6AD]/30" }
  return                  { label: "Immersive · 20+ min",  cls: "text-[#6C4620] bg-[#DFC6AD]/50 font-semibold" }
}

function Spread(props) {
  const { id, name, cardCount, spreadType } = props
  const [hovered, setHovered] = useState(false)

  const setStep = useReadStore(state => state.setStep)
  const navigate = useNavigate()

  const handleSelectSpread = () => {
    window.scrollTo(0, 0)
    navigate(`/reading/session?spreadId=${id}`)
    setStep("QUESTION")
  }

  const badge = getDifficultyBadge(cardCount)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleSelectSpread}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group bg-[#FAF8F5] border border-[#DFC6AD]/60 rounded-3xl p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#6C4620]/10 hover:border-[#6C4620]/40 hover:-translate-y-2 hover:z-10 min-h-[480px] h-full"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full z-50 w-64 bg-[#FAF8F5] border border-[#DFC6AD] rounded-2xl p-4 shadow-2xl shadow-[#6C4620]/15 pointer-events-none flex flex-col gap-3"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: Math.min(cardCount, 7) }).map((_, i) => (
                <div key={i} className="w-8 h-12 rounded border-2 border-[#DFC6AD] bg-[#EDE5DC] flex items-center justify-center text-[#6C4620] text-xs font-bold">
                  {i + 1}
                </div>
              ))}
              {cardCount > 7 && (
                <span className="text-[#6C4620]/60 text-xs self-center">+{cardCount - 7} more</span>
              )}
            </div>
            <p className="font-cormorant text-sm text-[#6C4620]/80 text-center leading-snug">
              {spreadType?.description?.slice(0, 90)}{spreadType?.description?.length > 90 ? '…' : ''}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="absolute top-4 right-4 text-xs font-bold text-[#6C4620] bg-[#DFC6AD]/50 border border-[#DFC6AD] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
        {cardCount} Cards
      </span>

      <div className="h-32 w-32 bg-[#EDE5DC] border-2 border-[#DFC6AD]/50 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-300 shadow-inner">
        {spreadType?.icon ? (
          <img src={spreadType?.icon} alt={name} className="h-20 w-20 object-contain" />
        ) : (
          <Book className="text-[#6C4620]" />
        )}
      </div>

      <div className="flex items-center gap-3 w-full justify-center my-2">
        <hr className="flex-1 border-[#DFC6AD]/50" />
        <span className="text-[#DFC6AD] text-lg">✦</span>
        <hr className="flex-1 border-[#DFC6AD]/50" />
      </div>

      <div className="font-cormorant text-3xl font-bold text-[#6C4620] mb-2 leading-snug">
        {name}
      </div>

      <div className="font-cormorant font-light text-[#6C4620]/75 text-base leading-relaxed mb-4 flex-grow">
        {spreadType?.description || "No description available for this spread type."}
      </div>

      <div className="flex justify-center mb-4">
        <span className={`text-xs px-3 py-1 rounded-full border border-current/20 ${badge.cls}`}>
          {badge.label}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[#6C4620] font-cormorant tracking-[0.2em] text-sm font-semibold uppercase transition-opacity duration-300 group-hover:opacity-100">
        Start Reading <ArrowRight size={16} />
      </div>
    </motion.div>
  )
}

export default Spread
