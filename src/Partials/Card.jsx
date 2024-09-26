import React from 'react'
import { Link } from 'react-router-dom'

function Card({data,i}) {
  return (
        <Link>
              <div key={i}>
                
                <img
                  src={`${data.Poster}`}
                  className="h-[60vh] w-[22vw]"
                  alt="a"
                />
                <h1 className="text-center font-semibold text-wrap text-lg">{data.Title}</h1>
              </div></Link>
  )
}

export default Card