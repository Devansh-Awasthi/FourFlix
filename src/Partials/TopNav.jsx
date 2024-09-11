import React, { useState } from "react";
import { Link } from "react-router-dom";

function TopNav() {
    var [In,SetIn]=useState("");
    const movieNames = [
  "Inception", "The Matrix", "Interstellar", "The Godfather", "The Dark Knight",
  "Pulp Fiction", "Fight Club", "Forrest Gump", "Gladiator", "The Shawshank Redemption",
  "The Lord of the Rings: The Fellowship of the Ring", "The Lord of the Rings: The Two Towers",
  "The Lord of the Rings: The Return of the King", "Star Wars: A New Hope", "Star Wars: The Empire Strikes Back",
  "Star Wars: Return of the Jedi", "Avengers: Endgame", "Avengers: Infinity War", "Iron Man", "Captain America: The Winter Soldier",
  "Guardians of the Galaxy", "Spider-Man: Into the Spider-Verse", "Jurassic Park", "The Lion King", "Toy Story",
  "Finding Nemo", "Coco", "Monsters, Inc.", "The Incredibles", "Ratatouille",
  "The Departed", "Shutter Island", "The Prestige", "Django Unchained", "Inglourious Basterds",
  "Titanic", "Braveheart", "Schindler's List", "A Beautiful Mind", "Whiplash",
  "Mad Max: Fury Road", "John Wick", "The Social Network", "The Wolf of Wall Street", "La La Land",
  "Harry Potter and the Sorcerer's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban",
  "Pirates of the Caribbean: The Curse of the Black Pearl", "The Terminator", "Terminator 2: Judgment Day"
];
  return (
    <div className="w-[70%] h-[15%] p-5 relative flex items-center justify-center">
      <input
        className="w-[80%] h-[3rem] bg-transparent text-[#F1F1F1] rounded-lg border-[#F1F1F1] border-[1px] p-4"
        onChange={(e)=>SetIn(e.target.value)}
        type="text"
        placeholder="Search Movies, TV Shows, or People"
      ></input>
      <i className="ri-search-2-line text-[2rem] ml-5  flex items-center justify-center h-[3.5rem] w-[3.5rem] rounded-full bg-[#FF4500] text-[#F1F1F1] "></i>
     <div className="absolute max-h-96 w-[77%] top-[5.8rem] left-28 bg-slate-500">
      {movieNames.filter((movie)=>
        movie.toLowerCase().includes(In.toLowerCase())
      ).map((movie,index)=>{
        return(
          <Link key={index}>
            <div>{movie}</div></Link>
        )
      })}
      
      
      </div> 
    </div>
  );
}

export default TopNav;
