import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true, index:true },

}, { timestamps: true, versionKey: false });

export const Category= mongoose.model("Category", CategorySchema);
