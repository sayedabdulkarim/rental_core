import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addRoomDetails,
  getAllRoomDetails,
  getRoomDetails,
  updateRoomDetails,
} from "../controller/propertyController.js";

router.post("/properties/addrooms", protectedRoutesWithParser, addRoomDetails);
router.get(
  "/properties/allroomdetails",
  protectedRoutesWithParser,
  getAllRoomDetails
);
router.get(
  "/properties/roomdetails/:roomType/:roomId",
  protectedRoutesWithParser,
  getRoomDetails
);

router.patch(
  "/properties/roomdetails/:roomType/:roomId",
  protectedRoutesWithParser,
  updateRoomDetails
);

export default router;
