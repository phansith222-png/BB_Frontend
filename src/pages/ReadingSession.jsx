import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'

function ReadingSession() {
  return (
    <div className='w-full min-h-screen bg-[#FAF8F5] flex flex-col items-center pt-32 px-6'>
      <div className='w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 border border-gray-100 relative overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className='flex flex-col gap-6 text-center'>
            <h1 className='text-3xl font-bold font-cormorant text-gray-900'>What is on your mind ?</h1>
            <p className="text-gray-500">ตั้งจิตให้นิ่ง และพิมพ์คำถามที่คุณต้องการให้ไพ่ชี้แนะ</p>
            <input type="text" placeholder="เช่น: ทิศทางการงานของฉันในช่วงนี้จะเป็นอย่างไร?"  className='className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B59F84] focus:outline-none'/>
            <button className='w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 shadow-md transition-all'>Start Session</button>
          </motion.div>

          <motion.div>
            <h1 className="text-3xl font-bold font-cormorant text-gray-900">Shuffle The Deck</h1>
            <p>นึกถึงคำถามไว้ในใจ <br />แล้วกดสำรับไพ่เเพื่อสับ</p>
            <p>เลือกเลขมา 1 เลขระหว่าง 1-78</p>
            <input type="number" placeholder='eg: 24'/>
            <button>Shuffle & Cutcard</button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReadingSession