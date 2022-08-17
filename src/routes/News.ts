import express from "express";
import NewsController from "../controller/NewsController";
import isAdmin from "../middleware/isAdmin";

const routes = express.Router();

routes.get("/", NewsController.getNews);
routes.get("/:category", NewsController.getNewsByCategory);
routes.get("/view", NewsController.increaseView);
routes.post("/", isAdmin, NewsController.addNews);
routes.put("/", isAdmin, NewsController.updateNews);
routes.delete("/", isAdmin, NewsController.deleteNews);
routes.get("/detail/:slug", NewsController.getNewsBySlug);

export default routes;
