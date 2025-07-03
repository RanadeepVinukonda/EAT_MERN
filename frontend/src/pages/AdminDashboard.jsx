import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("users");

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold">{user?.fullName}</span>.
          Manage the platform below.
        </p>

        {/* Tabs */}
        <div className="tabs tabs-boxed bg-white mb-6">
          <button
            onClick={() => setTab("users")}
            className={`tab ${tab === "users" && "tab-active text-green-600"}`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("lectures")}
            className={`tab ${
              tab === "lectures" && "tab-active text-green-600"
            }`}
          >
            Lectures
          </button>
          <button
            onClick={() => setTab("analytics")}
            className={`tab ${
              tab === "analytics" && "tab-active text-green-600"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Content */}
        {tab === "users" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Replace with dynamic user data */}
            <div className="card bg-white shadow border border-green-100">
              <div className="card-body">
                <h2 className="card-title text-green-700">John Doe</h2>
                <p>Role: Seeker</p>
                <p>Email: john@example.com</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            </div>

            <div className="card bg-white shadow border border-green-100">
              <div className="card-body">
                <h2 className="card-title text-green-700">Jane Smith</h2>
                <p>Role: Provider</p>
                <p>Email: jane@example.com</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "lectures" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Replace with dynamic lecture data */}
            <div className="card bg-white shadow border border-green-100">
              <div className="card-body">
                <h2 className="card-title text-green-700">React Basics</h2>
                <p>Uploaded By: Jane Smith</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="bg-white p-6 rounded shadow text-gray-700 border border-green-100">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Platform Analytics
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>📊 Total users: 120</li>
              <li>🎓 Total lectures: 45</li>
              <li>✅ Active providers: 10</li>
              <li>📈 Most viewed lecture: "AI for Beginners"</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
