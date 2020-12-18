const connection = require('../db'); // импорт подключения

class Tag {
	constructor(obj){
		for(let key in obj){
			this[key] = obj[key];
		}
	}

	static getAll(cb) {
		connection.manyOrNone(`SELECT * FROM tags;`)
		.then((rows) => {
			cb(null, rows);
		})
		.catch(err => cb(err));
	}

}

module.exports = Tag;