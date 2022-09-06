"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const routes = express_1.default.Router();
routes.post("/", isAdmin_1.default, UserController_1.default.addUser);
routes.delete("/", isAdmin_1.default, UserController_1.default.deleteUser);
routes.put("/", isAdmin_1.default, UserController_1.default.updateUser);
routes.get("/", isAdmin_1.default, UserController_1.default.getUser);
routes.get("/:_id", isAdmin_1.default, UserController_1.default.getUserbyId);
exports.default = routes;
//# sourceMappingURL=User.js.map