import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Partials/TopNav';

function Trending() {
  const n=useNavigate();
  return (
    <div className='h-full w-screen text-[#F1F1F1] pl-8 pt-4'>
      <div className='top w-screen flex items-center gap-16' >
      <div className='top  flex items-center gap-6'>
        <i onClick={()=>{
          n(-1)
        }} className="ri-arrow-left-line  font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2 "></i>
        <h1 className='text-[2.4rem] font-semibold'>Trending</h1>
      </div>
       <TopNav></TopNav>
      </div>

    </div>
  )
}

export default Trending