import { Schema} from "mongoose";

export const AssignmentSchema = new Schema({
  description: { type: String, required: true },
  submissionType: { type: String, enum: ["text", "link"], default: "text" },
});
