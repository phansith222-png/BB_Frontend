import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { useNavigate } from 'react-router'
import { Globe, Heart, Briefcase, Activity, LayoutGrid } from 'lucide-react'
import useReadStore from '../stores/readStores'
import Spread from '../components/Spread'

const TAB_ICONS = {
  ALL: LayoutGrid,
  GENERAL: Globe,
  LOVE: Heart,
  CAREER: Briefcase,
  HEALTH: Activity,
}

const CATEGORY_ORDER = ["GENERAL", "LOVE", "CAREER", "HEALTH"]

const groupByCategory = (spreads) =>
  CATEGORY_ORDER
    .map(cat => ({ cat, items: spreads?.filter(s => s.spreadType?.category === cat) ?? [] }))
    .filter(g => g.items.length > 0)

function Reading() {
  // const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("ALL")

  const getAllSpread = useReadStore(state => state.getAllSpread)
  const allSpread = useReadStore(state => state.allSpread)

  useEffect(() => {
    getAllSpread()
  }, [])

  const filteredSpreads = activeTab === "ALL"
    ? allSpread
    : allSpread?.filter(e => e.spreadType?.category === activeTab)

  const tabs = ["ALL", "GENERAL", "LOVE", "CAREER", "HEALTH"]

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
  }

  const sectionHeaderVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  }

  const renderGrid = (spreads) => (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {spreads?.map(e => (
          <motion.div
            key={e.id}
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="h-full relative"
          >
            <Spread id={e.id} name={e.name} cardCount={e.cardCount} spreadType={e.spreadType} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="pt-24 w-full min-h-screen bg-[#EDE5DC]">
      <motion.div className="text-center py-16 px-6" initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="font-cinzel font-bold text-5xl lg:text-6xl text-[#6C4620]">Select Your Reading</h1>
        <div className="flex items-center gap-4 max-w-xs mx-auto my-5">
          <hr className="flex-1 border-[#DFC6AD]" />
          <span className="text-[#DFC6AD] text-xl">✦</span>
          <hr className="flex-1 border-[#DFC6AD]" />
        </div>
        <p className="font-cormorant font-light italic text-xl text-[#6C4620]/70 max-w-2xl mx-auto">
          Choose a spread that resonates with your current journey. BigBode is ready to interpret the cards for you.
        </p>
      </motion.div>

      <div className="w-full bg-[#EDE5DC]/95 border-b border-[#DFC6AD]/40 sticky top-20 z-10 py-4 backdrop-blur-md">
        <div className="flex flex-wrap gap-3 justify-center">
          {tabs.map((tab) => {
            const Icon = TAB_ICONS[tab]
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors
                  ${activeTab === tab
                    ? 'bg-[#6C4620] text-[#EDE5DC]'
                    : 'border border-[#6C4620]/40 text-[#6C4620]/70 hover:border-[#6C4620] hover:text-[#6C4620]'
                  }`}
              >
                <Icon size={14} />
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {activeTab === "ALL" ? (
          allSpread && groupByCategory(allSpread).map(({ cat, items }) => (
            <div key={cat} className="mb-16">
              <motion.div
                variants={sectionHeaderVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 mb-8"
              >
                <hr className="flex-1 border-[#DFC6AD]/60" />
                {(() => { const Icon = TAB_ICONS[cat]; return <Icon size={16} className="text-[#6C4620]/60" /> })()}
                <span className="font-cinzel text-sm uppercase tracking-[0.3em] text-[#6C4620]">{cat}</span>
                <hr className="flex-1 border-[#DFC6AD]/60" />
              </motion.div>
              {renderGrid(items)}
            </div>
          ))
        ) : (
          renderGrid(filteredSpreads)
        )}
      </div>
    </div>
  )
}

export default Reading
