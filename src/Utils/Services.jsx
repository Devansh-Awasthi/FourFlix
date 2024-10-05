import axios from 'axios';

const Services = axios.create({
  baseURL: 'https://streaming-availability.p.rapidapi.com/shows/',
  params: {
    series_granularity: 'episode',
    output_language: 'en',
    country: 'in'
  },
  headers: {
    'x-rapidapi-key': 'daff7f1ae5mshaa155904a27d941p1581ccjsnac5ad57f648e',
    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
  }
});

export default Services;