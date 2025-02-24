const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
    minLength: 3,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true, minLength: 6 },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true, default: 0 },
});

const User = new mongoose.model("User", userSchema);
const Account = new mongoose.model("Account", accountSchema);
module.exports = { User, Account };
