// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="navbar bg-white border-b shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-green-600">
          EduAltTech
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        <Link to="/about" className="btn btn-ghost">
          About
        </Link>
        <Link to="/courses" className="btn btn-ghost">
          Courses
        </Link>
        <Link to="/contact" className="btn btn-ghost">
          Contact
        </Link>

        {user ? (
          <>
            <Link
              to="/profile"
              className="btn btn-ghost flex items-center gap-2"
            >
              <div className="avatar">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.profileImg || "https://placehold.co/100x100"}
                    alt="profile"
                  />
                </div>
              </div>
              <span className="hidden sm:inline">{user?.username}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
