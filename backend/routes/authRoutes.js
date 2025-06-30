
import express from "express";
import { getMe, login, logout, signup} from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);//getting user details from the findById method in the controller
router.post("/signup", signup);//signup route
router.post("/login", login);//login route
router.post("/logout",logout);//logout route



export default router;
