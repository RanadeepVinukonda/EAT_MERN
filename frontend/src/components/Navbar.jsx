import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto flex justify-between gap-5 items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          EduAltTech
        </Link>

        {/* Navigation */}
        <div className="flex gap-12 items-center">
          <Link className="hover:text-green-600 font-medium" to="/">
            Home
          </Link>
          <Link className="hover:text-green-600 font-medium" to="/courses">
            Courses
          </Link>
          <Link className="hover:text-green-600 font-medium" to="/about">
            About
          </Link>
          <Link className="hover:text-green-600 font-medium" to="/contact">
            Contact
          </Link>

          {user ? (
            // User Dropdown
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-green-600 ring-offset-2">
                  <img
                    src={user.profileImg || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="text-green-600">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Guest links
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm text-green-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
