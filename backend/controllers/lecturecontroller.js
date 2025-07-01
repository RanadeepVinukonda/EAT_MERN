import { v2 as cloudinary } from "cloudinary";
import Lecture from "../models/lecturemodel.js";

// Add a lecture
export const addLecture = async (req, res) => {
  try {
    const { title, description, subject } = req.body;

    // Access uploaded files (from multer)
    const thumbnailFile = req.files?.thumbnail?.[0];
    const videoFile = req.files?.video?.[0];

    if (!title || !thumbnailFile || !videoFile) {
      return res
        .status(400)
        .json({ error: "Title, thumbnail, and video are required" });
    }

    // Upload thumbnail to Cloudinary
    const thumbRes = await cloudinary.uploader.upload_stream(
      { folder: "lectures/thumbnails" },
      async (error, thumbResult) => {
        if (error) throw new Error("Thumbnail upload failed");

        // Upload video to Cloudinary
        const videoRes = await cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "lectures/videos",
          },
          async (err, videoResult) => {
            if (err) throw new Error("Video upload failed");

            const lecture = new Lecture({
              title,
              description,
              subject,
              thumbnailUrl: thumbResult.secure_url,
              videoUrl: videoResult.secure_url,
              uploadedBy: req.user._id,
            });

            await lecture.save();
            return res
              .status(201)
              .json({ message: "Lecture uploaded", lecture });
          }
        );

        // Start uploading video stream
        videoFile.stream.pipe(videoRes);
      }
    );

    // Start uploading thumbnail stream
    thumbnailFile.stream.pipe(thumbRes);
  } catch (error) {
    console.error("Error in addLecture:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all lectures
export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate("uploadedBy", "fullName");
    res.status(200).json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error.message);
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
};
export const getLectureById = async (req, res) => {
  const { id } = req.params;

  try {
    const lecture = await Lecture.findById(id).populate("uploadedBy", "fullName");
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    res.status(200).json(lecture);
  } catch (error) {
    console.error("Error fetching lecture:", error.message);
    res.status(500).json({ error: "Failed to fetch lecture" });
  }
}
