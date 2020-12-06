const config = {};

config.connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'blogdb',
    username: 'blog_user',
    password: 'blog_user',
    dialect: 'postgres'
};
// dialect нужен чтобы билиотека sequelize знала с какой базой работать

config.port = process.env.NODE_PORT;

module.exports = config;