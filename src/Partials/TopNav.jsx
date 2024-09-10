import React, { useState } from "react";

function TopNav() {
    var [In,SetIn]=useState("");
  return (
    <div className="w-[70%] h-[15%] p-5 flex items-center justify-center">
      <input
        className="w-[80%] h-[3rem] bg-transparent text-[#F1F1F1] rounded-lg border-[#F1F1F1] border-[1px] p-4"
        type="text"
        placeholder="Search Movies, TV Shows, or People"
      ></input>
      <i className="ri-search-2-line text-[2rem] ml-5  flex items-center justify-center h-[3.5rem] w-[3.5rem] rounded-full bg-[#FF4500] text-[#F1F1F1] "></i>
      
    </div>
  );
}

export default TopNav;
