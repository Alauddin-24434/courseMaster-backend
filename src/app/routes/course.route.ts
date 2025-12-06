// routes/course.routes.ts
import { Router } from "express";
import { courseController } from "../controllers/course.controller";
import { authorize, protect } from "../middlewares/auth.middleware";

const router = Router();
router.post("/", protect, authorize("admin"), courseController.createCourse);
router.get("/", courseController.getAllCourses);

// STATIC ROUTES FIRST
router.get("/my-courses", protect, authorize("student"), courseController.getMyCourses);
router.post("/enroll/:courseId", protect, courseController.enrollCourse);
router.post("/complete-lesson", protect, courseController.completeLesson);

// DYNAMIC ROUTES LAST
router.get("/:id", courseController.getCourseById);
router.put("/:id", protect, authorize("admin"), courseController.updateCourse);
router.delete("/:id", protect, authorize("admin"), courseController.deleteCourse);


export const courseRouter = router;
