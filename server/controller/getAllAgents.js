const agentModel = require("../model/agentModel");

const getAllAgent = async (req, res) => {
  try {
    const agents = await agentModel.find();

    return res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = getAllAgent;
