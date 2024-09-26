import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../Partials/TopNav";
import Filter from "../Partials/Filter";
import Call from "../Utils/Call";
import axios from "axios";
import Card from "../Partials/Card";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  const [type, setType] = useState("type"); // Set initial type to 'type' or 'time' as needed
  const [button, setButton] = useState(false);
  const [filter1, setFilter1] = useState("movies");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Tracks if there is more data to fetch
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const OMDB_API_KEY = "95e6ba64"; // OMDB API Key (move this to .env in production)

  // Fetch trending data
  const fetchTrending = async () => {
    try {
      setLoading(true);
      let moviesData = [];
      let showsData = [];

      if (filter1 === "movies" || filter1 === "all") {
        const movieResponse = await Call.get("/movies/trending", {
          params: { limit: 20, page: page }, // Fetch movies for the current page
        });
        moviesData = movieResponse.data || [];
      }

      if (filter1 === "shows" || filter1 === "all") {
        const showResponse = await Call.get("/shows/trending", {
          params: { limit: 20, page: page }, // Fetch shows for the current page
        });
        showsData = showResponse.data || [];
      }

      const combinedData = [...moviesData, ...showsData];

      if (combinedData.length === 0) {
        // No more data to fetch
        setHasMore(false);
        return;
      }

      // Fetch additional details from OMDB for each movie/show
      const omdbResults = await Promise.all(
        combinedData.map(async (item) => {
          const imdbId = item.movie ? item.movie.ids.imdb : item.show.ids.imdb;
          try {
            const response = await axios.get(
              `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
            );
            return response.data; // OMDB returns data directly
          } catch (error) {
            console.error(`Error fetching OMDB data for ID ${imdbId}:`, error);
            return null;
          }
        })
      );

      // Filter out null values (in case any OMDB requests failed)
      const validOmdbResults = omdbResults.filter((item) => item !== null);

      // Append new data to the existing state without duplicates
      // setData((prevData) => [...prevData, ...validOmdbResults]);
      setData((prevData) => {
        const combined = [...prevData, ...validOmdbResults];

        // Remove duplicates by imdbID
        const uniqueData = combined.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.imdbID === item.imdbID)
        );

        return uniqueData;
      });

      // Increment page after the data has been fetched successfully
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const refresh = async () => {
    await setData([]);
    fetchTrending();
  };
  
  useEffect(() => {
  
    setPage(1);
    refresh(); 
    setHasMore(true);
  }, [filter1]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setButton(false); // Close the button when changing type
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#181818] w-screen text-[#F1F1F1] pl-8 pt-4">
      <div className="top w-screen flex items-center gap-16">
        <div className="top flex items-center gap-6">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line font-semibold text-[2rem] bg-[#FF4500] rounded-full px-2"
          ></i>
          <h1 className="text-[2.4rem] font-semibold">Trending</h1>
        </div>
        <TopNav />
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
        />
        {loading && <h4>Loading...</h4>} {/* Loading indicator */}
        {/* Error message */}
        {!loading && data.length === 0 && (
          <h4>No trending data available</h4> // Display when no data is available
        )}
        <InfiniteScroll
          dataLength={data.length}
          next={fetchTrending}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="flex gap-12 max-h-fit w-screen overflow-auto flex-wrap">
            {data.map((item, i) => (
              <Card data={item} key={i} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Trending;
