import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
      {/* Logo / Brand */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-green-600">
          EduAltTech
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="btn btn-ghost text-green-600">
          Home
        </Link>
        <Link to="/about" className="btn btn-ghost text-green-600">
          About
        </Link>
        <Link to="/courses" className="btn btn-ghost text-green-600">
          Courses
        </Link>
        <Link to="/contact" className="btn btn-ghost text-green-600">
          Contact
        </Link>

        {/* Role-based Nav Items */}
        {user?.role === "provider" && (
          <Link to="/my-lectures" className="btn btn-ghost text-green-600">
            My Lectures
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin-dashboard" className="btn btn-ghost text-green-600">
            Admin Dashboard
          </Link>
        )}

        {/* Auth Buttons */}
        {!user ? (
          <>
            <Link to="/login" className="btn btn-success btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline btn-success btn-sm">
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* Profile Image */}
            <div
              className="tooltip tooltip-bottom"
              data-tip="Profile"
              onClick={() => navigate("/profile")}
            >
              <img
                src={user.profileImg || "https://placehold.co/40x40?text=User"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-green-500"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
