"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NewsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "users" },
    slug: { type: String, unique: true },
    avatar: { type: String },
    title: { type: String },
    description: { type: String },
    html: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "categories" },
    status: { type: Boolean },
    view: { type: Number, default: 0 },
}, { timestamps: true });
exports.default = mongoose_1.default.model("news", NewsSchema);
//# sourceMappingURL=News.js.map