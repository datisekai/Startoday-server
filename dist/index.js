"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const base_1 = __importDefault(require("./routes/base"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.get("/", (req, res) => {
    res.send("Hello, This is server of datisekai");
});
app.use("/co-ban", base_1.default);
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
    console.log("Server running...." + PORT);
});
//# sourceMappingURL=index.js.map