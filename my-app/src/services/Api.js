import axios from 'axios';

const API_URL = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

API_URL.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default API_URL;


