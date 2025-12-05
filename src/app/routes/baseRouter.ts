// routes/baseRouter.ts
import { Router } from "express";
import { authRouter } from "./auth.route";
import { courseRouter } from "./course.route";
import { categoryRouter } from "./category.route";
import { moduleRouter } from "./module.routes";
import { assignmentRouter } from "./assignment.routes";
import { quizRouter } from "./quiz.routes";

const router = Router();

// Define all routes in an array
const routes = [
  { path: "/auth", handler: authRouter },
  { path: "/courses", handler: courseRouter },
  { path: "/categories", handler: categoryRouter },
  { path: "/modules", handler: moduleRouter },
  { path: "/assignments", handler: assignmentRouter },
  { path: "/quizs", handler: quizRouter },
];

// Attach all routes using forEach
routes.forEach((route) => {
  router.use(route.path, route.handler);
});

export const baseRouter = router;
