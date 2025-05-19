const express = require("express");
const getAllAgent = require("../controller/getAllAgents");

const router = express.Router();

router.get("/get-agent", getAllAgent);
module.exports = router;
