import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Header() {
  
   const k= "95e6ba64";
   var [v,setv]=useState([]);
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
  });


  return (
      <div className='h-full w-[80vw] flex'>  
      {/* {v.map((movie, index) => {
        return (
          <div
            key={index}
            className="h-full w-full"
          >
           
          </div>
        );
      })} */
      }
         <img className="h-[50%] w-[90%] object-center" src={v[8].Poster} alt=""></img>
      </div>
 
  )
}

export default Header