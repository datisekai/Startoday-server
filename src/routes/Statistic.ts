import express from "express";
import statisticController from "../controller/StatisticController";
import isAdmin from "../middleware/isAdmin";
const router = express.Router();

router.get("/", isAdmin, statisticController.dashboard);
export default router;
