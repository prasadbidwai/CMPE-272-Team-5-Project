var connection;
var mysql = require('mysql');

function connect() {
	connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		port : '3306',
		database : 'animaldynamics'
	});
}

connect();

function executeQuery(sql, callBack) {
	connection.query(sql,callBack);
}

exports.executeQuery = executeQuery;