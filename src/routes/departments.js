import express from "express";
const router = express.Router();
import {
  createDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../controllers/departments.js";

import authMiddleware, { adminAuthMiddleware } from "../middlewares/auth.js";

router.get("/", authMiddleware, adminAuthMiddleware, getDepartments);
router.post("/", authMiddleware, adminAuthMiddleware, createDepartment);
router.get("/:id", authMiddleware, adminAuthMiddleware, getDepartment);
router.patch("/:id", authMiddleware, adminAuthMiddleware, updateDepartment);

export default router;
