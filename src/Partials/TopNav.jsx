import React from "react";

function TopNav() {
  return (
    <div className="w-[70%] h-[15%] p-5 flex items-center justify-center">
      <input
        className="w-[80%] h-[3rem] bg-transparent text-[#F1F1F1] border-1 border-[#F1F1F1] p-4"
        type="text"
        placeholder="Search Movies, TV Shows, or People"
      ></input>
      <i className="ri-search-2-line text-[2rem] ml-5  flex items-center justify-center h-16 w-16 rounded-full bg-[#FF4500] text-[#F1F1F1] "></i>
    </div>
  );
}

export default TopNav;
