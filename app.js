const express = require("express");
const bodyParser = require("body-parser");
const itemsRouter = require("./router/items");

const port = 5000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

//Stating views engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});
app.get("/students", (req, res) => {
  res.status(200).render("students");
});
app.get("*", (req, res) => {
  res.status(404).render("error");
});
app.listen(port, () => {
  console.log(`Server is live and listening on http://localhost:${port}`);
});
