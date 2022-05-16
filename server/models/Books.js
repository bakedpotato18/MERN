const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;