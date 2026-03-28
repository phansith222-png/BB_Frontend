import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown } from '../icons';
import { useNavigate } from 'react-router';
import useReadStore from '../stores/readStores';
import Spread from '../components/Spread';
function Reading() {
  const navigate = useNavigate()
  const [activeTab,setActiveTab] = useState("ALL");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCardCount, setCustomCardCount] = useState(3);
  
  const getAllSpread = useReadStore(state=>state.getAllSpread)
  const allSpread = useReadStore(state => state.allSpread);
  console.log(allSpread)
  useEffect(() => {
      getAllSpread()
    }, [])

  
  const handleStartCustomReading = () =>{
    const mappedSpreadId = 90 + customCardCount; 
    window.scrollTo(0, 0);
    navigate(`/reading/session?spreadId=${mappedSpreadId}`);
  }


  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div className='pt-24 w-full min-h-screen bg-[#FAF8F5] font-sans '>
      <motion.div className='text-center py-16'
        initial="hidden" animate="visible" variants={fadeUp}
      >
        <h1 className='font-bold font-cormorant text-5xl lg:text-6xl'>Select Your Reading</h1>
        <p className='font-light text-gray-500 text-lg max-w-2xl mx-auto'>Choose a spread that resonates with your current journey. BigBen is ready to interpret the cards for you.</p>
      </motion.div>
      <motion.div className='w-full bg-[#E9E1D8] py-6 shadow-inner'
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className=' flex flex-wrap gap-4 justify-center'>
          <button className='px-6 py-2 rounded-full text-sm font-medium tracking-widest bg-secondary text-white uppercase transition-all duration-300'>Love</button>
        </div>
      </motion.div>

      <div className='max-w-6xl mx-auto px-6 py-16'>
        <motion.div layout className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <AnimatePresence mode='popLayout'>
            {allSpread.map((e)=>(
              <Spread key={e.id} id={e.id} name={e.name} cardCount={e.cardCount} spreadType={e.spreadType} />

            ))}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Reading