import axios from 'axios';

const api = axios.create({
  baseURL: 'https://snap-wave.vercel.app', // Your base URL here
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

export default api;

// request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or get the token from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);