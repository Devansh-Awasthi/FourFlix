import axios from "axios";
const GetCelebs = axios.create({
  baseURL: "https://imdb-top-lists-news.p.rapidapi.com/getPopularCelebs",
  headers: {
    "x-rapidapi-key": "daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e",
    "x-rapidapi-host": "imdb-top-lists-news.p.rapidapi.com",
  },
});
export default GetCelebs;