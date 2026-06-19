const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
  try {
    console.log("=== UPLOAD START ===");
    console.log("FILE:", req.file);

    const document = await Document.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    console.log("=== DOCUMENT SAVED ===");

    res.status(201).json(document);
  } catch (error) {
    console.error("=== UPLOAD ERROR ===");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({
      uploadedAt: -1,
    });

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Day 9 - Delete Document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document =
      await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "..",
      document.filePath
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(id);

    res.status(200).json({
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
};