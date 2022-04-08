import express from "express";
const router = express.Router();

import {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/schools.js";

router.get("/", getSchools);
router.post("/", createSchool);
router.get("/:id", getSchool);
router.patch("/:id", updateSchool);
router.delete("/:id", deleteSchool);

export default router;
