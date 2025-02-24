const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.find({ userId: req.userId });
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(411).send("");
  }
});
router.post("/transfer", authMiddleware, async (req, res) => {
  const recipient = req.body.to;
  const amount = req.body.amount;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const fromAccount = await Account.find({ userId: req.userId }).session(
      session
    );
    if (!fromAccount || fromAccount.balance < amount) {
      res.status(400).json({ msg: "Insufficient Balance/Invalid Account" });
    }

    const toAccount = await Account.find({ userId: recipient }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ msg: "Invalid Recipient Account" });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: fromAccount.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: fromAccount.userId },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({ msg: "Transfer was successful", balance: account.balance });
  } catch (error) {
    res.status(411).send("");
  }
});
router.get("/", (req, res) =>
  res.send("Vanakkam da mapla Account router la irundhu")
);
module.exports = { router };
