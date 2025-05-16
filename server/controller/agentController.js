const bcrypt = require("bcryptjs");

const agentModel = require("../model/agentModel");

const agentController = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const agent = new agentModel(req.body);
    await agent.save();

    return res.status(201).send({
      success: true,
      message: "Agent added successfully",
      agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in agent API",
      error,
    });
  }
};

module.exports = agentController;
