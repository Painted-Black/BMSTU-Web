const Sequelize = require('sequelize');
const sequelize = require('../db'); // импорт подключения

// Определяем модель постов
const Posts = sequelize.define('posts', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING(140),
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING(140),
        unique: true,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, {
    timestamps: false, // чтобы sequelize не запрашивал дефолтные поля createdAt и updatedAt
    tableName: 'posts'
})

module.exports = Posts;