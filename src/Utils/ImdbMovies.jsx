import axios from 'axios';

const ImdbMovies =axios.create( {
  baseURL: 'https://imdb188.p.rapidapi.com/api/v1/',
  params: {country: 'US'},
  headers: {
    'x-rapidapi-key': 'daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e',
    'x-rapidapi-host': 'imdb188.p.rapidapi.com'
}
})
export default  ImdbMovies; 