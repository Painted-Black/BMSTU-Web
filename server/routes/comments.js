const express = require('express');
const router = express.Router();

// Подключаем модели
const Comments = require('../models/comments.js');

router.post('/', (req, res) => {
    // req.body содержит в себе тело запроса (именно переданные данные)
    const data = req.body;

    Comments.create(data)
        .then(rows => {
            res.status(200).json(rows)
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e)
        })
});

module.exports = router;