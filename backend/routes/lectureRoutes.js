import express from "express";
import { addLecture } from "../controllers/lecturecontroller.js";
import multer from "multer";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  protectRoute,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addLecture
);


export default router;
