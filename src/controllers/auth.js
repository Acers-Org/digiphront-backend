import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncWrapper from "../middlewares/async.js";
import BadRequestError from "../utils/errors/bad-request.js";
//import generatePassword from "../utils/generate-password.js";

const payload = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
      issuer: "digiphront",
    }
  );

  delete user._doc.password;
  return { user: user, token: token };
};

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    throw new BadRequestError("Please provide email and password");
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new BadRequestError("Please provide email and password");
  }
  const data = payload(user);
  res.status(200).json({
    message: "Login Successful",
    data: data,
    success: 1,
  });
});

export const register = asyncWrapper(async (req, res) => {
  const { email, firstname, lastname } = req.body;
  const password = `${firstname}.${lastname}`.toLowerCase();
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  //Check if email already exist
  let user = await User.findOne({ email: email });
  if (user) {
    throw new BadRequestError("Email already exists");
  }

  user = await User.create({ ...req.body, password });
  delete user._doc.password;

  res.status(200).json({
    message: "User registration successful.",
    data: user,
    success: 1,
  });
});
