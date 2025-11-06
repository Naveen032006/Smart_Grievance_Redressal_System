import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import issueModel from "../models/issueModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { userid, password } = req.body;

    // 1. Check user ID
    if (userid === process.env.ADMIN_ID) {
      // 2. Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD_HASH
      );

      if (isMatch) {
        // Inside the 'if (isMatch)' block:

        // Create a payload with non-sensitive info
        const payload = {
          user: {
            id: userid,
            role: "admin",
          },
        };

        // Sign the payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1d", // Good practice to add an expiration
        });

        res.json({ success: true, token });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" }); // <-- Add status
      }
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message }); // <-- Add status
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
export { loginAdmin, updateIssueStatus };