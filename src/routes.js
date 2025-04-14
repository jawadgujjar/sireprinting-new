import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproductpage from "./pages/allproductpage";
import Footer1 from "./components/footer/footer";
import Search from "./components/search/search";
import LoginPage from "./components/login/login";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/all-products" element={<Allproductpage />} />
        <Route path="/search-products" element={<Search />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer1 />
    </>
  );
}

export default AppRouter;
