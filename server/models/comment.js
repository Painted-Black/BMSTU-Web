const connection = require('../db'); // импорт подключения

class Comment {
	constructor(obj){
		for(let key in obj){
			this[key] = obj[key];
		}
	}

	save(cb){
		let obj = this;

		// one - вернет 1 объект
		// $<obj.title> - чтобы вынуть из объекта (также переданного в эту функцию)
		// все вставки в запросах начин с $ (кроме ${}) - это от либы pg-promise

		connection.one(`
		INSERT INTO "comments"
			(post_id, "name", body, created, email)
		VALUES
			($<obj.post_id>, $<obj.name>, $<obj.body>, $<obj.created>, $<obj.email>)
		RETURNING *;
		`, { obj })
		.then(data => {
			if (data === undefined) return cb(console.log(new Error('Не удалось создать comment')));
			this.id = data.id; // присваиваем экземпляру id возвращенный из бд
			cb(null, this);
		})
		.catch(err => {
			cb(err)
		})
		
	}

}

module.exports = Comment;