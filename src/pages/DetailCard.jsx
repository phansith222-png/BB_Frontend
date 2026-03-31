import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import useCardStore from '../stores/cardStores'

function DetailCard() {
    const { id } = useParams()
    const cards = useCardStore(state=>state.card)
    const getCards = useCardStore(state=>state.getCard)

    useEffect(() => {
        if (cards.length === 0) {
            getCards();
        }
    }, [cards.length, getCards]);
    const currentCard = cards.find(c => c.id === Number(id))
    
    if (!currentCard) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-cormorant animate-pulse">Summoning the card...</div>;
    }

    const {cardNumber,description,detailed_meaning,img_url,name,reverse_Mean,suit,type,upright_Mean} = currentCard


    return (
        <div className='w-full min-h-screen pt-28 px-6 font-sans'>
            <div className='max-w-6xl mx-auto'>
                <Link to="/library" className='inline-flex items-center gap-2 text-gray-500 hover:text-[#B59F84] transition-colors mb-10 text-sm tracking-widest uppercase font-bold'>
                    <ArrowLeft size={16} /> Back to Library
                </Link>
                <div className='flex items-center flex-col md:flex-row gap-12 lg:gap-20 '>
                    <div className="w-full h-full items-center md:w-1/3 flex justify-center md:sticky md:top-32">
                        <div className='border flex flex-col h-full gap-2'>
                            <div className="w-full max-w-[300px] p-3 bg-white rounded-2xl shadow-xl border border-gray-100">
                                <img
                                    src={img_url}
                                    alt={name}
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-2/3 flex flex-col gap-8'>
                        <div>
                            <p className='uppercase text-2xl tracking-wider  text-[#B59F84] font-bold mb-2'>{type === 'MAJOR' ? 'Major Arcana' : `Suit of ${suit}`}</p>
                            <p className='text-5xl lg:text-6xl font-bold font-cormorant text-gray-900'>{name}</p>
                        </div>
                        <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm'>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">
                                Visual Symbolism
                            </h3>
                            <p className='text-gray-600 font-light leading-loose text-lg'>
                                {description || "ไม่พบข้อมูลภาพสัญลักษณ์"}
                            </p>
                        </div>
                        <div className='bg-[#E9E1D8]/30'>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#B59F84] mb-4 border-b border-[#B59F84]/20 pb-2">
                                Detailed Interpretation
                            </h3>
                            <p className="text-gray-800 font-light leading-loose text-lg whitespace-pre-wrap">
                                {detailed_meaning || "ไม่พบคำอธิบายเชิงลึก"}
                            </p>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
                            <div className='py-6 border border-gray-200 rounded-2xl'>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Upright Keywords</h4>
                                <p className="text-gray-600 font-light">{upright_Mean}</p>
                                
                            </div>
                            <div className='py-6 border border-gray-200 rounded-2xl'>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Reversed Keywords</h4>
                                <p className="text-gray-600 font-light">{reverse_Mean}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailCard