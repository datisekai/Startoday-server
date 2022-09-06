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
const slugify_1 = __importDefault(require("slugify"));
const Category_1 = __importDefault(require("../models/Category"));
const CategoryController = {
    addCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, parentId } = req.body;
            const newCategory = new Category_1.default({
                name,
                parentId: parentId || null,
                slug: (0, slugify_1.default)(name.toLowerCase()),
            });
            yield newCategory.save();
            return res.json({ message: true, data: newCategory });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Category_1.default.find();
            return res.json({ success: true, data });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.query;
        if (!_id) {
            return res
                .status(404)
                .json({ success: false, message: "_id is missing" });
        }
        try {
            const categoryDelete = yield Category_1.default.findByIdAndDelete(_id);
            return res.json({ success: true, data: categoryDelete });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map