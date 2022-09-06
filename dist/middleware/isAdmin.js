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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Missing token",
        });
    try {
        const detoken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (detoken && detoken.role === 1 && detoken.status === true) {
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "Token incorrect" });
        }
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Error Token",
        });
    }
});
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map