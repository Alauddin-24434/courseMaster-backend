import { Schema} from "mongoose";

export const QuizSchema = new Schema({
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true },
    },
  ],
});