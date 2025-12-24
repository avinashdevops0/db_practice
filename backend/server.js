require("dotenv").config(); // MUST be first

const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

app.get("/api/message", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`🚀 Backend running on port ${process.env.APP_PORT}`);
});
