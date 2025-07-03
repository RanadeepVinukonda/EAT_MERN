import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/profile"); // or dynamic based on role
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="btn btn-success w-full mt-4">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
