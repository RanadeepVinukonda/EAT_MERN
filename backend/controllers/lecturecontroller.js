import {v2 as cloudinary} from "cloudinary";
import Lecture from "../models/lecturemodel.js";

export const addLecture = async (req, res) => {
  try {
    const { title, description, subject, thumbnail, video } = req.body;

    if (!title || !thumbnail || !video) {
      return res
        .status(400)
        .json({ error: "Title, thumbnail, and video are required" });
    }

    // Upload thumbnail to Cloudinary
    const thumbRes = await cloudinary.uploader.upload(thumbnail, {
      folder: "lectures/thumbnails",
    });

    // Upload video to Cloudinary
    const videoRes = await cloudinary.uploader.upload(video, {
      resource_type: "video",
      folder: "lectures/videos",
    });

    const lecture = new Lecture({
      title,
      description,
      subject,
      thumbnailUrl: thumbRes.secure_url,
      videoUrl: videoRes.secure_url,
      uploadedBy: req.user._id,
    });

    await lecture.save();

    res.status(201).json({ message: "Lecture uploaded", lecture });
  } catch (error) {
    console.error("Error in addLecture:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMyLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ uploadedBy: req.user._id }).populate(
      "uploadedBy",
      "fullName"
    );
    res.status(200).json(lectures);
  } catch (error) {
    console.error("Error in getMyLectures:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
export const getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate("uploadedBy", "fullName");
    res.status(200).json(lectures);
    
  } catch (error) {
    console.error("Error in getAllLectures:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Check if the user is authorized to delete the lecture
    if (lecture.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: "You are not authorized to delete this lecture" });
    }

    // Delete thumbnail and video from Cloudinary
    await cloudinary.uploader.destroy(lecture.thumbnailUrl, { resource_type: "image" });
    await cloudinary.uploader.destroy(lecture.videoUrl, { resource_type: "video" });

    await lecture.remove();
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Error in deleteLecture:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }

};
