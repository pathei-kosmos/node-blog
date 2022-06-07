const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dbURI = require('./dbURI');
const Article = require('./models/Article')
const app = express();

// connect to mongodb then listen for requests
mongoose.connect(dbURI)
    .then(() => {
        app.listen(3000, () => {
            console.log('connected to db')
            console.log('server listening on port 3000...');
        });
    })
    .catch(err => {
        console.log(err);
    });

// --- MIDDLEWARES ---
// define static folder
app.use(express.static('public'));
// secure http headers
app.use(helmet());
// logger
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');

// routing
app.get('/', (req, res) => {
    res.redirect('/articles');
});

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

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/articles/create', (req, res) => {
    res.render('createArticle.ejs', { title: 'New article' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})