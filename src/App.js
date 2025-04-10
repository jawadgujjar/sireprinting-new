import React from "react";
import "./App.css";
import Navbar1 from "./components/navbar/navbar"; // ✅ Make sure this import is added
import AppRouter from "./routes";

function App() {
  return (
    <>
      <Navbar1 />
      <AppRouter />
    </>
  );
}

export default App;
