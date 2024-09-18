import React, { useEffect, useState } from "react";
import Call from "../Utils/Call";
import axios from "axios";
function Hcards() {
  const k = "95e6ba64";
    const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        var traktMovie = await Call.get("/movies/trending");
        var traktShow = await Call.get("/shows/trending");
          
        console.log(traktMovie.data);
        console.log(traktShow.data);
        traktMovie.data.map( async(i)=>{
        try
        { const omdbMovie = await axios.get(`http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${k}`)
        } 
        catch(e) {
            console.error(e);
        }
       });
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="text-[#F1F1F1] h-[70vh] bg-[#181818] text-">
      <h1 className="text-[#F1F1F1] text-[4rem] font-bold">Trending</h1>
      <div className="bg-red-400 h-[50vh] flex gap-16 overflow-x-scroll w-full items-center">
        <div className="bg-[#181818]  h-[80%] w-[30vw]"></div>
        <div className=" h-40 w-40"></div>
        <div className="h-40 w-40"></div>
        <div className=" h-40 w-40"></div>
        <div className="bg-slate-300 h-40 w-96"></div>
        <div className="bg-slate-300 h-40 w-40"></div>
        <div className="bg-slate-300 h-40 w-40"></div>
        <div className="bg-slate-300 h-40 w-40"></div>
      </div>
    </div>
  );
}

export default Hcards;
