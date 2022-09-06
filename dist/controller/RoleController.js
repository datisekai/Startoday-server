"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = __importDefault(require("../models/Role"));
const RoleController = {
    addRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, _id } = req.body;
        if (!name || !_id) {
            return res
                .status(404)
                .json({ success: false, message: "Name or _id is missing" });
        }
        try {
            const newRole = new Role_1.default({
                name,
                _id: _id,
            });
            yield newRole.save();
            return res.json({ success: true, data: newRole });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    deleteRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.body;
        if (!_id) {
            return res
                .status(404)
                .json({ success: false, message: "_id is missing" });
        }
        try {
            const roleDelete = yield Role_1.default.findByIdAndDelete(_id);
            return res.json({ success: true, data: roleDelete });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roles = yield Role_1.default.find().sort("-createdAt");
            return res.json({ success: true, data: roles });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = RoleController;
//# sourceMappingURL=RoleController.js.map