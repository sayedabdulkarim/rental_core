import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addRoomDetails,
  getAllRoomDetails,
} from "../controller/propertyController.js";

router.post("/properties/addrooms", protectedRoutesWithParser, addRoomDetails);
router.post(
  "/properties/roomdetails",
  protectedRoutesWithParser,
  getAllRoomDetails
);

export default router;
