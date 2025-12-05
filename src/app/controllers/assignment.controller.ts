import { Request, Response } from "express";
import { assignmentService } from "../services/assignment.service";
import { catchAsyncHandler } from "../utils/catchAsyncHandler";

const createAssignment = catchAsyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json({ success: true, data: assignment });
  }
);



export const assignmentController = {
    createAssignment,
   
};
