import axios from "axios";
import React, { useEffect, useState } from "react";
import ImdbMovies from "../Utils/ImdbMovies";
import TopNav from "../Partials/TopNav";
import { Link, useNavigate } from "react-router-dom";
import Call from "../Utils/Call";
import Toprated from "../Utils/Toprated";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Partials/Card";
// import { createRequire } from 'module'

function Show() {
  const [final, setFinal] = useState([]);
  const [type, setType] = useState("trending");
   const OMDB_API_KEY ="95e6ba64";
  const [page, setPage] = useState(1);
  const n = useNavigate();
  // const OMDB_API_KEY = "135eb90e";
  // var type = "upcoming";
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
      );
      if(response != null) {
      return response.data;
    } }catch (e) {
      console.error(e);
    }
  };
  const movies = async () => {
    if (type === "Top-100") {
      const res = await Toprated.get('series/'); // toprated
      var f = await Promise.all(
        res.data.map(async (response) => {
          var b = await OmdbCall(response.imdbid);
          // console.log(b); // Log each movie detail (optional)
          return b;
        })
      );
      // console.log(f);
      setFinal((p) => [...p, ...f]);
    } else if (type === "upcoming") {
      var f = [];
      const response1 = await Call.get("/shows/anticipated", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      }); //upcoming
      // console.log(response1);
      f = await Promise.all(
        response1.data.map(async (info) => {
          const res = await OmdbCall(info.show.ids.imdb);
          return res;
        })
      );
      const res2=f.filter(Boolean);
      // console.log(f);
      // console.log(res2);
      setFinal((p) => [...p, ...res2]);
    } else if (type === "trending") {
      var f = [];
      const response2 = await Call.get("/shows/trending", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      });
      // console.log(response2);
      f = await Promise.all(
        response2.data.map(async (info) => {
          const res = await OmdbCall(info.show.ids.imdb);
          return res;
        })
      );
      const res2=f.filter(Boolean);
      // console.log(f);
      // console.log(res2);
      setFinal((p) => [...p, ...res2]);
    } else if (type === "popular") {
      var f = [];
      const response = await Call.get("/shows/popular", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      });
      // console.log(response);
      f = await Promise.all(
        response.data.map(async (info) => {
          const res = await OmdbCall(info.ids.imdb);
          return res;
        })
      );
      const res2=f.filter(Boolean);
      // console.log(f);
      // console.log(res2);
      setFinal((p) => [...p, ...res2]);
      //    const response1 = await Call.get('/movies/popular');//popular
    }

    // console.log("upcoming",response1);
    // const res= await Toprated.get();        // toprated
    // console.log(response1);
  };
  useEffect(() => {
    movies(); // Call the function on component mount
  }, [page,type]);
  useEffect(() => {
      setFinal([]);
    setPage(1);
    // movies();
  }, [type]);
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => n(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Shows</h1>
        </div>
        <TopNav />
      </div>
      <button className="flex items-center rounded-2xl">
        <i
          className={`ri-filter-2-fill rounded-xl flex bg-[#FF4500] pl-3 pr-3 text-[1.8rem]`}
        >
          <h1 className="bg-[#FF4500] capitalize pl-3 pr-3">{type}</h1>
        </i>
        {["Top-100", "trending", "popular", "upcoming"].map((a, i) => (
          <h1
            key={i}
            onClick={() => setType(a)}
            className="rounded-xl pt-1 pb-1 capitalize text-[1.6rem] bg-[#FF4500] pl-3 pr-3 ml-2"
          >
            {a}
          </h1>
        ))}
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
      <button  onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' })}} className="bg-[#FF4500] px-3 py-1 absolute right-8 rounded-full bottom-16">
      <i className="ri-arrow-up-fill h-20 w-20 "></i>
      </button>
    </div>
  );
}

export default Show;
