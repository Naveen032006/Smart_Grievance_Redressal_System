import express from 'express'
import { addIssue,getAllIssues,getIssueById,registerUser,loginUser } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'
import { authMiddleware } from '../middlewares/auth.js';

const userRouter = express.Router()

// --- Authentication Routes ---
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// --- Protected Issue Routes ---
// This route now requires a valid user token
userRouter.post('/add-issue', authMiddleware, upload.single('image'), addIssue);

// GET (Read all)
userRouter.get('/issues', getAllIssues);

// GET (Read one by ID)
userRouter.get('/issue/:id', getIssueById);

export default userRouter;