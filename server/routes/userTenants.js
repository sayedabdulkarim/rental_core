import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import { addTenant, getAllTenants } from "../controller/tenantController.js";

router.post("/tenants/add", protectedRoutesWithParser, addTenant);
router.get("/tenants/list", protectedRoutesWithParser, getAllTenants);

export default router;
