const Sequelize = require('sequelize'); 
const sequelize = require('../db'); // импорт подключения

// Это кросс таблица. Её можно не описывать
const Posts_tags = sequelize.define('posts_tags', {
	// id: {
	// 	primaryKey: true,
	// 	autoIncrement: true,
	// 	type: Sequelize.INTEGER
	// },
	// post_id: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: false,
	// 	references: {
	// 		model: 'posts',
	// 		key: 'id'
	// 	}
	// },
	// tag_id: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: false,
	// 	references: {
	// 		model: 'tags',
	// 		key: 'id'
	// 	}
	// }
},
{
	underscored: true, // переключаем на post_id вместо postId  в построителе запросов
	timestamps: false, // чтобы sequelize не запрашивал дефолтные поля createdAt и updatedAt
	tableName: 'posts_tags'
})

module.exports = Posts_tags;