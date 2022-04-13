import Department from "../models/Department.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";
import User from "../models/User.js";

export const getDepartments = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  console.log(schoolId);
  const depts = await Department.find({ school: schoolId }).populate("school");
  res.status(200).json({
    message: "School Department",
    data: depts,
    success: 1,
  });
});

export const createDepartment = asyncWrapper(async (req, res) => {
  // Only an admin can create departments
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  const { department_name } = req.body;
  const dept = await Department.create({ department_name, school: schoolId });
  if (!dept) {
    throw createCustomError("Unable to create department", 422);
  }
  res.status(201).json({
    message: "Department created",
    data: dept,
    success: 1,
  });
});

export const getDepartment = asyncWrapper(async (req, res) => {
  const deptId = req.params.id;
  const dept = await Department.findOne({ _id: deptId }).populate("school");
  if (!dept) {
    throw createCustomError(`No department with id: ${deptId}`, 404);
  }
  res.status(200).json({
    message: "Department details",
    data: dept,
    success: 1,
  });
});

export const updateDepartment = asyncWrapper(async (req, res) => {
  const deptId = req.params.id;
  const dept = await Department.findOneAndUpdate({ _id: deptId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!dept) {
    throw createCustomError(`No department with id : ${deptId}`, 404);
  }
  res.status(200).json({
    message: "Department updated",
    data: dept,
    success: 1,
  });
});
