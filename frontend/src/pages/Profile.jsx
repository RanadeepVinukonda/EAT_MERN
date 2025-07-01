import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-green-600 text-lg">Loading profile...</span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Cover Image with Edit Button */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={
            user.coverImg || "https://placehold.co/1200x300?text=Cover+Image"
          }
          alt="Cover"
          className="w-full h-56 object-cover"
        />

        {/* Edit Icon */}
        <button
          className="absolute top-4 right-4  bg-white hover:bg-green-100 text-green-600 p-2 rounded-full shadow-md"
          title="Edit Profile"
          onClick={() => navigate("/UpdateProfile")}
        >
          <FaEdit size={18} />
        </button>

        {/* Profile Image */}
        <div className="absolute -bottom-0 left-6">
          <img
            src={user.profileImg || "https://placehold.co/120x120?text=Profile"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white mt-16 rounded-lg shadow p-6 border border-green-100">
        <h1 className="text-3xl font-bold text-green-600 mb-1">
          {user.fullName}
        </h1>
        <p className="text-gray-500 mb-4">@{user.username}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
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
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
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