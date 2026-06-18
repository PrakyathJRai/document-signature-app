const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    // Original document status
    status: {
      type: String,
      default: "Pending",
    },

    // Day 9 - Store signed PDF path
    signedPdfPath: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: String,
      default: "User",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model(
  "Document",
  documentSchema
);