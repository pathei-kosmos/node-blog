const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dbURI = require('./dbURI');
const Article = require('./models/article');
const app = express();

// connect to mongodb then listen for requests
mongoose.connect(dbURI)
    .then(() => {
        app.listen(3000, () => {
            console.log('connected to db');
            console.log('server listening on port 3000...');
        });
    })
    .catch(err => {
        console.log(err);
    });

// --- MIDDLEWARES ---
// define static folder
app.use(express.static('public'));
// POST requests body parser
app.use(express.urlencoded({ extended: true }));
// secure http headers
app.use(helmet());
// logger
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');

//  --- ROUTING ---
app.get('/', (req, res) => {
    res.redirect('/articles');
});

// display all articles
app.get('/articles', (req, res) => {
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
app.get('/articles/create', (req, res) => {
    res.render('createArticle.ejs', { title: 'New article' });
});

// article creation route
app.post('/articles', (req, res) => {
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
app.get('/articles/:id', (req, res) => {
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
app.delete('/articles/:id', (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
        .then(() => {
            res.json({ redirect: '/articles' });
        })
        .catch(err => {
            console.log(err);
        });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});