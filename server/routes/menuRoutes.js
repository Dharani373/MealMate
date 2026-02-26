const express = require("express");
const router = express.Router();
const { addMenuItem, getMenuItems } = require("../controllers/menuController");

router.post("/add", addMenuItem);
router.get("/", getMenuItems);

module.exports = router;
