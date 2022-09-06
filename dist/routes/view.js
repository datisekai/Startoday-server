"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ViewController_1 = __importDefault(require("../controller/ViewController"));
const router = express_1.default.Router();
router.get("/", ViewController_1.default.increaseView);
exports.default = router;
//# sourceMappingURL=view.js.map