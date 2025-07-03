import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import CourseCard from "../components/CourseCard";
import { toast } from "react-hot-toast";

const MyLectures = () => {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    thumbnail: null,
    video: null,
  });

  // Fetch provider's lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get("/api/courses/mylectures", {
          withCredentials: true,
        });
        setLectures(res.data);
      } catch (err) {
        console.error("Error fetching provider lectures", err);
      }
    };

    if (user?.role === "provider") fetchLectures();
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle submit
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title || !form.video || !form.thumbnail) {
      toast.error("Title, video, and thumbnail are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("subject", form.subject);
    formData.append("video", form.video);
    formData.append("thumbnail", form.thumbnail);

    try {
      const res = await axios.post("/api/courses/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Lecture uploaded successfully!");
      setLectures((prev) => [res.data.lecture, ...prev]);
      setForm({
        title: "",
        description: "",
        subject: "",
        video: null,
        thumbnail: null,
      });
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  if (user?.role !== "provider") {
    return (
      <div className="text-center mt-10 text-red-600">
        You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        My Uploaded Lectures
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg shadow-md mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered col-span-1 sm:col-span-2"
        />
        <input
          type="file"
          accept="image/*"
          name="thumbnail"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
          required
        />
        <input
          type="file"
          accept="video/*"
          name="video"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn btn-success col-span-1 sm:col-span-2"
        >
          Upload Lecture
        </button>
      </form>

      {/* Lectures Display */}
      {lectures.length === 0 ? (
        <p className="text-gray-500">No lectures uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <CourseCard key={lecture._id} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLectures;
