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
          `http://www.omdbapi.com/?s=${In}&apikey=${k}`
        );
        if (y.data.Search) {
          console.log(y.data.Search);
          setv(y.data.Search);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
    startSearch();
  },[In]);
  return (
    <div className="w-[70%] h-[15%] p-5 relative flex items-center justify-center">
      <input
        className="w-[80%] h-[3rem] bg-transparent text-[#F1F1F1] rounded-lg border-[#F1F1F1] border-[1px] p-4"
        onChange={(e) => SetIn(e.target.value)}
        type="text"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Search Movies, TV Shows, or People"
      ></input>
      <i className="ri-search-2-line text-[2rem] ml-5  flex items-center justify-center h-[3.5rem] w-[3.5rem] rounded-full bg-[#FF4500] text-[#F1F1F1] "></i>
      {isActive && In && (
        <div className="absolute max-h-96 w-[77%] overflow-scroll overflow-x-hidden top-[5.8rem] left-28 ">
          {v.map((movie, index) => {
            return (
              <div
                key={index}
                className="flex rounded-lg hover:bg-[#F4A261] gap-3 text-[#F1F1F1] p-6 pl-3"
              >

               <h1> {movie.Title}</h1> 
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TopNav;
