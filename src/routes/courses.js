import express from "express";
import {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.js";
const router = express.Router();

import authMiddleware, { teacherAuthMiddleware } from "../middlewares/auth.js";

router.get("/:schoolId", authMiddleware, getCourses);
router.post("/:schoolId", authMiddleware, teacherAuthMiddleware, createCourse);
router.get("/:schoolId/:id", authMiddleware, getCourse);
router.patch(
  "/:schoolId/:id",
  authMiddleware,
  teacherAuthMiddleware,
  updateCourse
);

export default router;
