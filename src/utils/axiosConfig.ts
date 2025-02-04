import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://daily-track-server.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect if not already on login page
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem("token");
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const message = error.response?.data?.error || error.message;
    return Promise.reject(message);
  }
);

export default axiosInstance;
