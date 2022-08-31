import express from "express";
import NewsController from "../controller/NewsController";
import isAdmin from "../middleware/isAdmin";
import router from "./Statistic";

const routes = express.Router();

routes.get("/", NewsController.getNews);
routes.get("/:category", NewsController.getNewsByCategory);
routes.get("/view/increase", NewsController.increaseView);
routes.post("/", isAdmin, NewsController.addNews);
routes.put("/", isAdmin, NewsController.updateNews);
routes.delete("/", isAdmin, NewsController.deleteNews);
routes.get("/detail/:slug", NewsController.getNewsBySlug);
routes.get("/similar/:id", NewsController.getSimilarBySlug);

export default routes;
