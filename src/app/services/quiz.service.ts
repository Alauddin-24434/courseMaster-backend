import { CustomAppError } from "../errors/customError";
import { Course } from "../models/course.schema";

export const quizService = {
  createQuiz: async (payload: any) => {
    console.log("QUIZ_PAYLOAD:", JSON.stringify(payload, null, 2));

    const { courseId, moduleId, lessonIndex, quiz } = payload;

    const course = await Course.findById(courseId);
    if (!course) throw new CustomAppError(404, "Course not found");

    const module = course.modules.id(moduleId);
    if (!module) throw new CustomAppError(404, "Module not found");

    const lesson = module.lessons[lessonIndex];
    if (!lesson) throw new CustomAppError(404, "Lesson not found");

    if (!lesson.quiz) {
      lesson.quiz = { questions: [] } as any;
    }

    const cleanedQuestions = quiz.questions.map((q: any) => ({
      question: q.question,
      options: q.options,
      correctAnswer: Number(q.correctAnswer),
    }));

    cleanedQuestions.forEach((q) => {
      lesson.quiz!.questions.push(q);
    });

    return await course.save();
  },
};
