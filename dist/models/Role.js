"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose_1.default.Schema;
const RoleSchema = new Schema({
    name: { type: String },
    _id: { type: Number },
}, {
    timestamps: true,
    _id: false,
});
// RoleSchema.plugin(AutoIncrement);
exports.default = mongoose_1.default.model("roles", RoleSchema);
//# sourceMappingURL=Role.js.map