const express = require("express");
const Book = require("../models/book");
const { authAdmin, auth } = require("../middleware/auth");
const router = new express.Router();

router.post("/book", authAdmin, async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send({ book });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/book/rate", auth, async (req, res) => {
  const book = await Book.findOne({ _id: req.body.id });
  if(!book){
    return res.status(404).send();
  }
  if(book.voters.some(v => v === req.user._id.toString())){
    return res.status(403).send();
  }
  book.voters.push(req.user._id);

  book.amountOfVoters++;
  book.amountOfStars = book.amountOfStars + req.body.stars;
  try {
    await book.save();
    res.status(200).send({ book });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/books", auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({ books });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/book", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.body.id);
    res.status(200).send({ book });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/book/:id", authAdmin, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (!book) {
      res.status(404).send();
    }

    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/book/:id", authAdmin, async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "editorial"
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (book[update] = req.body[update]));
    await book.save();
    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
