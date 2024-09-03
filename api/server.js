import express from "express"
import sqlite from "sqlite3"
sqlite.verbose()
import cors from "cors"
import { Parser } from "json2csv"

const app = express();
const db = new sqlite.Database(":memory:");

app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run("CREATE TABLE users (name TEXT, score INTEGER)");
});

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
