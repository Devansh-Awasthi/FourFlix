import React  from "react";
// import Call from "../Utils/Call";
// import axios from "axios";
import { Link } from "react-router-dom";
// import { data } from "autoprefixer";
function Hcards({trending,setFilter,button,setButton}) {


  return (
    <div className="text-[#F1F1F1] h-[70vh] w-full overflow-hidden bg-[#181818] ">
      <div className="flex mt-11 h-[4vh] w-[95%] items-center justify-between">
        <h1 className="text-[#F1F1F1] text-[4rem] font-bold">Trending</h1>
        <button
          onClick={() => setButton(!button)}
          className="flex items-center  rounded-2xl"
        >
          <i className="ri-filter-2-fill rounded-xl  bg-[#FF4500] pl-3 pr-3 text-[1.8rem]"></i>

          {button &&
            ["movies", "shows", "all"].map((a, i) => {
              return (
                <h1
                  key={i}
                  onClick={()=> setFilter(a)}
                  className=" rounded-xl pt-1 pb-1 text-[1.6rem] bg-[#FF4500] pl-3 pr-3 border-x-[1px] ml-2"
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
                <Link to={`/details/${item.imdbID}`}
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
                      <Link to={`/details/${item.imdbID}`} className="text-[#FF8C00]">...Read more</Link>
                    </p>
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Hcards;
