import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
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
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Needed for cookies (JWT)
        }
      );
      setMessage("Signup successful!");
      console.log(res.data);
    } catch (err) {
      const error = err.response?.data?.error || "Signup failed";
      setMessage(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <br />
        <br />
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
