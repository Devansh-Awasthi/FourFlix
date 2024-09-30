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
  // const [type,setType]=useState('Toprated');
  //  const OMDB_API_KEY ="95e6ba64";
  const n = useNavigate();
  const OMDB_API_KEY = "135eb90e";
  var type = "popular";
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
    if (type === "Toprated") {
      // const res= await Toprated.get();        // toprated
      var f = await Promise.all(
        res.data.map(async (response) => {
          var b = await OmdbCall(response.imdbid);
          // console.log(b); // Log each movie detail (optional)
          return b;
        })
      );
      setFinal(f);
    } else if (type === "upcoming") {
      var f;
      const response1 = await Call.get("/movies/anticipated"); //upcoming
      console.log(response1);
      f = await Promise.all(
        response1.data.map(async (info) => {
          const res = await OmdbCall(info.movie.ids.imdb);
          return res;
        })
      );
      // console.log(f);
      setFinal(f);
    } else if (type === "trending") {
      var f;
      const response2 = await Call.get("/movies/trending");
      console.log(response2);
      f = await Promise.all(
        response2.data.map(async (info) => {
          const res = await OmdbCall(info.movie.ids.imdb);
          return res;
        })
      );
      console.log(f);
    } else if (type === "popular") {
      var f = [];
      const response = await ImdbMovies.get("getFanFavorites"); //popular /
      f = await Promise.all(
        response.data.data.list.map(async (info) => {
          const res = await OmdbCall(info.id);
          return res;
        })
      );
      console.log(f);
      //    const response1 = await Call.get('/movies/popular');//popular
    }

    // console.log("upcoming",response1);
    // const res= await Toprated.get();        // toprated
    // console.log(response1);
  };
  useEffect(() => {
    movies(); // Call the function on component mount
  });
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
      {/* <InfiniteScroll
        dataLength={final.length}
        hasMore={hasMore}
        next={loadMoreData} 
      >
        <div className="flex gap-12 mt-7 max-h-fit w-screen overflow-auto flex-wrap">
          {final.map((item, i) => (
            <Card data={item} key={i} />
          ))}
        </div>
      </InfiniteScroll> */}
    </div>
  );
}

export default Movies;
