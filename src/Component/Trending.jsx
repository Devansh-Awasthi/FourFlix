import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Filter from "../Partials/Filter";
import Call from "../Utils/Call";
import axios from "axios";
function Trending() {
  const [type, setType] = useState("type"); // Set initial type to 'type' or 'time' as needed
  const [button, setButton] = useState(false);
  const [filter1, setFilter1] = useState("all");
  var [data, setData] = useState([]);
  const ke = "95e6ba64";
  // const [filter2, setFilter2] = useState("day");
  const n = useNavigate();
  var a, w;
  //function to call trakt for trending
  const fetchtrending = async () => {
    try {
      if (filter1 === "movies") {
        var k;
        a = await Call.get("/movies/trending", {
          params: { limit: 20, page: 1 },
        });
        console.log(a);
        k = a.data;
      } else if (filter1 === "all") {
        a = await Call.get("/movies/trending");
        // console.log(a);
        w = await Call.get("/shows/trending");
        // console.log(w);
        k = [...a.data, ...w.data];
        console.log(k);
      } else if (filter1 === "shows") {
        a = await Call.get("/shows/trending", {
          params: { limit: 20, page: 1 },
        });
        k = a.data;
        console.log(k);
      }
      setData(
        await Promise.all(
          k.map(async (i) => {
            if (i.movie) {
              try{
              return await axios.get(
 `http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${ke}`
              );}
              catch(e){
                console.error(e);
                return null;
              }
            } else if (i.show) {
              return await axios.get(
                `http://www.omdbapi.com/?i=${i.show.ids.imdb}&apikey=${ke}`
              );
            }
          })
        )
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchtrending();
  }, [filter1]);
  const handleTypeChange = (newType) => {
    setType(newType);
    setButton(false); // Close the button when changing type
  };
  return (
    <div className="min-h-screen w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top  flex items-center gap-6">
          <i
            onClick={() => {
              n(-1);
            }}
            className="ri-arrow-left-line  font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2 "
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Trending</h1>
        </div>
        <TopNav></TopNav>
      </div>
      <div className="flex flex-col gap-6">
        <Filter
          setButton={() => setButton(!button)}
          type={type}
          t={"type"}
          button={type === "type" ? button : false}
          setFilter={setFilter1}
          filter={filter1}
          arr={["movies", "shows", "all"]}
          iag={"ri-movie-1-fill"}
          onClick={() => handleTypeChange("type")}
        ></Filter>
        <div className="flex gap-12 max-h-fit bg-slate-900 w-screen overflow-auto flex-wrap">
        {
          
          data.map((data, i) =>{
            return(
           <div key={i} > <img src={`${data.data.Poster}`} className="h-[60vh] w-[22vw]" alt="a" />
           <h1 className=""></h1>
           </div>
            );
          })
        }</div>
      </div>
    </div>
  );
}

export default Trending;
