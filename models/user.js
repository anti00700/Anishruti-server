import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  mainrole: {
      type: String,
      default: "user",
    },
  subscription: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
  resetPasswordExpire: Date,
}, {
  timestamps: true,
});

// Only create the model if it doesn't exist
export const User = mongoose.models.User || mongoose.model("User", UserSchema);