const express = require('express');
const router = express.Router();

// Подключаем модели
const Tag = require('../models/tag.js');

router.get('/', (req, res) => {
	Tag.getAll((err, tags) => {
		if (err) return res.sendStatus(500);
		if (tags) res.status(200).json(tags)
	})

});

module.exports = router;