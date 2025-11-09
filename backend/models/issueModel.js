import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueTitle: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    likeCount: { type: Number, default: 0 },

    // --- THIS IS THE NEW FIELD ---
    // It stores an array of User IDs that have liked this issue
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    // ---------------------------

    status: {
      type: String,
      required: true,
      enum: ["Pending", "In-Progress", "Resolved", "Closed"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      default: null,
    },
    actionNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const issueModel =
  mongoose.models.issue || mongoose.model("issue", issueSchema);

export default issueModel;
