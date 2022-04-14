import School from "../models/School.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";
import User from "../models/User.js";

export const getSchools = asyncWrapper(async (req, res) => {
  const schools = await School.find({}).populate("departments");
  res.status(200).json({
    message: "All schools",
    data: schools,
    success: 1,
  });
});

export const createSchool = asyncWrapper(async (req, res) => {
  const school = await School.create(req.body);
  if (!school) {
    throw createCustomError("Unable to create school", 422);
  }
  res.status(201).json({
    message: "School created",
    data: school,
    success: 1,
  });
});

export const getSchool = asyncWrapper(async (req, res) => {
  const schoolId = req.params.id;
  const school = await School.findOne({ _id: schoolId }).populate(
    "departments"
  );
  if (!school) {
    throw createCustomError(`No school with id: ${schoolId}`, 404);
  }
  res.status(200).json({
    message: "School details",
    data: school,
    success: 1,
  });
});

export const updateSchool = asyncWrapper(async (req, res) => {
  const schoolId = req.params.id;

  const school = await School.findOneAndUpdate({ _id: schoolId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!school) {
    throw createCustomError(`No school with id : ${schoolId}`, 404);
  }
  res.status(200).json({
    message: "School updated",
    data: school,
    success: 1,
  });
});

export const deleteSchool = asyncWrapper(async (req, res) => {
  const schoolId = req.params.id;
  const school = await School.findOneAndDelete({ _id: schoolId });
  if (!school) {
    throw createCustomError(`No school with id: ${schoolId}`, 404);
  }
  res.status(200).json({
    message: "School deleted",
    data: school,
    success: 1,
  });
});

// admin level controllers
export const adminGetSchool = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  const school = await School.findOne({ _id: schoolId }).populate(
    "departments"
  );
  if (!school) {
    throw createCustomError(`School not found`, 404);
  }
  res.status(200).json({
    message: "School details",
    data: school,
    success: 1,
  });
});

export const adminUpdateSchool = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("school");
  if (!user) {
    throw createCustomError(`Bad request received`, 400);
  }
  const schoolId = user.school;
  const school = await School.findOneAndUpdate({ _id: schoolId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!school) {
    throw createCustomError(`School not found`, 404);
  }
  res.status(200).json({
    message: "School updated",
    data: school,
    success: 1,
  });
});
