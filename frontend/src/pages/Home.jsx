import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthProvider";
import learnerPic from "../assets/learnerpic.png";
import coursesPic from "../assets/coursespic.png";
import educatorPic from "../assets/educatorpic.png";
import WelcomeImage from "../assets/welcome.jpg";

const Home = () => {
  const { user } = useAuth();

  return (
    <section className="min-h-screen bg-white text-gray-800 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-600">
            <span className="block">Learn</span>
            <span className="block">Grow</span>
            <span className="block">Succeed</span>
          </h1>

          {user ? (
            <>
              <p className="text-gray-600 text-lg">
                Welcome back,{" "}
                <span className="font-semibold">{user.fullName}</span>!
              </p>
              <Link to="/courses">
                <button className="btn btn-success btn-wide">
                  Explore Courses
                </button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-lg">
                Get 24/7 live mentorship, flexible alternative education, and
                seamless communication support — all in one powerful platform.
              </p>
              <Link to="/signup">
                <button className="btn btn-success btn-wide">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={WelcomeImage}
            alt="Home"
            className="rounded-lg w-full max-w-sm object-cover"
          />
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-6xl mx-auto mt-16">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <li className="flex gap-4 items-start bg-green-50 p-4 rounded shadow">
            <img src={learnerPic} alt="Learners" className="w-12 h-12" />
            <div>
              <h5 className="text-xl font-bold text-green-600">100+</h5>
              <h6 className="text-green-500">Learners</h6>
              <p className="text-sm text-gray-600">
                Who joined and are chasing their dreams.
              </p>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-green-50 p-4 rounded shadow">
            <img src={coursesPic} alt="Courses" className="w-12 h-12" />
            <div>
              <h5 className="text-xl font-bold text-green-600">Versatile</h5>
              <h6 className="text-green-500">Courses</h6>
              <p className="text-sm text-gray-600">
                A variety of content for every kind of learner.
              </p>
            </div>
          </li>
          <li className="flex gap-4 items-start bg-green-50 p-4 rounded shadow">
            <img src={educatorPic} alt="Educators" className="w-12 h-12" />
            <div>
              <h5 className="text-xl font-bold text-green-600">Skilled</h5>
              <h6 className="text-green-500">Educators</h6>
              <p className="text-sm text-gray-600">
                Sharing their knowledge and helping others grow.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
