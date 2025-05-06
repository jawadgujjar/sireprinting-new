import React, { useState } from "react";
import Navbar1 from "./components/navbar/navbar";
import AppRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import ChatButtons from "./components/chat buttons/chatbutton";
import Verify from "./components/search/loginmainverify";
import "./App.css";
import { UserProvider } from "./contextapi/userContext.js";
import ScrollToTop from "./components/landing/scrolltop";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="App">
      <Router>
        {isVerified ? (
          <UserProvider>
            <ScrollToTop />
            <Navbar1 />
            <AppRouter />
            <ChatButtons />
          </UserProvider>
        ) : (
          <Verify onVerified={setIsVerified} />
        )}
      </Router>
    </div>
  );
}

export default App;
