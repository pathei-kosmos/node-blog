const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dbURI = require('./dbURI');
const articleRoutes = require('./routes/articleRoutes');
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
// compress all HTTP responses
app.use(compression());
// POST requests body parser
app.use(express.urlencoded({ extended: true }));
// secure HTTP headers
app.use(helmet());
// logger
app.use(morgan('dev'));


// register view engine
app.set('view engine', 'ejs');

//  --- ROUTING ---
app.get('/', (req, res) => {
    res.redirect('/articles');
});

// articles routes
app.use(articleRoutes);

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});