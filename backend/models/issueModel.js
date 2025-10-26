import mongoose from "mongoose"

const issueSchema = new mongoose.Schema({
  issueTitle: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true }, // I'm using the simple string fix here
  description: { type: String, required: true },
  image: { type: String, default: '' },
  likeCount: { type:Number,default:0},
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'In Progress', 'Resolved'], // Only allows these values
    default: 'Pending' 
  },
  user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', // This 'user' must match the model name in userModel.js
        required: true 
    }
}, { timestamps: true });

const issueModel = mongoose.models.issue || mongoose.model('issue', issueSchema)

export default issueModel