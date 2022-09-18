import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    newsId: { type: Schema.Types.ObjectId, ref: "news" },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "users" },
    parentId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("comments", CommentSchema);
