import React from 'react'
import TopNav from '../Partials/TopNav'
import { Link, useNavigate } from 'react-router-dom';
import GetCelebs from '../Utils/GetCelebs';
import { useState } from 'react';

function People() {
    const [Final, setFinal] = useState([])
    const n = useNavigate();
    const celebs =async()=> {
       const res= await GetCelebs.get();

  
    // console.log(res.data.celebs);
    setFinal(res.data.celebs)
}
    useState(()=>{
        celebs();
    })
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => n(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">People
            <br />
            <small className='text-[#f1f1f180]'>(top-100)</small>
          </h1>
        </div>
        <TopNav />
      </div>
      <div className="flex gap-12 mt-7 max-h-fit w-screen overflow-auto flex-wrap">
          {Final.map((item, i) => (
             <Link key={i} 
             to={{
              pathname:`/celebDetail`, // Assume you have a route like /celeb/:id
            }}
            state={{ item }}
             >
             <div className='relative'>
               
               <img
                 src={`${item.images.large}`}
                 className="h-[60vh] object- w-[22vw]"
                 alt="a"
               />
               <h1 className="text-center font-semibold text-wrap text-lg">{item.name}</h1>
               <div className='box top-11 absolute'
               >
                
             <h1 className='bg-[#FF4500] p-3 rounded-full font-semibold text-[2vh] text-inherit'>{item.rank_movement}</h1>
               </div>
             </div>
             </Link>
          ))}
        </div>
      </div>
  )
}

export default People