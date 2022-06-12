const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();

// display all articles
router.get('/articles', articleController.article_index);
// get article creation form
router.get('/articles/create', articleController.article_create_get);
// post article creation request
router.post('/articles', articleController.article_create_post);
// display one article
router.get('/articles/:id', articleController.article_details);
// delete one article
router.delete('/articles/:id', articleController.article_delete);

module.exports = router;