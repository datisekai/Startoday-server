import express from "express";
import RoleController from "../controller/RoleController";
import isAdmin from "../middleware/isAdmin";

const routes = express.Router();

routes.get("/", isAdmin, RoleController.getRole);
routes.post("/", isAdmin, RoleController.addRole);
routes.delete("/", isAdmin, RoleController.deleteRole);

export default routes;
