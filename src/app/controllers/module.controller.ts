import { Request, Response } from "express";
import { moduleService } from "../services/module.service";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";

// Modules
const addModule = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId, title } = req.body;
  const module = await moduleService.addModule(courseId, { title });
  res.status(201).json({ status: "success", data: module });
});

const updateModule = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId, moduleId } = req.params;
  const module = await moduleService.updateModule(courseId, moduleId, req.body);
  res.status(200).json({ status: "success", data: module });
});

const getModuleByCourseId = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const studentId = req.user?._id;
  console.log("s",studentId)
  const module = await moduleService.getModulesByCourseId(courseId, studentId);
  res.status(200).json({ status: "success", data: module });
});

const getAllModules = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const modules = await moduleService.getAllModules(courseId);
  res.status(200).json({ status: "success", data: modules });
});

// Lessons
const addLesson = catchAsyncHandler(async (req: Request, res: Response) => {
 
  const lesson = await moduleService.addLesson(req.body);
  res.status(201).json({ status: "success", data: lesson });
});

const getLessonById = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId, moduleId, lessonId } = req.params;
  const lesson = await moduleService.getLessonById(courseId, moduleId, lessonId);
  res.status(200).json({ status: "success", data: lesson });
});

const getAllLessons = catchAsyncHandler(async (req: Request, res: Response) => {
  const { courseId, moduleId } = req.params;
  const lessons = await moduleService.getAllLessons(courseId, moduleId);
  res.status(200).json({ status: "success", data: lessons });
});

export const moduleController = {
  addModule,
  updateModule,
  getModuleByCourseId,
  getAllModules,
  addLesson,
  getLessonById,
  getAllLessons,
};
