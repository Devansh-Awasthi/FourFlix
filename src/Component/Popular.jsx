import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Call from "../Utils/Call";
import axios from "axios";
import Card from "../Partials/Card";
import InfiniteScroll from "react-infinite-scroll-component";
// import Filter from "../Partials/Filter";

function Popular() {
  
  const [final, setFinal] = useState([]);
  const [type, setType] = useState("movies");
  //  const OMDB_API_KEY ="95e6ba64";
  document.title = `Movie App|Popular|${type}`; 
  const [page, setPage] = useState(1);
  const n = useNavigate();
  const OMDB_API_KEY = "135eb90e";
  // var type = "upcoming";
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
      );
      if(response != null) {
      return response.data;
    } }catch (e) {
      console.error(e);
    }
  };
  const movies = async () => {
    if (type === "movies") {
      var f = [];
      const response1 = await Call.get("/movies/popular", {
        params: { limit: 20, page: page },
      }); //upcoming
      console.log(response1);
      f = await Promise.all(
        response1.data.map(async (info) => {
          const res = await OmdbCall(info.ids.imdb);
          return res;
        })
      );
      const res2=f.filter(Boolean);
      // console.log(f);
      console.log(res2);
      setFinal((p) => [...p, ...res2]);
    } else  {
      var f = [];
      const response2 = await Call.get("/shows/trending", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      });
      console.log(response2);
      f = await Promise.all(
        response2.data.map(async (info) => {
          const res = await OmdbCall(info.show.ids.imdb);
          return res;
        })
      );
      const res2=f.filter(Boolean);
      // console.log(f);
      console.log(res2);
      setFinal((p) => [...p, ...res2]);
    } 

    // console.log("upcoming",response1);
    // const res= await Toprated.get();        // toprated
    // console.log(response1);
  };
  useEffect(() => {
    movies(); // Call the function on component mount
  }, [page]);
  useEffect(() => {
    setFinal([]);
    setPage(1);
    movies();
  }, [type]);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => n(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Popular</h1>
        </div>
        <TopNav />
      </div>
      <button
      className="flex items-center rounded-2xl"
    >
      <i className={`ri-filter-2-fill rounded-xl flex bg-[#FF4500] pl-3 pr-3 text-[1.8rem]`}>
        <h1 className="bg-[#FF4500] capitalize pl-3 pr-3">{type}</h1>
      </i>
      {
        ['movies','shows'].map((a, i) => (
          <h1
            key={i}
            onClick={() => setType(a)}
            className="rounded-xl pt-1 pb-1 capitalize text-[1.6rem] bg-[#FF4500] pl-3 pr-3 ml-2"
          >
            {a}
          </h1>
        ))
      }
    </button>
      <InfiniteScroll
        dataLength={final.length}
        hasMore={true}
        next={() => setPage((page) => page + 1)}
      >
        <div className="flex gap-12 mt-7 max-h-fit w-screen overflow-auto flex-wrap">
          {final.map((item, i) => {
            // console.log(`Selected show ID:${item.imdbID}`);
            return(        
           <Card data={item} key={i} />
          )})}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Popular;
