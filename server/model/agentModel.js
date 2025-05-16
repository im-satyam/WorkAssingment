const mongoose = require("mongoose");
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone No. is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    work: {
      type: Number,
      default: 0,
    },
    items: [
      {
        firstName: String,
        phone: String,
        notes: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("agents", agentSchema);
