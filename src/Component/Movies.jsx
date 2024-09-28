import axios from 'axios'
import React, { useEffect } from 'react'
import ImdbMovies from '../Utils/ImdbMovies'
// import { createRequire } from 'module'

function Movies() {
    
    const movies =async()=>{

        // const response =await ImdbMovies.get('getFanFavorites');
        // const respons=
      
        // console.log(response);
    }
    useEffect(()=>{
        movies()  // Call the function on component mount
    })
  return (
    <div></div>
  )
}

export default Movies