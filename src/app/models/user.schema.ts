import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.inteface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    bio: { type: String, default: null },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    avatar: { type: String, default: null },
  },

  { timestamps: true, versionKey: false }
);

export const User = mongoose.model<IUser>("User", userSchema);
