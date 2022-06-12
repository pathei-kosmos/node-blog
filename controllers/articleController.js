const Article = require('../models/article');

const article_index = (req, res) => {
    Article.find()
        .sort({ createdAt: -1 })
        .then(result => {
            res.render('articles/index', { title: 'Home', articles: result });
        })
        .catch(err => {
            console.log(err);
        });
};

const article_details = (req, res) => {
    const id = req.params.id;
    Article.findById(id)
        .then(result => {
            res.render('articles/details', { title: 'Article Details', article: result });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

const article_create_get = (req, res) => {
    res.render('articles/createArticle.ejs', { title: 'New article' });
};

const article_create_post = (req, res) => {
    const article = new Article(req.body);
    article.save()
        .then(() => {
            res.redirect('/articles');
        })
        .catch(err => {
            console.log(err);
        });
};

const article_delete = (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
        .then(() => {
            res.json({ redirect: '/articles' });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    article_index,
    article_details,
    article_create_get,
    article_create_post,
    article_delete
}