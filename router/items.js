const fs = require("fs");
const express = require("express");
const dbitems = require("../db/items");
const path = require("path");
const bodyParser = require("body-parser");

const itemsRouter = express.Router();

const dbpath = path.join(__dirname, "db", "items.json");

console.log(dbpath);
itemsRouter.use(bodyParser.json());

const itemdb = path.join(__dirname, "db");

//Get all items in the database
itemsRouter.get("/", (req, res) => {
  res.json(dbitems);
});

//Get one item with id
itemsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const item = dbitems.find((item) => item.id === parseInt(id));
  // console.log(id);
  if (!item) {
    res.status(404).send("items not found");
  }
  res.json(item);
});
// post items to database
itemsRouter.post("/", (req, res) => {
  const newitems = req.body;
  dbitems.push(newitems);
  //   res.send(dbitems);
  fs.writeFile("./db/items.json", JSON.stringify(dbitems), (err) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(dbitems);
  });
});

// put/update items with id
itemsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const items = req.body;
  const index = dbitems.findIndex((items) => items.id === parseInt(id));
  if (index == -1) {
    res.status(404).send("items not found");
  }
  dbitems[index] = items;
  fs.writeFile("./db/items.json", JSON.stringify(dbitems), (err) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(items);
  });
});
// Delete items
itemsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const item = dbitems.findIndex((item) => item.id === parseInt(id));
  if (item == -1) {
    res.status(500).send("items not found");
    return;
  }
  dbitems.splice(item, 1);
  //   res.send(dbitems);
  fs.writeFile("./db/items.json", JSON.stringify(dbitems), (err) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(dbitems);
  });
});

module.exports = itemsRouter;
