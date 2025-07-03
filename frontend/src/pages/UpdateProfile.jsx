// src/pages/UpdateProfile.jsx

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    currentPassword: "",
    newPassword: "",
    bio: user?.bio || "",
    link: user?.link || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profileImg: "",
    coverImg: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/api/user/update",
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Link (optional)"
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="textarea textarea-bordered w-full mt-2"
        ></textarea>

        {/* Password fields */}
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="input input-bordered w-full"
        />
        {/* Profile Image Section */}
        <div>
          <label className="block font-medium text-green-700 mb-2">
            Profile Image
          </label>
          {formData.profileImg && (
            <img
              src={formData.profileImg}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover mb-2 border border-green-400"
            />
          )}
          <input
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Cover Image Section */}
        <div>
          <label className="block font-medium text-green-700 mb-2">
            Cover Image
          </label>
          {formData.coverImg && (
            <img
              src={formData.coverImg}
              alt="Cover Preview"
              className="w-full h-32 object-cover mb-2 border border-green-400 rounded"
            />
          )}
          <input
            type="file"
            name="coverImg"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button className="btn btn-success w-full mt-4">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
