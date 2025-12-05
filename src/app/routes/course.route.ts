// routes/course.routes.ts
import { Router } from "express";
import { courseController } from "../controllers/course.controller";
import { authorize, protect } from "../middlewares/auth.middleware";

const router = Router();


router.post("/", protect, authorize("admin"), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", protect, authorize("admin"), courseController.updateCourse);
router.delete("/:id", protect, authorize("admin"), courseController.deleteCourse);


router.post("/enroll/:courseId", protect,courseController.enrollCourse);

export const courseRouter=router;
