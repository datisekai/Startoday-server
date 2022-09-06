"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NewsController_1 = __importDefault(require("../controller/NewsController"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const routes = express_1.default.Router();
routes.get("/", NewsController_1.default.getNews);
routes.get("/:category", NewsController_1.default.getNewsByCategory);
routes.get("/view/increase", NewsController_1.default.increaseView);
routes.post("/", isAdmin_1.default, NewsController_1.default.addNews);
routes.put("/", isAdmin_1.default, NewsController_1.default.updateNews);
routes.delete("/", isAdmin_1.default, NewsController_1.default.deleteNews);
routes.get("/detail/:slug", NewsController_1.default.getNewsBySlug);
routes.get("/similar/:id", NewsController_1.default.getSimilarBySlug);
exports.default = routes;
//# sourceMappingURL=News.js.map