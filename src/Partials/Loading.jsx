import React from 'react'
import img from '../assets/image.png'
function Loading() {
  return (
    <div className='h-full w-full'>
        <img  className='h-full w-full' src={img} alt="img" />
    </div>
  )
}

export default Loading