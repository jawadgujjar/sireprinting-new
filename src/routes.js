import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Allproduct1 from "./components/allproducts/allproduct";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/all-products" element={<Allproduct1 />} />
      {/* Add more routes here */}
    </Routes>
  );
}

export default AppRouter;
