import express from "express";
import multer from "multer";
import { addLecture, getLectures } from "../controllers/lectureController.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  protectRoute,
  authorizeRoles("provider", "admin"),
  upload.fields([{ name: "thumbnail" }, { name: "video" }]),
  addLecture
);
router.get("/get", protectRoute, getLectures);

export default router;
