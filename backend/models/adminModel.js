import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ward: { type: String, required: true }, // The ward this admin manages
    role: { type: String, default: 'admin' }
}, { timestamps: true });

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;