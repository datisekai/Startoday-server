"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: Number },
    status: { type: Boolean },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", UserSchema);
//# sourceMappingURL=Users.js.map