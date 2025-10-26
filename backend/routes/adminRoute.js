import express from 'express';
// Import your new controller and middleware
import { loginAdmin, updateIssueStatus } from '../controllers/adminController.js';
import {authMiddleware,adminOnlyMiddleware} from '../middlewares/auth.js';

const adminRouter = express.Router();

// Public route
adminRouter.post('/login', loginAdmin);

// Protected route
// The authMiddleware will run FIRST. If it passes, updateIssueStatus will run next.
adminRouter.patch('/issue/:id', authMiddleware, adminOnlyMiddleware, updateIssueStatus);

export default adminRouter;