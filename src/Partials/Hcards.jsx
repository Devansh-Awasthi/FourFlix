import React from 'react'

function Hcards() {

  
  return (
    <div className='text-[#F1F1F1] h-[70vh] bg-[#181818] text-'>
       <h1 className='text-[#F1F1F1] text-[4rem] font-bold'>Trending</h1> 
       <div className='bg-red-400 flex gap-16 w-fit overflow-y-scroll items-center'>
        <div className='bg-slate-300 h-96 w-40'>
           </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
        <div className='bg-slate-300 h-40 w-96'> </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
        <div className='bg-slate-300 h-40 w-40'> </div>
       </div>
    </div>
  )
}

export default Hcards