import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproductpage from "./pages/allproductpage";
import Footer1 from "./components/footer/footer";
<<<<<<< HEAD
import Mainproductpage from "./pages/mainproductpage";
=======
>>>>>>> d5456920970f19f2ead131bce4287aef42109c72
import Search from "./components/search/search";
import LoginPage from "./components/login/login";
import MainBlog from "./components/blog/mainblog";
import Blog from "./components/blog/blog";
import Getquote from "./components/getquote/getquote";
<<<<<<< HEAD
=======
import Mainproductpage from "./pages/mainproductpage";
>>>>>>> d5456920970f19f2ead131bce4287aef42109c72

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/all-products" element={<Allproductpage />} />
<<<<<<< HEAD
        <Route path="/main-product" element={<Mainproductpage />} />
=======
>>>>>>> d5456920970f19f2ead131bce4287aef42109c72
        <Route path="/search-products" element={<Search />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog" element={<MainBlog />} />
        <Route path="/blog1" element={<Blog />} />
        <Route path="/get-a-quote" element={<Getquote />} />
<<<<<<< HEAD
=======
        <Route path="/main-product" element={<Mainproductpage />} />
>>>>>>> d5456920970f19f2ead131bce4287aef42109c72
      </Routes>
      <Footer1 />
    </>
  );
}

export default AppRouter;
