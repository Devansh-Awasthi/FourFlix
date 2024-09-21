import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from '../Partials/TopNav';
import Filter from '../Partials/Filter';

function Trending() {
  const [type, setType] = useState('type'); // Set initial type to 'type' or 'time' as needed
  const [button, setButton] = useState(false);
  const [filter1, setFilter1] = useState('all');
  const [filter2, setFilter2] = useState('day');
  const n=useNavigate();
  const handleTypeChange = (newType) => {
    setType(newType);
    setButton(false); // Close the button when changing type
  };
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
      <div className='flex flex-col gap-6'>
          <Filter  setButton={() => setButton(!button)}
          type={type}
          t={'type'}
          button={type === 'type' ? button : false}
          setFilter={setFilter1}
          filter={filter1}
          arr={["movies", "shows", "all"]}
          iag={'ri-movie-2-fill'}
          onClick={() => handleTypeChange('type')}
          ></Filter>      
          <Filter setButton={() => setButton(!button)}
          type={type}
          t={'time'}
          button={type === 'time' ? button : false}
          setFilter={setFilter2}
          filter={filter2}
          arr={["week", "day", "month"]}
          iag={'ri-time-fill'}
          onClick={() => handleTypeChange('time')} 
          ></Filter>
          </div>
    </div>
  )
}

export default Trending