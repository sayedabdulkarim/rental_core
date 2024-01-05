import express from "express";
import { protectedRoutesWithParser } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addTenant,
  editTenant,
  getAllTenants,
  getTenantByID,
  removeTenant,
} from "../controller/tenantController.js";

router.post("/tenants/add", protectedRoutesWithParser, addTenant);
router.post(
  "/tenants/remove/:tenantId",
  protectedRoutesWithParser,
  removeTenant
);
router.get("/tenants/list", protectedRoutesWithParser, getAllTenants);
router.get(
  "/tenants/getTenantById/:tenantId",
  protectedRoutesWithParser,
  getTenantByID
);
router.patch("/tenants/edit/:tenantId", protectedRoutesWithParser, editTenant);

export default router;
