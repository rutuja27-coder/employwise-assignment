import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload na ho
    if (password === "admin123") {
      alert("Login Successful! 🎉");
      onLoginSuccess(); // Success pe callback
    } else {
      alert("Invalid Password! ❌");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
