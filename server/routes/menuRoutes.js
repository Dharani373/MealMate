import express from "express";
import { addMenuItem, getMenuItems } from "../controllers/menuController.js";

const router = express.Router();

router.post("/add", addMenuItem);
router.get("/", getMenuItems);

export default router;
