import express from "express";
import {
  createCos,
  getCos,
  getCoss,
  updateCos,
} from "../controllers/course-of-study.js";
const router = express.Router();

import authMiddleware, { adminAuthMiddleware } from "../middlewares/auth.js";

router.get("/", authMiddleware, getCoss);
router.post("/", authMiddleware, adminAuthMiddleware, createCos);
router.get("/:id", authMiddleware, adminAuthMiddleware, getCos);
router.patch("/:id", authMiddleware, adminAuthMiddleware, updateCos);

export default router;
