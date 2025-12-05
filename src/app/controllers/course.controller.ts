// controllers/course.controller.ts
import { Request, Response } from "express";
import { courseService } from "../services/course.service";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";

// Create Course
const createCourse = catchAsyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.createCourse(req.body);
  res.status(201).json({
    status: "success",
    message: "Course created successfully",
    data: course,
  });
});

// Get all courses
const getAllCourses = catchAsyncHandler(async (_req: Request, res: Response) => {
  const courses = await courseService.getAllCourses();
  res.status(200).json({
    status: "success",
    data: courses,
  });
});

// Get single course
const getCourseById = catchAsyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseById(req.params.id);
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Update Course
const updateCourse = catchAsyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    message: "Course updated successfully",
    data: course,
  });
});

// Delete Course
const deleteCourse = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await courseService.deleteCourse(req.params.id);
  res.status(200).json({
    status: "success",
    message: result.message,
  });
});

const enrollCourse = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.user._id; 
console.log(userId)
  const course = await courseService.getCourseById(courseId);
  if (!course) {
    return res.status(404).json({ status: "fail", message: "Course not found" });
  }

  // Already enrolled check
  if (course.enrollCounts.includes(userId)) {
    return res.status(400).json({ status: "fail", message: "Already enrolled in this course" });
  }

  course.enrollCounts.push(userId);
  await course.save();

  res.status(200).json({
    status: "success",
    message: "Enrolled successfully",
    data: course,
  });
});
export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse
};
