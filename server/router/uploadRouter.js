const express = require("express");
const multer = require("multer");
const path = require("path");
const uplaodController = require("../controller/uploadController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadToSubagentsController = require("../controller/aUploadController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExt = [".csv", ".xlsx", ".xls"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xlsx and .xls files are allowed"), false);
  }
};
const upload = multer({ storage, fileFilter });

// POST /api/upload

router.post("/upload", upload.single("file"), authMiddleware, uplaodController);
router.post(
  "/agent-upload",
  upload.single("file"),
  authMiddleware,
  uploadToSubagentsController
);

module.exports = router;
