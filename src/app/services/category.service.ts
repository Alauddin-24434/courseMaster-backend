import { CustomAppError } from "../errors/customError";
import { ICategory } from "../interfaces/course.interface";
import { Category } from "../models/category.schema";

const getAllCategories = async (): Promise<ICategory[]> => {
  return await Category.find().sort({ createdAt: -1 });
};

const createCategory = async (payload: ICategory): Promise<ICategory> => {
  const exist = await Category.findOne({ name: payload.name });
  if (exist) throw new CustomAppError(400, "Category already exists");

  return await Category.create(payload);
};

const updateCategory = async (id: string, payload: Partial<ICategory>): Promise<ICategory | null> => {
  const category = await Category.findByIdAndUpdate(id, payload, { new: true });
  if (!category) throw new CustomAppError(404, "Category not found");
  return category;
};

const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new CustomAppError(404, "Category not found");
  return { message: "Category deleted successfully" };
};

export const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
