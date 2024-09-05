import express from "express";
import sqlite from "sqlite3";
sqlite.verbose();
import cors from "cors";
import { Parser } from "json2csv";

const app = express();

const db = new sqlite.Database(
  "./scrabble.db",
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");

      // Create the users table if it doesn't exist
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          score INTEGER NOT NULL
        )`,
        (err) => {
          if (err) {
            console.error("Error creating users table:", err.message);
          } else {
            console.log("Users table is ready.");
          }
        }
      );
    }
  }
);

app.use(cors());
app.use(express.json());

app.post("/api/save", (req, res) => {
  const { name, score } = req.body;
  db.run(
    "INSERT INTO users (name, score) VALUES (?, ?)",
    [name, score],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User score saved!" });
    }
  );

  console.log("Received data:", { name, score });
});

app.get("/api/export", (req, res) => {
  db.all("SELECT name, score FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
