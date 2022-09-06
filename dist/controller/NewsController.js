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
const News_1 = __importDefault(require("../models/News"));
const Category_1 = __importDefault(require("../models/Category"));
const View_1 = __importDefault(require("../models/View"));
const NewsController = {
    addNews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, avatar = null, title, description, html, category, status = true, } = req.body;
        if (!author || !title || !description || !html || !category) {
            return res.status(404).json({ success: false, message: "Missing field" });
        }
        try {
            const newNews = new News_1.default({
                author,
                avatar,
                title,
                description,
                html,
                category,
                status,
                slug: (0, slugify_1.default)(title.toLowerCase()),
            });
            yield newNews.save();
            const viewsNews = new View_1.default({
                newsId: newNews._id,
            });
            yield viewsNews.save();
            return res.json({ success: true, data: newNews });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    updateNews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, avatar = null, title, description, html, category, status, _id, } = req.body;
        if (!author || !title || !description || !html || !category || !_id) {
            return res.status(404).json({ success: false, message: "Missing field" });
        }
        try {
            const newsUpdate = yield News_1.default.findByIdAndUpdate(_id, {
                author,
                avatar,
                title,
                description,
                html,
                status,
                category,
            });
            return res.json({ success: true, data: newsUpdate });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    deleteNews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id } = req.query;
        if (!_id) {
            return res
                .status(404)
                .json({ success: false, message: "_id is missing" });
        }
        try {
            const newsDelete = yield News_1.default.findByIdAndDelete(_id);
            return res.json({ success: true, data: newsDelete });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getNews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news = yield News_1.default.find()
                .sort("-createdAt")
                .populate("author", "-password -role -status")
                .populate("category");
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getNewsAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const news = yield News_1.default.find()
                .sort("-createdAt")
                .populate("author")
                .populate("category");
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getNewsByCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { category } = req.params;
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Missing category" });
        }
        try {
            const news = yield News_1.default.find({ category, status: true })
                .populate("author")
                .populate("category");
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getNewsByCategorySlug: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { slug } = req.params;
        if (!slug) {
            return res.status(404).json({ success: false, message: "Missing slug" });
        }
        try {
            const category = yield Category_1.default.findOne({ slug });
            const news = yield News_1.default.find({ category: category._id, status: true })
                .populate("author", "-password -role -status")
                .populate("category");
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    increaseView: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { slug } = req.query;
        if (!slug) {
            return res.status(404).json({ success: false, message: "Missing _id" });
        }
        try {
            const currentNews = yield News_1.default.findOne({ slug });
            if (!currentNews) {
                return res
                    .status(404)
                    .json({ success: false, message: "News not found" });
            }
            const view = +currentNews.view;
            const updateViews = yield News_1.default.findOneAndUpdate({ slug }, { view: view + 1 });
            return res.json({
                success: true,
                data: { _id: updateViews._id, view: updateViews.view },
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getNewsBySlug: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { slug } = req.params;
        if (!slug) {
            return res.status(404).json({ success: false, message: "Missing slug" });
        }
        try {
            const news = yield News_1.default.findOne({ slug }).populate("category");
            if (!news) {
                return res
                    .status(404)
                    .json({ success: false, message: "News not found" });
            }
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    getSimilarBySlug: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ success: false, message: "Missing slug" });
        }
        try {
            const news = yield News_1.default.find({ category: id })
                .populate("category")
                .populate("author", "-password -role -status");
            if (!news) {
                return res
                    .status(404)
                    .json({ success: false, message: "News not found" });
            }
            return res.json({ success: true, data: news });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = NewsController;
//# sourceMappingURL=NewsController.js.map