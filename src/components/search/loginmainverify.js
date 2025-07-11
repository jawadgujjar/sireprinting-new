// Login.js
import React, { useState } from "react";

const Verify = ({ onVerified }) => {
  const [password, setPassword] = useState("");

  const checkPw = (e) => {
    e.preventDefault();

    if (password === "123") {
      onVerified(true); // Call the function passed as a prop to indicate verification
    } else {
      alert("Sorry, that's not it");
    }
  };

  return (
    <form onSubmit={checkPw}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Open Sire Printing </button>
    </form>
  );
};

export default Verify;
