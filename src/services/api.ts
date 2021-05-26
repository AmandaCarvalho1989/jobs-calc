import axios from "axios";

const api = axios.create({
  //baseURL:  "http://localhost:3333",
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3333",
});

export default api;
