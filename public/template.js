/*
	Тут шаблоны для верстки (views)
	в таких `` скобках можно подставлять перменные с помощью конструкции ${foo}
*/

// Список постов
function html_posts(arr){
	let html = '';


	html += ` <div class="list-group"> `;

	for(let i = 0; i < arr.length; i++){
		let created = new Date(arr[i].created);
		created = created.toLocaleDateString();

		html += `
		<button onclick="onGoToPost(${arr[i].id})" type="button" class="list-group-item list-group-item-action">
			<h3>${arr[i].title}</h3>
			<p>${arr[i].body.slice(0, 150)}...</p>
			<p>Дата создания: ${created}</p>
		</button>
		`;
	}
	html += '</div>';

	return html;
}

// Пункты для списка тегов
function html_tags(arr){
	let html = '';

	html += '<option value="0" selected>Выбрать тег</option>';

	for(let i = 0; i < arr.length; i++){
		html += `
		<option value="${arr[i].id}" data-slug="${arr[i].slug}">${arr[i].name}</option>
		`;
	}

	return html;
}

// Один пост
function html_post(arr) {
	let created = new Date(arr.created);
		created = created.toLocaleDateString();
	let html = `
		<div class="container bg-white">
			<h3 class="post-title">${arr.title}</h3>
			<p>${arr.body}</p>
			<p>Дата создания: ${created}</p>
			<div class="comments">
				<h3 class="title-comments">Комментарии</h3> 
				<ul class="media-list">
	`;
	
	comments = arr.comments;
	
	if (comments.length) {
		for(let i = 0; i < comments.length; i++){
		created = new Date(comments[i].created);
		created = created.toLocaleDateString();
		html += `
					<li class="media">
						<div class="media-body">
							<div class="media-heading">
									<div class="author">${comments[i].name}<i class="email"> - ${comments[i].email}</i></div>
									<div class="metadata">
											<span class="date">${created}</span>
									</div>
							</div>
							<div class="media-text text-justify">${comments[i].body}</div>
							<hr>
						</div>
					</li>
		`;
		}
	} else {
		html += `Нет комментариев`;
	}

	// закрываем блок комментариев
	html += `</div>`;

	// Форма для создания коммента
	html += `
		<h5>Оставить комментарий</h5>
		<form onsubmit="onForm(event, ${arr.id})" name="newComment">
			<div class="row">
				<div class="col">
					<input name="userName" type="name" class="form-control" placeholder="Ваше имя">
				</div>
				<div class="col">
					<input name="userEmail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="email">
				</div>
			</div>
			<div class="row">
				<textarea name="userBody" class="form-control m-3" placeholder="Комментарий..."></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Отправить</button>
		</form>
	`;

	return html;
}
