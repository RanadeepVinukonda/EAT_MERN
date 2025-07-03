import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", form, { withCredentials: true });
      toast.success("Signed up. Logging you in...");
      const ok = await login({ email: form.email, password: form.password });
      if (ok) navigate("/profile");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-600 text-center">
          Sign Up
        </h2>
        {["fullName", "username", "email", "password"].map((f, i) => (
          <input
            key={i}
            type={f === "password" ? "password" : "text"}
            name={f}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            className="input input-bordered w-full"
            value={form[f]}
            onChange={handle}
            required
          />
        ))}
        <select
          name="role"
          value={form.role}
          onChange={handle}
          className="select select-bordered w-full"
        >
          <option value="seeker">Seeker</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-success w-full">
          Sign Up
        </button>
        <p className="text-sm text-center">
          Have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
