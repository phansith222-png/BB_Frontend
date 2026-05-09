import { AnimatePresence, motion } from 'framer-motion'
import  { useState } from 'react'
import useReadStore from '../stores/readStores';
import Question from '../components/Question';
import Shuffle from '../components/Shuffle';
import Pick from '../components/Pick';
import Result from '../components/Result';

function ReadingSession() {
  const step = useReadStore(state=>state.step)
  const isLoading = useReadStore(state => state.isLoading)
  const startReading = useReadStore(state =>state.startReading)
  const [note, setNote] = useState("");

  
  

  return (
    <div className='w-full min-h-screen flex flex-col items-center pt-24 md:pt-32 px-4 sm:px-6'>
      <div className='w-full max-w-5xl rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 border border-gray-100 relative overflow-hidden'>
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
           <Result/>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ReadingSession