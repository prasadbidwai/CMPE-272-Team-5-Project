var mysql = require("../modules/mysqlController");

exports.index = function(req, res) {
	res.render('index', {
		title : 'Welcome to Animal Dynamics'
	});
};

exports.browse = function(req, res) {
	var sql = "select identifier,common_name from animals";
	mysql.executeQuery(sql, function(err, results) {
		console.log("========= " + results);
		res.render('browse', {
			title : 'Browse',
			animals : results
		});
	});

	// res.render('browse', { title: 'Browse' });
};

exports.showInformation = function(req, res) {
	var id = req.param("id");
	/*
	 * var sql = "select a.common_name, a.scientific_name, a.population, " +
	 * "ts.name as threat_status, a.threats,a.solutions, a.information " + "from
	 * animals a, threatstatus ts " + "where a.threat_status_id = ts.identifier
	 * and a.identifier = "+ id ;
	 */
	var sql = "select a.common_name, a.scientific_name, a.population, "
			+ "a.threat_status, a.threats,a.solutions, a.information "
			+ "from animals a " + "where a.identifier = " + id;

	mysql.executeQuery(sql, function(err, results) {
		res.send(results);
	});
}

exports.worldInformation = function(req, res) {
	var animalType = req.param("animalType");
	var sql;
	if(animalType == "Mammal"){
		sql = "select c.name, a.mammals as value from countrywise_count a, country c where a.country_id = c.id";
	}else{
		sql = "select c.name, a.birds as value from countrywise_count a, country c where a.country_id = c.id";	
	}
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		res.send(results);
	});
}

exports.statPageInfo = function(req, res){
	var sql = "select c.id, c.name from country c";
	mysql.executeQuery(sql, function(err, results) {
		
		console.log(results);
		res.send(results);
	});
}

exports.infographics = function(req, res) {
	res.render("infographics", {
		title : 'Infographics'
	});
}

exports.chartInformation = function(req,res){
	var countryCode = req.param("countryCode");
	console.log("==================================="+countryCode);
	var sql = "select c.mammals,c.birds,c.reptiles,c.amphibians,c.fishes from countrywise_count c where c.country_id = " + countryCode;
	console.log(sql);
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		res.send(results);
	});
}


exports.solutions = function(req,res){
	//var id = req.param("id");
	//console.log("==================================="+countryCode);
	var sql = "select c.id,c.context,c.actions from solutions c";
	console.log(sql);
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		
		res.render("solutions",{
			title : 'Solutions',
			data :results
			});
	});
}












