const express = require('express');
const router = express.Router();

// Подключаем модели
const Tags = require('../models/tags.js');

router.get('/', (req, res) => {
	Tags.findAll()
	.then(rows => {
		res.status(200).json(rows)
	})
	.catch(e => {
		res.sendStatus(500);
		console.log(e)
	})
});

module.exports = router;