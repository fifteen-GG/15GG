import axios, { AxiosInstance } from 'axios';

const webClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GG_API_ROOT,
  headers: {
    'Access-Control-Allow-Private-Network': true,
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

export default webClient;
