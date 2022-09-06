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
const News_1 = __importDefault(require("../models/News"));
const SearchController = {
    searchNews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { text, category, page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        if (!text && !category) {
            return res
                .status(404)
                .json({ success: false, message: "Missing text or category" });
        }
        try {
            if (text && !category) {
                const textReg = new RegExp(text.toString(), "i");
                const result = yield News_1.default.find({ title: textReg, status: true })
                    .skip(skip)
                    .limit(Number(limit));
                return res.json({ success: true, data: result });
            }
            if (!text && category) {
                const result = yield News_1.default.find({ category, status: true })
                    .skip(skip)
                    .limit(Number(limit));
                return res.json({ success: true, data: result });
            }
            if (text && category) {
                const textReg = new RegExp(text.toString(), "i");
                const result = yield News_1.default.find({
                    title: textReg,
                    status: true,
                    category,
                })
                    .skip(skip)
                    .limit(Number(limit));
                return res.json({ success: true, data: result });
            }
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = SearchController;
//# sourceMappingURL=SearchController.js.map