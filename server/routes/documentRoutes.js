const express = require("express");
const multer = require("multer");

const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

router.get("/", getDocuments);

module.exports = router;