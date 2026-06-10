const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
  try {
    const document = await Document.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    res.status(201).json(document);
  } catch (error) {
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

module.exports = {
  uploadDocument,
  getDocuments,
};