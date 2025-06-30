import express from 'express';
import {protectRoute} from '../middleware/protectRoute.js';
import {updateUser} from '../controllers/userController.js';

const router = express.Router();
router.put("/update",protectRoute,updateUser);
export default router;