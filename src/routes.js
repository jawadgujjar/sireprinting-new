import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/navbar/navbar"; // adjust path if needed
import LandingPage from "./components/landing/landing"; // adjust path if needed

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
