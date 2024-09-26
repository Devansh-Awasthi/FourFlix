import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Call from "../Utils/Call";
import axios from "axios";
import Card from "../Partials/Card";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  document.title = "Movie App|Popular";
  const n = useNavigate();
  const OMDB_API_KEY = "95e6ba64";
  const [final, setFinal] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const popular = async (page) => {
    try {
      const pop = await Call.get("/movies/popular", {
        params: { limit: 20, page: page },
      });
      console.log(pop.data);
      var a = await Promise.all(
        pop.data.map(async (i) => {
          const response = await axios.get(
            `http://www.omdbapi.com/?i=${i.ids.imdb}&apikey=${OMDB_API_KEY}`
          );
          // console.log(response);
          return response.data;
        })
      );
      if (a.length === 0) {
        setHasMore(false); // Stop infinite scroll
        return;
      }
      // console.log(final);
      setPage((prev) => prev + 1);

      console.log(page);
      setFinal((prev) => [...prev, ...a]);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    popular(page);
  }, [page]);
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
      <InfiniteScroll
        dataLength={final.length}
        hasMore={hasMore}
        next={() => popular(page)}
      >
        <div className="flex gap-12 max-h-fit w-screen overflow-auto flex-wrap">
          {final.map((item, i) => (
            <Card data={item} key={i} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Popular;
