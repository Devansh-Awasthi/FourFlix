import axios from "axios";
import React, { useEffect, useState } from "react";
import ImdbMovies from "../Utils/ImdbMovies";
import TopNav from "../Partials/TopNav";
import { useNavigate } from "react-router-dom";
import Call from "../Utils/Call";
import Toprated from "../Utils/Toprated";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Partials/Card";
// import { createRequire } from 'module'

function Movies() {
  const [final, setFinal] = useState([]);
  const [type, setType] = useState("trending");
  //  const OMDB_API_KEY ="95e6ba64";
  const [page, setPage] = useState(1);
  const n = useNavigate();
  const OMDB_API_KEY = "135eb90e";
  // var type = "upcoming";
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
  const movies = async () => {
    if (type === "Top-100") {
      const res = await Toprated.get(); // toprated
      var f = await Promise.all(
        res.data.map(async (response) => {
          var b = await OmdbCall(response.imdbid);
          // console.log(b); // Log each movie detail (optional)
          return b;
        })
      );
      console.log(f);
      setFinal((p) => [...p, ...f]);
    } else if (type === "upcoming") {
      var f = [];
      const response1 = await Call.get("/movies/anticipated", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      }); //upcoming
      console.log(response1);
      f = await Promise.all(
        response1.data.map(async (info) => {
          const res = await OmdbCall(info.movie.ids.imdb);
          return res;
        })
      );
      console.log(f);
      setFinal((p) => [...p, ...f]);
    } else if (type === "trending") {
      var f = [];
      const response2 = await Call.get("/movies/trending", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      });
      console.log(response2);
      f = await Promise.all(
        response2.data.map(async (info) => {
          const res = await OmdbCall(info.movie.ids.imdb);
          return res;
        })
      );
      // console.log(f);
      console.log(f);
      setFinal((p) => [...p, ...f]);
    } else if (type === "popular") {
      var f = [];
      const response = await Call.get("/movies/popular", {
        params: { limit: 20, page: page }, // upcoming
        // params: { limit: 20 }, // upcoming
      });
      console.log(response);
      f = await Promise.all(
        response.data.map(async (info) => {
          const res = await OmdbCall(info.ids.imdb);
          return res;
        })
      );
      console.log(f);
      setFinal((p) => [...p, ...f]);
      //    const response1 = await Call.get('/movies/popular');//popular
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
          <h1 className="text-[2.4rem] font-semibold">Movies</h1>
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
          {final.map((item, i) => (
            <Card data={item} key={i} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Movies;
