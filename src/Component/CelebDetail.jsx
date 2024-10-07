import React, { useEffect, useState } from "react";
import TopNav from "../Partials/TopNav";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CelebDetail() {
    const { state } = useLocation(); // Access the passed state (item)
    const { item } = state || {};
  const OMDB_API_KEY = "95e6ba64";
  const [movieDetails, setMovieDetails] = useState(null);
  const n = useNavigate();
  const logo = {
    "Internet Movie Database":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJo5QuobkY5ZRWBQomjkOSdZtnnjFLJV9ED_Dn9YmeCRbtTTkAHs-V0cQ7P4vcLpkJo8&usqp=CAUhttps://www.google.com/imgres?q=svg%20imdb%20logo&imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F467-4679588_the-television-academy-today-announced-its-comprehensive-imdb.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FhixJJwo_the-television-academy-today-announced-its-comprehensive-imdb%2F&docid=KQEM1E0S-0qSjM&tbnid=lyz9wfBZuOAjVM&vet=12ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA..i&w=840&h=471&hcb=2&ved=2ahUKEwjOpOy_wPGIAxW_SGcHHQmMDeoQM3oECFIQAA",
    "Rotten Tomatoes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XuZfGqSZU_gICB3C_q08qd0KRdNQS5uT7w&s",
    Metacritic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJA2TAq3LHArRqd8LCQsRgnZdJOF-Y9Y9kw&s",
  };
  const celebs =item;
  const OmdbCall = async (id) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
      );
      if (response && response.data) {
        return response.data; // Return the movie data
      } else {
        throw new Error("No data found in the response.");
      }
    } catch (e) {
      console.error(e);
      // setError("Failed to fetch movie details. Please try again later.");
    }
  };
  var res;

  async function featured() {
    // console.log(item);
    res = await OmdbCall(celebs.known_for.id);
    if (res) {
        // console.log(res)
      setMovieDetails(res); // Set the response data in state if successful
    }
  }
  useEffect(() => {
    featured();
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => n(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">{celebs.name}</h1>
        </div>
        <TopNav />
      </div>
      <div className=" h-[60vh] mb-20 w-[96vw] relative flex justi ">
        <h1 className="bg-[#FF4500] rounded-full text-lg absolute top-16 left-16 p-2 px-4">
          {celebs.rank}
        </h1>
        <img
          className="h-full w-[33vw] bg-yellow-400 rounded-full mr-8"
          src={`${celebs.images.large}`}
        />
        <p className="text-lg pt-5 pr-10">
          {celebs.mini_bio}
          <br></br>
          <a href={`${celebs.url}`} className="text-2xl text-[#FF4500]">
            To imdb
          </a>{" "}
        </p>
        <h1 className="bg-[#FF4500] rounded-full text-lg absolute bottom-10 left-96 p-2 px-4">
          {celebs.rank_movement}
        </h1>
      </div>
      <div className="h-[50vh] w-full">
        <h1 className="font-semibold  text-[1.9vw] mb-10">Known for</h1>
        {movieDetails &&   
        <div className="h-[45vh] w-full flex">
          <img
            className="h-full w-[25vw] rounded-full mr-8"
            src={`${movieDetails.Poster}`}
          /> 
          <div className="">
            <Link to={`/details/${movieDetails.imdbID}`} className="text-[1.9vw] hover:text-[#FF4500]">{movieDetails.Title}
            </Link> 
            <h1> Released on:{movieDetails.Released
            }</h1>
            <h1 className="font-semibold">{movieDetails.
Awards
}</h1>
<div className="flex items-center gap-6 mt-5">
            {movieDetails.Ratings.map((item, key) => {
              return (
                <h1 className="flex gap-3" key={key}>
                  {item.Source}
                  <img className="h-5 w-7" src={`${logo[item.Source]}`} />:
                  {item.Value}
                </h1>
              );
            })}
          </div>
          <div className="w-[55vw] mt-5">
            <p>{movieDetails.Plot} </p>
          </div>
          <p></p>
            </div>
            
        </div>
      }      </div>
    </div>
  );
}

export default CelebDetail;
