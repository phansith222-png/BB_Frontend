import React from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from './pageVariants'
import useReadStore from '../stores/readStores'
function Pick() {



    const isLoading = useReadStore(state=>state.isLoading)
    const readingId = useReadStore(state=> state.readingId)
    const pickCard = useReadStore(state=>state.pickCard)
    const deckOrder = useReadStore(state=>state.deckOrder)
    const spread = useReadStore(state=>state.spread)
    
    return (
        <motion.div key="p" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center gap-8 text-center w-full">
            <div>
                <h1 className="text-4xl font-bold font-cormorant text-gray-900 mb-2">Draw Your Cards</h1>
                <p className="text-gray-500 font-light">ไพ่ถูกเตรียมพร้อมแล้ว คลิกที่ไพ่เพื่อเลือก</p>
            </div>

            {/* พื้นที่จำลองไพ่ที่ให้เลือก (สมมติว่าเลือก 3 ใบ) */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full">
                {[1, 2, 3].map((card) => (
                    <div key={card} className="w-32 h-48 md:w-40 md:h-56 bg-[#E9E1D8] border border-[#d8b16c] rounded-xl flex items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform shadow-md">
                        <span className="text-white text-2xl">🎴</span>
                    </div>
                ))}
            </div>

            <button disabled={isLoading} onClick={() => setStep('RESULT')} className='px-12 py-4 mt-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 shadow-lg transition-all disabled:opacity-50'>
                {isLoading ? "กำลังอ่านไพ่..." : "Draw and Show Cards"}
            </button>
        </motion.div>
    )
}

export default Pick