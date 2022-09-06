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
const Category_1 = __importDefault(require("../models/Category"));
const News_1 = __importDefault(require("../models/News"));
const Users_1 = __importDefault(require("../models/Users"));
const statisticController = {
    dashboard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield Promise.all([
                Users_1.default.find(),
                Category_1.default.find(),
                News_1.default.find(),
            ]);
            let view = 0;
            result[2].forEach((item) => {
                view += +item.view;
            });
            return res.json({
                success: true,
                data: {
                    users: result[0].length,
                    category: result[1].length,
                    news: result[2].length,
                    view,
                },
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
};
exports.default = statisticController;
//# sourceMappingURL=StatisticController.js.map