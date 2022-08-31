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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// import BaseRoute from "./routes/base";
const category_1 = __importDefault(require("./routes/category"));
const User_1 = __importDefault(require("./routes/User"));
const Role_1 = __importDefault(require("./routes/Role"));
const News_1 = __importDefault(require("./routes/News"));
const Statistic_1 = __importDefault(require("./routes/Statistic"));
const view_1 = __importDefault(require("./routes/view"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const SearchController_1 = __importDefault(require("./controller/SearchController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)());
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.xglhda1.mongodb.net/?retryWrites=true&w=majority`, {});
        console.log("MongoDB connected!");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
connectDB();
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.get("/", (req, res) => {
    res.send("Hello, This is server of datisekai");
});
app.post("/dang-nhap", UserController_1.default.login);
app.get("/tim-kiem", SearchController_1.default.searchNews);
app.use("/nguoi-dung", User_1.default);
app.use("/tin-tuc", News_1.default);
app.use("/loai-nguoi-dung", Role_1.default);
app.use("/thong-ke", Statistic_1.default);
app.use("/luot-xem", view_1.default);
// app.use("/co-ban", BaseRoute);
app.use("/danh-muc", category_1.default);
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
    console.log("Server running...." + PORT);
});
//# sourceMappingURL=index.js.map