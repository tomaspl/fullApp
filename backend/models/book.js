const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    editorial: {
      type: String,
      required: true
    },
    amountOfVoters: {
      type: Number,
      default: 0,
    },
    amountOfStars: {
      type: Number,
      default: 0,
    },
    voters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    rented: {
      type: Boolean,
      default: false
    },
    renters: [
      {
          type: mongoose.Schema.Types.ObjectId,
          default: [],
          ref: 'User'
      }
    ]
  }
)

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;