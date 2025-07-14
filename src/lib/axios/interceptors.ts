import axiosInstance from './config';

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data, // Directly return the data
  (error) => {
    // Handle errors
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;