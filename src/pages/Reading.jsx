import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown } from '../icons';
import { useNavigate } from 'react-router';
import useReadStore from '../stores/readStores';
import Spread from '../components/Spread';
function Reading() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("ALL");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCardCount, setCustomCardCount] = useState(3);

  const getAllSpread = useReadStore(state => state.getAllSpread)
  const allSpread = useReadStore(state => state.allSpread);
  console.log("allspread", allSpread)
  useEffect(() => {
    getAllSpread()
  }, [])


  const handleStartCustomReading = () => {
    const mappedSpreadId = 90 + customCardCount;
    window.scrollTo(0, 0);
    navigate(`/reading/session?spreadId=${mappedSpreadId}`);
  }
  const filteredSpreads = activeTab === "ALL"
    ? allSpread
    : allSpread?.filter(e => e.spreadType?.category === activeTab);

  const tabs = ["ALL", "GENERAL", "LOVE", "CAREER", "HEALTH"];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  return (
    <div className='pt-24 w-full min-h-screen font-sans '>
      <motion.div className='text-center py-16'
        initial="hidden" animate="visible" variants={fadeUp}
      >
        <h1 className='font-bold font-cormorant text-5xl lg:text-6xl'>Select Your Reading</h1>
        <p className='font-light text-gray-500 text-lg max-w-2xl mx-auto'>Choose a spread that resonates with your current journey. BigBen is ready to interpret the cards for you.</p>
      </motion.div>
      <div className='w-full bg-white/80 border-b border-gray-200 sticky top-20 z-10 py-4 backdrop-blur-sm'>
        <div className='flex flex-wrap gap-3 justify-center'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors
                ${activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-300 text-gray-500 hover:border-gray-900'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-16'>
        <motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <AnimatePresence mode='popLayout'>
            {filteredSpreads && filteredSpreads.map((e) => (
              <motion.div key={e.id}
                layout
                variants={itemAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full">
                <Spread key={e.id} id={e.id} name={e.name} cardCount={e.cardCount} spreadType={e.spreadType} />
              </motion.div>
            ))}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Reading