import React from "react";
import {Link} from "react-router";

const CourseCard = ({ lecture }) => {
  return (
    <div className="bg-white border border-green-100 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      {/* Thumbnail or Video */}
      {lecture.thumbnailUrl ? (
        <img
          src={lecture.thumbnailUrl}
          alt={lecture.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
      ) : (
        <video
          className="w-full h-48 object-cover rounded mb-3"
          src={lecture.videoUrl}
          controls
        />
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold text-green-700">{lecture.title}</h2>

      {/* Subject */}
      {lecture.subject && (
        <p className="text-sm text-green-500">Subject: {lecture.subject}</p>
      )}

      {/* Description */}
      {lecture.description && (
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {lecture.description}
        </p>
      )}

      {/* Uploaded By */}
      <p className="text-xs text-gray-500 mt-2">
        Uploaded by:{" "}
        <span className="text-green-600 font-medium">
          {lecture.uploadedBy?.fullName || "Unknown"}
        </span>
      </p>
      {/* View Button */}
      <Link to={`/course/get/${lecture._id}`}>
        <button className="btn btn-sm btn-success mt-2">Watch Now</button>
      </Link>
    </div>
  );
};

export default CourseCard;
