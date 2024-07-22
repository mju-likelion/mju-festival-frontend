import axios from 'axios';

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
