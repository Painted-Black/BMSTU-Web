const Sequelize = require('sequelize'); 
const sequelize = require('../db'); // импорт подключения

const Tags = sequelize.define('tags', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING(100)
	},
	slug: {
		type: Sequelize.STRING(100)
	}
},
{
	timestamps: false, // чтобы sequelize не запрашивал дефолтные поля createdAt и updatedAt
	tableName: 'tags'
})

module.exports = Tags;