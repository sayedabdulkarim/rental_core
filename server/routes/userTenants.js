import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addTenant } from "../controller/tenantController.js";

router.post("/tenants/add", protectedRoutesWithParser, addTenant);

export default router;
