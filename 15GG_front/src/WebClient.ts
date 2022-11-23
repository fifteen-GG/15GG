import axios, { AxiosInstance } from 'axios';

const webClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GG_API_ROOT,
  headers: {
    'Access-Control-Allow-Private-Network': true,
  },
});

export default webClient;
