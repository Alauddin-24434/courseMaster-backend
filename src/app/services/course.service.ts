// services/course.service.ts

import { ICourse } from "../interfaces/course.interface";
import { CustomAppError } from "../errors/customError";
import { Course } from "../models/course.schema";

// Create Course
const createCourse = async (payload: ICourse) => {
  console.log(payload)
  const course = await Course.create(payload);
  
  return course;
};

// Get all courses
const getAllCourses = async () => {
  const courses = await Course.find();
  return courses;
};

// Get single course
const getCourseById = async (id: string) => {
  const course = await Course.findById(id);
  if (!course) throw new CustomAppError(404, "Course not found");
  return course;
};

// Update Course
const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const course = await Course.findByIdAndUpdate(id, payload, { new: true });
  if (!course) throw new CustomAppError(404, "Course not found");
  return course;
};

// Delete Course
const deleteCourse = async (id: string) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw new CustomAppError(404, "Course not found");
  return { message: "Course deleted successfully" };
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
