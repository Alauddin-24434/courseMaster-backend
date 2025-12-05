
import { User } from "../models/user.schema";
import { CustomAppError } from "../errors/customError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, IUserLogin } from "../interfaces/user.inteface";
// ============================
//  SIGNUP SERVICE
// ============================
const signup = async (payload: IUser) => {
  const isExistUser = await User.findOne({ email: payload.email });
  if (isExistUser) throw new CustomAppError(400, "User already exist");

  const hashedPassword = await bcrypt.hash(payload.password!, 12);

  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  const userObj = newUser.toObject();
  delete userObj.password;
  return userObj;
};

// ============================
//  LOGIN SERVICE
// ============================
const login = async (payload: IUserLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw new CustomAppError(400, "User not found");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new CustomAppError(400, "Invalid credentials");

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;

};

// ============================
//  REFRESH TOKEN SERVICE
// ============================
const refreshToken = async (token: string) => {
  if (!token) throw new CustomAppError(401, "No refresh token provided");

  
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
    };

    const newAccessToken = jwt.sign(
      { id: decoded.id},
      process.env.JWT_SECRET!,
      { expiresIn:"1h" }
    );

    return { accessToken: newAccessToken };
  
};

// ============================
//  LOGOUT SERVICE
// ============================
const logout = async () => {
  return { message: "Logged out successfully" };
};

export const authServices = {
  signup,
  login,
  refreshToken,
  logout,
};
