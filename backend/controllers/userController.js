import { v2 as cloudinary } from "cloudinary";
import issueModel from "../models/issueModel.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import employeeModel from "../models/employeeModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// --- Helper function to create a token ---
const createToken = (userId, wardNumber) => {
  const payload = {
    user: {
      id: userId,
      role: "user",
      wardNumber: wardNumber,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --- API for User Registration ---
const registerUser = async (req, res) => {
  try {
    const { userid, password, wardNumber } = req.body;

    if (!userid || !password || !wardNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    const exists = await userModel.findOne({ userid });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User ID already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      userid: userid,
      password: hashedPassword,
      wardNumber: wardNumber,
    });
    const user = await newUser.save();

    const token = createToken(user._id, user.wardNumber);
    const userInfo = {
      userid: user.userid,
      wardNumber: user.wardNumber,
    };

    res.json({ success: true, token, userInfo });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error during registration" });
  }
};

// --- API for User Login ---
const loginUser = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await userModel.findOne({ userid });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id, user.wardNumber);
    const userInfo = {
      userid: user.userid,
      wardNumber: user.wardNumber,
    };

    res.json({ success: true, token, userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
};

// --- API for adding issue ---
const addIssue = async (req, res) => {
  try {
    const { issueTitle, category, location, description } = req.body;
    const imageFile = req.file;

    if (!issueTitle || !category || !location || !description) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const issueData = {
      issueTitle,
      category,
      location,
      wardNumber: user.wardNumber,
      description,
      image: imageUrl,
      user: req.user.id,
    };
    const newIssue = new issueModel(issueData);
    await newIssue.save();
    res.json({ success: true, message: "issue added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// --- API for liking/unliking an issue ---
const likeIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user.id;

    const issue = await issueModel.findById(issueId);
    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    let updatedIssue;
    if (issue.likes.includes(userId)) {
      // UNLIKE
      updatedIssue = await issueModel.findByIdAndUpdate(
        issueId,
        { $pull: { likes: userId }, $inc: { likeCount: -1 } },
        { new: true }
      );
    } else {
      // LIKE
      updatedIssue = await issueModel.findByIdAndUpdate(
        issueId,
        { $addToSet: { likes: userId }, $inc: { likeCount: 1 } },
        { new: true }
      );
    }
    res.json({ success: true, data: updatedIssue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- API for getting all public issues ---
const getAllIssues = async (req, res) => {
  try {
    const issues = await issueModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issues" });
  }
};

// --- API for getting a single issue ---
const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await issueModel.findById(id);
    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }
    res.json({ success: true, data: issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issue" });
  }
};

// --- API for getting the user's own issues (UPDATED) ---
const getMyIssues = async (req, res) => {
  try {
    const userId = req.user.id;
    const issues = await issueModel
      .find({ user: userId })
      .populate("assignedTo", "name department") // <-- Populates assigned employee
      .sort({ createdAt: -1 });

    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user's issues" });
  }
};

// --- API for a user to delete their *own* issue (NEW) ---
const deleteMyIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user.id;

    // Find the issue
    const issue = await issueModel.findById(issueId);
    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    // Security Check: Make sure the user owns this issue
    if (issue.user.toString() !== userId) {
      return res
        .status(401)
        .json({
          success: false,
          message: "User not authorized to delete this issue",
        });
    }

    // Only allow deleting if it's still 'Pending'
    if (issue.status !== "Pending") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot cancel an issue that is already in progress.",
        });
    }

    // If assigned, decrement employee's count (if it was somehow assigned)
    if (issue.assignedTo) {
      await employeeModel.findByIdAndUpdate(issue.assignedTo, {
        $inc: { assignedComplaintsCount: -1 },
      });
    }

    // Delete the issue
    await issueModel.findByIdAndDelete(issueId);

    res.json({ success: true, message: "Complaint successfully cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- API for getting all admins (for users) ---
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({}).select("-password");
    res.json({ success: true, data: admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching admins" });
  }
};

// --- API for user to get their *specific* ward admin ---
const getMyWardAdmin = async (req, res) => {
  try {
    const userWardNumber = req.user.wardNumber;
    if (!userWardNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User is not assigned to a ward." });
    }
    const admin = await adminModel
      .findOne({ wardNumber: userWardNumber })
      .select("-password");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "No admin found for this ward." });
    }
    res.json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ward admin" });
  }
};

// --- API for a user to get employees for their *own* ward ---
const getMyWardEmployees = async (req, res) => {
  try {
    const userWardNumber = req.user.wardNumber;
    if (!userWardNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User is not assigned to a ward." });
    }
    const employees = await employeeModel
      .find({
        wardNumber: userWardNumber,
        status: "Active",
      })
      .select("-password -role");
    res.json({ success: true, data: employees });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ward employees" });
  }
};

// --- API for user to get their *own* ward stats ---
const getMyWardStats = async (req, res) => {
  try {
    const userWardNumber = req.user.wardNumber;
    if (!userWardNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User is not assigned to a ward." });
    }
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const stats = await issueModel.aggregate([
      { $match: { wardNumber: userWardNumber } },
      {
        $facet: {
          totalComplaints: [{ $count: "count" }],
          pendingComplaints: [
            { $match: { status: "Pending" } },
            { $count: "count" },
          ],
          resolvedThisMonth: [
            {
              $match: {
                status: { $in: ["Resolved", "Closed"] },
                updatedAt: { $gte: startOfMonth },
              },
            },
            { $count: "count" },
          ],
          avgResolutionTime: [
            { $match: { status: { $in: ["Resolved", "Closed"] } } },
            {
              $project: {
                resolutionTime: { $subtract: ["$updatedAt", "$createdAt"] },
              },
            },
            { $group: { _id: null, avgTime: { $avg: "$resolutionTime" } } },
          ],
        },
      },
    ]);
    const getCount = (arr) => arr[0]?.count || 0;
    const getAvgDays = (arr) => {
      if (!arr[0] || !arr[0].avgTime) return 0;
      return (arr[0].avgTime / (1000 * 60 * 60 * 24)).toFixed(1);
    };
    const finalStats = {
      totalComplaints: getCount(stats[0].totalComplaints),
      pendingComplaints: getCount(stats[0].pendingComplaints),
      resolvedThisMonth: getCount(stats[0].resolvedThisMonth),
      avgResolutionTime: getAvgDays(stats[0].avgResolutionTime),
    };
    res.json({ success: true, data: finalStats });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ward stats" });
  }
};

// --- API for user to get all issues for *their* ward ---
const getMyWardIssues = async (req, res) => {
  try {
    const userWardNumber = req.user.wardNumber;
    if (!userWardNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User is not assigned to a ward." });
    }
    const issues = await issueModel
      .find({ wardNumber: userWardNumber })
      .populate("user", "userid")
      .populate("assignedTo", "name department") // Also populate employee
      .sort({ createdAt: -1 });
    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ward issues" });
  }
};

// --- EXPORT ALL FUNCTIONS ---
export {
  addIssue,
  getAllIssues,
  getIssueById,
  registerUser,
  loginUser,
  getMyIssues,
  getAllAdmins,
  likeIssue,
  getMyWardAdmin,
  getMyWardEmployees,
  getMyWardStats,
  getMyWardIssues,
  deleteMyIssue,
};
