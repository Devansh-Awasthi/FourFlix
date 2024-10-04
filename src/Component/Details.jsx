import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Call from '../Utils/Call'
import getRecomendation from '../Utils/getRecomendation'
import { Link } from 'react-router-dom'

function Details() {
  const OMDB_API_KEY = "135eb90e";
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${id}&apikey=${OMDB_API_KEY}`
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
   var pop = await Call.get("/search/imdb/tt6263850");
   
    //  console.log(pop.data[0].movie.ids.imdb);
     console.log(pop);
    //  var res=await getRecomendation({params:{ids:pop.data[0].movie.ids.tmdb}});
    var res={
      "data": {
          "related": [
              {
                  "tmdb_id": 3193,
                  "tmdb_poster_path": "/axueZYwRuP3RZdhTJxO7288cyLe.jpg",
                  "tmdb_backdrop_path": "/5UmuHPIbQhrTCoDApccAC8z59TM.jpg",
                  "name": "Good Game",
                  "original_name": "Good Game",
                  "first_air_date": "2006-09-19",
                  "vote_average": 10,
                  "match_score": 100
              },
              {
                  "tmdb_id": 225023,
                  "tmdb_poster_path": "/gJVEHeNvcpTvEK0nEiA2TgEzfpq.jpg",
                  "tmdb_backdrop_path": "/1ao4HHgXAWrz0af43HM3GmnLsnX.jpg",
                  "name": "The Game Show Show",
                  "original_name": "The Game Show Show",
                  "first_air_date": "2023-05-10",
                  "vote_average": 10,
                  "match_score": 100
              },
              {
                  "tmdb_id": 21608,
                  "tmdb_poster_path": "/yBlUFCTbmVcx69rUteymAOPpEQI.jpg",
                  "tmdb_backdrop_path": null,
                  "name": "The Conspiracy Files",
                  "original_name": "The Conspiracy Files",
                  "first_air_date": "2006-12-10",
                  "vote_average": 10,
                  "match_score": 100
              },
              {
                  "tmdb_id": 42203,
                  "tmdb_poster_path": "/qmC6iTVqNuuASaQpTSJS0q2N7TO.jpg",
                  "tmdb_backdrop_path": null,
                  "name": "101 East",
                  "original_name": "101 East",
                  "first_air_date": "2007-03-23",
                  "vote_average": 9,
                  "match_score": 95
              },
              {
                  "tmdb_id": 100662,
                  "tmdb_poster_path": "/oZaVtjyEGePaI7mCDq67jXcrTHo.jpg",
                  "tmdb_backdrop_path": "/bTLFLbcm1jNuu3MlHcBATllKoN5.jpg",
                  "name": "VICE",
                  "original_name": "VICE",
                  "first_air_date": "2020-03-29",
                  "vote_average": 8.3,
                  "match_score": 92
              },
              {
                  "tmdb_id": 272538,
                  "tmdb_poster_path": "/3y9oVmMo2c1HmNEJsgl2EcZ7PWz.jpg",
                  "tmdb_backdrop_path": "/oWeSliwp1Iaay5kCfFgmQWRmVXb.jpg",
                  "name": "West End Murders",
                  "original_name": "West End Murders",
                  "first_air_date": "2024-09-23",
                  "vote_average": 8,
                  "match_score": 90
              },
              {
                  "tmdb_id": 3864,
                  "tmdb_poster_path": "/bYpFFLz9UxPLRLxRSRN8zj3165T.jpg",
                  "tmdb_backdrop_path": "/1OdOOv4fGjZ4lQAc8juGZGUrloE.jpg",
                  "name": "NOVA scienceNOW",
                  "original_name": "NOVA scienceNOW",
                  "first_air_date": "2005-01-25",
                  "vote_average": 8,
                  "match_score": 90
              },
              {
                  "tmdb_id": 94338,
                  "tmdb_poster_path": "/1RcA9BIcyeEhrLJPxprdu16TwXz.jpg",
                  "tmdb_backdrop_path": "/yHex3xs0P6ndAFuRRawVzhchIad.jpg",
                  "name": "Retro Report on PBS",
                  "original_name": "Retro Report on PBS",
                  "first_air_date": "2019-10-07",
                  "vote_average": 8,
                  "match_score": 90
              },
              {
                  "tmdb_id": 31732,
                  "tmdb_poster_path": "/pwMvc40mOHyZ9IsFPTcW0Jdm57l.jpg",
                  "tmdb_backdrop_path": "/c2wPZsH2LZT8Z3Dqo3yt7dl4g5d.jpg",
                  "name": "Democracy Now!",
                  "original_name": "Democracy Now!",
                  "first_air_date": "2001-01-01",
                  "vote_average": 7.6,
                  "match_score": 88
              },
              {
                  "tmdb_id": 17968,
                  "tmdb_poster_path": "/eXZLaXTUHn4468Itu5yA6KtcbT6.jpg",
                  "tmdb_backdrop_path": null,
                  "name": "Newswipe with Charlie Brooker",
                  "original_name": "Newswipe with Charlie Brooker",
                  "first_air_date": "2009-03-25",
                  "vote_average": 7.563,
                  "match_score": 88
              },
              {
                  "tmdb_id": 3664,
                  "tmdb_poster_path": null,
                  "tmdb_backdrop_path": null,
                  "name": "Rick Mercer Report",
                  "original_name": "Rick Mercer Report",
                  "first_air_date": "2004-01-12",
                  "vote_average": 7.3,
                  "match_score": 87
              },
              {
                  "tmdb_id": 64970,
                  "tmdb_poster_path": "/v9sxjcufqTlFE0MeClNK9Ipu7tA.jpg",
                  "tmdb_backdrop_path": "/yqGB0oP7oH9bbL66rjB7J0aMXU3.jpg",
                  "name": "This Is Life with Lisa Ling",
                  "original_name": "This Is Life with Lisa Ling",
                  "first_air_date": "2014-09-28",
                  "vote_average": 7.4,
                  "match_score": 87
              },
              {
                  "tmdb_id": 118043,
                  "tmdb_poster_path": "/a7i3jJe9rI7RSvlGoMB7aYI7XVt.jpg",
                  "tmdb_backdrop_path": "/dVTyx2n13PvEG44iH40DdaNym2A.jpg",
                  "name": "Amend: The Fight for America",
                  "original_name": "Amend: The Fight for America",
                  "first_air_date": "2021-02-17",
                  "vote_average": 7.1,
                  "match_score": 86
              },
              {
                  "tmdb_id": 62106,
                  "tmdb_poster_path": "/u8J2MbbquZ7EhyzEPyEo3wD5Gnc.jpg",
                  "tmdb_backdrop_path": null,
                  "name": "Borderland",
                  "original_name": "Borderland",
                  "first_air_date": "2014-04-13",
                  "vote_average": 7.2,
                  "match_score": 86
              },
              {
                  "tmdb_id": 48552,
                  "tmdb_poster_path": "/iyUbcAWYcCt6qoKNiqNQkrnUrwF.jpg",
                  "tmdb_backdrop_path": "/eajGFxLSZ5iuWz9Hn7GytRW6qtm.jpg",
                  "name": "VICE",
                  "original_name": "VICE",
                  "first_air_date": "2013-04-05",
                  "vote_average": 6.9,
                  "match_score": 85
              },
              {
                  "tmdb_id": 4225,
                  "tmdb_poster_path": "/b8hftDjIoVBiGP2gaBxjAU6GHdz.jpg",
                  "tmdb_backdrop_path": "/xXXt9FWD0coqGrj8FqbeowR69MY.jpg",
                  "name": "The Gadget Show: Shop Smart, Save Money",
                  "original_name": "The Gadget Show: Shop Smart, Save Money",
                  "first_air_date": "2004-06-07",
                  "vote_average": 6.5,
                  "match_score": 83
              },
              {
                  "tmdb_id": 83737,
                  "tmdb_poster_path": "/65AgYe3PH28vfodfdxNX7ihvmhd.jpg",
                  "tmdb_backdrop_path": "/pcjg0Ke5t4hEUhBd2LF0Vu0pvJk.jpg",
                  "name": "Jonestown: Terror in the Jungle",
                  "original_name": "Jonestown: Terror in the Jungle",
                  "first_air_date": "2018-11-17",
                  "vote_average": 6.684,
                  "match_score": 83
              },
              {
                  "tmdb_id": 33261,
                  "tmdb_poster_path": "/ccJetuxDk3CoBKXW3vG3WIW5GZ8.jpg",
                  "tmdb_backdrop_path": "/cBJD8sNL5xKNB1vSzObfVde8TSB.jpg",
                  "name": "The Presidents",
                  "original_name": "The Presidents",
                  "first_air_date": "2005-01-18",
                  "vote_average": 6.3,
                  "match_score": 82
              },
              {
                  "tmdb_id": 89419,
                  "tmdb_poster_path": "/alYJ6XtkahBUlcUFFJISFpTVxLu.jpg",
                  "tmdb_backdrop_path": "/4uauK8WO76KpJLib0WcU3tVl3C3.jpg",
                  "name": "Naked News Uncovered",
                  "original_name": "Naked News Uncovered",
                  "first_air_date": "2013-05-02",
                  "vote_average": 6.2,
                  "match_score": 81
              },
              {
                  "tmdb_id": 26371,
                  "tmdb_poster_path": "/movnhKrQ6XI5PrrsBlp3PYGJ7cH.jpg",
                  "tmdb_backdrop_path": "/718u30c8vg8RmgZjIWMZtjOj5yU.jpg",
                  "name": "Hold the Front Page",
                  "original_name": "Hold the Front Page",
                  "first_air_date": "2023-01-04",
                  "vote_average": 6,
                  "match_score": 80
              }
          ]
      },
      "status": 200,
      "statusText": "",
      "headers": {
          "access-control-allow-credentials": "true",
          "access-control-allow-headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          "access-control-allow-methods": "GET,DELETE,PATCH,POST,PUT",
          "access-control-allow-origin": "*",
          "age": "0",
          "cache-control": "public, max-age=0, must-revalidate",
          "content-encoding": "br",
          "content-type": "application/json; charset=utf-8",
          "date": "Thu, 03 Oct 2024 15:03:39 GMT",
          "etag": "W/\"hoviwxl2y3v7\"",
          "server": "RapidAPI-1.2.8",
          "x-matched-path": "/api/v1/tv",
          "x-rapidapi-region": "AWS - ap-southeast-1",
          "x-rapidapi-request-id": "42a65cabfae8689af6df98a4ba72da8d79ba0865076beb7681bb62db3d5bf8bb",
          "x-rapidapi-version": "1.2.8",
          "x-ratelimit-rapid-free-plans-hard-limit-limit": "500000",
          "x-ratelimit-rapid-free-plans-hard-limit-remaining": "499999",
          "x-ratelimit-rapid-free-plans-hard-limit-reset": "2677767",
          "x-ratelimit-requests-limit": "1",
          "x-ratelimit-requests-remaining": "0",
          "x-ratelimit-requests-reset": "85767",
          "x-vercel-cache": "MISS",
          "x-vercel-id": "sin1::iad1::ltmlh-1727967819482-1736e28eef6f"
      },
      "config": {
          "transitional": {
              "silentJSONParsing": true,
              "forcedJSONParsing": true,
              "clarifyTimeoutError": false
          },
          "adapter": [
              "xhr",
              "http",
              "fetch"
          ],
          "transformRequest": [
              null
          ],
          "transformResponse": [
              null
          ],
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1,
          "maxBodyLength": -1,
          "env": {},
          "headers": {
              "Accept": "application/json, text/plain, */*",
              "x-rapidapi-key": "daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e",
              "x-rapidapi-host": "watchthis.p.rapidapi.com"
          },
          "baseURL": "https://watchthis.p.rapidapi.com/api/v1/tv",
          "params": {
              "ids": 278
          },
          "method": "get"
      },
      "request": {}
  }
    const f=await Promise.all(res.data.related.map(async(item)=>{
       return await OmdbCall(item.name);
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