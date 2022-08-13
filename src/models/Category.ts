import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    parentId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categories", CategorySchema);
