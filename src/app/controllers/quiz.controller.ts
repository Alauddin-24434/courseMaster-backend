import { Request, Response } from "express";
import { quizService } from "../services/quiz.service";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";

export const quizController = {
    createQuiz: catchAsyncHandler(async (req: Request, res: Response) => {
        const quiz = await quizService.createQuiz(req.body);
        res.status(201).json({ success: true, data: quiz });
    }),
}