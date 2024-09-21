import React from "react";

function Filter({ setButton, button, type, t, setFilter, filter, iag, arr, onClick }) {
  return (
    <button
      onClick={() => {
        onClick(); // Call the onClick to set the filter type
        setButton(!button); // Toggle button visibility
      }}
      className="flex items-center rounded-2xl"
    >
      <i className={`${iag} rounded-xl flex bg-[#FF4500] pl-3 pr-3 text-[1.8rem]`}>
        <h1 className="bg-[#FF4500] capitalize pl-3 pr-3">{filter}</h1>
      </i>
      {button && 
        arr.map((a, i) => (
          <h1
            key={i}
            onClick={() => setFilter(a)}
            className="rounded-xl pt-1 pb-1 text-[1.6rem] bg-[#FF4500] pl-3 pr-3 border-x-[1px] ml-2"
          >
            {a}
          </h1>
        ))
      }
    </button>
  );
}

export default Filter;
