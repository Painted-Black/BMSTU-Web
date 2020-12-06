// Необходимые хедеры для отправки пакетов по сети
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

/*
	$('селектор css') - это JQuery. Он получает элемент и с ним можно производить манипуляции.
	Селектор - для класса: '.some-class', для элемента с id: '#some-id'
*/


const link_api = 'http://localhost:3000/api';

// window.onload вызывается браузером при полной загрузке html
window.onload = function() {

    path = window.location.pathname;
    console.log(path)
    // Подгружаем посты
    goToPage(path);

}

// Функция перехода по страницам (подгрузка данных)
function goToPage(path) {

    $('.main').empty(); // Очищаем основную часть страницы
    $('#slTags').empty(); // Очищаем Теги

    // Подгружаем теги
    fetch(link_api + `/tags`, {
            headers: myHeaders
        })
        .then(res => res.json())
        .then(res => html_tags(res))
        .then(res => $('#slTags').append(res)) // .append() вставляет все в конец
        .catch(err => console.log(err));

    if (path == '/') {
        fetch(link_api + `/posts`, {
                headers: myHeaders
            })
            .then(res => res.json())
            .then(res => html_posts(res))
            .then(res => $('.main').append(res))
            .catch(err => console.log(err));
    }

}


// Получение одного поста
function onGoToPost(id) {
    $('.main').empty();

    fetch(`http://localhost:3000/api/posts/${id}`, {
            headers: myHeaders
        })
        .then(res => res.json())
        .then(res => html_post(res))
        .then(res => $('.main').append(res))
        .catch(err => console.log(err));

}

// Выбор тега из селекта
function onChangeTag(select) {
    const i = select.selectedIndex; // выбранный индекс списка
    // dataset - все атрибуты data-* у тега
    const slug = select.options[i].dataset.slug; // берем именно slug

    // Если выбран пункт 'Выбрать тег' (у него нету slug)
    // и slug у него будет === undefined
    // !undefined == true
    if (!slug) {
        goToPage('/');
        //Подгружаем все посты
    } else {
        // Подгружаем отфильтрованные по тегу
        $('.main').empty();

        fetch(link_api + `/posts/filter/${slug}`, {
                headers: myHeaders
            })
            .then(res => res.json())
            .then(res => html_posts(res))
            .then(res => $('.main').append(res))
            .catch(err => console.log(err));
    }

}

// Переход в админку
function onGoAdmin() {
    window.location.assign('https://localhost/pgadmin/');
}

function onForm(event, post_id) {
    // отменяем действия браузера для формы
    // (браузер бы кинул запрос и перешел бы на новую страницу)
    event.preventDefault();
    let obj = {};
    obj.post_id = post_id;
    obj.created = Date.now();

    // Получаем форму
    // document - страница, forms - массив форм на странице
    // получить форму и её объекты можно по атрибуту name в теге
    let form = document.forms['newComment'];
    obj.name = form['userName'].value;
    obj.email = form['userEmail'].value;
    obj.body = form['userBody'].value;

    obj = JSON.stringify(obj);

    fetch(link_api + `/comments`, {
            method: 'POST',
            body: obj,
            headers: myHeaders
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));

    alert('Комментарий был отправлен!');
}
