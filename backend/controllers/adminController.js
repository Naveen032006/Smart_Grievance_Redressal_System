import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import issueModel from "../models/issueModel.js";
import adminModel from "../models/adminModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { userid, password } = req.body;

    // 2. Find the admin in the database
    const admin = await adminModel.findOne({ userid });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // 3. Compare the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 4. Create a payload with the admin's info (INCLUDING THE WARD)
    const payload = {
      user: {
        id: admin._id, // Use the database ID
        role: admin.role,
        ward: admin.ward // <-- This is the key
      },
    };

    // 5. Sign the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API for admin to get issues *for their ward*
const getIssuesForAdmin = async (req, res) => {
  try {
    // Get the admin's ward from the token (put there by authMiddleware)
    const adminWard = req.user.ward;

    const issues = await issueModel.find({ location: adminWard }) // <-- THE FILTER
        .populate('user', 'userid') 
        .sort({ createdAt: -1 });

    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issues" });
  }
};

// API for admin to update an issue's status
const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get issue ID from URL
    const { status } = req.body; // Get new status from request body

    // --- THIS IS THE ONLY CHANGE ---
    // Validate if the status is one of the allowed values from the React form
    if (!["Pending", "In-Progress", "Resolved", "Closed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Find the issue by its ID and update it
    const updatedIssue = await issueModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // This option returns the *updated* document
    );

    if (!updatedIssue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }

    res.json({ success: true, message: "Status updated", data: updatedIssue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Export the new function
export { loginAdmin, updateIssueStatus, getIssuesForAdmin };