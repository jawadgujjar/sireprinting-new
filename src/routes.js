import React from "react";
import { Routes, Route } from "react-router-dom";
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
import Category from "./components/category/category";
import Subcategory from "./components/category/subcategory";
import Subcategorypage from "./pages/subcategorypage";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Landingpage />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/all-products" element={<Allproductpage />} />
        <Route path="/main-product" element={<Mainproductpage />} />
        <Route path="/search-products" element={<Search />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/blog" element={<MainBlog />} />
        <Route path="/blog1" element={<Blog />} />
        <Route path="/get-a-quote" element={<Getquote />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="about-us" element={<Aboutus />} />
        <Route path="contact-us" element={<Contactus />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="Terms_and_conditions" element={<Term />} />
        <Route path="CBD-Packaging-Boxes" element={<Subcategorypage />} />
      </Routes>
      <Footer1 />
    </>
  );
}

export default AppRouter;
