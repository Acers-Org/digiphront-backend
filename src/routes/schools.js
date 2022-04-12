import express from "express";
const router = express.Router();

import {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
  adminGetSchool,
  adminUpdateSchool,
} from "../controllers/schools.js";

import authMiddleware, {
  saAuthMiddleware,
  adminAuthMiddleware,
} from "../middlewares/auth.js";

router.get("/", authMiddleware, saAuthMiddleware, getSchools);
router.post("/", createSchool);
router.get("/:id", authMiddleware, saAuthMiddleware, getSchool);
router.patch("/:id", authMiddleware, saAuthMiddleware, updateSchool);
router.delete("/:id", authMiddleware, saAuthMiddleware, deleteSchool);

// school admin route
router.get(
  "/admin-school/:id",
  authMiddleware,
  adminAuthMiddleware,
  adminGetSchool
);
router.patch(
  "/admin-school/:id",
  authMiddleware,
  adminAuthMiddleware,
  adminUpdateSchool
);

export default router;
