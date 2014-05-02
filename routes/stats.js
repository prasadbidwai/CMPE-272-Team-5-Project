
/*
 * GET users listing.
 */

exports.index = function(req, res){
	res.render("statistics",{
		title:"statistics"
	});
  res.send("respond with a resource");
};

exports.list = function(req, res){
  res.send("respond with a resource");
};