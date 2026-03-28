import React from 'react'
import {DefaultImg} from '../icons/index.jsx'


function Avatar(props) {
  const {imgSrc, menu, bottom, right, ...restProps} = props
  return (
    <div className='avatar w-full h-full flex items-center justify-center cursor-pointer '>
      <div className='flex justify-center items-center' {...restProps}>
        {imgSrc ? (
          <img src={imgSrc} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <DefaultImg className="w-2/3 h-2/3 text-gray-400 flex items-center justify-center" />
        )}
      </div>
    </div>
  )
}

export default Avatar