import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ViewSchema = new Schema({
  newsId: { type: Schema.Types.ObjectId, ref: "news", unique: true },
  view: { type: Number, default: 0 },
});

export default mongoose.model("views", ViewSchema);
