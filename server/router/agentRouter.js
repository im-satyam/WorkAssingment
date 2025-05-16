const express = require("express");
const agentController = require("../controller/agentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-agent", authMiddleware, agentController);
module.exports = router;
