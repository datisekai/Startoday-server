import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "users" },
    slug: { type: String },
    avatar: { type: String },
    title: { type: String },
    description: { type: String },
    html: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "categories" },
    status: { type: Boolean },
    view: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("news", NewsSchema);
