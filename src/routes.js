import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproductpage from "./pages/allproductpage";
import Footer1 from "./components/footer/footer";
import Mainproductpage from "./pages/mainproductpage";
import Search from "./components/search/search";
import LoginPage from "./components/login/login";
import MainBlog from "./components/blog/mainblog";
import Blog from "./components/blog/blog";
import Getquote from "./components/getquote/getquote";
import Portfolio from "./components/portfolio/portfolio";
import Aboutus from "./components/footerthings/aboutus";
import Contactus from "./components/footerthings/contactus";
import Privacy from "./components/footerthings/privacy";
import Term from "./components/footerthings/term";
import Subcategorypage from "./pages/subcategorypage";
import Products from "./components/products/products";
import Sampleproduct from "./components/sampleproduct/sampleproduct";
import Cart from "./components/addtocart/cart";
import NotFound from "./components/not found/notfound";
import SignupPage from "./components/login/signup";
import { useUser } from "./contextapi/userContext";
import Diepage from "./pages/diepage";
import Diecategory from "./components/die-component/diecategory";
import Blogauthor from "./components/blog/blogauthor";
import Userinterface from "./components/userinterface/userinterface";
import Sampleform from "./components/sampleproduct/sampleform";
import Userdetail from "./components/userinterface/userdetail";
// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? <Navigate to="/" replace /> : children;
};

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/:categorySlug/:subCategorySlug"
          element={<Allproductpage />}
        />
        <Route
          path="/:categorySlug/:subCategorySlug/:productSlug"
          element={<Mainproductpage />}
        />
        <Route
          path="/:categorySlug/:subCategorySlug/:productSlug/:variantSlug"
          element={<Mainproductpage />}
        />
        <Route path="/search-products" element={<Search />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignupPage />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<MainBlog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/blog-author" element={<Blogauthor />} />
        <Route path="/get-a-quote" element={<Getquote />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/Terms_and_conditions" element={<Term />} />
        <Route path="/:slug" element={<Subcategorypage />} />{" "}
        <Route path="/sample-product" element={<Sampleproduct />} />
        <Route path="/add-to-cart" element={<Cart />} />
        <Route path="/Die-template" element={<Diepage />} />
        <Route path="/Die-category-template" element={<Diecategory />} />
        <Route path="/user-interface" element={<Userinterface />} />
        <Route path="/sample-form" element={<Sampleform />} />
        <Route path="/user-detail" element={<Userdetail />} />
      </Routes>
      <Footer1 />
    </>
  );
}

export default AppRouter;
