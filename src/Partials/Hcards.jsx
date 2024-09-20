import React, { useEffect, useState } from "react";
import Call from "../Utils/Call";
import axios from "axios";
import { Link } from "react-router-dom";
// import { data } from "autoprefixer";
function Hcards() {
  const k = "95e6ba64";
  const [trending, setTrending] = useState([]);
  var [button, setButton] = useState(false);
  var [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchTrending = async () => {
      var traktMovie;
      var traktShow;
      try {
        if (filter === "all") {
          traktMovie = await Call.get("/movies/trending");

          //   , {
          //   params: { limit: 20, page: 1 },
          // });
          traktShow = await Call.get("/shows/trending");
        } else if (filter === "movies") {
          traktMovie = await Call.get(
            "/movies/trending",

            {
              params: { limit: 20, page: 1 },
            }
          );
          traktShow = [];
        } else if (filter === "shows") {
          traktShow = await Call.get(
            "/shows/trending",

            {
              params: { limit: 20, page: 1 },
            }
          );
          traktMovie = [];
        }
        var final = [...traktMovie.data||[], ...traktShow.data||[]];
        console.log(traktMovie.data);
        console.log(traktShow.data);

        var b = await Promise.all(
          final.map(async (i) => {
            try {
              if (i.movie && i.movie.ids && i.movie.ids.imdb) {
                const omdbMovie = await axios.get(
                  `http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${k}`
                );
                return omdbMovie.data;
              } else {
                const omdbShow = await axios.get(
                  `http://www.omdbapi.com/?i=${i.show.ids.imdb}&apikey=${k}`
                );
                return omdbShow.data;
              }
            } catch (e) {
              console.error(e);
              return null;
            }
          })
        );

        setTrending(b.filter((movie) => movie !== null));
        console.log(b);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrending();
  }, [filter]);

  return (
    <div className="text-[#F1F1F1] h-[70vh] w-full overflow-hidden bg-[#181818] ">
      <div className="flex mt-11 h-[4vh] w-[95%] items-center justify-between">
        <h1 className="text-[#F1F1F1] text-[4rem] font-bold">Trending</h1>
        <button
          onClick={() => setButton(!button)}
          className="flex items-center bg-[#FF4500] pl-3 pr-3 rounded-2xl"
        >
          <i className="ri-filter-2-fill text-[1.8rem]"></i>
          {button &&
            ["movies", "shows", "all"].map((a, i) => {
              return (
                <h1
                  key={i}
                  onClick={()=> setFilter(a)}
                  className="text-[1.3rem] pl-3 pr-3 border-white border-x-[1px] ml-2"
                >
                  {a}
                </h1>
              );
            })}
        </button>
      </div>
      <div className=" overflow-x-auto w-full">
        <div className="bg-transparent p-3  h-[60vh] flex flex-nowrap w-max items-center">
          {trending.length > 0 &&
            trending.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#181818]  flex-col rounded-xl ml-5 h-[78%] w-[16vw] "
                >
                  <img
                    src={item.Poster}
                    className="h-[70%] rounded-xl w-full object-center "
                  ></img>
                  <h1 className="text-[#F1F1F1] text-[2rem] ml-2 text-nowrap overflow-hidden font-bold">
                    {item.Title}
                  </h1>
                  <span>
                    {" "}
                    <p className="ml-4">
                      {item.Plot.slice(0, 85)}
                      <Link className="text-[#FF8C00]">...Read more</Link>
                    </p>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Hcards;
