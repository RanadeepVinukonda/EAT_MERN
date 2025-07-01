// src/pages/UpdateProfile.jsx

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    bio: user?.bio || "",
    link: user?.link || "",
    phone: user?.phone || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    profileImg: "",
    coverImg: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/update",
        formData,
        { withCredentials: true }
      );

      setUser(res.data);
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Update Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg border">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="input input-bordered w-full" required />
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="input input-bordered w-full" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input input-bordered w-full" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input input-bordered w-full" />
        </div>

        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="textarea textarea-bordered w-full" rows={2} />

        <input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="Link (website, GitHub, etc)" className="input input-bordered w-full" />

        {/* Image Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="file" name="profileImg" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
          <input type="file" name="coverImg" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
        </div>

        {/* Password Change */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} placeholder="Current Password" className="input input-bordered w-full" />
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password (optional)" className="input input-bordered w-full" />
        </div>

        {/* Submit */}
        <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
