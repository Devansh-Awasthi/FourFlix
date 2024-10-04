import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Call from '../Utils/Call'
import getRecomendation from '../Utils/getRecomendation'
import { Link } from 'react-router-dom'

function Details() {
//   const OMDB_API_KEY = "135eb90e";
  const OMDB_API_KEY ="95e6ba64";
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
    const [trending, setTrending] = useState([])
    const logo={
        'Internet Movie Database':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJo5QuobkY5ZRWBQomjkOSdZtnnjFLJV9ED_Dn9YmeCRbtTTkAHs-V0cQ7P4vcLpkJo8&usqp=CAUhttps://www.google.com/imgres?q=svg%20imdb%20logo&imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F467-4679588_the-television-academy-today-announced-its-comprehensive-imdb.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FhixJJwo_the-television-academy-today-announced-its-comprehensive-imdb%2F&docid=KQEM1E0S-0qSjM&tbnid=lyz9wfBZuOAjVM&vet=12ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA..i&w=840&h=471&hcb=2&ved=2ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA',
     'Rotten Tomatoes':"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XuZfGqSZU_gICB3C_q08qd0KRdNQS5uT7w&s",
     'Metacritic':"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJA2TAq3LHArRqd8LCQsRgnZdJOF-Y9Y9kw&s"
    
    }
    const res=
    {
        "Title": "Deadpool & Wolverine",
        "Year": "2024",
        "Rated": "R",
        "Released": "26 Jul 2024",
        "Runtime": "128 min",
        "Genre": "Action, Adventure, Comedy",
        "Director": "Shawn Levy",
        "Writer": "Ryan Reynolds, Rhett Reese, Paul Wernick",
        "Actors": "Ryan Reynolds, Hugh Jackman, Emma Corrin",
        "Plot": "Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.",
        "Language": "English, French, Spanish",
        "Country": "United States, United Kingdom, Australia, New Zealand, Canada",
        "Awards": "4 wins & 1 nomination",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZmQxZWM5MzgtY2EzZC00OGUxLWE0Y2EtMDIwOTFlNmQ5MWMyXkEyXkFqcGc@._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "8.0/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "78%"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "8.0",
        "imdbVotes": "266,068",
        "imdbID": "tt6263850",
        "Type": "movie",
        "DVD": "N/A",
        "BoxOffice": "$605,188,101",
        "Production": "N/A",
        "Website": "N/A",
        "Response": "True"
    }
 const data =async()=>{
   var pop = await Call.get(`/movies/${res.imdbID}/related`);
   
    //  console.log(pop.data[0].movie.ids.imdb);
     console.log(pop.data[0].ids.imdb);
    //  var res=await getRecomendation({params:{ids:pop.data[0].movie.ids.tmdb}});

    const f=await Promise.all(pop.data.map(async(item)=>{
       return await OmdbCall(item.ids.imdb);
     }));
     
     console.log(f);
     setTrending(f);
 }
useEffect(()=>{
    data();
},[])
  return (
  <div className="min-h-screen overflow-x-hidden relative bg-[#181818] w-screen text-[#F1F1F1] p-8 pt-4">
    <div className='trailer-box w-full h-96 bg-slate-300'></div>

    <img src={`${res.Poster}`}
                  className="h-[60vh] left-24 mb-20 top-80 w-[22vw] absolute"
                  alt="a"/> 
    <div className='detail-box absolute right-[33%]'>
        <h1 className='font-semibold text-[3vw]'>{res.Title}</h1>
         <div className='flex gap-6 mt-5'>
            {res.Ratings.map((item,key)=>{
                return(<h1 className='flex gap-3' key={key}>{item.Source}
                <img className='h-5 w-7' src={`${logo[item.Source]}`}/>
                :{item.Value}</h1>) 
            })}
        </div>
        <div className='flex gap-6 mt-5 mb-5'>
 <h1>Year:{res.Year}</h1> <h1>Rating:{res.Rated}</h1>  <h1>Run-time:{res.Runtime}</h1><h1>Release-Date:{res.Released}</h1>
 
        </div>
        <div className='flex absolute'>
        <p >{res.Plot}</p>
       </div>
    </div>
    <div className='absolute bottom-[-25%] p-8 w-[98%] mt-8 h-fit flex items-center  justify-between'>
        {res.Actors.split(',').map((item,k)=>{
        return <div key={k} className='image'>
            <img className='h-[18vh] w-[10vw]' src="/example.com/item" alt={`${item}`} />
            <h1>{item}</h1>
        </div>
        })
    }</div>
    <div className='w-[96%] border-t-2 border-[#FF4500]  absolute bottom-[-35%]'>
        <h1 className='font-semibold  text-[1.9vw] '>Awards & Nominations: {res.Awards}</h1>
    </div>
     <div className='w-[96%]   border-t-2 border-[#FF4500] absolute bottom-[-51%]'>
        <h1 className='font-semibold  text-[1.2vw] '>Created By: {res.Director}</h1>
        <h1 className='font-semibold  text-[1.2vw] '>
            Written By: {res.Writer}
        </h1>
        <h1 className='font-semibold  text-[1.2vw] '>Languages:{res.Language} </h1>
        <h1 className='font-semibold  text-[1.2vw] '>Country: {res.Country}</h1>
    </div>
     <div className='w-[96%] border-t-2 border-[#FF4500] absolute bottom-[-53%]'>
     <div className=" overflow-x-auto absolute w-full">
     <h1 className='font-semibold  text-[1.9vw] '>Recomended</h1>
        <div className="bg-transparent p-3  h-[50vh] flex gap-4 flex-nowrap w-max items-center">
          {
            trending.map((item, index) => {
              return (
                <div
                  key={index}>
                    <img className='h-80 w-60' src={`${item.Poster
}`}></img>
                 {item.Title}
                </div>
              );
            })}
        </div>
      </div>
     </div>
  
  </div>  
  )
}

export default Details