import React, { useState } from "react";
import "./App.css";
import Navbar1 from "./components/navbar/navbar";
import AppRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import ChatButtons from "./components/chat buttons/chatbutton";
import Verify from "./components/search/loginmainverify";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="App">
      {isVerified ? (
        <Router>
          <Navbar1 />
          <AppRouter />
          <ChatButtons />
        </Router>
      ) : (
        <Verify onVerified={setIsVerified} />
      )}
    </div>
  );
}

export default App;
