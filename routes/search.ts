import express from "express";
import SearchController from "../controller/SearchController";

const router = express.Router();

router.get("/", SearchController.searchNews);

export default router;
