const mongoose = require('mongoose')

const commentBookSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        required: true,
        type: String
    }    
},{
    timestamps: true
})

const CommentBook = mongoose.model('CommentBook', commentBookSchema)

module.exports = CommentBook