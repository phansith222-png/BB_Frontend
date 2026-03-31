import React from 'react'
import { Link } from 'react-router'

function TarotCard({ id, name, img_url, reverse_Mean, upright_Mean }) {
  return (
    <div className="flex flex-col px-4 py-2 font-serif shadow-xl">
      <div className=' flex flex-col pt-3  items-center w-full cursor-pointer relative overflow-hidden rounded-xl '>
        <div className='w-full aspect-[2/3] max-w-[220px] transition-transform  hover:-translate-y-2 hover:shadow-primary/20 duration-300 p-4 border-2 rounded-lg flex flex-col'>
          <Link to={`/library/${id}`} className='w-full aspect-[2/3] max-w-[220px] p-2 border border-gray-100 rounded-lg flex flex-col'>
            <img src={img_url} className=" w-full h-full object-fill rounded-xl" />
          </Link>
        </div>
      </div>
      <div className='mt-8 text-center flex flex-col items-center gap-5 w-full'>
        <h2 className='text-2xl font-bold font-cormorant uppercase tracking-widest text-gray-900 transition-colors group-hover:text-[#B59F84]'>{name} Meaning</h2>
        <div className="text-sm leading-relaxed text-gray-600 max-w-[280px] flex flex-col gap-4">
          <div className='flex flex-col gap-1'>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B59F84]">
              Upright
            </span>
            <p className="font-light">{upright_Mean}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Reversed
            </span>
            <p className="font-light text-gray-500">{reverse_Mean}</p>
          </div>
        </div>
        <Link href="#" className="mt-2 text-md font-cormorant font-bold uppercase tracking-wide text-accent hover:text-gray-900 transition-all border-b border-gray-300 hover:border-gray-900 pb-1">
          Full Tarot Meaning
        </Link>
      </div>
    </div>
  )

}

export default TarotCard