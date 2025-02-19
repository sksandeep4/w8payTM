const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sandy:greatnessiscoming9604@cluster0.nipxquz.mongodb.net/Week8Project"
);
const userSchema = new mongoose.Schema({
  firstName: { type: String, required },
  lastName: { type: String, required },
  username: { type: String, required },
  password: { type: String, required },
});

const User = new mongoose.model("User", userSchema);
module.exports = { User };
