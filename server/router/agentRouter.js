const express = require("express");
const agentController = require("../controller/agentController");

const router = express.Router();

router.post("/add-agent", agentController);
module.exports = router;
