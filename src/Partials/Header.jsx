import React, { useState } from 'react'
import axios from 'axios';
function Header() {
  
   const k= "95e6ba64";
   var [v,setv]=useState([]);

    const clientId = 'e05d08fa373e1192315a37425be3a6d41c146336b973e4820c11fdb1b96b1f53'; 
    
    const fetchPopularMovies = async () => {
      var imdbIds;
      try {
        const response = await axios.get('https://api.trakt.tv/movies/popular', {
          headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key':clientId
          }
        });
         imdbIds = response.data.map(movie => movie.ids.imdb);
         } catch (error) {
        console.error('Error fetching popular movies:', error);
      }

      console.log(imdbIds);
      if (imdbIds) {
        imdbIds.forEach(async(element) => {
          try {
            const y = await axios.get(
              `http://www.omdbapi.com/?i=${element}&apikey=${k}`
            );
            if (y.data) {
              console.log(y.data);
             
            }
          } catch (error) {
            console.log(error);
          }
        });
   
    }
    };


  return (

    <div onClick={()=>fetchPopularMovies()} className='text-white'> Headder</div>
  )
}

export default Header