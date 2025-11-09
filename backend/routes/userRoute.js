import express from "express";
import {
  addIssue,
  getAllIssues,
  getIssueById,
  registerUser,
  loginUser,
  getMyIssues,
  likeIssue,
  getAllAdmins,
  getMyWardAdmin,
  getMyWardEmployees,
  getMyWardStats,
  getMyWardIssues,
  deleteMyIssue, // <-- 1. Import new function
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();

// --- Authentication Routes (Public) ---
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// --- Public Issue Routes ---
userRouter.get("/issues", getAllIssues);
userRouter.get("/issue/:id", getIssueById);

// --- Protected Routes (User Must Be Logged In) ---
userRouter.get("/my-issues", authMiddleware, getMyIssues);
userRouter.post("/add-issue", authMiddleware, upload.single("image"), addIssue);
userRouter.patch("/issue/:id/like", authMiddleware, likeIssue);

// --- 2. ADD THIS DELETE ROUTE ---
userRouter.delete("/issue/:id", authMiddleware, deleteMyIssue);

// Protected Routes for Ward/Admin Info
userRouter.get("/admins", authMiddleware, getAllAdmins);
userRouter.get("/my-ward-admin", authMiddleware, getMyWardAdmin);
userRouter.get("/my-ward-employees", authMiddleware, getMyWardEmployees);
userRouter.get("/my-ward-stats", authMiddleware, getMyWardStats);
userRouter.get("/my-ward-issues", authMiddleware, getMyWardIssues);

export default userRouter;
