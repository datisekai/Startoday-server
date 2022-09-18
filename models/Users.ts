import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: Number },
    status: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
