const config = {};

config.connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'blogdb',
    user: 'blog_user',
    password: 'blog_user'
};

config.port = process.env.NODE_PORT;

module.exports = config;