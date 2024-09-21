import React, { useEffect, useState } from 'react'
import LeftNav from '../Partials/LeftNav'
// import RestHome from '../Partials/RestHome'
import TopNav from '../Partials/TopNav'
import Header from '../Partials/Header'
import Hcards from '../Partials/Hcards'
import Call from '../Utils/Call'
import axios from 'axios'
function Home() {
    document.title='Movie App|Home'
  const k = "95e6ba64";
  const [trending, setTrending] = useState([]);
  var [button, setButton] = useState(false);
  var [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchTrending = async () => {
      var traktMovie;
      var traktShow;
      try {
        if (filter === "all") {
          traktMovie = await Call.get("/movies/trending");

          //   , {
          //   params: { limit: 20, page: 1 },
          // });
          traktShow = await Call.get("/shows/trending");
        } else if (filter === "movies") {
          traktMovie = await Call.get(
            "/movies/trending",

            {
              params: { limit: 20, page: 1 },
            }
          );
          traktShow = [];
        } else if (filter === "shows") {
          traktShow = await Call.get(
            "/shows/trending",

            {
              params: { limit: 20, page: 1 },
            }
          );
          traktMovie = [];
        }
        var final = [...traktMovie.data||[], ...traktShow.data||[]];
        console.log(traktMovie.data);
        console.log(traktShow.data);

        var b = await Promise.all(
          final.map(async (i) => {
            try {
              if (i.movie && i.movie.ids && i.movie.ids.imdb) {
                const omdbMovie = await axios.get(
                  `http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${k}`
                );
                return omdbMovie.data;
              } else {
                const omdbShow = await axios.get(
                  `http://www.omdbapi.com/?i=${i.show.ids.imdb}&apikey=${k}`
                );
                return omdbShow.data;
              }
            } catch (e) {
              console.error(e);
              return null;
            }
          })
        );

        setTrending(b.filter((movie) => movie !== null));
        console.log(b);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrending();
  }, [filter]);




  return (
    <div className='flex min-h-screen bg-[#181818] w-full'>
      <LeftNav></LeftNav>
      <div className='w-[80%] h-fit flex flex-col'>
       
      <TopNav></TopNav>
      <Header></Header>
      <Hcards  trending={trending}
          setTrending={setTrending}
          filter={filter}
          setFilter={setFilter}
          button={button}
          setButton={setButton}></Hcards>
      </div>
    </div>
  )
}

export default Home