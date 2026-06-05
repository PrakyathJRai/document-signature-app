require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Document Signature API Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});