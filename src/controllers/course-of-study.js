import Course_of_study from "../models/Course_of_study.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";
import User from "../models/User.js";

export const getCoss = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  const coss = await Course_of_study.find({ school: schoolId }).populate(
    "department"
  );
  res.status(200).json({
    message: "All course of study in a school",
    data: coss,
    success: 1,
  });
});

export const createCos = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  if (!schoolId) {
    //Only a schoo admin has right to create cos
    throw createCustomError("Not Authorized", 401);
  }
  const cos = await Course_of_study.create(req.body);
  if (!cos) {
    throw createCustomError("Unable to create course of study", 422);
  }
  res.status(201).json({
    message: "Course of study created",
    data: cos,
    success: 1,
  });
});

export const getCos = asyncWrapper(async (req, res) => {
  const cosId = req.params.id;
  const cos = await Course_of_study.findOne({ _id: cosId }).populate(
    "department"
  );
  if (!cos) {
    throw createCustomError(`No course of study with id: ${cosId}`, 404);
  }
  res.status(200).json({
    message: "Course of study details",
    data: cos,
    success: 1,
  });
});

export const updateCos = asyncWrapper(async (req, res) => {
  const cosId = req.params.id;

  const cos = await Course_of_study.findOneAndUpdate({ _id: cosId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cos) {
    throw createCustomError(`No course of study with id : ${cosId}`, 404);
  }
  res.status(200).json({
    message: "Course of study updated",
    data: cos,
    success: 1,
  });
});
