import jwt from "jsonwebtoken";
import UnauthenticatedError from "../utils/errors/unauthenticated.js";
import User from "../models/User.js";
import asyncWrapper from "./async.js";

const authMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id, email } = decoded;

  const user = await User.findOne({ _id: id }).select("+isSa");
  if (!user)
    throw new UnauthenticatedError("Not authorized to access this route");

  req.user = {
    id,
    email,
    admin: user.admin.isAdmin,
    teacher: user.teacher.isTeacher,
    student: user.student.isStudent,
    sa: user.isSa,
  };
  return next();
});

/**
 * Educaln uses a hierarchical access level for routes.
 * This means that all routes for student is accessed by admin, teacher and sa.
 * All routes for teacher is accessed by admin nad sa
 * All routes for admin ia accessed by sa
 * Only sa accesses sa routes
 * student -> teacher -> admin -> sa
 * route level authentication and authorization is then utilized to secure data
 */

export const saAuthMiddleware = asyncWrapper(async (req, res, next) => {
  if (!req.user.sa) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
  return next();
});

export const adminAuthMiddleware = asyncWrapper(async (req, res, next) => {
  if (req.user.sa || req.user.admin) {
    return next();
  }
  throw new UnauthenticatedError("Not authorized to access this route");
});

export const teacherAuthMiddleware = asyncWrapper(async (req, res, next) => {
  if (req.user.sa || req.user.admin || req.user.teacher) {
    return next();
  }
  throw new UnauthenticatedError("Not authorized to access this route");
});

export const studentAuthMiddleware = asyncWrapper(async (req, res, next) => {
  if (req.user.sa || req.user.admin || req.user.teacher || req.user.student) {
    return next();
  }
  throw new UnauthenticatedError("Not authorized to access this route");
});

export default authMiddleware;
