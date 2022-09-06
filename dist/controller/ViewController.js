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
const View_1 = __importDefault(require("../models/View"));
const ViewController = {
    increaseView: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { slug } = req.query;
        if (!slug) {
            return res.status(404).json({ success: false, message: "Missing slug" });
        }
        try {
            const currentNews = yield News_1.default.findOne({ slug });
            if (!currentNews) {
                return res
                    .status(404)
                    .json({ success: false, message: "News not found" });
            }
            const currentViews = yield View_1.default.findOne({ newsId: currentNews._id });
            if (!currentViews) {
                return res
                    .status(404)
                    .json({ success: false, message: "News not found" });
            }
            const newView = Number(currentViews.view) + 1;
            const views = yield View_1.default.findOneAndUpdate({ _id: currentViews._id }, { view: newView });
            return res.json({ success: true, data: views });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = ViewController;
//# sourceMappingURL=ViewController.js.map