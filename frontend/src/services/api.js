import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ----------------------------------------------------------
// Attach JWT token to every API request
// ----------------------------------------------------------

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------
// Handle expired / invalid JWT
// ----------------------------------------------------------

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;