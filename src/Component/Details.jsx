import axios from "axios";
import React, { useEffect, useState } from "react";
import Call from "../Utils/Call";
import getRecomendation from "../Utils/getRecomendation";
import { Link, useParams } from "react-router-dom";
import Services from "../Utils/Services";

function Details() {
  const OMDB_API_KEY = "135eb90e";

const [just, setjust] = useState(null) 
  const obj = useParams();
  // console.log(obj.id);
  const [details, setDetails] = useState(null);
  const [trending, setTrending] = useState([]);
  const logo = {
    "Internet Movie Database":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJo5QuobkY5ZRWBQomjkOSdZtnnjFLJV9ED_Dn9YmeCRbtTTkAHs-V0cQ7P4vcLpkJo8&usqp=CAUhttps://www.google.com/imgres?q=svg%20imdb%20logo&imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F467-4679588_the-television-academy-today-announced-its-comprehensive-imdb.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FhixJJwo_the-television-academy-today-announced-its-comprehensive-imdb%2F&docid=KQEM1E0S-0qSjM&tbnid=lyz9wfBZuOAjVM&vet=12ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA..i&w=840&h=471&hcb=2&ved=2ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA",
    "Rotten Tomatoes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XuZfGqSZU_gICB3C_q08qd0KRdNQS5uT7w&s",
    Metacritic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJA2TAq3LHArRqd8LCQsRgnZdJOF-Y9Y9kw&s",
  };
  // const OMDB_API_KEY ="95e6ba64";
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
      );
      return response;
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(res)
  const data = async () => {
    var res = await OmdbCall(obj.id);
    if (res) {
      setDetails(res.data);
      console.log(res.data);
      const type = res.Type === 'movie'?'shows':'movies';
      const id= res.imdbID;

      var pop = await Call.get(`/${type}/${id}/related`);
      console.log(pop);
      const f = await Promise.all(
        pop.data.map(async (item) => {
          return await OmdbCall(item.ids.imdb);
        })
      );
      const ava= await Services.get(`${obj.id}`);
      setjust(ava.data);
      console.log(ava.data);
      console.log(f);
      setTrending(f);
    }
  };
  useEffect(() => {
    data();
  }, [obj]);
  return (
    details && (
      <div className="min-h-screen overflow-x-hidden relative bg-[#181818] w-screen text-[#F1F1F1] p-8 pt-4">
        <div className="trailer-box w-full h-96 bg-slate-300 ">
        {just&&(  <img className=" w-full h-full object-center" src={`${just.imageSet.horizontalPoster.w1080}`} alt="a" />)}
        </div>

        <img
          src={`${details.Poster}`}
          className="h-[60vh] left-24 mb-20 top-80 w-[22vw] absolute"
          alt="a"
        />
        <div className="detail-box absolute right-[30%] w-[40vw] text-wrap">
          <h1 className="font-semibold text-[3vw]">{details.Title}</h1>
          <div className="flex items-center gap-6 mt-5">
            {details.Ratings.map((item, key) => {
              return (
                <h1 className="flex gap-3" key={key}>
                  {item.Source}
                  <img className="h-5 w-7" src={`${logo[item.Source]}`} />:
                  {item.Value}
                </h1>
              );
            })}
          </div>
          <div className="flex gap-6 mt-5 mb-5">
            <h1>Year:{details.Year}</h1> <h1>Rating:{details.Rated}</h1>{" "}
            <h1>Run-time:{details.Runtime}</h1>
            <h1>Release-Date:{details.Released}</h1>
          </div>
          <div className="flex absolute">
            <p>{details.Plot}</p>
          </div>
        </div>
        <div className="absolute bottom-[-25%] p-8 w-[98%] mt-8 h-fit flex items-center  justify-between">

          {just ?
          (just.cast.map((item, k) => {
            return (
              <div key={k} className="image overflow-x-autow-full ">
                <img
                  className="h-[18vh] bg-slate-400 rounded-lg w-[10vw]"
                  src="/example.com/item"
                  alt={`${item}`}
                />
                <h1>{item}</h1>
              </div>
            );
          })):(details.Actors.split(',').map((item, k) => {
            return (
              <div key={k} className="image overflow-x-autow-full ">
                <img
                  className="h-[18vh] bg-slate-400 rounded-lg w-[10vw]"
                  src="/example.com/item"
                  alt={`${item}`}
                />
                <h1>{item}</h1>
              </div>
            );
          }))}
        </div>
        <div className="w-[96%] border-t-2 border-[#FF4500]  absolute bottom-[-35%]">
          <h1 className="font-semibold  text-[1.9vw] ">
            Awards & Nominations: {details.Awards}
          </h1>
        </div>
        <div className="w-[96%] mt-3 border-t-2 border-[#FF4500] flex items-center gap-8  absolute bottom-[-46%]">
          <h1 className="font-semibold  text-[1.9vw] ">
            Available On:
          </h1>
           {just && just.streamingOptions.length>0 &&
           just.streamingOptions.in.map((item , k)=>{
              return(
                
                  <Link to={item.link} key={k} className="bg-[#FF4500] mx-5 my-2 px-4 flex items-center gap-8 ">
                  <img className="h-20 w-28" src={`${item.service.imageSet.whiteImage}`} /></Link>
             
              )
           })

           }
        
        </div>
        <div className="w-[96%]   border-t-2 border-[#FF4500] absolute bottom-[-61%]">
          <h1 className="font-semibold  text-[1.2vw] ">
            Created By: {details.Director}
          </h1>
          <h1 className="font-semibold  text-[1.2vw] ">
            Written By: {details.Writer}
          </h1>
          <h1 className="font-semibold  text-[1.2vw] ">
            Languages:{details.Language}{" "}
          </h1>
          <h1 className="font-semibold  text-[1.2vw] ">
            Country: {details.Country}
          </h1>
        </div>
        <div className="w-[96%] border-t-2 border-[#FF4500] absolute bottom-[-63%]">
          <div className=" overflow-x-auto absolute w-full">
            <h1 className="font-semibold  text-[1.9vw] ">Recomended</h1>
            <div className="bg-transparent p-3  h-[50vh] flex gap-4 flex-nowrap w-max items-center">
              {trending.map((item, index) => {
                return (
                  <Link key={index}  to={`/details/${item.data.imdbID}`} >
                  <div >
                    <img
                      className="h-80 w-60"
                      src={`${item.data.Poster}`}
                    ></img>
                    <h1 className="text-center"> {item.data.Title}</h1>
                  </div></Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Details;
