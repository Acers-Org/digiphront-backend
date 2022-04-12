import express from "express";
const router = express.Router();
import { createMessage, getMessages } from "../controllers/messages.js";

import authMiddleware from "../middlewares/auth.js";

router.get("/", authMiddleware, getMessages);
router.post("/", authMiddleware, createMessage);

export default router;
