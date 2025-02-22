const express = require("express");
const cors = require("cors");
const { router: mainRouter } = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config(); // This loads the variables from the .env file

app.use("/api/v1", mainRouter);

app.listen(8080, (req, res) => {
  console.log("App listening in port 8080");
});
