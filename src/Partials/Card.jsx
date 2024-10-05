import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ data, i }) {
  const [hover, setHover] = useState(false);
  return (
    data && (
      <Link
        to={{
          pathname: `/details/${data.imdbID}`,
        }}
        key={i}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative">
          <img src={`${data.Poster}`} className="h-[60vh] w-[22vw]" alt="a" />
          <h1 className="text-center font-semibold text-wrap text-lg">
            {data.Title}
          </h1>
          <div className="box top-11 flex absolute flex-col">
            {hover &&
              data.Ratings.map((item, index) => {
                return (
                  <div
                    className="rating bg-[#FF4500] px-3 py-2 w-fit rounded-xl mt-3 text-inherit"
                    key={index}
                    style={{
                      animation: `slideIn 0.5s ease forwards ${index * 0.2}s`,
                      opacity: 0,
                    }}
                  >
                    {item.Source}: {item.Value}
                  </div>
                );
              })}
          </div>
        </div>
      </Link>
    )
  );
}

export default Card;
