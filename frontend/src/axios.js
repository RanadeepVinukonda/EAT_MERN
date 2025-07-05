// src/axios.js
import axios from "axios";

const BASE_URL = import.meta.env.NODE_ENV==="development"? "http://localhost:5000/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This allows cookies to be sent with requests
});
export default api;
