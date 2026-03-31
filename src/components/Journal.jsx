import React from 'react'
import useSaveReadingstore from '../stores/saveReadingStores'
import { X } from 'lucide-react'

function Journal() {
    const journalReading = useSaveReadingstore(state => state.journalReading)
    const {journal, reading } = journalReading
    return (
        <div className=' bg-base-300 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl'>
            <div className='flex justify-between items-center p-6 border-b border-base-200'>
                <h2 className='font-bold text-xl text-base-content'>{reading?.aiInterpretation?.question || "Question"}</h2>
                <button onClick={() => document.getElementById('Journal-form').close()} className="cursor-pointer p-2 hover:bg-base-200 rounded-full transition-colors">
                    <X />
                </button>
            </div>
            <div className='p-6 overflow-y-auto flex-1 flex flex-col gap-6'>
                <div className='bg-primary/50 p-6 rounded-2xl border border-primary/80'>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent/70 mb-3">AI Interpretation</h3>
                    <p className='text-base-content/80 leading-relaxed whitespace-pre-wrap'>
                        {reading?.aiInterpretation?.detail || "ไม่มีข้อมูลคำทำนาย"}
                    </p>
                </div>
                <div className="bg-base-200/50 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/50 mb-3">Your Note</h3>
                    <p className="text-base-content/80 italic">
                         {journal?.note || "ไม่มีโน้ต"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Journal