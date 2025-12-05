import mongoose from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  bio: string | null;
  password: string;
  role: "student" | "admin";
  enrolledCourses: mongoose.Types.ObjectId[];
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}
