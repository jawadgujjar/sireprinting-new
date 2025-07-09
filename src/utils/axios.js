import axios from "axios";

// Fallback base URL if environment variable is undefined
const baseURL = process.env.REACT_APP_API_URL;

// Create instances with consistent base URLs
const users = axios.create({
  baseURL: `${baseURL}/auth`,
});
const getquote = axios.create({
  baseURL: `${baseURL}/getquote`,
});
const category = axios.create({
  baseURL: `${baseURL}/category`,
});
const subcategory = axios.create({
  baseURL: `${baseURL}/subcategory`,
});
const product = axios.create({
  baseURL: `${baseURL}/products`,
});
const blog = axios.create({
  baseURL: `${baseURL}/blogs`,
});
const blogauthor = axios.create({
  baseURL: `${baseURL}/blogauthor`,
});
const blogcategory = axios.create({
  baseURL: `${baseURL}/blogcategory`,
});
const navitems = axios.create({
  baseURL: `${baseURL}/navitems`,
});
const faq = axios.create({
  baseURL: `${baseURL}/faq`,
});
const term = axios.create({
  baseURL: `${baseURL}/term`,
});
const privacy = axios.create({
  baseURL: `${baseURL}/privacy`,
});
const aboutus = axios.create({
  baseURL: `${baseURL}/aboutus`,
});
const contactus = axios.create({
  baseURL: `${baseURL}/contactus`,
});
const instantquote = axios.create({
  baseURL: `${baseURL}/instantquote`,
});
const portfolio = axios.create({
  baseURL: `${baseURL}/portfolio`,
});
const dielineform = axios.create({
  baseURL: `${baseURL}/dielineform`,
});
const instagram = axios.create({
  baseURL: `${baseURL}/instagram/feed`,
});
const orders = axios.create({
  baseURL: `${baseURL}/order`,
});
const sampleorder = axios.create({
  baseURL: `${baseURL}/samplerequests`,
});
const updateuser = axios.create({
  baseURL: `${baseURL}/users`,
});
const profileaddress = axios.create({
  baseURL: `${baseURL}/profileaddress`,
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
  users,
  getquote,
  category,
  subcategory,
  blog,
  blogauthor,
  blogcategory,
  product,
  navitems,
  faq,
  term,
  privacy,
  aboutus,
  contactus,
  instantquote,
  portfolio,
  dielineform,
  instagram,
  orders,
  sampleorder,
  updateuser,
  profileaddress,
].forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
});

export {
  users,
  getquote,
  category,
  subcategory,
  blog,
  blogauthor,
  blogcategory,
  product,
  navitems,
  faq,
  term,
  privacy,
  aboutus,
  contactus,
  instantquote,
  portfolio,
  dielineform,
  instagram,
  orders,
  sampleorder,
  updateuser,
  profileaddress,
};
