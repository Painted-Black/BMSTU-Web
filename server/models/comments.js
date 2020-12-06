const Sequelize = require('sequelize'); 
const sequelize = require('../db'); // импорт подключения

// Определяем модель комментариев
const Comments = sequelize.define('comments', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER
	},
	post_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: 'posts',
			key: 'id'
		}
	},
	name: {
		type: Sequelize.STRING(140)
	},
	body: {
		type: Sequelize.TEXT
	},
	created: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	email: {
		type: Sequelize.STRING(100)
	}
},
{
	timestamps: false, // чтобы sequelize не запрашивал дефолтные поля createdAt и updatedAt
	tableName: 'comments',
	underscored: true // переключаем на post_id вместо postId  в построителе запросов
})

module.exports = Comments;