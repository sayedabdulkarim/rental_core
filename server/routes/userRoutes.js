import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  userLogin,
  userSignUp,
  logoutUser,
} from "../controller/userController.js";

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/logout", logoutUser);

export default router;
