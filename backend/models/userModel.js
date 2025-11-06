import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true }, // Make userid unique
    password: { type: String, required: true },// Fixed 'reuired' typo
    wardNumber: { type: Number, required: true }
}, { timestamps: true }); // Add timestamps

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;