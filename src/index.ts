import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";   // <-- ADD THIS
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { baseRouter } from "./app/routes/baseRouter";
import { Course } from "./app/models/course.schema";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], // frontend URL
  credentials: true                 // cookie allow
}));
app.use(cookieParser());            // <-- USE THIS
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:"CourseMaster server is running"
  })
})
// Routes
app.use("/api/v1", baseRouter);
// POST /api/enroll



// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


// Global Error Handler
app.use(globalErrorHandler);

export default app;
