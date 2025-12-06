import { Course } from "../models/course.schema";
import { CustomAppError } from "../errors/customError";

// Add Module to Course
const addModule = async (courseId: string, moduleData: { title: string }) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  course.modules.push({ title: moduleData.title, lessons: [] });
  await course.save();
  return course.modules[course.modules.length - 1]; // return added module
};

// Update Module
const updateModule = async (
  courseId: string,
  moduleId: string,
  payload: Partial<{ title: string }>
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  const mod = course.modules.id(moduleId);
  if (!mod) throw new CustomAppError(404, "Module not found");

  if (payload.title) mod.title = payload.title;
  await course.save();
  return mod;
};

const getModulesByCourseId = async (courseId: string, studentId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  // Find the student progress object
 // studentId ধরে student progress বের করা
const studentProgressDoc = course.students.find(
  (s: any) => s.studentId.toString() == studentId
);
  console.log(studentProgressDoc)

  const completedLessons = studentProgressDoc?.completedLessons;
// প্রতিটি module এর জন্য
const modules = course.modules.map((mod: any) => {
  // module এর lesson এর মধ্যে student কতটা complete করেছে
  const completedCount = mod.lessons.filter((les: any) =>
    completedLessons.includes(les._id)
  ).length;

  const lessonCount = mod.lessons.length;

  const progressPercentage =
    lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0;

  return {
    _id: mod._id,
    title: mod.title,
    lessonCount,
    completedCount,
    progressPercentage,
    lessons: mod.lessons.map((les: any) => ({
      _id: les._id,
      title: les.title,
      duration: les.duration,
      videoUrl: les.videoUrl,
    })),
  };
});


  
  return { modules};
};



// Get all Modules for a course
const getAllModules = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  return course.modules;
};

// Add Lesson to Module
const addLesson = async (payload) => {
  console.log(payload);

  const course = await Course.findById(payload.courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  // FIX: find module by _id, NOT index
  const mod = course.modules.id(payload.moduleId);
  if (!mod) throw new CustomAppError(404, "Module not found");

  // Only push lesson fields, not whole payload
  mod.lessons.push({
    title: payload.title,
    videoUrl: payload.videoUrl,
    duration: payload.duration,
  });

  await course.save();
  return mod.lessons[mod.lessons.length - 1];
};


// Get Lesson by Id
const getLessonById = async (
  courseId: string,
  moduleId: string,
  lessonId: string
) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  const mod = course.modules.id(moduleId);
  if (!mod) throw new CustomAppError(404, "Module not found");

  const lesson = mod.lessons.id(lessonId);
  if (!lesson) throw new CustomAppError(404, "Lesson not found");

  return lesson;
};

// Get all Lessons of a module
const getAllLessons = async (courseId: string, moduleId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new CustomAppError(404, "Course not found");

  const mod = course.modules.id(moduleId);
  if (!mod) throw new CustomAppError(404, "Module not found");

  return mod.lessons;
};

export const moduleService = {
  addModule,
  updateModule,
  getModulesByCourseId,
  getAllModules,
  addLesson,
  getLessonById,
  getAllLessons,
};
