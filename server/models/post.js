const connection = require('../db'); // импорт подключения


class Post {
	constructor(obj){
		for(let key in obj){
			this[key] = obj[key];
		}
	}

	save(cb){
		if(this.id){
			this.update(cb); // если есть id, то обновляем
		}else{
				let obj = this;

				// one - вернет 1 объект
				// $<obj.title> - чтобы вынуть из объекта (также переданного в эту функцию)
				// все вставки в запросах начин с $ (кроме ${}) - это от либы pg-promise
				connection.one(`
				INSERT INTO posts
					(title, slug, body, created)
				VALUES
					($<obj.title>, $<obj.slug>, $<obj.body>, $<obj.created>)
				RETURNING *;
				`, { obj })
				.then(data => {
					if (data === undefined) return cb(console.log(new Error('Не удалось создать post')));
					this.id = data.id; // присваиваем экземпляру id возвращенный из бд
					cb(null, this);
				})
				.catch(err => {
					cb(err)
				})

		}
	}

	update(cb){
		let obj = this;

		connection.one(`
		UPDATE posts
		SET 
			title = $<obj.title>,
			slug = $<obj.slug>,
			body = $<obj.body>,
			created = $<obj.created>
		WHERE id = $<obj.id>
		RETURNING *;
		`, { obj })
		.then( data  => {
			if ( data.id === undefined || data.id === null) return cb();
			cb(null, data );
		})
		.catch((err) => {
			console.log(err)
			cb(err)
		});

	}

	patch(cb) {
		let obj = this;
		let str = '';
		str += obj.title ? ` title = '${obj.title}' ` : '';
		str += obj.slug ? ` slug = '${obj.slug}' ` : '';
		str += obj.body ? ` body = '${obj.body}' ` : '';
		str += obj.created ? ` created = '${obj.created}' ` : '';
		
		connection.oneOrNone(`
			UPDATE posts SET ${str} WHERE id = ${obj.id} RETURNING *;
		`)
		.then( data  => {
			if ( data === undefined || data === null ) return cb();
			cb(null, data);
		})
		.catch(err => {
			console.error(err);
			cb(err);
		});
	}

	static get(id, cb){
		// oneOrNone - 1 объект или ничего
		// Внутри запроса $1 - номер подстановки из массива (который вторым аргументом в функции)
		connection.oneOrNone(`
		SELECT p.*, (
					SELECT array_to_json(array_agg(row_to_json(child))) from (
						select c.id, c."name", c.body, c.created, c.email
						from "comments" c 
						where p.id = c.post_id 
					) child
				) "comments"
		from posts p
		where p.id = $1;`, [id])
		.then(rows => {
			if (rows === undefined || rows === null) return cb();
			cb(null, new Post(rows));
		})
		.catch(err => cb(err));
	}

	static getAll(query, cb){
		const tag = query.tag;

		let sql = 'SELECT p.* FROM posts p ';

		// Именно slug от тега
		if ( tag ) {
			sql += ` 
				left join posts_tags pt on p.id = pt.post_id 
				left join tags t on pt.tag_id = t.id 
				where t."slug" = '${tag}' 
			`
		}
		
		sql += ' ORDER BY p.id;';

		// manyOrNone - гарантирует что это будет массив объектов
		connection.manyOrNone(sql)
		.then((rows) => {
			cb(null, rows);
		})
		.catch(err => cb(err));
	}

	static delete(id, cb) {
		const sql = `DELETE FROM posts where id = ${id};`
		// none - ничего не возвращает
		connection.none(sql)
		.then( () => {
			cb()
		})
		.catch(err => { 
			console.error(err);
			cb(err)
		});
	}
}

module.exports = Post;