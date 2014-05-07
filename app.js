
/**
 * Module dependencies.
 */
/*****************************************************
 * ******** Imports
 *****************************************************/
var express = require('express');
var routes = require('./routes');
var stats = require('./routes/stats');
var cache = require('./modules/cache');
var http = require('http');
var path = require('path');

/**********************Import Ends*******************************/

/*****************************************************
 * ******** Initialization
 *****************************************************/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/********************** Initialization Ends *******************************/

//app.get('/animalProfile.ejs', function(req, res) {res.render('animalProfile', req.body);});

app.post('/animalProfile', function(req, res) {res.render('animalProfile', req.body);});
app.post('/statContent', function(req, res) {res.render('statContent', req.body);});
app.post('/conservationStat', function(req, res) {res.render('conservationStat', req.body);});
app.post('/timeStat', function(req, res) {res.render('timeStat', req.body);});

app.get('/', routes.index);
app.get('/browse', routes.browse);
app.get('/infographics', routes.infographics);
app.get('/stats', stats.index);
app.get('/statPageInfo/:dataCategory',routes.statPageInfo);
app.get('/animalInformation/:id',routes.showInformation);
app.get('/worldInformation/animalType/:animalType',routes.worldInfoAnimalType);
app.get('/worldInformation/conservationStatus/:conservationStatus',routes.worldInfoConservationStatus);
app.get('/chartInformation/:countryCode',routes.chartInformation);
app.get('/conStatusChartInfo/:countryCode', routes.conStatusChartInfo);
app.get('/timeLineChartInfo/:animalTypes', routes.timeLineChartInfo);
app.get('/solutions', routes.solutions);
app.get('/aboutUs', routes.aboutUs);
app.get('/TicketApp', routes.TicketApp);


http.createServer(app).listen(app.get('port'), function(){

  console.log('Express server listening on port ' + app.get('port'));
});
