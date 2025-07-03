import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      setUser(res.data);
      toast.success("Login successful!");

      // Redirect to the page user came from or to profile
      const redirectTo = location.state?.from?.pathname || "/profile";
      navigate(redirectTo, { replace: true });

      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for accessing auth
export const useAuth = () => useContext(AuthContext);
