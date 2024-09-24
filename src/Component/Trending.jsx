import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Filter from "../Partials/Filter";
import Call from "../Utils/Call";
import axios from "axios";
import Card from "../Partials/Card";
import InfiniteScroll from "react-infinite-scroll-component"
function Trending() {
  const [type, setType] = useState("type"); // Set initial type to 'type' or 'time' as needed
  const [button, setButton] = useState(false);
  const [filter1, setFilter1] = useState("all");
  var [data, setData] = useState([]);
  var [page, setPage] = useState(1);
  // var [k,setk]=useState([]);
  let k;
  const ke = "95e6ba64";
  // const [filter2, setFilter2] = useState("day");
  const n = useNavigate();
  var a=[], w=[];
  //function to call trakt for trending
  const fetchtrending = async () => {
    try {
      if (filter1 === "movies") {
        
        // setPage(page+1)
      //  var prev=data;
        a = await Call.get("/movies/trending", {
          params: { limit: 20, page: page },
        });
        
        // setk(prev=>[...prev,...a.data])
        
      } else if (filter1 === "all") {
        a = await Call.get("/movies/trending");
        // console.log(a);
        w = await Call.get("/shows/trending");
        console.log(w);
        // k = [...a.data, ...w.data];
        // console.log(k);
      } else if (filter1 === "shows") {
        // setPage(page+1)
        a = await Call.get("/shows/trending", {
          params: { limit: 20, page: page },
        });
        // k = a.data;
        // console.log(k);
      }
      k = [...a.data||[], ...w.data||[]];
      console.log("fffffffffff" +k);
      
      let omdb= await Promise.all(
          k.map(async (i) => {
            if (i.movie) {
              try {
                return await axios.get(
                  `http://www.omdbapi.com/?i=${i.movie.ids.imdb}&apikey=${ke}`
                );
              } catch (e) {
                console.error(e);
                return null;
              }
            } else if (i.show) {
              return await axios.get(
                `http://www.omdbapi.com/?i=${i.show.ids.imdb}&apikey=${ke}`
              );
            }
          })
        )
        setData((prev)=>[...prev,...omdb]);
        setPage((prev)=>prev+1);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setData([]);
    setPage(1);
    fetchtrending();

  }, [filter1]);
  const handleTypeChange = (newType) => {
    setType(newType);
    setButton(false); // Close the button when changing type
  };
  return (
    <div className="min-h-screen overflow-x-hidden  bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top  flex items-center gap-6">
          <i
            onClick={() => {
              n(-1);
            }}
            className="ri-arrow-left-line  font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2 "
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Trending</h1>
        </div>
        <TopNav></TopNav>
      </div>
      <div className="flex flex-col gap-6">
        <Filter
          setButton={() => setButton(!button)}
          type={type}
          t={"type"}
          button={type === "type" ? button : false}
          setFilter={setFilter1}
          filter={filter1}
          arr={["movies", "shows", "all"]}
          iag={"ri-movie-1-fill"}
          onClick={() => handleTypeChange("type")}
        ></Filter>
        
        <InfiniteScroll 
  dataLength={data.length} //This is important field to render the next data
  next={fetchtrending}
  hasMore={true}
  loader={<h4>Loading...</h4>}
  // endMessage={
  //   <p style={{ textAlign: 'center' }}>
  //     <b>Yay! You have seen it all</b>
  //   </p>
  // }
  // // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  // pullDownToRefresh
  // pullDownToRefreshThreshold={50}
  // pullDownToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  // }
  // releaseToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  // }
>
<div className="flex gap-12 max-h-fit  w-screen overflow-auto flex-wrap">
{data.map((data, i) => {
  console.log(data.data);
            return (
            <Card data={data} key={i}></Card>
            );
          })}
          </div>
</InfiniteScroll>
         
        
      </div>
    </div>
  );
}

export default Trending;
