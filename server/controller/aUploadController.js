const xlsx = require("xlsx");
const fs = require("fs");
const subAgentModel = require("../model/subAgentModel");

const uploadToSubagentsController = async (req, res) => {
  try {
    const userId = req.body.userId; // assuming JWT middleware sets req.user

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid format." });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let jsonData = xlsx.utils.sheet_to_json(sheet);

    // Validate CSV headers
    for (const item of jsonData) {
      if (!item.FirstName || !item.Phone || !item.Notes) {
        return res.status(400).json({
          error:
            "Invalid data format. Required fields: FirstName, Phone, Notes.",
        });
      }
    }

    // Remove duplicate phone entries
    const seenPhones = new Set();
    jsonData = jsonData.filter((item) => {
      if (seenPhones.has(item.Phone)) return false;
      seenPhones.add(item.Phone);
      return true;
    });

    // Get subagents for this agent (user)
    const subagents = await subAgentModel.find({ userId });
    if (!subagents.length) {
      return res
        .status(400)
        .json({ error: "No subagents found for this agent." });
    }

    // Clear existing items and work fields for subagents
    for (const sub of subagents) {
      sub.items = [];
      sub.work = 0;
      await sub.save();
    }

    // Distribute tasks equally
    const distributed = Array(subagents.length)
      .fill(null)
      .map(() => []);

    jsonData.forEach((item, index) => {
      const i = index % subagents.length;
      distributed[i].push({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
      });
    });

    // Assign items and update work count
    for (let i = 0; i < subagents.length; i++) {
      subagents[i].items = distributed[i];
      subagents[i].work = distributed[i].length;
      await subagents[i].save();
    }

    // Delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: `File processed and distributed among ${subagents.length} subagent(s) of the current user.`,
      subagents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error.", details: err.message });
  }
};

module.exports = uploadToSubagentsController;
