// controllers/course.controller.ts
import { Request, Response } from "express";
import { courseService } from "../services/course.service";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";
import { Course } from "../models/course.schema";
import { CustomAppError } from "../errors/customError";

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
const getAllCourses = catchAsyncHandler(
  async (_req: Request, res: Response) => {
    const courses = await courseService.getAllCourses();
    res.status(200).json({
      status: "success",
      data: courses,
    });
  }
);

// Get single course
const getCourseById = catchAsyncHandler(async (req: Request, res: Response) => {
  const course = await courseService.getCourseById(req.params.id);
  res.status(200).json({
    status: "success",
    data: course,
  });
});


export const getMyCourses = catchAsyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const courses = await Course.find({ "students.studentId": userId }).select(
    "title thumbnail instructor modules students"
  );

  const coursesResponse = courses.map((course) => {
    // Find the student progress for this user
    const studentProgress = course.students.find(
      (s: any) => s.studentId.toString() === userId.toString()
    );

    // Total lessons in course
    const totalLessons = course.modules.reduce((sum: number, mod: any) => sum + (mod.lessons?.length || 0), 0);

    // Total completed lessons for this student
    const completedLessonsCount = course.modules.reduce((sum: number, mod: any) => {
      const completedInModule = mod.lessons?.filter((les: any) =>
        studentProgress?.completedLessons.includes(les._id.toString())
      ).length || 0;
      return sum + completedInModule;
    }, 0);

    const progressPercentage =
      totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    return {
      _id: course._id,
      title: course.title,
      thumbnail:course.thumbnail,
      totalLessons,
      instructor:course.instructor,
      completedLessonsCount,
      progressPercentage,
    };
  });

  res.status(200).json({
    status: "success",
    message: "Courses fetched successfully",
    data: coursesResponse,
  });
});


// controllers/course.controller.ts

export const completeLesson = async (req: Request, res: Response) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Find student progress
    let student : any= course.students.find(
      (s: any) => s.studentId.toString() === userId.toString()
    );

    if (!student) {
      student = {
        studentId: userId,
        completedLessons: [],
        enrolledAt: new Date(),
        lastActivity: new Date(),
      };
      course.students.push(student);
    }

    // ✅ Prevent duplicate lessonId
    const lessonIdStr = lessonId.toString();
    if (!student.completedLessons.map((l: any) => l.toString()).includes(lessonIdStr)) {
      student.completedLessons.push(lessonId);
      student.lastActivity = new Date();
    }

    await course.save();

    

    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



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

// const enrollCourse = catchAsyncHandler(async (req: Request, res: Response) => {
//   const { courseId } = req.params;
//   const userId = req.user._id;
//   console.log(userId);
//   const course = await courseService.getCourseById(courseId);
//   if (!course) {
//     return res
//       .status(404)
//       .json({ status: "fail", message: "Course not found" });
//   }

//   // Already enrolled check
//   if (course.enrollCounts.includes(userId)) {
//     return res
//       .status(400)
//       .json({ status: "fail", message: "Already enrolled in this course" });
//   }

//   course.enrollCounts.push(userId);
//   await course.save();

//   res.status(200).json({
//     status: "success",
//     message: "Enrolled successfully",
//     data: course,
//   });
// });


const enrollCourse = catchAsyncHandler(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  // Check if already enrolled
  const alreadyEnrolled = course.students.some(
    (s) => s.studentId.toString() === userId.toString()
  );
  if (!alreadyEnrolled) {
    course.students.push({ studentId: userId, completedLessons: [] });
    await course.save();
  }

  res.json({
    success: true,
    message: "Enrolled successfully",
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
  completeLesson
};
