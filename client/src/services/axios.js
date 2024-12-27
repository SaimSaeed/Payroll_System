import axios from "axios";

// Create a default axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
  withCredentials: true,
});

export default axiosInstance;
