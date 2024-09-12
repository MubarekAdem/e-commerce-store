// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "customer"],
    required: true,
    default: "customer",
  }, // Add role
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
