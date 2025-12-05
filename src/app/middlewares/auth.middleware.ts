import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.schema";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ status: "fail", message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ status: "fail", message: "Unauthorized" });

    req.user = user; // attach user to req
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

// Role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ status: "fail", message: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: "fail", message: "Forbidden" });
    }
    next();
  };
};
