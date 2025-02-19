const express = require("express");
const { router: mainRouter } = require("./routes");

const app = express();
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(8080, (req, res) => {
  console.log("App listening in port 8080");
});
// mongodb+srv://sandy:greatnessiscoming9604@cluster0.nipxquz.mongodb.net/
