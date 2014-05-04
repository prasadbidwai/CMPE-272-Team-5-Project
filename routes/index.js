var mysql = require("../modules/mysqlController");

exports.index = function(req, res) {
	res.render('index', {
		title : 'Welcome to Animal Dynamics'
	});
};

exports.browse = function(req, res) {
	var sql = "select identifier,common_name from animals";
	mysql.executeQuery(sql, function(err, results) {
		res.render('browse', {
			title : 'Browse',
			animals : results
		});
	});

};

exports.showInformation = function(req, res) {
	var id = req.param("id");
	var sql = "select a.common_name, a.scientific_name, a.population, "
			+ "a.threat_status, a.threats,a.solutions, a.information "
			+ "from animals a " + "where a.identifier = " + id;

	mysql.executeQuery(sql, function(err, results) {
		res.send(results);
	});
}

exports.worldInfoAnimalType = function(req, res) {
	var animalType = req.param("animalType");
	var sql = "select c.name, a." + animalType + " as value from countrywise_count a, country c where a.country_id = c.id";
//	if(animalType == "mammals"){
//		sql = "select c.name, a.mammals as value from countrywise_count a, country c where a.country_id = c.id";
//	}else if(animalType == "birds"){
//		sql = "select c.name, a.birds as value from countrywise_count a, country c where a.country_id = c.id";	
//	}else if(animalType == "fishes"){
//		sql = "select c.name, a.fishes as value from countrywise_count a, country c where a.country_id = c.id";	
//	}else if(animalType == "reptiles"){
//		sql = "select c.name, a.reptiles as value from countrywise_count a, country c where a.country_id = c.id";	
//	}else{
//		sql = "select c.name, a.amphibians as value from countrywise_count a, country c where a.country_id = c.id";	
//	}
	mysql.executeQuery(sql, function(err, results) {
		res.send(results);
	});
}

exports.worldInfoConservationStatus = function(req,res){
	var conservationStatus = req.param("conservationStatus");
	var sql = "select c.name, a." + conservationStatus + " as value from countrywise_status a, country c where a.country_id = c.id";
	mysql.executeQuery(sql, function(err, results) {
		res.send(results);
	});
}


exports.statPageInfo = function(req, res){
	var dataCategory = req.param("dataCategory");
	
	if(dataCategory == "country"){
		var sql = "select c.id, c.name from country c";
		mysql.executeQuery(sql, function(err, results) {
			res.send(results);
		});
	}else{
		res.send();
	}
}

exports.infographics = function(req, res) {
	res.render("infographics", {
		title : 'Infographics'
	});
}

exports.chartInformation = function(req,res){
	var countryCode = req.param("countryCode");
	var sql = "select c.mammals,c.birds,c.reptiles,c.amphibians, c.fishes from countrywise_count c where c.country_id = " + countryCode;
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		res.send(results);
	});
}

exports.conStatusChartInfo = function(req,res){
	var countryCode = req.param("countryCode");
	var sql = "select c.near_threatened,c.critically_endangered,c.endangered,c.vulnerable, c.extinct" +
			" from countrywise_status c where c.country_id = " + countryCode;
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		res.send(results);
	});
}

exports.timeLineChartInfo= function(req,res){
	var whereClause = " where ";
	var animalTypes = req.param("animalTypes").split(",");
	console.log("animalTypes" + animalTypes);
	for(var i=0;i<animalTypes.length;i++){
		whereClause = whereClause + " type ='" + animalTypes[i] +"' or ";
	}
	whereClause = whereClause.substring(0, whereClause.length-3);
	var sql = "select type,year_1998,year_2000,year_2002,year_2003,year_2004,year_2006," +
			"year_2007,year_2008,year_2009,year_2010,year_2011,year_2012,year_2013 " +
			"from yearwise_count" + whereClause;
	console.log();
	mysql.executeQuery(sql, function(err, results) {
		console.log(results);
		res.send(results);
	});
}
