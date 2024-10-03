import axios from 'axios';

const getRecomendation =axios.create({
  
  baseURL: 'https://watchthis.p.rapidapi.com/api/v1/tv',
//   params: {ids: '95479'},
  headers: {
    'x-rapidapi-key': 'daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e',
    'x-rapidapi-host': 'watchthis.p.rapidapi.com'
  }
});
export default getRecomendation;
