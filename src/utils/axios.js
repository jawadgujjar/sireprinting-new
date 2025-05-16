import axios from "axios";

// Fallback base URL if environment variable is undefined
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/v1"; // <-- change this to your local API base if needed

// Create instances with consistent base URLs
const users = axios.create({
  baseURL: `${baseURL}/auth`,
});
const getquote = axios.create({
  baseURL: `${baseURL}/getquote`,
});
// Request Interceptor
const requestInterceptor = (req) => {
  // Optional: Add auth tokens if needed
  // req.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return req;
};

const errorInterceptor = (err) => {
  console.error("Request failed:", err);
  return Promise.reject(err);
};

// Apply interceptors
[users, getquote].forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
});

export { users, getquote };
