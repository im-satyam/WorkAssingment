const express = require("express");
const subagentController = require("../controller/subAgentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add-sub-agent", authMiddleware, subagentController);
module.exports = router;
