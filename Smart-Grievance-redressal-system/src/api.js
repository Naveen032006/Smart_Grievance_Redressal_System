import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Your backend's base URL
});

// This is the interceptor that automatically adds the token
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Add the 'Authorization: Bearer <token>' header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;