import express from "express";
import CategoryController from "../controller/CategoryController";

const routes = express.Router();

routes.get("/", CategoryController.getCategory);
routes.post("/", CategoryController.addCategory);

export default routes;
