var mysql = require("../modules/mysqlController");

exports.cacheCountry = function(req,res){
	var sql = "select id,name from country";
	mysql.executeQuery(sql, function(err, results) {
		console.log("========= " + results);
		res.render('browse', {
			title : 'Browse',
			animals : results
		});
	});
	
}