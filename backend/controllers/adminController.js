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
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Create TOKEN PAYLOAD (for auth)
    const payload = {
      user: {
        id: admin._id,
        role: admin.role,
        wardNumber: admin.wardNumber
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
      address: admin.address 
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
    const issues = await issueModel.find({ wardNumber: adminWardNumber })// <-- THE FILTER
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

// --- 3. ADD THIS ENTIRE NEW FUNCTION ---
/**
 * @route   POST /api/admin/employee
 * @desc    Admin creates a new employee
 * @access  Private (Admin Only)
 */
const createEmployee = async (req, res) => {
    try {
        // --- 1. 'password' and 'wardNumber' are REMOVED from req.body ---
        const { name, email, phone, department, jobTitle } = req.body;

        // --- 2. Get the admin's ward number from their token ---
        const adminWardNumber = req.user.wardNumber;
        if (!adminWardNumber) {
            return res.status(403).json({ success: false, message: "Admin is not associated with a ward." });
        }

        // 1. Check if all fields are provided
        if (!name || !email || !phone || !department || !jobTitle) {
            return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }

        // 2. Check if employee already exists
        const emailExists = await employeeModel.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Employee with this email already exists." });
        }
        // ... (you can add a phoneExists check too)

        // --- 3. Generate a temporary password ---
        // This creates an 8-character random string (e.g., "k7b2x8f1")
        const tempPassword = Math.random().toString(36).slice(2, 10);
        
        // 4. Hash the temporary password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(tempPassword, salt);

        // 5. Create the new employee
        const newEmployee = new employeeModel({
            name,
            email,
            phone,
            password: hashedPassword, // <-- Save the hash
            wardNumber: adminWardNumber, // <-- Use the admin's ward
            department,
            jobTitle
        });

        const savedEmployee = await newEmployee.save();

        // 6. Send back the new employee (without the password)
        const employeeData = savedEmployee.toObject();
        delete employeeData.password;

        // --- 7. Send the temporary password back to the admin ---
        // The admin MUST see this one time to give it to the employee
        res.json({ 
            success: true, 
            message: "Employee created successfully.", 
            data: employeeData,
            tempPassword: tempPassword // <-- Send the plain password back
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error creating employee." });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        // Find all employees and remove their password field
        const employees = await employeeModel.find({}).select('-password');
        res.json({ success: true, data: employees });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error fetching employees." });
    }
};

const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get employee ID from URL
    const { status } = req.body; // Get new status ('Active' or 'Inactive') from body

    // 1. Validate the status
    if (!status || !['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status provided." });
    }

    // 2. Find and update the employee
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return the updated document
    ).select('-password'); // Don't send the password back

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    // 3. Send back the updated employee data
    res.json({ success: true, message: `Employee status updated to ${status}.`, data: updatedEmployee });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error updating employee status." });
  }
};

// Export the new function
export { loginAdmin, updateIssueStatus, getIssuesForAdmin, createEmployee,getAllEmployees,updateEmployeeStatus };