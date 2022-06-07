const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the structure of the document
const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: 'articles' });

// define the model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
