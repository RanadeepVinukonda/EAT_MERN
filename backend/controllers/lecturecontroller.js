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
