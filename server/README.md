## Запуск

0. Выполнить `cat tables.sql | psql -h localhost -U <юзер> -d <база>` в папке sql - для создания таблиц. (это postgres если что)
0. Поправить config.js для своей базы
0. `npm install` в корне проекта - для скачивания зависимостей
0. `npm start` - для запуска сервера
сервак работает на http://localhost:3000/api

0. создать папку /servers в корне системы и положить туда папку public. Либо исправить на свой путь строку 24 в nginx.conf
0. Выполнить установку и настройку pgAdmin и uwsgi по манулу (https://gist.github.com/rdnvndr/51ae8692bebcd02325ca7c046fe5ade2). Ну и Nginx если нету. Конфиг nginx я уже подправил по манулу, его достаточно просто закинуть в папку (в мануле расписано куда).
0. That's all

* Фронтенд доступен по http://localhost
* Сервак на http://localhost/api
* Админка (pgAdmin) на http://localhost/pgadmin

На фронте не делал "переходы по страницам" (типо чтобы url менялся в браузере). По факту сверстана одна страница и в неё идет подгрузка.