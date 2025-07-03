import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "seeker", // default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Signup request
      await axios.post("/api/auth/signup", formData, {
        withCredentials: true,
      });

      toast.success("Signup successful. Logging you in...");

      // Step 2: Auto login
      const loginSuccess = await login({
        email: formData.email,
        password: formData.password,
      });

      if (loginSuccess) {
        navigate("/profile"); // or navigate("/dashboard") if you want
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="select select-bordered w-full"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="seeker">Seeker</option>
            <option value="provider">Provider</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn btn-success w-full mt-4">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
