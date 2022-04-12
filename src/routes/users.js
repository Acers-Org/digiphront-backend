import express from "express";
const router = express.Router();

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  schoolGetUsers,
  schoolGetUser,
  schoolUpdateUser,
  getProfile,
  updateProfile,
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
router.get(
  "/school/users/",
  authMiddleware,
  teacherAuthMiddleware,
  schoolGetUsers
);
router.get(
  "/school/users/:id",
  authMiddleware,
  teacherAuthMiddleware,
  schoolGetUser
);
router.patch(
  "/school/users/:id",
  authMiddleware,
  adminAuthMiddleware,
  schoolUpdateUser
);

// logged in user route
router.get("/user/profile", authMiddleware, getProfile);
router.patch("/user/profile", authMiddleware, updateProfile);

export default router;
