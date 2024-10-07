import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Call from "../Utils/Call";
import axios from "axios";

function TopNav() {
  var [In, SetIn] = useState("");
  var [v, setv] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const k = "95e6ba64";

  useEffect(() => {
    const startSearch = async () => {
      if (In) {
        try {
          const y = await axios.get(
            `https://www.omdbapi.com/?s=${In}&apikey=${k}`
          );
          if (y.data.Search) {
            // console.log(y.data.Search);
            setv(y.data.Search);
          }
        } catch (error) {
          // console.log(error);
        }
      }
    };
    startSearch();
  }, [In]);
  return (
    <div className="w-[85%] h-[15%] p-5 relative flex ">
      <input
        className="w-[80%] h-[3rem] bg-transparent text-[#F1F1F1] rounded-lg border-[#F1F1F1] border-[1px] p-4"
        onChange={(e) => SetIn(e.target.value)}
        type="text"
        onFocus={() => setIsActive((prev)=>!prev)}
        // onBlur={() => setIsActive(false)}
        placeholder="Search Movies, TV Shows, or People"
      ></input>
      <i className="ri-search-2-line text-[2rem] ml-5  flex items-center justify-center h-[3.5rem] w-[3.5rem] rounded-full bg-[#FF4500] text-[#F1F1F1]" ></i>
      {isActive && In && (
        <div className="absolute max-h-96 w-[77%] z-50 overflow-scroll overflow-x-hidden top-[5.8rem] left-5 ">
          {v.map((data, index) => {
        //  console.log(data.imdbID);
            return (
              <Link key={index}
              to={`/details/${data.imdbID}`} 
          
              >
              <div
                className="flex rounded-lg bg-[#181818] font-semibold hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-5 pl-3 duration-75"
               
              >
                <img
                  className="h-16 w-16 object-cover"
                  src={data.Poster}
                  alt=""
                ></img>
                <div className="pt-5 flex gap-y-16">
                  <h1> {data.Title}</h1>(<h1>{data.Year}</h1>)
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TopNav;
