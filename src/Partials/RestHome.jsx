
  // Fetch trending data
  const fetchTrending = async () => {
    try {
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
      setData((prevData) => [...prevData, ...validOmdbResults]);

      // Increment page after the data has been fetched successfully
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };