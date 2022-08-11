"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const baseController_1 = __importDefault(require("../controller/baseController"));
const routes = express_1.default.Router();
routes.get("/", baseController_1.default.vnExpress);
routes.get("/chi-tiet", baseController_1.default.chiTietVnExpress);
exports.default = routes;
//# sourceMappingURL=base.js.map