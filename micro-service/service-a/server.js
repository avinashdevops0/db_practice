// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql2/promise");

// ["APP_PORT","DB_HOST","DB_USER","DB_PASSWORD","DB_NAME"].forEach(k => {
//   if (!process.env[k]) throw new Error(`Missing ${k}`);
// });

// const app = express();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// app.get("/api/messages", async (req, res) => {
//   const [rows] = await pool.query("SELECT * FROM messages");
//   res.json(rows);
// });

// app.listen(process.env.APP_PORT, () =>
//   console.log(`Service A running on ${process.env.APP_PORT}`)
// );

// ++++++++++++++++++++++++++++++++++++++++++++ Service - service connection ++++++++++++++++++++++++++++++++++++++++++++

require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const axios = require("axios");

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/**
 * Local data
 */
app.get("/api/messages", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM messages");
  res.json(rows);
});

/**
 * 🔥 Service-to-Service call
 */
app.get("/api/messages-with-notifications", async (req, res) => {
  try {
    const [messages] = await pool.query("SELECT * FROM messages");

    const notificationsResp = await axios.get(
      `${process.env.SERVICE_B_BASE_URL}/internal/notifications`
    );

    res.json({
      messages,
      notifications: notificationsResp.data
    });
  } catch (err) {
    console.error("Service B call failed:", err.message);
    res.status(500).json({ error: "Service B unavailable" });
  }
});

app.listen(process.env.APP_PORT, () =>
  console.log(`Service A running on ${process.env.APP_PORT}`)
);
