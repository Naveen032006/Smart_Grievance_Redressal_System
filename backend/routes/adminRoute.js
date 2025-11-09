import express from "express";
// Import your new controller and middleware
import {
  loginAdmin,
  updateIssue,
  getIssuesForAdmin,
  createEmployee,
  getAllEmployees,
  updateEmployeeStatus,
} from "../controllers/adminController.js";
import { authMiddleware, adminOnlyMiddleware } from "../middlewares/auth.js";

const adminRouter = express.Router();

// Public route
adminRouter.post("/login", loginAdmin);

// Protected route
// The authMiddleware will run FIRST. If it passes, updateIssueStatus will run next.
adminRouter.patch(
  "/issue/:id",
  authMiddleware,
  adminOnlyMiddleware,
  updateIssue
);
adminRouter.get(
  "/issues",
  authMiddleware,
  adminOnlyMiddleware,
  getIssuesForAdmin
);

// Admin route to create a new employee
adminRouter.post(
  "/employee",
  authMiddleware,
  adminOnlyMiddleware,
  createEmployee
);

adminRouter.get(
  "/employees",
  authMiddleware,
  adminOnlyMiddleware,
  getAllEmployees
);

adminRouter.patch(
  "/employee/:id/status",
  authMiddleware,
  adminOnlyMiddleware,
  updateEmployeeStatus
);

export default adminRouter;
