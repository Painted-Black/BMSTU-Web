// Импортируем именно класс Sequelize из библиотеки
const { Sequelize } = require("sequelize");
const { connectionString } = require("./config");

// создаем новое подключение
const sequelize = new Sequelize(connectionString);

// импортируем для дальнейшей работы с ним
module.exports = sequelize;