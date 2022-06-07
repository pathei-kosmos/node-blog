const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000, () => {
    console.log('server listening on port 3000...');
});

// define static folder
app.use(express.static('public'));

// secure http headers
app.use(helmet());

// logger
app.use(morgan('dev'));

// routing
app.get('/', (req, res) => {
    const articles = [
        {title: "Yoshi find eggs", snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: "Mario find stars", snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: "How to defeat Bowser", snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    
    res.render('index', { title: 'Home', articles });
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