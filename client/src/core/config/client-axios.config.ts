import axios from 'axios';

export const clientAxiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api',
});
