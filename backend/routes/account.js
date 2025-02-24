const express = require("express");
const router = express.Router();
router.get("/", (req, res) =>
  res.send("Vanakkam da mapla Account router la irundhu")
);
module.exports = { router };
