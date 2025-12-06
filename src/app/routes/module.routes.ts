import { Router } from "express";
import { moduleController } from "../controllers/module.controller";
import { authorize, protect } from "../middlewares/auth.middleware";

const router = Router({ mergeParams: true });

// Module routes
router.post("/", moduleController.addModule); // add module

router.get(
  "/:courseId",
  protect,
  authorize("student"),
  moduleController.getModuleByCourseId
);
router.get("/", moduleController.getAllModules); // get all modules

// Lesson routes
router.post("/lessons", moduleController.addLesson); // add lesson
router.get("/:moduleId/lessons/:lessonId", moduleController.getLessonById); // get lesson
router.get("/:moduleId/lessons", moduleController.getAllLessons); // get all lessons

export const moduleRouter = router;
