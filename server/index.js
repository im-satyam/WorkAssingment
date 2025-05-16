const express = require("express");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();
app.use("/v1", require("./router/authRouter"));
app.use("/v1", require("./router/agentRouter"));
app.use("/v1", require("./router/uploadRouter"));
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
