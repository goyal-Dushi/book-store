import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

api.interceptors.response.use(_, (err) => {
  console.error(err);
  return Promise.reject(err);
});
