import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproductpage from "./pages/allproductpage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/all-products" element={<Allproductpage />} />
      {/* Add more routes here */}
    </Routes>
  );
}

export default AppRouter;
