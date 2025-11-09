import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import issueModel from "../models/issueModel.js";
import adminModel from "../models/adminModel.js";
import employeeModel from "../models/employeeModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { userid, password } = req.body;

    // 1. Find the admin
    const admin = await adminModel.findOne({ userid });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Create TOKEN PAYLOAD (for auth)
    const payload = {
      user: {
        id: admin._id,
        role: admin.role,
        wardNumber: admin.wardNumber,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 4. Create ADMIN INFO (for frontend UI)
    const adminInfo = {
      userid: admin.userid,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      wardNumber: admin.wardNumber,
      city: admin.city,
      address: admin.address,
    };

    // 5. Send BOTH the token and the info
    res.json({ success: true, token, adminInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API for admin to get issues *for their ward*
const getIssuesForAdmin = async (req, res) => {
  try {
    // Get the admin's ward from the token (put there by authMiddleware)
    const adminWardNumber = req.user.wardNumber;

    // Find issues where the issue's wardNumber matches the admin's
    const issues = await issueModel
      .find({ wardNumber: adminWardNumber })
      .populate("user", "userid")
      .populate("assignedTo", "name department") // <-- Also get assigned employee's info
      .sort({ createdAt: -1 });

    res.json({ success: true, data: issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching issues" });
  }
};

// --- FIX #1: This is the correct, full update function ---
// It replaces your old 'updateIssueStatus'
const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Get all data from the form
    const { status, assignedTo, actionTaken, notes } = req.body;

    // 2. Find the issue before updating it
    const issue = await issueModel.findById(id);
    if (!issue) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found" });
    }
    const oldAssignee = issue.assignedTo;

    // 3. Create the update payload
    const updatePayload = {
      status,
      assignedTo: assignedTo === "Unassigned" ? null : assignedTo,
      actionTaken: actionTaken,
      actionNotes: notes,
    };

    // 4. Update the issue in the database
    const updatedIssue = await issueModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
    });

    // 5. Update employee complaint counts
    const newAssignee = updatedIssue.assignedTo;

    if (oldAssignee && oldAssignee.toString() !== newAssignee?.toString()) {
      // Decrement old employee's count
      await employeeModel.findByIdAndUpdate(oldAssignee, {
        $inc: { assignedComplaintsCount: -1 },
      });
    }
    if (newAssignee && newAssignee.toString() !== oldAssignee?.toString()) {
      // Increment new employee's count
      await employeeModel.findByIdAndUpdate(newAssignee, {
        $inc: { assignedComplaintsCount: 1 },
      });
    }

    res.json({
      success: true,
      message: "Issue updated successfully",
      data: updatedIssue,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error updating issue." });
  }
};

// API for Admin to create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, jobTitle } = req.body;
    const adminWardNumber = req.user.wardNumber;

    if (!name || !email || !phone || !department || !jobTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }
    if (!adminWardNumber) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Admin is not associated with a ward.",
        });
    }

    const emailExists = await employeeModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Employee with this email already exists.",
        });
    }

    const tempPassword = Math.random().toString(36).slice(2, 10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    const newEmployee = new employeeModel({
      name,
      email,
      phone,
      password: hashedPassword,
      wardNumber: adminWardNumber,
      department,
      jobTitle,
    });
    const savedEmployee = await newEmployee.save();

    const employeeData = savedEmployee.toObject();
    delete employeeData.password;

    res.json({
      success: true,
      message: "Employee created successfully.",
      data: employeeData,
      tempPassword: tempPassword,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error creating employee." });
  }
};

// --- FIX #2: This function now filters by the admin's ward ---
const getAllEmployees = async (req, res) => {
  try {
    // 1. Get the admin's ward number from their token
    const adminWardNumber = req.user.wardNumber;

    // 2. Find only employees in that ward
    const employees = await employeeModel
      .find({ wardNumber: adminWardNumber })
      .select("-password");
    res.json({ success: true, data: employees });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching employees." });
  }
};

// API for Admin to update an employee's status
const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Active", "Inactive"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status provided." });
    }

    const updatedEmployee = await employeeModel
      .findByIdAndUpdate(id, { status: status }, { new: true })
      .select("-password");

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found." });
    }
    res.json({
      success: true,
      message: `Employee status updated to ${status}.`,
      data: updatedEmployee,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error updating employee status.",
      });
  }
};

// --- UPDATE YOUR EXPORTS ---
export {
  loginAdmin,
  updateIssue, // <-- Use the new function name
  getIssuesForAdmin,
  createEmployee,
  getAllEmployees,
  updateEmployeeStatus,
};
