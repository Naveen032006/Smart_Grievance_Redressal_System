import validator from "validator"
import {v2 as cloudinary} from "cloudinary"
import issueModel from "../models/issueModel.js"
import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import adminModel from "../models/adminModel.js";

// --- Helper function to create a token ---
const createToken = (userId) => {
    const payload = {
        user: {
            id: userId,
            role: 'user' // Set role to 'user'
        }
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// API for a logged-in user to get all admin details
const getAllAdmins = async (req, res) => {
  try {
    // Find all admins and remove their passwords
    const admins = await adminModel.find({}).select('-password');
    
    res.json({ success: true, data: admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching admins" });
  }
};

// --- (registerUser and loginUser functions are the same as you provided) ---

// API for User Registration
const registerUser = async (req, res) => {
    try {
        const { userid, password } = req.body;
        const exists = await userModel.findOne({ userid });
        if (exists) {
            return res.status(400).json({ success: false, message: "User ID already exists" });
        }
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            userid: userid,
            password: hashedPassword 
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error during registration" });
    }
};

// API for User Login
const loginUser = async (req, res) => {
    try {
        const { userid, password } = req.body;
        const user = await userModel.findOne({ userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error during login" });
    }
};


// API for adding issue
const addIssue = async (req, res) => {
    try {
        const { issueTitle, category, location, description } = req.body;
        const imageFile = req.file;
        
        if(!issueTitle || !category || !location || !description){
                return res.json({success:false,message:"Missing Details"})
            }
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const issueData = {
            issueTitle,
            category,
            location,
            description,
            image: imageUrl,
            user: req.user.id 
        };

        const newIssue = new issueModel(issueData);
        await newIssue.save();

        res.json({ success: true, message: "issue added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// --- (getAllIssues, getIssueById, getMyIssues are the same) ---
const getAllIssues = async (req, res) => {
  try {
    const issues = await issueModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issues" });
  }
};

const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await issueModel.findById(id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }
    res.json({ success: true, data: issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issue" });
  }
};

const getMyIssues = async (req, res) => {
  try {
    const userId = req.user.id;
    const issues = await issueModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching user's issues" });
  }
};


// --- ADD THIS NEW FUNCTION ---
/**
 * @route   PATCH /api/user/issue/:id/like
 * @desc    Like an issue
 * @access  Private
 */
const likeIssue = async (req, res) => {
  try {
    // Find the issue by its ID
    const issue = await issueModel.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    // Use $inc to increment the likeCount by 1
    const updatedIssue = await issueModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true } // This returns the updated document
    );

    res.json({ success: true, likeCount: updatedIssue.likeCount });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- UPDATE YOUR EXPORTS ---
export { 
  addIssue, 
  getAllIssues, 
  getIssueById, 
  registerUser, 
  loginUser, 
  getMyIssues,
  getAllAdmins,
  likeIssue // <-- Export the new function
};