import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    role: { type: String, default: 'admin' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;