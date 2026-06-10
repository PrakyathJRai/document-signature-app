require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* CORS FIRST */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signPdfRoute = require("./routes/signPdfRoute");
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api", signPdfRoute);

app.use("/uploads", express.static("uploads"));

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