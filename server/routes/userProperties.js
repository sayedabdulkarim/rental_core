import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addRoomDetails } from "../controller/propertyController.js";

router.post("/properties/addrooms", protectedRoutesWithParser, addRoomDetails);

export default router;
