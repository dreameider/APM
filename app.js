const express = require("express");
const mysql = require("mysql");

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static("src"));

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "register",
});

pool.getConnection((err, conncetion) => {
  if (err) throw err;
  console.log("connected as ID" + conncetion.threadId);
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/src/homePage/index.html");
});

app.post("/formPost", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
