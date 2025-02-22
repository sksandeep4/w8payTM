const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sandy:greatnessiscoming9604@cluster0.nipxquz.mongodb.net/Week8Project"
);
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = new mongoose.model("User", userSchema);
module.exports = { User };
