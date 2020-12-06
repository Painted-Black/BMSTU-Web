const express = require('express');
const router = express.Router();

// Подключаем модели
const Posts_tags = require('../models/posts_tags.js');
const Posts = require('../models/posts.js');
const Tags = require('../models/tags.js');
const Comments = require('../models/comments.js');

// связываем модели (таблицы) через кросс-таблицу posts_tags отношение M:M
Posts.belongsToMany(Tags, {
    through: Posts_tags,
    foreignKey: 'post_id',
    otherKey: 'tag_id'
});
Tags.belongsToMany(Posts, {
    through: Posts_tags,
    foreignKey: 'tag_id',
    otherKey: 'post_id'
});

// Связываем пост с комментами, отношение 1:M
Posts.hasMany(Comments);

// Реализуем методы роутера
/*
	(args) => {code...} - это стрелочная функция
	arg => return true;
*/
router.get('/', (req, res) => {
    Posts.findAll()
        .then(rows => {
            // status() поставит запросу код ответа еще до отправления
            // т.е. с ответом пользователя еще можно работать
            // .json(data) - преобразует ответ в формат json и проставляет для этого необходимые хедеры
            res.status(200).json(rows)
        })
        .catch(e => {
            // sendStatus - сразу отвечает клиенту кодом
            res.sendStatus(500);
            console.log(e)
        })
});

// /:id - это типо запись с ид вот так posts/10 
router.get('/:id', (req, res) => {
    // req.params содержит параметры из URL которые в виде :id
    // + перед значением для неявного преобразования в int
    const id = +req.params.id;

    // находим одну запись с условием where
    Posts.findOne({
            where: {
                id: id
            },
            include: {
                model: Comments,
                attributes: ['id', 'name', 'body', 'created', 'email'] // поля из comments
            }
        })
        .then(rows => {
            res.status(200).json(rows)
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e)
        })
});

// фильтр по тегу
router.get('/filter/:tag', (req, res) => {
    const tag = req.params.tag;

    // находим одну запись с условием where у модели tags
    Posts.findAll({
            include: {
                model: Tags,
                where: {
                    slug: tag
                }
            }
        })
        .then(rows => {
            res.status(200).json(rows)
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e)
        })
});

router.post('/', (req, res) => {
    // req.body содержит в себе тело запроса (именно переданные данные)
    const data = req.body;

    // Данные приняли в формате json, поэтому их сразу можно откинуть в метод создания поста
    Posts.create(data)
        .then(rows => {
            res.status(200).json(rows)
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e)
        })
});

// PUT и PATCH будут одинаковые т.к. метод update работает в обоих случаях
router.put('/:id', (req, res) => {
    const data = req.body;
    const id = +req.params.id;

    Posts.update(data, {
            where: {
                id: id
            }
        })
        .then(rows => {
            res.sendStatus(204); // 204 No Content
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e);
        })
})

router.patch('/:id', (req, res) => {
    const data = req.body;
    const id = +req.params.id;

    Posts.update(data, {
            where: {
                id: id
            }
        })
        .then(rows => {
            res.sendStatus(204); // 204 No Content
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e);
        })
})

router.delete('/:id', (req, res) => {
    const id = +req.params.id;

    Posts.destroy({
            where: {
                id: id
            }
        })
        .then(rows => {
            res.sendStatus(204); // 204 No Content
        })
        .catch(e => {
            res.sendStatus(500);
            console.log(e);
        })
})

module.exports = router;