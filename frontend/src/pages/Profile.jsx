import React from "react";
import { useAuth } from "../context/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Profile() {
  const { user } = useAuth(),
    nav = useNavigate();
  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
        <img
          src={user.coverImg || "/placehold/600x200"}
          alt="cover"
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => nav("/update-profile")}
          className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded-full shadow"
        >
          <FaEdit />
        </button>
        <img
          src={user.profileImg || "/placehold/120"}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md absolute bottom-0 left-6 translate-y-1/2"
        />
      </div>
      <div className="mt-16 bg-white p-6 rounded-lg shadow border border-green-100">
        <h2 className="text-2xl font-bold text-green-600">{user.fullName}</h2>
        <p className="text-gray-500 mb-4">@{user.username}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Email:</span>
            <p>{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <span className="font-semibold">Phone:</span>
              <p>{user.phone}</p>
            </div>
          )}
          {user.address && (
            <div>
              <span className="font-semibold">Address:</span>
              <p>{user.address}</p>
            </div>
          )}
          {user.link && (
            <div>
              <span className="font-semibold">Link:</span>
              <p className="text-blue-600">
                <a href={user.link} target="_blank">
                  {user.link}
                </a>
              </p>
            </div>
          )}
        </div>
        {user.bio && (
          <div className="mt-4">
            <span className="font-semibold">Bio:</span>
            <p>{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
