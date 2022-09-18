import mongoose from "mongoose";
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: { type: String },
    _id: { type: Number },
  },
  {
    timestamps: true,
    _id: false,
  }
);
// RoleSchema.plugin(AutoIncrement);

export default mongoose.model("roles", RoleSchema);
