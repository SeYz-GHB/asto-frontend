import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Uses your backend URL
  withCredentials: true, // if your backend needs cookies
});

export default api;
