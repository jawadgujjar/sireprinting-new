import React from "react";
import "./App.css";
import Navbar1 from "./components/navbar/navbar";
import AppRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import ChatButtons from "./components/chat buttons/chatbutton";
 

function App() {
  return (
    <Router>
      <Navbar1 />
      <AppRouter />
      <ChatButtons /> {/* Yeh har page pe visible hoga */}
    </Router>
  );
}

export default App;
