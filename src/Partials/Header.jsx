import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Header() {
  const k = "95e6ba64";
  var [v, setv] = useState([]);
  var [index, setindex] = useState(1);
  var [isHover, setHover] = useState(true);
  var a;

  const clientId =
    "e05d08fa373e1192315a37425be3a6d41c146336b973e4820c11fdb1b96b1f53";

  const fetchPopularMovies = async () => {
    var imdbIds;
    try {
      const response = await axios.get("https://api.trakt.tv/movies/trending", {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": clientId,
        },
      });
      // console.log(response.data);
      imdbIds = response.data.map((a) => a.movie.ids.imdb);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }

    // console.log(imdbIds);
    if (imdbIds) {
      a = imdbIds.map(async (element) => {
        try {
          const y = await axios.get(
            `http://www.omdbapi.com/?i=${element}&apikey=${k}`
          );
          if (y.data) {
            console.log(y.data);
            return y.data;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
    setv(await Promise.all(a));
  };
  useEffect(() => {
    fetchPopularMovies();
  }, []);
  // // useEffect(()=>{

  // useEffect(()=>{
  //   let p = setInterval(() => {
  //     setindex(index + 1%v.length);
  //   }, 5000);
  //   return () => clearInterval(p);
  // },[index,v])
  //   const getCircularIndex = (index) => {
  //     return (index + v.length) % v.length;
  //   };
  useEffect(() => {
    if (v.length > 0) {
      // Only set interval if movies have been loaded
      const interval = setInterval(() => {
        setindex((prevIndex) => (prevIndex + 1) % v.length);
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [v]);
  //     return () => clearInterval(p);
  // // },[v]);
  const getCircularIndex = (index) => {
    return (index + v.length) % v.length;
  };
  return (
    <div className="relative h-[100%] w-[100%] flex justify-center items-center">
      {/* Gradient overlay */}
      <div
        className="absolute rounded-xl top-[4.9rem] left-0 h-[81%] w-[92%]"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1), transparent, rgba(0, 0, 0, 1))",
          zIndex: 1, // Ensures the gradient is on top of the images
        }}
      ></div>
      {v.length > 0 && (
        <>
          <img
            className="mt-16 h-[65%] w-[60vw] size-fit rounded-xl"
            src={`${v[getCircularIndex(index - 1)].Poster}`}
          ></img>

          <Link onMouseLeave={()=>{setHover(!isHover)}} onMouseEnter={()=>{setHover(!isHover)}} className="h-[80%] relative m-3 w-[80vw] overflow-hidden cursor-pointer z-[3]">
            <img
              className="h-[35vw] w-full size-fit rounded-xl"
              src={`${v[index].Poster}`}
            ></img>
            <div>
            <button className="absolute  bg-[#FF4500] bottom-10 rounded-xl px-3  text-[1.5rem] font-semibold text-white">
              {v[index].Title}
            </button>
           <h1 className="absolute top-6 ">
            {isHover &&
              v[index].Genre &&
              v[index].Genre.split(',').map((genre, idx) => (
                <span key={idx} className="mr-4 duration-100 px-3 rounded-xl  bg-[#FF4500] text-[#F1F1F1] text-xl font-semibold"
                style={{
                  animation: `slideIn 0.2s ease ${idx* 0.3 + v[index].Genre.split(',').length * 0.3}s forwards`,
                  opacity: 0
                }}>
                  {genre}
                </span>
              ))
            }
            </h1>
            <h1 className="absolute top-20 ">
            {isHover &&
              v[index].Ratings &&
              v[index].Ratings.map((rating, idx) => (
                <div key={idx} className="mr-4 mb-4 duration-100 w-fit px-3 rounded-xl  bg-[#FF4500] text-[#F1F1F1] text-xl font-semibold"
                style={{
                  animation: `slideIn 0.2s ease ${idx* 0.3 + v[index].Genre.split(',').length * 0.3}s forwards`,
                  opacity: 0
                }}>
                  {rating.Source}:{rating.Value}
                </div>
              ))
            }
            </h1>
            </div>
          </Link>
          <img
            className="mt-12 pr-32 h-[60%] w-[60vw] size-fit rounded-xl"
            src={`${v[getCircularIndex(index + 1)].Poster}`}
          ></img>
        </>
      )}
    </div>
  );
}

export default Header;
