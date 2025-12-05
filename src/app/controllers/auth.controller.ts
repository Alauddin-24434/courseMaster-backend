import { Request, Response } from "express";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";
import { authServices } from "../services/auth.service";
import { loginValidation, signupValidation} from "../validations/auth.validation";
import { IUser, IUserLogin } from "../interfaces/user.inteface";

import dotenv from "dotenv";
import { generateTokens } from "../utils/generateTokens";

dotenv.config();

// ==============================
// SIGNUP CONTROLLER
// ==============================
const signup = catchAsyncHandler(async (req: Request, res: Response) => {
  const validated = signupValidation.parse(req.body);
  console.log("va",validated)
  const user = await authServices.signup(validated as IUser);

  const { accessToken, refreshToken } = generateTokens(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    status: "success",
    message: "User signed up successfully",
    data: {
      user,
      accessToken,
    },
  });
});


// ==============================
// LOGIN CONTROLLER
// ==============================
const login = catchAsyncHandler(async (req: Request, res: Response) => {
  const validated = loginValidation.parse(req.body);

  const user = await authServices.login(
    validated as IUserLogin
  );
  const { accessToken, refreshToken } = generateTokens(user);

  // set new refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      user,
      accessToken,
    },
  });
});


// ==============================
// REFRESH TOKEN CONTROLLER
// ==============================
const refreshToken = catchAsyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  const { accessToken } = await authServices.refreshToken(token);

  res.status(200).json({
    status: "success",
    message: "Access token refreshed",
    data: { accessToken },
  });
});


// ==============================
// LOGOUT CONTROLLER
// ==============================
const logout = catchAsyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});


export const authControllers = {
  signup,
  login,
  refreshToken,
  logout,
};
