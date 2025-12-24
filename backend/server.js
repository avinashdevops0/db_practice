const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "mysql-db",   // 🔥 container name
  user: "root",
  password: "rootpassword",
  database: "testdb"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/api/message", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
