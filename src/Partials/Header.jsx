import React from 'react'
import axios from 'axios';
function Header() {
  

    const clientId = 'e05d08fa373e1192315a37425be3a6d41c146336b973e4820c11fdb1b96b1f53'; 
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('https://api.trakt.tv/movies/popular', {
          headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key':clientId
          }
        });
        console.log('Popular Movies:', response.data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };


  return (

    <div onClick={()=>fetchPopularMovies()} className='text-white'> Headder</div>
  )
}

export default Header