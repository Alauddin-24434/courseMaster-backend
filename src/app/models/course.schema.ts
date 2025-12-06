import mongoose, { Schema } from "mongoose";
import { AssignmentSchema } from "./assignment.schema";
import { QuizSchema } from "./quiz.schema";
const LessonSchema = new Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  assignment: { type: AssignmentSchema, default: null },
  quiz: { type: QuizSchema, default: null },
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  lessons: [LessonSchema],
});

// ⭐ ADD THIS FOR STUDENT PROGRESS
const StudentProgressSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  completedLessons: [{ type: Schema.Types.ObjectId }],
  enrolledAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    thumbnail: { type: String, required: true },
    previewVideo: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    instructor: { type: String, default: null },

    batch: {
      title: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, default: null },
    },

    modules: [ModuleSchema],

    // ⭐ New: Proper enrollment + progress tracking
    students: [StudentProgressSchema],

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
