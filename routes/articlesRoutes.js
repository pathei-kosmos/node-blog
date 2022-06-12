const express = require('express');
const Article = require('../models/article');
const router = express.Router();

// display all articles
router.get('/articles', (req, res) => {
    Article.find()
        .sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'Home', articles: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// article creation form
router.get('/articles/create', (req, res) => {
    res.render('createArticle.ejs', { title: 'New article' });
});

// article creation route
router.post('/articles', (req, res) => {
    const article = new Article(req.body);
    article.save()
        .then(() => {
            res.redirect('/articles');
        })
        .catch(err => {
            console.log(err);
        });
});

// display one article
router.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    Article.findById(id)
        .then(result => {
            res.render('details', { title: 'Article Details', article: result });
        })
        .catch(err => {
            console.log(err);
        });
});

// delete one article
router.delete('/articles/:id', (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
        .then(() => {
            res.json({ redirect: '/articles' });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;