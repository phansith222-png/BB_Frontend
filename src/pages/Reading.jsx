import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown } from '../icons';
import { useNavigate } from 'react-router';
function Reading() {
  const navigate = useNavigate()
  const [activeTab,setActiveTab] = useState("ALL");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCardCount, setCustomCardCount] = useState(3);
  const spreads = [
    { 
      id: 'daily', spreadId: 1, name: "Tarot of The Day", category: "GENERAL", 
      desc: "ไพ่ 1 ใบ สำหรับเช็คพลังงานและแนวทางประจำวันของคุณ", icon: "🎴" 
    },
    { 
      id: 'ppf', spreadId: 2, name: "Past, Present, Future", category: "GENERAL", 
      desc: "ไพ่ 3 ใบ เพื่อทำความเข้าใจสถานการณ์จากอดีต สู่ปัจจุบัน และอนาคต", icon: "🎴🎴🎴" 
    },
    { 
      id: 'love', spreadId: 3, name: "Relationship Path", category: "LOVE", 
      desc: "วิเคราะห์ความสัมพันธ์ ความรู้สึก และแนวโน้มความรักของคุณ", icon: "🤍" 
    },
    { 
      id: 'career', spreadId: 4, name: "Career Direction", category: "CAREER", 
      desc: "สำรวจอุปสรรค โอกาส และก้าวต่อไปในหน้าที่การงาน", icon: "💼" 
    },
    { 
      id: 'celtic', spreadId: 5, name: "Celtic Cross", category: "GENERAL", 
      desc: "การวางไพ่ 10 ใบเพื่อเจาะลึกปัญหาที่ซับซ้อนอย่างละเอียด", icon: "✡️" 
    },
    { 
      id: 'custom', spreadId: 99, name: "Create Custom Spread", category: "CUSTOM", 
      desc: "กำหนดจำนวนไพ่และตั้งคำถามได้อย่างอิสระตามใจคุณ", icon: "✨" 
    }
  ];
  const handleSelectSpread = () => {
    window.scrollTo(0, 0)
    navigate(`/reading/session`)
  }

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
            <motion.div
              onClick={()=>handleSelectSpread() }
             className='bg-[#E9E1D8]/30 group border border-gray-200 rounded-3xl bg-white p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl hover:border-gray-300 hover:-translate-y-2 duration-300 overflow-hidden'>
              <div className='h-24 w-24 bg-[#FAF8F5] border-2 border-[#E9E1D8] rounded-2xl flex items-center group-hover group-hover:scale-110 transition-transform duration-100'>
                <h2>Spread Icon</h2>
              </div>
              <div className='font-cormorant text-2xl font-bold text-gray-900 mb-3'>
                Daily Tarot
              </div>
              <div className='font-light text-gray-500 text-sm leading-relaxed'>
                Spread description
              </div>
              <div className='mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#B59F84] opacity-0 group-hover:opacity-100 transition-opacity'>
                Select Spread <Dropdown />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Reading