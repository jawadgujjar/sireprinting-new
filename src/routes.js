import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproductpage from "./pages/allproductpage";
import Footer1 from "./components/footer/footer";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/all-products" element={<Allproductpage />} />
      </Routes>
      <Footer1 />
    </>
  );
}

export default AppRouter;
