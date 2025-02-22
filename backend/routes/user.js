const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ msg: "Invalid inputs" });
  }
  console.log(body);
  console.log(JWT_SECRET);
  const existingUser = await User.findOne({ username: body.username });
  console.log(existingUser);
  if (existingUser) {
    return res.status(411).json({ msg: "Email already taken" });
  }
  const newUser = await User.create(body);
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  res.json({ message: "User created successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});
router.get("/", (req, res) => {
  console.log("Currently inside user Router get call");
  res.send("Vanakkam da Mapla userRouter get call la irundhu");
});

module.exports = { router };
