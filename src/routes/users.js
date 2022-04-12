import express from "express";
const router = express.Router();

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import authMiddleware, {
  saAuthMiddleware,
  adminAuthMiddleware,
  teacherAuthMiddleware,
} from "../middlewares/auth.js";

router.get("/", authMiddleware, saAuthMiddleware, getUsers);
router.get("/:id", authMiddleware, saAuthMiddleware, getUser);
router.patch("/:id", authMiddleware, saAuthMiddleware, updateUser);
//router.delete("/:id", authMiddleware, deleteUser);

// school level routes
router.get("/school", authMiddleware, teacherAuthMiddleware, getUsers);
router.get("/school/:id", authMiddleware, teacherAuthMiddleware, getUser);
router.patch("/school/:id", authMiddleware, adminAuthMiddleware, updateUser);

// logged in user route

export default router;
