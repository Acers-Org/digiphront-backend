import Course from "../models/Course.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";
import User from "../models/User.js";

const setQueryObject = (req) => {
  const queryObject = {};
  if (req.query.teacher) {
    queryObject.teacher = req.query.teacher;
  }

  if (req.query.department) {
    queryObject.department = req.query.department;
  }

  return queryObject;
};

export const getCourses = asyncWrapper(async (req, res) => {
  let schoolId = "";
  if (req.params.schoolId) {
    schoolId = req.params.schoolId;
  } else {
    const user = await User.findOne({ _id: req.user.id }).select("school");
    if (!user) {
      throw createCustomError(`Bad request received`, 400);
    }
    schoolId = user.school;
  }

  const queryObj = setQueryObject(req);
  const courses = await Course.find(queryObj)
    .populate("department")
    .populate("teacher")
    .sort({ createdAt: 1 });
  const schoolCourse = courses.filter((c) => {
    return c.department.school.toString() === schoolId.toString();
  });

  res.status(200).json({
    message: "All courses in a school",
    data: schoolCourse,
    success: 1,
  });
});

export const createCourse = asyncWrapper(async (req, res) => {
  let schoolId = "";
  if (req.user.sa) {
    schoolId = req.params.schoolId;
  } else {
    const user = await User.findOne({ _id: req.user.id }).select("school");
    if (!user) {
      throw createCustomError(`Bad request received`, 400);
    }
    schoolId = user.school;
  }

  if (!schoolId) {
    throw createCustomError("Not authorized", 401);
  }
  const course = await Course.create(req.body);
  if (!course) {
    throw createCustomError("Unable to create course", 422);
  }
  res.status(201).json({
    message: "Course created",
    data: course,
    success: 1,
  });
});

export const getCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findOne({ _id: courseId })
    .populate("department")
    .populate("teacher");
  if (!courseId) {
    throw createCustomError(`No course of study with id: ${courseId}`, 404);
  }
  res.status(200).json({
    message: "Course details",
    data: course,
    success: 1,
  });
});

export const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    throw createCustomError(`No course with id : ${courseId}`, 404);
  }
  res.status(200).json({
    message: "Course of study updated",
    data: course,
    success: 1,
  });
});
