import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Header() {
  
   const k= "95e6ba64";
   var [v,setv]=useState([]);
   var [index,setindex]=useState(1);
   var a;

    const clientId = 'e05d08fa373e1192315a37425be3a6d41c146336b973e4820c11fdb1b96b1f53'; 
    
    const fetchPopularMovies = async () => {
      var imdbIds;
      try {
        const response = await axios.get('https://api.trakt.tv/movies/trending', {
          headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key':clientId
          }
        });
        // console.log(response.data);
         imdbIds = response.data.map(a => a.movie.ids.imdb);
         } catch (error) {
        console.error('Error fetching popular movies:', error);
      }

      // console.log(imdbIds);
      if (imdbIds) {
       a= imdbIds.map(async(element) => {
          try {
            const y = await axios.get(
              `http://www.omdbapi.com/?i=${element}&apikey=${k}`
            );
            if (y.data) {
              return y.data; 
            }
             else {
              return null;
            }
          } catch (error) {
            console.log(error);
          }
        });
   
    }
    setv(await Promise.all(a));
    };
useEffect(()=>{
  fetchPopularMovies();
  },[]);
// // useEffect(()=>{

// useEffect(()=>{
//   let p = setInterval(() => {
//     setindex(index + 1%v.length);
//   }, 5000);
//   return () => clearInterval(p);
// },[index,v])  
//   const getCircularIndex = (index) => {
//     return (index + v.length) % v.length;
//   };
  useEffect(() => {
    if (v.length > 0) { // Only set interval if movies have been loaded
      const interval = setInterval(() => {
        setindex((prevIndex) => (prevIndex + 1) % v.length);
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [v]); 
//     return () => clearInterval(p);
// // },[v]);
const getCircularIndex = (index) => {
  return (index + v.length) % v.length;
};
  return (
    <div className='relative pl-5 h-[100%] w-[100%] flex justify-center items-center'>
    {/* Gradient overlay */}
    <div 
      className='absolute top-20 left-0 h-[81%] w-[95%]' 
      style={{
        background: 'linear-gradient(to right, rgba(0, 0, 0, 1), transparent, rgba(0, 0, 0, 1))',
        zIndex: 1, // Ensures the gradient is on top of the images
      }}
    ></div>
         {v.length > 0 &&
         <>
           <img className='mt-16 h-[65%] w-[60vw] size-fit rounded-xl' src={`${v[getCircularIndex(index - 1)].Poster}`}></img>
           <img className='h-[80%] m-3 w-[80vw] size-fit rounded-xl' src={`${v[index].Poster}`}></img>
           <img className='mt-16 pr-32 h-[60%] w-[60vw] size-fit rounded-xl' src={`${v[getCircularIndex(index + 1)].Poster}`}
           ></img>
           </>
         }
          </div>
 
  )
}

export default Header