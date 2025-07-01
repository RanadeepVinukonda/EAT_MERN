import express from "express";
import multer from "multer";
import { addLecture, getLectures , getLectureById} from "../controllers/lecturecontroller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Setup multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/courses/upload
router.post(
  "/upload",
  protectRoute,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addLecture
);

// GET /api/courses
router.get("/get", getLectures);
// GET /api/courses/:id
router.get("/get/:id", getLectureById);


export default router;
