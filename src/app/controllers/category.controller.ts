import { Request, Response } from "express";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";
import { categoryService } from "../services/category.service";

// GET all categories
const getCategories = catchAsyncHandler(async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ status: "success", data: categories });
});

// CREATE a category
const createCategory = catchAsyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({ status: "success", data: category });
});

// UPDATE a category
const updateCategory = catchAsyncHandler(async (req: Request, res: Response) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.status(200).json({ status: "success", data: category });
});

// DELETE a category
const deleteCategory = catchAsyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(req.params.id);
  res.status(200).json({ status: "success", data: result });
});

export const categoryController = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
