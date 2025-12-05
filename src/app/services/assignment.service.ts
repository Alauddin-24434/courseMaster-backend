import { CustomAppError } from "../errors/customError";
import { AssignmentSchema } from "../models/assignment.schema";

import { Course } from "../models/course.schema";

export const assignmentService = {
    createAssignment: async (payload) => {
        const course = await Course.findOne({
            _id: payload.courseId,
            "modules._id": payload.moduleId,
        });

        if (!course)
            throw new CustomAppError(404, "Module not found in this course");

        const module = course.modules.id(payload.moduleId);
        if (!module) throw new CustomAppError(404, "Module not found");

        const lesson = module.lessons[payload.lessonIndex];
        if (!lesson) throw new CustomAppError(404, "Lesson not found");

        // ✅ FIXED: assignment object build kore set korbo
        lesson.assignment = {
            description: payload.description,
            submissionType: payload.submissionType,
        };

        await course.save();

        return lesson.assignment;
    }
}