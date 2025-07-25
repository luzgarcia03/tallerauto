import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token y permisos en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const permisos = localStorage.getItem('permisos'); // ⬅️ añadimos los permisos

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (permisos) {
      config.headers.permisos = permisos; // ⬅️ los pasamos como string JSON
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
