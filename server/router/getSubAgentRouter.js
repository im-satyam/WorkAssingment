const express = require("express");
const getAllSubAgent = require("../controller/getAllSubAgents");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get-sub-agent", authMiddleware, getAllSubAgent);
module.exports = router;
