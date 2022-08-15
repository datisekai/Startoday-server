import express from "express";
import CategoryController from "../controller/CategoryController";
import isAdmin from "../middleware/isAdmin";

const routes = express.Router();

routes.get("/", CategoryController.getCategory);
routes.post("/", isAdmin, CategoryController.addCategory);
routes.delete("/", isAdmin, CategoryController.deleteCategory);

export default routes;
