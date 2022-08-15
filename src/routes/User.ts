import express from "express";
import UserController from "../controller/UserController";
import isAdmin from "../middleware/isAdmin";
const routes = express.Router();

routes.post("/", isAdmin, UserController.addUser);
routes.delete("/", isAdmin, UserController.deleteUser);
routes.put("/", isAdmin, UserController.updateUser);

export default routes;
