"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StatisticController_1 = __importDefault(require("../controller/StatisticController"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const router = express_1.default.Router();
router.get("/", isAdmin_1.default, StatisticController_1.default.dashboard);
exports.default = router;
//# sourceMappingURL=Statistic.js.map