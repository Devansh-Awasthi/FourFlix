import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import TopNav from '../Partials/TopNav';
import Call from '../Utils/Call';
import axios from 'axios';
import Card from '../Partials/Card';

function Popular() {
    document.title='Movie App|Popular'
    const n = useNavigate();
    const OMDB_API_KEY = "95e6ba64";
    const [final,setFinal]=useState([]);
    const popular = async()=>{
        try{
        const pop=await Call.get('/movies/popular');
        console.log(pop.data);
        pop.data.map(async(i)=>{console.log();
            const response = await axios.get(
              `http://www.omdbapi.com/?i=${i.ids.imdb}&apikey=${OMDB_API_KEY}`)
            //   console.log(response);
            setFinal((prev)=>[...prev,response.data])
            
        })
        }catch(e){
            console.error(e);
        }

    }
    useEffect(()=>{
        popular();  
    })
  return (
    
        <div className="min-h-screen overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
               <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => n(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Popular</h1>
        </div>
        <TopNav />
      </div>
      <div>
      {final.map((item, i) => (
              <Card data={item} key={i} />
            ))}
      </div>
        </div>
      
  );
}

export default Popular