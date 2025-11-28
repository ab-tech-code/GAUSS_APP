// src/services/api.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000', // Python backend
  timeout: 10000,
});

// Automatically attach token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gauss_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      // Auto-logout on expired token
      localStorage.removeItem('gauss_token');
      localStorage.removeItem('gauss_vendor');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
