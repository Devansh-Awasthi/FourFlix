import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Call from "../Utils/Call";
import axios from "axios";
import Card from "../Partials/Card";
import InfiniteScroll from "react-infinite-scroll-component";
// import Filter from "../Partials/Filter";

function Popular() {
  document.title = "Movie App|Popular";
  const n = useNavigate();
  const OMDB_API_KEY = "95e6ba64";
  const [final, setFinal] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('movies');
  const [hasMore, setHasMore] = useState(true);var a;

  const popular = async (page) => {
    if(type==='movies') {
    try {
      const pop = await Call.get("/movies/popular", {
        params: { limit: 20, page: page },
      });
       a = await Promise.all(
        pop.data.map(async (i) => {
          const response = await axios.get(
            `http://www.omdbapi.com/?i=${i.ids.imdb}&apikey=${OMDB_API_KEY}`
          );
          console.log(response);
          return response.data;
        })
      );
    } catch (e) {
      console.error(e);
    }}
    else{
      try {
        const pop = await Call.get("/shows/popular", {
          params: { limit: 20, page: page },
        });
        console.log(pop.data);
         a = await Promise.all(
          pop.data.map(async (i) => {
            const response = await axios.get(
              `http://www.omdbapi.com/?i=${i.ids.imdb}&apikey=${OMDB_API_KEY}`
            );
            // console.log(response);
            return response.data;
          })
        );
      }
      catch (e) {
        console.error(e);
      
    }
  }
        if (a.length === 0) {
          setHasMore(false); // Stop infinite scroll if no more results
        } else {
          // let b =a.filter(
          //   (item, index, self) =>
          //     index === self.findIndex((t) => t.imdbID === item.imdbID)
          // );
          
          setFinal((prev) => [...prev, ...a]);
          // console.log(final)
          setPage((prev) => prev + 1); // Increment page for next call
        }
       
  };
  useEffect(() => {
    
    setFinal([]);
    setPage(1)
    popular(1);
    setHasMore(true);
    // setType('movies');
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
        hasMore={hasMore}
        next={() => popular(page)}
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

export default Popular;
