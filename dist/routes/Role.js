"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoleController_1 = __importDefault(require("../controller/RoleController"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const routes = express_1.default.Router();
routes.get("/", isAdmin_1.default, RoleController_1.default.getRole);
routes.post("/", isAdmin_1.default, RoleController_1.default.addRole);
routes.delete("/", isAdmin_1.default, RoleController_1.default.deleteRole);
exports.default = routes;
//# sourceMappingURL=Role.js.map