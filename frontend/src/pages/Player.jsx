// src/pages/CoursePlayer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Player = () => {
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

  if (!lecture) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        {lecture.title}
      </h2>

      {lecture.videoUrl && (
        <video
          src={lecture.videoUrl}
          controls
          className="w-full h-[400px] rounded mb-4"
        />
      )}

      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {lecture.description}
      </p>
      <p className="text-sm text-gray-500">
        Uploaded by:{" "}
        <span className="font-semibold text-green-600">
          {lecture.uploadedBy?.fullName || "Unknown"}
        </span>
      </p>
    </div>
  );
};

export default Player;
