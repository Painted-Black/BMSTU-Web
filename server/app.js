const express = require('express'); // веб фреймворк для REST
const bodyParser = require('body-parser'); // разбор тела запроса
const cors = require('cors'); // для CORS

const PORT = require('./config').port; // порт для запуска api

const app = express(); // создаем экземпляр приложения express

// Routers
const posts = require('./routes/posts');
const tags = require('./routes/tags');
const comments = require('./routes/comments');

app.use(cors()); // CORS нужны чтобы сайт мог обращатся к URL отличным от своего
app.use(bodyParser.json()); // разбор json тела запроса
// разбор formdata (это данные из формы в html в особом виде)
app.use(bodyParser.urlencoded({
    extended: true
}));

// Url's
app.use('/api', express.static(__dirname + '/public'));

// Подключаем роутер к этому url
app.use('/api/posts', posts);
app.use('/api/tags', tags);
app.use('/api/comments', comments);


// Слушаем обращения на порт
app.listen(PORT, () => {
    console.log('API started on localhost:' + PORT)
})