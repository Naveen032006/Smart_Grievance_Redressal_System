import express from 'express';
import { 
    addIssue, 
    getAllIssues, 
    getIssueById, 
    registerUser, 
    loginUser, 
    getMyIssues,
    getAllAdmins,
    likeIssue // <-- 1. Import likeIssue
} from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router();

// --- Authentication Routes ---
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// --- Protected Issue Routes ---
userRouter.get('/my-issues', authMiddleware, getMyIssues);
userRouter.post('/add-issue', authMiddleware, upload.single('image'), addIssue);

// --- 2. ADD THIS NEW PROTECTED ROUTE ---
userRouter.patch('/issue/:id/like', authMiddleware, likeIssue);

// --- Public Issue Routes ---
userRouter.get('/issues', getAllIssues);
userRouter.get('/issue/:id', getIssueById);

// Protected route for users to get the admin list
userRouter.get('/admins', authMiddleware, getAllAdmins);

export default userRouter;