const xlsx = require("xlsx");
const fs = require("fs");
const agentModel = require("../model/agentModel");

const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid format." });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // Validate CSV headers
    for (const item of jsonData) {
      if (!item.FirstName || !item.Phone || !item.Notes) {
        return res.status(400).json({
          error:
            "Invalid data format. Required fields: FirstName, Phone, Notes.",
        });
      }
    }

    const agents = await agentModel.find();
    if (!agents.length) {
      return res.status(400).json({ error: "No agents found in the system." });
    }

    // Clear existing items and work fields

    for (const agent of agents) {
      agent.items = [];
      agent.work = 0;
      await agent.save();
    }

    // Distribute tasks equally
    const distributed = Array(agents.length)
      .fill(null)
      .map(() => []);

    jsonData.forEach((item, index) => {
      const i = index % agents.length;
      distributed[i].push({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
      });
    });

    // Assign items and work
    for (let i = 0; i < agents.length; i++) {
      agents[i].items = distributed[i];
      agents[i].work = distributed[i].length;
      await agents[i].save();
    }

    // Delete uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: `File processed and distributed among ${agents.length} agent(s).`,
      agents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error.", details: err.message });
  }
};

module.exports = uploadController;
