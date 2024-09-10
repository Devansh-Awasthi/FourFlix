import React from 'react'
import { Link } from 'react-router-dom'

function LeftNav() {
  return (
    <div className='bg-[#181818] w-[20%] h-full border-zinc-200 border-r-[1px] mr-10'>
        <div className='flex text-[#F1F1F1] items-center gap-5 m-4'>
        <i className="ri-movie-2-line text-[#FF8C00] text-[2.5rem]"></i>
        <h1 className='uppercase text-[1.8rem] font-bold'>flix Four</h1>
    </div>
    <div className='new-feed flex text-[#F1F1F1] text- items-center m-8'>
    <h1 className='text-[1.3rem] font-bold'>New Feeds</h1></div>
    <div className='flex flex-col  text-[#F1F1F1] ml-10  text-[1rem]  font-semibold mr-5'>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-meteor-fill"></i>
      Trending</Link>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-sparkling-2-fill"></i>Popular</Link>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-movie-fill"></i>Movies</Link>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-tv-fill"></i>TV Show</Link>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3 '>
      <i className="ri-team-fill"></i>Community</Link>
    </div>
    <div className=' mt-2'></div>
    <div className='new-feed flex text-[#F1F1F1] text- items-center m-8'>
    <h1 className='text-[1.3rem] font-bold'>Website Information</h1></div>
    <div className='flex flex-col  text-[#F1F1F1] ml-10  text-[1rem] font-semibold mr-5'>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-information-2-fill"></i>
      About</Link>
      <Link className='flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3'>
      <i className="ri-discuss-fill"></i>Contact</Link></div>
    
    </div>
  )
}

export default LeftNav