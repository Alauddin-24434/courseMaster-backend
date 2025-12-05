import { Router } from "express";
import { quizController } from "../controllers/quiz.controller";

const router = Router();

router.post("/", quizController.createQuiz);


export const quizRouter = router;
