import React from "react";
import "./App.css";
import Navbar1 from "./components/navbar/navbar";
import AppRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar1 />
      <AppRouter />
    </Router>
  );
}

export default App;
