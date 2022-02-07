const express = require("express");
const Book = require("../models/book");
const User = require("../models/user");
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
  if(book.voters.some(v => v.toString() === req.user._id.toString())){
    return res.status(403).send();
  }

  if(book.renters.find(r => r.toString() === req.user._id.toString())){
    return res.status(403).send();
  }
  book.voters.push(req.user._id);

  book.amountOfVoters++;
  book.amountOfStars = book.amountOfStars + req.body.stars;
  try {
    await book.save();
    res.status(200).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/book/rent", auth, async (req, res) => {
  const book = await Book.findOne({ _id: req.body.id });
  const user = await User.findOne({ _id: req.user._id });
  if(!book){
    return res.status(404).send();
  }
  if(book.renters.some(v => v.toString() === req.user._id.toString())){
    return res.status(403).send();
  }
  book.renters.push(req.user._id);
  book.rented = true;
  user.booksRented.push(book._id);
  user.isRenting = true;

  try {
    await book.save();
    await user.save();
    res.status(200).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/book/return", auth, async (req, res) => {
  const book = await Book.findOne({ _id: req.body.id });
  const user = await User.findOne({ _id: req.user._id });
  if(!book){
    return res.status(404).send();
  }

  if(book.renters.length > 0 && book.renters[book.renters.length - 1].toString()!== req.user._id.toString()){
    return res.status(403).send();
  }
  if(user.booksRented.length >0 && user.booksRented[user.booksRented.length - 1].toString()!== book._id.toString()){
    return res.status(403).send();
  }
  book.rented = false;
  user.isRenting = false;

  try {
    await book.save();
    await user.save();
    res.status(200).send(book);
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
