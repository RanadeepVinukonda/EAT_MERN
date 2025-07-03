// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router"; // ✅ Correct import
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const { role } = res.data;

      setUser(res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toast.success("Login successful!");

      // ✅ Role-based redirect
      if (role === "seeker") navigate("/courses");
      else if (role === "provider") navigate("/provider/lectures");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input input-bordered w-full mb-4"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success w-full">
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
