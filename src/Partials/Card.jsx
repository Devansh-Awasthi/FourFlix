import React from 'react'

function Card({data,i}) {
  return (
    
              <div key={i}>
                {" "}
                <img
                  src={`${data.Poster}`}
                  className="h-[60vh] w-[22vw]"
                  alt="a"
                />
                <h1 className="text-center">{data.Title}</h1>
              </div>
  )
}

export default Card