"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const routes = express_1.default.Router();
routes.get("/", CategoryController_1.default.getCategory);
routes.post("/", isAdmin_1.default, CategoryController_1.default.addCategory);
routes.delete("/", isAdmin_1.default, CategoryController_1.default.deleteCategory);
exports.default = routes;
//# sourceMappingURL=category.js.map