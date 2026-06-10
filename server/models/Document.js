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

    status: {
      type: String,
      default: "Pending"
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