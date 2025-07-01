import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="text-center mt-10 text-green-600 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Cover Image */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={user.coverImg || "https://placehold.co/600x200?text=Cover+Image"}
          alt="cover"
          className="w-full h-48 object-cover"
        />

        {/* Edit Icon */}
        <button
          className="absolute top-4 right-4 bg-white hover:bg-green-100 text-green-600 p-2 rounded-full shadow-md"
          title="Edit Profile"
          onClick={() => navigate("/UpdateProfile")}
        >
          <FaEdit size={18} />
        </button>

        {/* Profile Image */}
        <img
          src={user.profileImg || "https://placehold.co/100x100?text=Profile"}
          alt="profile"
          className="w-24 h-24 object-cover rounded-full border-4 border-white absolute -bottom-12 left-6 bg-white"
        />
      </div>

      {/* Profile Details */}
      <div className="bg-white shadow-md mt-16 p-6 rounded-lg border border-green-100">
        <h2 className="text-2xl font-bold text-green-600">{user.fullName}</h2>
        <p className="text-gray-500 mb-4">@{user.username}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold text-green-500">Email:</span>
            <p>{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <span className="font-semibold text-green-500">Phone:</span>
              <p>{user.phone}</p>
            </div>
          )}
          {user.address && (
            <div>
              <span className="font-semibold text-green-500">Address:</span>
              <p>{user.address}</p>
            </div>
          )}
          {user.link && (
            <div>
              <span className="font-semibold text-green-500">Link:</span>
              <a
                href={user.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.link}
              </a>
            </div>
          )}
        </div>

        {user.bio && (
          <div className="mt-6">
            <span className="font-semibold text-green-500">Bio:</span>
            <p className="text-gray-600 mt-1">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
