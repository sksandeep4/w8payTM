const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Currently inside user Router get call");
  res.send("Vanakkam da Mapla userRouter get call la irundhu");
});

module.exports = { router };
