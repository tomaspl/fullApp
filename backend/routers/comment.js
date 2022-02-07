const express = require('express')
const CommentBook = require('../models/comment')
const User = require('../models/user')
const Book = require('../models/book')
const {auth} = require('../middleware/auth')
const router = new express.Router()

router.post('/comments/book/create', auth, async (req, res) => {
    const book = await Book.findById(req.body.bookId)
    if(!book) return res.status(400).send({error:'Book not founded'})
    const commentBook = new CommentBook({...req.body, user:req.user._id})
    try {
            await book.save();
            await commentBook.save();
            res.status(200).send(commentBook)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/comments/book/:id', async (req, res) => {

   let commentsBook = await CommentBook.find({ book: req.params.id}).populate({path:'user', model: User});
    try {
        res.status(200).send(commentsBook);
        
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/comments', async (req, res) => {

  let commentsBooks = await CommentBook.find().populate({path:'user', model: User});
   try {
       res.status(200).send(commentsBooks);
       
   } catch (e) {
       res.status(400).send(e)
   }
})

router.delete('/comments/book/delete', auth, async (req, res) => {
     try {
        const commentsBook = await CommentBook.findOneAndDelete({ _id: req.query.id })
        if (!commentsBook) {
            res.status(404).send()
        }

        res.send(commentsBook)
    } catch (e) {
        res.status(500).send()
    }
 })

module.exports = router