import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/get", {
          withCredentials: true,
        });
        setLectures(res.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Available Courses
        </h1>

        {loading ? (
          <p className="text-green-500">Loading lectures...</p>
        ) : lectures.length === 0 ? (
          <p className="text-gray-500">No lectures available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <CourseCard key={lecture._id} lecture={lecture} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
