import axios from "axios";

// Fallback base URL if environment variable is undefined
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; // <-- change this to your local API base if needed

// Create instances with consistent base URLs
const sireperks = axios.create({
  baseURL: `${baseURL}/sireperks`,
});
const products = axios.create({
  baseURL: `${baseURL}/products`,
});
const getquote = axios.create({
  baseURL: `${baseURL}/getquote`,
});
const category = axios.create({
  baseURL: `${baseURL}/category`,
});
const portfolio = axios.create({
  baseURL: `${baseURL}/portfolio`,
});
const blogs = axios.create({
  baseURL: `${baseURL}/blogs`,
});
const contactus = axios.create({
  baseURL: `${baseURL}/contactus`,
});
const newsletter = axios.create({
  baseURL: `${baseURL}/newsletter`,
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
[
  sireperks,
  products,
  getquote,
  category,
  portfolio,
  blogs,
  contactus,
  newsletter,
].forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
});

export {
  sireperks,
  products,
  getquote,
  category,
  portfolio,
  blogs,
  contactus,
  newsletter,
};
