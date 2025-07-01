import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";
import ProtectRoute from "./components/ProtectedRoute";
import Player from "./pages/player";


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/courses/get/:id"
            element={
              <ProtectRoute>
                <Player />
              </ProtectRoute>
            }></Route>


          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="/UpdateProfile"
            element={
              <ProtectRoute>
                <UpdateProfile />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
