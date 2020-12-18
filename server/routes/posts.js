const express = require('express');
const router = express.Router();

// Подключаем модели
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');

router.get('/', (req, res) => {
    // req.query - параметры после ?
    Post.getAll(req.query, (err, posts) => {
        if (err) return res.status(500).json(err);
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.sendStatus(500);
        }
    })

});

router.get('/:id', (req, res) => {
    const id = +req.params.id;

    Post.get(id, (err, post) => {
        if (err) return res.status(500).json(err);
        if (post) {
            res.status(200).json(post);
        } else {
            res.sendStatus(404);
        }
    })

});


router.post('/', (req, res) => {
    // req.body содержит в себе тело запроса (именно переданные данные)
    const data = req.body;

    const post = new Post(data);
    post.save((err, post) => {
        if (err) return res.status(500).json(err);
        if (post) {
            res.status(200).json(post)
        } else {
            res.sendStatus(500);

        }
    });

});

router.post('/:id/comments', (req, res) => {
    let data = req.body;
    data.post_id = +req.params.id;

    const comment = new Comment(data);

    comment.save((err, comment) => {
        if (err) return res.status(500).json(err);
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.sendStatus(500);

        }
    })

});

router.put('/:id', (req, res) => {
    let data = req.body;
    data.id = +req.params.id;

    const post = new Post(data);

    post.update((err, post) => {
        if (err) return res.sendStatus(400); // Bad Request
        if (post) {
            // post доступен, но отдаем 204
            res.sendStatus(204); // 204 No Content
        } else {
            res.sendStatus(500);
        }
    });

})

router.patch('/:id', (req, res) => {
    let data = req.body;
    data.id = +req.params.id;

    const post = new Post(data);

    post.patch((err, post) => {
        if (err) return res.sendStatus(400); // Bad Request
        if (post) {
            // post доступен, но отдаем 204
            res.sendStatus(204); // 204 No Content
        } else {
            res.sendStatus(500);

        }
    });
})

router.delete('/:id', (req, res) => {
    const id = +req.params.id;

    Post.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.sendStatus(204);
    })

})

module.exports = router;