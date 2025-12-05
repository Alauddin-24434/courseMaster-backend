import { Router } from "express";
import { authControllers } from "../controllers/auth.controller";

const router = Router();

// ---------------------------
// AUTH ROUTES
// ---------------------------

// Signup
router.post("/signup", authControllers.signup);

// Login
router.post("/login", authControllers.login);

// Refresh Access Token
router.get("/refresh-token", authControllers.refreshToken);

// Logout
router.post("/logout", authControllers.logout);

export const authRouter = router;
