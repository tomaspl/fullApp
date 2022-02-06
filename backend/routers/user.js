const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { authAdmin, auth } = require("../middleware/auth");
const router = new express.Router();

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", authAdmin, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send();

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(404).send();
    const token = await user.generateAuthToken();
    res.send({ user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
