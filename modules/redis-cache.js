var redis = require('redis');
var client = redis.createClient(6379, "127.0.0.1");
var Constants = require('./constants');


var RedisCache = function () {}

RedisCache.cachedSqlQueries	= [Constants.SELECT_ANIMALS_QUERY, Constants.SELECT_COUNTRY_QUERY, Constants.SELECT_SOLUTIONS_QUERY];

client.on("error", function (err) {
    console.log("Error connecting REDIS Cache Server " + err);
});


RedisCache.getCachedSqlQueries = function() {
	return RedisCache.cachedSqlQueries;
};


/**
 * Caching Animals into REDIS database
 */
RedisCache.cacheAnimals = function(animals) {
	console.log("Caching animals");
	client.set(Constants.SELECT_ANIMALS_QUERY, JSON.stringify(animals));
};


/**
 * Getting cached Animals from REDIS database
 */
RedisCache.getCachedAnimals = function(callback) {
	RedisCache.getCachedDetails(Constants.SELECT_ANIMALS_QUERY, callback);
};

/**
 * Caching Countries
 */
RedisCache.cacheCountries = function(countries) {
	console.log("Caching countries");
	client.set(Constants.SELECT_COUNTRY_QUERY, JSON.stringify(countries));
};

/**
 * Getting cached Countries
 */
RedisCache.getCachedCountries = function(callback) {
	RedisCache.getCachedDetails(Constants.SELECT_COUNTRY_QUERY, callback);
};


/**
 * Caching Solutions
 */
RedisCache.cacheSolutions = function(solutions) {
	console.log("Caching solutions");
	client.set(Constants.SELECT_SOLUTIONS_QUERY, JSON.stringify(solutions));
};

/**
 * Getting cached Solutions
 */
RedisCache.getCachedSolutions = function(callback) {
	RedisCache.getCachedDetails(Constants.SELECT_SOLUTIONS_QUERY, callback);
};

/**
 * Caching Solutions
 */
RedisCache.cacheDetails = function(key, data) {
	console.log("Caching details. Query --> " + key);
	client.set(key, JSON.stringify(data));
};

/**
 * To fetch cached details mapped by provided key
 */
RedisCache.getCachedDetails = function(key, callback) {
	console.log("Fetching cached details for --> " + key);
	client.get(key, function (err, reply){
		callback(err, JSON.parse(reply));
	});
};

module.exports = RedisCache;