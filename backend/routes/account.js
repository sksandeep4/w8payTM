const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      res.status(411).json({ msg: "Invalid Account" });
    }
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(411).json({ msg: "There was an error" });
  }
});
router.post("/transfer", authMiddleware, async (req, res) => {
  const recipient = req.body.to;
  const amount = req.body.amount;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ msg: "Insufficient Balance/Invalid Account" });
    }

    const toAccount = await Account.findOne({ userId: recipient }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid Recipient Account" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: recipient },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({ msg: "Transfer was successful" });
  } catch (error) {
    res.status(411).send("Something went wrong");
  }
});
router.get("/", (req, res) =>
  res.send("Vanakkam da mapla Account router la irundhu")
);
module.exports = { router };
