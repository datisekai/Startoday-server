"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    newsId: { type: Schema.Types.ObjectId, ref: "news" },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "users" },
    parentId: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model("comments", CommentSchema);
//# sourceMappingURL=Comments.js.map