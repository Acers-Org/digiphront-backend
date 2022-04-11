import express from "express";
const router = express.Router();

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import authMiddleware from "../middlewares/auth.js";

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.patch("/:id", authMiddleware, updateUser);
//router.delete("/:id", authMiddleware, deleteUser);

export default router;
