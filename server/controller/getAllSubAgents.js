const subAgentModel = require("../model/subAgentModel");
const getAllSubAgent = async (req, res) => {
  try {
    const subagents = await subAgentModel.find({ userId: req.body.userId });
    return res.status(200).json(subagents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getAllSubAgent;
