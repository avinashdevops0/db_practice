require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

["APP_PORT","DB_HOST","DB_USER","DB_PASSWORD","DB_NAME"].forEach(k => {
  if (!process.env[k]) throw new Error(`Missing ${k}`);
});

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get("/api/notifications", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM notifications");
  res.json(rows);
});

app.listen(process.env.APP_PORT, () =>
  console.log(`Service B running on ${process.env.APP_PORT}`)
);
