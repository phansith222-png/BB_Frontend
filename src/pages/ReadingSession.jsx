import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import useReadStore from '../stores/readStores';
import { pageVariants } from '../components/pageVariants';
import Question from '../components/Question';
import Shuffle from '../components/Shuffle';
import Pick from '../components/pick';

function ReadingSession() {
  const step = useReadStore(state=>state.step)
  const isLoading = useReadStore(state => state.isLoading)
  const startReading = useReadStore(state =>state.startReading)
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  
  const handleSaveReading = async () =>{
    // Axios หา saved read
    setIsSaved(true)
  }

  return (
    <div className='w-full min-h-screen bg-[#FAF8F5] flex flex-col items-center pt-32 px-6'>
      <div className='w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 border border-gray-100 relative overflow-hidden'>
        <AnimatePresence mode='wait'>
          {step === "QUESTION" && (
            <Question/>
          )}
          {step === 'SHUFFLE' && (
            <Shuffle/>
          )}
          {step === 'PICK' && (
            <Pick/>
          )}
          {step === 'RESULT' && (
            <motion.div key="r" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-8 w-full text-center">
              <h1 className="text-4xl font-bold font-cormorant text-gray-900">BigBen's Insight</h1>

              <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-gray-200 text-left relative shadow-sm">
                <p className="font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3 text-lg">คำถาม: ทิศทางการงานของฉันในช่วงนี้จะเป็นอย่างไร?</p>

                <div className="flex justify-center gap-4 mb-8">
                  {[1, 2, 3].map((card) => (
                    <div key={card} className="w-24 h-36 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-xs text-gray-500">
                      [ รูปไพ่ ]
                    </div>
                  ))}
                </div>
                <div className="text-gray-700 leading-relaxed font-light text-lg">
                  <p>ไพ่บ่งบอกถึงการเปลี่ยนแปลงที่ดีในหน้าที่การงาน คุณอาจจะได้รับโอกาสใหม่ที่ท้าทายความสามารถ...</p>
                  {/* {airesponse} */}
                </div>
              </div>
              {!isSaved ? (
                <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm text-left mx-auto w-full max-w-2xl">
                  <h3 className="text-2xl font-bold font-cormorant text-gray-900 mb-2">Save to Journal</h3>
                  <p className="text-sm text-gray-500 font-light mb-4">บันทึกคำทำนายนี้ไว้ในประวัติของคุณ พร้อมจดความรู้สึกหรือสิ่งที่เกิดขึ้น</p>

                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="เขียนบันทึกส่วนตัวของคุณที่นี่... (เช่น วันนี้รู้สึกตรงมาก, จะลองนำคำแนะนำไปใช้)"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B59F84] outline-none transition-all resize-none h-28 mb-4"
                  ></textarea>

                  <button
                    onClick={handleSaveReading}
                    className="w-full py-3 bg-[#B59F84] text-white rounded-xl font-bold hover:bg-[#a08a70] shadow-md transition-all"
                  >
                    Save Reading
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-3xl mx-auto w-full max-w-2xl text-center">
                  <p className="font-semibold text-lg mb-1">✓ บันทึกการดูดวงเรียบร้อยแล้ว!</p>
                  <p className="text-sm opacity-80">คุณสามารถตรวจสอบประวัติย้อนหลังได้ที่หน้า Profile ของคุณ</p>
                </div>
              )}
              <button onClick={() => setStep('QUESTION')} className='px-8 py-3 border border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 hover:shadow-md transition-all mx-auto'>
                กลับไปหน้าหลัก
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReadingSession