import React from "react";
import "./App.css";
import Navbar1 from "./components/navbar/navbar";
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
