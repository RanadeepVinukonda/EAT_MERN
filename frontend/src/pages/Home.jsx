import React from "react";
import { Link } from "react-router";
import learnerPic from "../assets/learnerpic.png";
import coursesPic from "../assets/coursespic.png";
import educatorPic from "../assets/educatorpic.png";
import welcomeImage from "../assets/welcome.jpg";

const Home = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-600">
            <span className="block">Learn</span>
            <span className="block">Grow</span>
            <span className="block">Succeed</span>
          </h1>
          <p className="text-gray-700 text-lg">
            Get 24/7 live mentorship, flexible alternative education, and
            seamless communication support — all in one powerful platform. We
            are here to close learning gaps and empower every student to
            succeed, their way.
          </p>
          <Link to="/signup">
            <button className="btn btn-success px-6 py-2 text-white rounded-md shadow">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={welcomeImage}
            alt="Welcome"
            className="w-full max-w-md rounded-xl"
          />
        </div>
      </div>

      {/* Highlight Section */}
      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg shadow">
          <img src={learnerPic} alt="Learners" className="w-12 h-12" />
          <div>
            <h5 className="text-2xl font-bold text-green-600">100+</h5>
            <h6 className="text-green-500 text-lg font-semibold">Learners</h6>
            <p className="text-sm text-gray-600">
              Who joined and are finding ways to chase their dreams.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg shadow">
          <img src={coursesPic} alt="Courses" className="w-12 h-12" />
          <div>
            <h5 className="text-2xl font-bold text-green-600">Versatile</h5>
            <h6 className="text-green-500 text-lg font-semibold">Courses</h6>
            <p className="text-sm text-gray-600">
              Variety of courses for every section of learners.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg shadow">
          <img src={educatorPic} alt="Educators" className="w-12 h-12" />
          <div>
            <h5 className="text-2xl font-bold text-green-600">Skilled</h5>
            <h6 className="text-green-500 text-lg font-semibold">Educators</h6>
            <p className="text-sm text-gray-600">
              Crafting their identity by showcasing their skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
