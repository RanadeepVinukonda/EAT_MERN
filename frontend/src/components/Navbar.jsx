// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-white shadow sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-green-600">
          EduAltTech
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="btn btn-ghost text-green-700 hover:bg-green-100"
        >
          Home
        </Link>
        <Link
          to="/courses"
          className="btn btn-ghost text-green-700 hover:bg-green-100"
        >
          Courses
        </Link>
        <Link
          to="/about"
          className="btn btn-ghost text-green-700 hover:bg-green-100"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="btn btn-ghost text-green-700 hover:bg-green-100"
        >
          Contact
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-success">
              Login
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
            <Link to="/profile">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-green-500 ring-offset-2">
                  <img
                    src={
                      user.profileImg ||
                      "https://placehold.co/100x100?text=User"
                    }
                  />
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
