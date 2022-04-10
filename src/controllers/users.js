import User from "../models/User.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";

export const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
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
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    runValidators: true,
  });

  if (!user) {
    throw new createCustomError(`No user with id : ${userId}`, 404);
  }
  res.status(200).json({
    message: "User updated",
    data: user,
    success: 1,
  });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new createCustomError(`No user with id: ${userId}`, 404);
  }
  res.status(200).json({
    message: "User Deleted",
    data: user,
    success: 1,
  });
});
