const express = require("express");
const  protect  = require("../middleware/isAuth.js");
const { getDashBoardData } = require("../Controller/dashBoardController.js");

const router = express.Router();

router.get("/", protect , getDashBoardData); // instead of '/dashboard'

module.exports = router; // ✅ This is correct
