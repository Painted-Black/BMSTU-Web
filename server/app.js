const http2 = require('http2')
const express = require('express'); // веб фреймворк для REST
const bodyParser = require('body-parser'); // разбор тела запроса
const cors = require('cors'); // для CORS
const fs = require('fs');

let PORT = require('./config').port; // порт для запуска api

const app = express(); // создаем экземпляр приложения express

// Routers
const posts = require('./routes/posts');
const tags = require('./routes/tags');

app.use(cors()); // CORS нужны чтобы сайт мог обращатся к URL отличным от своего
app.use(bodyParser.json()); // разбор json тела запроса
// разбор formdata (это данные из формы в html в особом виде)
app.use(bodyParser.urlencoded({
    extended: true
}));

// Url's
// app.get('/api', (req, res) => {
// 	res.status(200).send('API is live!')
// });



app.use('/api', express.static(__dirname + '/public'));
// Подключаем роутер к этому url
app.use('/api/posts', posts);
app.use('/api/tags', tags);

if (process.env.HTTP == 2) {
    http2.createServer({
        key: fs.readFileSync('./cert/myblog.key'),
        cert: fs.readFileSync('./cert/myblog.crt')
    }, app).listen(PORT, () => {
        console.log('API started on localhost:' + PORT)
    })
} else {
    app.listen(PORT, () => {
        console.log('API started on localhost:' + PORT)
    })
}
// Слушаем обращения на порт