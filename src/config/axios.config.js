import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

api.interceptors.response.use(undefined, (err) => {
  return Promise.reject(err.response.data);
});
