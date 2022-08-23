import express from "express";
import ViewController from "../controller/ViewController";

const router = express.Router();

router.get("/", ViewController.increaseView);

export default router;
