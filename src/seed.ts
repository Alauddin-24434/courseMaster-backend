import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./app/models/user.schema";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    // Connect to DB
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("123456", 12);

    // Create admin user
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      avatar: null,
    });

    console.log("Admin created successfully:", admin);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
