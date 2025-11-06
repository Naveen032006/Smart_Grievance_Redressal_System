import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // No two employees can have the same email
    },
    phone: { 
        type: String, 
        required: true,
        unique: true // No two employees can have the same phone
    },
    password: { 
        type: String, 
        required: true 
    },
    wardNumber: { 
        type: Number, 
        required: true 
    },
    department: { 
        type: String, 
        required: true // e.g., "Sanitation", "Electrical", "Water Supply"
    },
    jobTitle: {
        type: String,
        required: true // e.g., "Field Worker", "Supervisor"
    },
    role: {
        type: String,
        default: 'employee' // For your auth system, to protect routes
    },
    assignedComplaintsCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], // Only allows these two values
        default: 'Active'
    }
}, { timestamps: true });

const employeeModel = mongoose.models.employee || mongoose.model('employee', employeeSchema);

export default employeeModel;