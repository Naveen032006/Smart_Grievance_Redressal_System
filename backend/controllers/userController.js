    import validator from "validator"
    import {v2 as cloudinary} from "cloudinary"
    import issueModel from "../models/issueModel.js"
    import userModel from "../models/userModel.js"
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcrypt';

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

// API for User Registration
const registerUser = async (req, res) => {
    try {
        const { userid, password } = req.body;

        // 1. Check if user already exists
        const exists = await userModel.findOne({ userid });
        if (exists) {
            return res.status(400).json({ success: false, message: "User ID already exists" });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        // 3. Create the new user
        const newUser = new userModel({
            userid: userid,
            password: hashedPassword // Store the HASHED password
        });

        // 4. Save the user and create a token
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

        // 1. Find the user by their userid
        const user = await userModel.findOne({ userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 2. Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // 3. If match, create a token
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
        
        // --- Upload image to cloudinary ---
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const issueData = {
            issueTitle,
            category,
            location,
            description,
            image: imageUrl,
            // --- HERE IS THE LINK ---
            // Get the user's ID from the middleware
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

// API for getting all issues
const getAllIssues = async (req, res) => {
  try {
    // Find all issues and sort them (newest first)
    const issues = await issueModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issues" });
  }
};

// API for getting a single issue by its ID
const getIssueById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL (e.g., /api/user/issue/12345)
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

export { addIssue, getAllIssues, getIssueById, registerUser, loginUser };