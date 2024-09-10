import React from 'react'

function LeftNav() {
  return (
    <div className='bg-[#181818] w-[20%] h-full border-zinc-200 border-r-[1px]'>
        <div className='flex text-[#F1F1F1] items-center gap-5 ml-4'>
        <i className="ri-movie-2-line text-[#FF8C00] text-[2.5rem]"></i>
        <h1 className='uppercase text-[1.8rem] font-bold'>flix Four</h1>
    </div>
    <div className='new-feed flex text-[#F1F1F1] text- items-center gap-5 ml-4'>
    <h1 className='text-[1.3rem] font-bold'>New Feeds</h1>
    <div className=''></div>

    </div>
    </div>
  )
}

export default LeftNav