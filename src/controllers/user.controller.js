import {
  registerUserService,
  loginUserService,
} from "../services/user.service.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const { user, token } = await registerUserService({
    fullName,
    email,
    password,
    role,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: user,
    token: token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUserService({ email, password });

  res.status(200).json({
    success: true,
    message: "User loggedIn successfully",
    user,
    token,
  });
});
