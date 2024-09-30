import axios from "axios";

const Toprated = axios.create({
  
    baseURL: 'https://imdb-top-100-movies.p.rapidapi.com/',
    headers: {
      'x-rapidapi-key': 'daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
})
export default Toprated;