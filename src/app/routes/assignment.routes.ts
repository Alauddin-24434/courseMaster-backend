import { Router } from "express";
import { assignmentController } from "../controllers/assignment.controller";

const router = Router();

router.post("/", assignmentController.createAssignment);


export const assignmentRouter = router;
