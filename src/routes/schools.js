import express from "express";
const router = express.Router();

import {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/schools.js";

import authMiddleware from "../middlewares/auth.js";

router.get("/", authMiddleware, getSchools);
router.post("/", createSchool);
router.get("/:id", authMiddleware, getSchool);
router.patch("/:id", authMiddleware, updateSchool);
router.delete("/:id", authMiddleware, deleteSchool);

export default router;
