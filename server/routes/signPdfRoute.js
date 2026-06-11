const express = require("express");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const DocumentModel = require("../models/Document");

const router = express.Router();

router.post("/sign-pdf", async (req, res) => {
  try {
    const { pdfUrl, signature } = req.body;

    if (!pdfUrl || !signature) {
      return res.status(400).json({
        success: false,
        message: "Missing data",
      });
    }

    const fileName = pdfUrl.split("/").pop();

    const pdfPath = path.join(
      __dirname,
      "../uploads",
      fileName
    );

    const pdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const page = pdfDoc.getPages()[0];

    const pngImage = await pdfDoc.embedPng(signature);

    page.drawImage(pngImage, {
      x: 50,
      y: 50,
      width: 150,
      height: 70,
    });

    const signedPdfBytes = await pdfDoc.save();

    const signedName = "signed-" + fileName;

    const signedPath = path.join(
      __dirname,
      "../uploads",
      signedName
    );

    fs.writeFileSync(
      signedPath,
      signedPdfBytes
    );

    console.log("File Name:", fileName);

    const updatedDoc = await DocumentModel.findOneAndUpdate(
      {
        filePath: {
          $regex: fileName.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          ),
        },
      },
      {
        status: "Signed",
      },
      {
        new: true,
      }
    );

    console.log("Updated Document:", updatedDoc);

    res.status(200).json({
      success: true,
      message: "PDF signed successfully and document status updated.",
      downloadUrl: `http://localhost:5000/uploads/${signedName}`,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Error signing PDF",
      error: err.message,
    });
  }
});

module.exports = router;