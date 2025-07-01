import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Important for sending/receiving cookies
        }
      );
      setMessage("Login successful!");
      console.log(res.data);
    } catch (err) {
      const error = err.response?.data?.error || "Login failed";
      setMessage(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
