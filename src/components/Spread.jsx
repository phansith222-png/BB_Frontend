import React from 'react'
import { motion } from 'framer-motion'
import { Dropdown } from '../icons'
import { useNavigate } from 'react-router'
function Spread(props) {
    const {id,name,cardCount,spreadType} = props
    const {description,typeName} = spreadType

    const navigate = useNavigate()

    const handleSelectSpread = () => {
    window.scrollTo(0, 0)
    navigate(`/reading/session?spreadId=${id}`)
  }

    return (
        <motion.div
            onClick={handleSelectSpread}
            className='bg-[#E9E1D8]/30 group border border-gray-200 rounded-3xl bg-white p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl hover:border-gray-300 hover:-translate-y-2 duration-300 overflow-hidden'>
            <div className='h-24 w-24 bg-[#FAF8F5] border-2 border-[#E9E1D8] rounded-2xl flex items-center group-hover group-hover:scale-110 transition-transform duration-100'>
                <h2>Spread Icon</h2>
            </div>
            <div className='font-cormorant text-2xl font-bold text-gray-900 mb-3'>
                {name}
            </div>
            <div className='font-light text-gray-500 text-sm leading-relaxed'>
                {description}
            </div>
            <div className='mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#B59F84] opacity-0 group-hover:opacity-100 transition-opacity'>
                Select Spread <Dropdown />
            </div>
        </motion.div>
    )
}

export default Spread