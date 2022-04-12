import User from "../models/User.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";

const setQueryObject = (query) => {
  const { school, admin, teacher, student } = query;
  const queryObject = {};
  if (school) {
    queryObject.school = school;
  }
  if (admin) {
    queryObject["admin.isAdmin"] = admin === "true" ? true : false;
  }
  if (teacher) {
    queryObject["teacher.isTeacher"] = teacher === "true" ? true : false;
  }
  if (student) {
    queryObject["student.isStudent"] = student === "true" ? true : false;
  }
  return queryObject;
};

export const getUsers = asyncWrapper(async (req, res) => {
  const queryObj = setQueryObject(req.query);
  let sortValue = { createdAt: 1 };
  // sort users
  if (req.query.sort) {
    sortValue = { sort: 1 };
  }
  const users = await User.find(queryObj).populate("school").sort(sortValue);

  res.status(200).json({
    message: "Users",
    data: users,
    success: 1,
  });
});

export const getUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new createCustomError(`No user with id: ${userId}`, 404);
  }
  res.status(200).json({
    message: "User details",
    data: user,
    success: 1,
  });
});

export const updateUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  let user = await User.findOne({ _id: userId });
  if (!user) {
    throw new createCustomError(`No user with id : ${userId}`, 404);
  }

  if ("admin" in req.body)
    req.body.admin = { ...user.admin, ...req.body.admin };
  if ("teacher" in req.body)
    req.body.teacher = { ...user.teacher, ...req.body.teacher };
  if ("student" in req.body)
    req.body.student = { ...user.student, ...req.body.student };

  user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User updated",
    data: user,
    success: 1,
  });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOneAndDelete({ _id: userId });

  if (!user) {
    throw new createCustomError(`No user with id: ${userId}`, 404);
  }
  res.status(200).json({
    message: "User Deleted",
    data: user,
    success: 1,
  });
});

// Logged in user route

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new createCustomError(`User not found`, 404);
  }
  res.status(200).json({
    message: "User details",
    data: user,
    success: 1,
  });
});

export const updateProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  let user = await User.findOne({ _id: userId });
  if (!user) {
    throw new createCustomError(`User not found : ${userId}`, 404);
  }

  if ("admin" in req.body)
    req.body.admin = { ...user.admin, ...req.body.admin };
  if ("teacher" in req.body)
    req.body.teacher = { ...user.teacher, ...req.body.teacher };
  if ("student" in req.body)
    req.body.student = { ...user.student, ...req.body.student };

  user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User updated",
    data: user,
    success: 1,
  });
});

// School User route
export const schoolGetUsers = asyncWrapper(async (req, res) => {
  const schoolUserId = req.user.id;
  const schoolUser = await User.findOne({ _id: schoolUserId }).select("school");
  if (!schoolUser) {
    throw new createCustomError(`User not Authorized`, 401);
  }
  req.query.school = schoolUser.school;
  const queryObj = setQueryObject(req.query);
  let sortValue = { createdAt: 1 };
  // sort users
  if (req.query.sort) {
    sortValue = { sort: 1 };
  }
  const users = await User.find(queryObj).sort(sortValue);

  res.status(200).json({
    message: "User details",
    data: users,
    success: 1,
  });
});

export const schoolGetUser = asyncWrapper(async (req, res) => {
  const schoolUserId = req.user.id;
  const schoolUser = await User.findOne({ _id: schoolUserId }).select("school");
  if (!schoolUser) {
    throw new createCustomError(`User not Authorized`, 401);
  }
  const schoolId = schoolUser.school;
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId, school: schoolId });
  if (!user) {
    throw new createCustomError(`User not found`, 404);
  }
  res.status(200).json({
    message: "User details",
    data: user,
    success: 1,
  });
});

export const schoolUpdateUser = asyncWrapper(async (req, res) => {
  const schoolUserId = req.user.id;
  const schoolUser = await User.findOne({ _id: schoolUserId }).select("school");
  if (!schoolUser) {
    throw new createCustomError(`User not Authorized`, 401);
  }
  const schoolId = schoolUser.school;
  const userId = req.params.id;
  let user = await User.findOne({ _id: userId, school: schoolId });
  if (!user) {
    throw new createCustomError(`User not found`, 404);
  }
  if ("admin" in req.body)
    req.body.admin = { ...user.admin, ...req.body.admin };
  if ("teacher" in req.body)
    req.body.teacher = { ...user.teacher, ...req.body.teacher };
  if ("student" in req.body)
    req.body.student = { ...user.student, ...req.body.student };

  user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User updated",
    data: user,
    success: 1,
  });
});
