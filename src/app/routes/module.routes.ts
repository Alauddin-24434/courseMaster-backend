import { Router } from "express";
import { moduleController } from "../controllers/module.controller";

const router = Router({ mergeParams: true });

// Module routes
router.post("/", moduleController.addModule); // add module
router.put("/:moduleId", moduleController.updateModule); // update module
router.get("/:moduleId", moduleController.getModuleById); // get single module
router.get("/", moduleController.getAllModules); // get all modules

// Lesson routes
router.post("/lessons", moduleController.addLesson); // add lesson
router.get("/:moduleId/lessons/:lessonId", moduleController.getLessonById); // get lesson
router.get("/:moduleId/lessons", moduleController.getAllLessons); // get all lessons

export const moduleRouter = router;
