import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function UpdateProfile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    fullName: user.fullName,
    bio: user.bio || "",
    link: user.link || "",
  });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/auth/me", form, {
        withCredentials: true,
      });
      setUser(res.data);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-green-50">
      <form
        onSubmit={submit}
        className="max-w-lg mx-auto bg-white p-8 rounded shadow"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">Edit Profile</h2>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handle}
          placeholder="Full Name"
          className="input input-bordered w-full mb-3"
          required
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handle}
          placeholder="Bio"
          className="textarea textarea-bordered w-full mb-3"
        />
        <input
          name="link"
          value={form.link}
          onChange={handle}
          placeholder="Your Link"
          className="input input-bordered w-full mb-3"
        />
        <button className="btn btn-success w-full">Save Changes</button>
      </form>
    </div>
  );
}
