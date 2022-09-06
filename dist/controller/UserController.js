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
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, status = 1, role = 0 } = req.body;
        if (!email || !password) {
            return res
                .status(404)
                .json({ success: false, message: "Email or password missing" });
        }
        try {
            const newUser = new Users_1.default({
                email,
                password,
                status,
                role,
            });
            yield newUser.save();
            return res.json({ success: true, data: newUser });
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, status, role } = req.body;
        if (!email || !password) {
            return res
                .status(404)
                .json({ success: false, message: "Email or password missing" });
        }
        try {
            const currentUser = yield Users_1.default.findOne({ email });
            if (!currentUser) {
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }
            const userUpdate = yield Users_1.default.findOneAndUpdate({ _id: currentUser._id }, { password, status, role });
            return res.json({ success: true, data: userUpdate });
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.query;
        if (!_id) {
            return res.status(404).json({ success: false, message: "Missing _id" });
        }
        try {
            const userDelete = yield Users_1.default.findByIdAndDelete(_id);
            return res.json({ success: true, data: userDelete });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email && !password) {
            return res
                .status(404)
                .json({ success: false, message: "Email or password is missing!" });
        }
        try {
            const currentUser = yield Users_1.default.findOne({ email });
            if (!currentUser) {
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }
            if (password !== currentUser.password) {
                return res
                    .status(404)
                    .json({ success: false, message: "Email or password incorrect" });
            }
            if (currentUser.status !== true) {
                return res
                    .status(404)
                    .json({ success: false, message: "Your account was blocked!" });
            }
            const token = jsonwebtoken_1.default.sign({
                email: currentUser.email,
                role: currentUser.role,
                status: currentUser.status,
                _id: currentUser._id,
            }, process.env.JWT_SECRET, { expiresIn: "12h" });
            return res.json({
                success: true,
                data: {
                    token,
                    user: {
                        _id: currentUser._id,
                        email: currentUser.email,
                        role: currentUser.role,
                        status: currentUser.status,
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield Users_1.default.find().sort("-createdAt");
            return res.json({ success: true, data: users });
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getUserbyId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.params;
        if (!_id) {
            return res.status(404).json({ success: false, message: "Missing _id" });
        }
        try {
            const user = yield Users_1.default.findById(_id);
            return res.json({ success: true, data: user });
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map