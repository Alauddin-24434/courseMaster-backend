import { IUser } from "../interfaces/user.inteface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
// Token generation utility
export const generateTokens = (user: IUser) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
