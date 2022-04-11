import express from "express";
const router = express.Router();

import { register, login } from "../controllers/auth.js";

import authMiddleware from "../middlewares/auth.js";

router.post("/register", authMiddleware, register);
router.post("/login", login);

export default router;
