const express = require("express");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();

router.post("/sign-pdf", async (req, res) => {
  try {
    const { pdfUrl, signature } = req.body;

    if (!pdfUrl || !signature) {
      return res
        .status(400)
        .json({ message: "Missing data" });
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

    const signedPdfBytes =
      await pdfDoc.save();

    const signedName =
      "signed-" + fileName;

    const signedPath = path.join(
      __dirname,
      "../uploads",
      signedName
    );

    fs.writeFileSync(
      signedPath,
      signedPdfBytes
    );

    res.json({
      downloadUrl:
        `http://localhost:5000/uploads/${signedName}`,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;