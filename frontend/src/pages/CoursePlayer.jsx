// src/pages/CoursePlayer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const CoursePlayer = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/get/${id}`);
        setLecture(res.data);
      } catch (err) {
        console.error("Failed to load lecture:", err);
      }
    };
    fetchLecture();
  }, [id]);

  if (!lecture) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {lecture.title}
      </h2>
      <video src={lecture.videoUrl} controls className="w-full h-96 rounded" />
      <p className="mt-4 text-gray-700">{lecture.description}</p>
      <p className="mt-2 text-sm text-gray-500">{lecture.uploadedBy?.fullName || "Unknown"}</p>
      <p className="mt-2 text-sm text-gray-500">Subject: {lecture.subject || "N/A"}</p>
      
    </div>
  );
};

export default CoursePlayer;
