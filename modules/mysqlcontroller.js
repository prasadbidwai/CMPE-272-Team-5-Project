var connection;
var mysql = require('mysql');
var Redis = require("./redis-cache");

function connect() {
	connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		port : '3306',
		database : 'AnimalDynamicsNew'
	});
}

connect();

/**
 * Checks whether query is cached or not.
 * If it is cached then returns cached results else fetches results from db and then returns it
 * @param sql	Query
 * @param callBack	Call back function
 */
function executeQuery(sql, callBack) {
	for(var i = 0; i < Redis.getCachedSqlQueries().length; i++) {
		var query = Redis.getCachedSqlQueries()[i];
		if(sql === query) {
			Redis.getCachedDetails(query, callBack);
			return;
		}
	}
	Redis.getCachedSqlQueries().push(sql);
	connection.query(sql, function(err, result) {
		Redis.cacheDetails(sql, result);
		callBack(err, result);
	});
}

exports.executeSQL = function (sql, callBack) {
	connection.query(sql,callBack);
}

exports.executeQuery = executeQuery;