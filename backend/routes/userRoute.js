import express from 'express';
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
    getMyWardStats
} from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router();

// --- Authentication Routes (Public) ---
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// --- Public Issue Routes ---
userRouter.get('/issues', getAllIssues);
userRouter.get('/issue/:id', getIssueById);

// --- Protected Routes (User Must Be Logged In) ---
userRouter.get('/my-issues', authMiddleware, getMyIssues);
userRouter.post('/add-issue', authMiddleware, upload.single('image'), addIssue);
userRouter.patch('/issue/:id/like', authMiddleware, likeIssue);

// Protected Routes for Ward/Admin Info
userRouter.get('/admins', authMiddleware, getAllAdmins); // Gets ALL admins
userRouter.get('/my-ward-admin', authMiddleware, getMyWardAdmin); // Gets user's specific admin
userRouter.get('/my-ward-employees', authMiddleware, getMyWardEmployees); // Gets user's ward employees
userRouter.get('/my-ward-stats', authMiddleware, getMyWardStats); // Gets user's ward stats

export default userRouter;