import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Footer1 from "./components/footer/footer";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
      <Footer1 />
    </Router>
  );
};

export default AppRouter;
