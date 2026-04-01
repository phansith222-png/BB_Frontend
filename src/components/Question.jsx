import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { pageVariants } from './pageVariants'
import useReadStore from '../stores/readStores';
import { useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
function Question() {
    const [searchParams] = useSearchParams();
    const spreadId = parseInt(searchParams.get('spreadId')|| "1")


    const [question, setQuestion] = useState("");
    const isReversed = useReadStore(state => state.isReversed)
    const setReversed = useReadStore(state => state.setReversed)
    const isLoading = useReadStore(state => state.isLoading)
    const startReading = useReadStore(state => state.startReading)
    const setStep = useReadStore(state => state.setStep)
    const setReadingId = useReadStore(state => state.setReadingId)

    const getSpreadId = useReadStore(state=> state.getSpreadId)

    useEffect(() => {
        if (spreadId) {
            getSpreadId(spreadId);
        }
    }, [spreadId, getSpreadId]);


    const hdlStartreading = async () => {
        try {
            const resp = await startReading({
            spreadId:spreadId,
            isDaily: false,
            question:question,
            allowReversed:isReversed
        })
        setReadingId(resp.data.data.readingId)
        setStep('SHUFFLE')
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
        }
        
    }
    return (
        <motion.div key="q" variants={pageVariants} initial="initial" animate="animate" exit="exit" className='flex flex-col gap-6 text-center max-w-xl mx-auto'>
            <h1 className='text-4xl font-bold font-cormorant text-gray-900'>What is on your mind?</h1>
            <p className="text-gray-500 font-light">ตั้งจิตให้นิ่ง และพิมพ์คำถามที่คุณต้องการให้ไพ่ชี้แนะ</p>

            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="เช่น: ทิศทางการงานของฉันในช่วงนี้จะเป็นอย่างไร?"
                className='w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B59F84] focus:border-transparent outline-none transition-all'
            />
            <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm mt-2">
                <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm">Allow Reversed Cards</p>
                    <p className="text-xs text-gray-500 mt-1">อนุญาตให้มีไพ่หัวกลับ (เพิ่มความละเอียดในการทำนาย)</p>
                </div>
                <button
                    type="button"
                    onClick={() => setReversed(!isReversed)}
                    className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isReversed ? 'bg-[#B59F84]' : 'bg-gray-300'
                        }`}
                >
                    <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isReversed ? 'translate-x-7' : 'translate-x-0'
                            }`}
                    />
                </button>
            </div>
            <button disabled={isLoading} onClick={hdlStartreading} className='cursor-pointer w-full py-4 mt-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all disabled:opacity-50'>
                {isLoading ? "กำลังสร้าง Session..." : "Start Session"}
            </button>
        </motion.div>
    )
}

export default Question