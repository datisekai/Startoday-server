"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ViewSchema = new Schema({
    newsId: { type: Schema.Types.ObjectId, ref: "news", unique: true },
    view: { type: Number, default: 0 },
});
exports.default = mongoose_1.default.model("views", ViewSchema);
//# sourceMappingURL=View.js.map