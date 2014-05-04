var geochart, lineChart, columnChart, pieChart,countryCode, donutChart,dataCategory,informationType;
var selectedAnimalTypes = new Array();

function ajaxCall(url, type, callback){
	$.ajax({
		type : type,
		url : url,
		contentType : 'application/json'
	}).done(function(response) {
		callback(response,dataCategory);
	});
}

function init() {
	var obj = null;
	$("#navigation li").click(function(e) {
		if (obj == null) {
			obj = e;
		} else {
			obj.className = "";
		}
		e.currentTarget.className = "active";
		$("#main-content").hide(400);
		obj = e.currentTarget;
		
		ajaxCall('/animalInformation/' + e.target.id, "GET" ,function(response){
			$("#main-content").load("animalProfile", {data : response}, function(response, status, xhr) {});
			$("#main-content").show(400);
		});
	});
}

function selectAnalysisCategory(type, dataCat) {
	dataCategory = dataCat;
	informationType = type;
	$("#selectCategoryDiv").slideUp(function() {
		$("#statsWorkspace").slideDown();
	});
	
	if(type == "country"){
		ajaxCall('/statPageInfo/'+dataCat,"GET",function(response){
			var data = {};
			data["res"] = response;
			data["dataCategory"] = dataCat;
			$("#statsContent").load("statContent", {data : data}, function(response, status, xhr) {});
		});
	}else if(type == "conservationStatus"){
		ajaxCall('/statPageInfo/'+dataCat,"GET",function(response){
			var data = {};
			data["res"] = response;
			data["dataCategory"] = dataCat;
			$("#statsContent").load("conservationStat", {data : data}, function(response, status, xhr) {});
		});
	}else{
		console.log("------------------------------------");
		ajaxCall('/statPageInfo/'+dataCat,"GET",function(response){
			$("#statsContent").load("timeStat", {data : response}, function(response, status, xhr) {});
		});
	}
	

}

function convertJSONToArray(json){
	var arr = new Array();
	arr.push("Select a value");
	for(var i=0; i<json.length;i++){
		arr.push(json[i].name);
	}
	return arr;
}

function showAnalyseDataOptions() {
	$("#statsWorkspace").slideUp(function() {
		$("#selectCategoryDiv").slideDown();
	});
	selectedAnimalTypes = new Array();
}

function countrySelected(obj){
	countryCode = obj.value;
	if(countryCode == 0){
		$("#chartTypeOptionDiv").hide(400);
	}else{
		$("#chartTypeOptionDiv").show(400);
		
	}
}

function selectWorldMap(){
	countryCode = 0;
	$("#countrySelect").val(0);
	$("#animalTypeOptionDiv").show(400);
	$("#chartTypeOptionDiv").hide(400);
}

function initCharts() {
	google.load('visualization', '1', {
		'packages' : [ 'geochart' ]
	});
	google.setOnLoadCallback(function() {
	});

	google.load("visualization", "1", {
		packages : [ "corechart" ]
	});
	google.setOnLoadCallback(function() {
	});
	
	$('.nav-tabs').button();
}


function updateChart(obj){
	
	if(obj.name == "animalType"){
		if($(obj).is(":checked")){
			drawGeoChart('/worldInformation/animalType/' + obj.value,'#267114');
		}
	}else if(obj.name == "conservationStatus"){
		if($(obj).is(":checked")){
			drawGeoChart('/worldInformation/conservationStatus/' + obj.value,'#993333');
		}
	}else{ //
		if($(obj).is(":checked")){
			if(obj.name=="conStatusChart"){
				drawGraphs(obj.value,"/conStatusChartInfo/"+countryCode,obj.name);
			}else{
				drawGraphs(obj.value,"/chartInformation/"+countryCode,obj.name);
			}
		}
	}
}

function updateTimeChart(obj){
	$("#info").html("Gathering information from countries please wait ....");
	if($(obj).is(":checked")){
		selectedAnimalTypes.push(obj.value);
	}else{
		for(var i=0; i < selectedAnimalTypes.length;i++){
			if(selectedAnimalTypes[i] == obj.value){
				selectedAnimalTypes.splice(i,1);
			}
		}
	}
	
	if(selectedAnimalTypes.length > 0){
		drawLineChart(selectedAnimalTypes);
	}
}


function drawGraphs(graphType,url,infoType){
	ajaxCall(url,"GET",function(response){
		var data;
		if(infoType == "conservationStatusChart"){
			data = createArrayForGraphConStatus(response);
		}else{
			data = createArrayForGraphType(response);
		}
		if(graphType == "column"){
			drawColumnChart(data);
		}else if(graphType == "pie"){
			drawPieChart(data);
		}else if(graphType == "donut"){
			drawDonutChart(data);
		}
	});
}

function createArrayForGraphType(data){
	var mainArr = new Array();
	
	var arr = new Array();
	arr.push("Name");
	arr.push("Value");
	mainArr.push(arr);
	
	var arr1 = new Array();
	arr1.push("Mammals");
	arr1.push(data[0].mammals);
	mainArr.push(arr1);
	
	var arr2 = new Array();
	arr2.push("Bird");
	arr2.push(data[0].birds);
	mainArr.push(arr2);
	
	var arr3 = new Array();
	arr3.push("Amphibian");
	arr3.push(data[0].amphibian);
	mainArr.push(arr3);
	
	var arr4 = new Array();
	arr4.push("Fishes");
	arr4.push(data[0].fishes);
	mainArr.push(arr4);
	
	var arr5 = new Array();
	arr5.push("Reptiles");
	arr5.push(data[0].reptiles);
	mainArr.push(arr5);
	
	return mainArr;
}

function createArrayForGraphConStatus(data){
	var mainArr = new Array();
	
	var arr = new Array();
	arr.push("Name");
	arr.push("Value");
	mainArr.push(arr);
	
	var arr1 = new Array();
	arr1.push("Extinct");
	arr1.push(data[0].extinct);
	mainArr.push(arr1);
	
	var arr2 = new Array();
	arr2.push("Critically Endangered");
	arr2.push(data[0].critically_endangered);
	mainArr.push(arr2);
	
	var arr3 = new Array();
	arr3.push("Endangered");
	arr3.push(data[0].endangered);
	mainArr.push(arr3);
	
	var arr4 = new Array();
	arr4.push("Vulnerable");
	arr4.push(data[0].fishes);
	mainArr.push(arr4);
	
	var arr5 = new Array();
	arr5.push("Near Threatened");
	arr5.push(data[0].near_threatened);
	mainArr.push(arr5);
	
	return mainArr;
}

function drawGeoChart(url,color) {
	$.ajax({
		type : 'GET',
		url : url
	}).done(function(response) {
		delete geochart;
		geochart = new google.visualization.GeoChart(document
				.getElementById('charts'));
		
		var data = google.visualization.arrayToDataTable(createJSON(response),false);
		var options = {
				colorAxis: {colors: ['#f5f5f5',color]},
		};
		geochart.draw(data, options);
	});
}

function createJSON(collection){
	var mainArr = new Array();
	var arr1 = new Array();
	arr1.push("Country");
	arr1.push("Population");
	mainArr.push(arr1);
	
	for(var i=0;i<collection.length;i++){
		var arr = new Array();
		arr.push(collection[i].name);
		arr.push(collection[i].value);
		mainArr.push(arr);
	}
	return mainArr;
}

function drawLineChart() {
	$.ajax({
		type : 'GET',
		url : '/timeLineChartInfo/'+ selectedAnimalTypes
	}).done(function(response) {

		var data = getArrayForTimeLineData(response);
		
		delete lineChart;
		lineChart = new google.visualization.LineChart(document
				.getElementById('charts'));
		var lineChartData = google.visualization.arrayToDataTable(data);
		var options = {
			title : '',
			curveType : 'function',
			legend : {
				position : 'top'
			}
		};

		lineChart.draw(lineChartData, options);
	});
	
	
}



function drawColumnChart(data) {
	delete columnChart;
	columnChart = new google.visualization.ColumnChart(document
			.getElementById('charts'));

	var colChartData = google.visualization.arrayToDataTable(data,false);
	var options = {
		title : ''
	};

	columnChart.draw(colChartData, options);
}

function drawPieChart(data) {
	delete pieChart;
	pieChart = new google.visualization.PieChart(document
			.getElementById('charts'));
	var pieData = google.visualization.arrayToDataTable(data,false);

	var options = {
		title : '',
		is3D : true,
	};

	pieChart.draw(pieData, options);
}

function drawDonutChart(data){
	delete donutChart;
	donutChart = new google.visualization.PieChart(document.getElementById('charts'));	
	var donutData = google.visualization.arrayToDataTable(data,false);

    var options = {
      title: '',
      pieHole: 0.4,
    };

   
    donutChart.draw(donutData, options);

}


function getArrayForTimeLineData(collectionJSON){
	
	var mainArr = new Array();
	
	var arr1 = new Array();
	arr1.push("Year");
	for(var i=0; i < selectedAnimalTypes.length; i++){
		arr1.push(selectedAnimalTypes[i]);
	}
	
	mainArr.push(arr1);
		
	var arr1998 = new Array();
	var arr2000 = new Array();
	var arr2002 = new Array();
	var arr2003 = new Array();
	var arr2004 = new Array();
	var arr2006 = new Array();
	var arr2007 = new Array();
	var arr2008 = new Array();
	var arr2009 = new Array();
	var arr2010 = new Array();
	var arr2011 = new Array();
	var arr2012 = new Array();
	var arr2013 = new Array();
	
	arr1998.push("1998");
	arr2000.push("2000");
	arr2002.push("2002");
	arr2003.push("2003");
	arr2004.push("2004");
	arr2006.push("2006");
	arr2007.push("2007");
	arr2008.push("2008");
	arr2009.push("2009");
	arr2010.push("2010");
	arr2011.push("2011");
	arr2012.push("2012");
	arr2013.push("2013");
	
	
	console.log("length ==================="+collectionJSON.length);
	for(var j = 0; j < collectionJSON.length; j++){
		arr1998.push(collectionJSON[j].year_1998);
		arr2000.push(collectionJSON[j].year_2000);
		arr2002.push(collectionJSON[j].year_2002);
		arr2003.push(collectionJSON[j].year_2003);
		arr2004.push(collectionJSON[j].year_2004);
		arr2006.push(collectionJSON[j].year_2006);
		arr2007.push(collectionJSON[j].year_2007);
		arr2008.push(collectionJSON[j].year_2008);
		arr2009.push(collectionJSON[j].year_2009);
		arr2010.push(collectionJSON[j].year_2010);
	    arr2011.push(collectionJSON[j].year_2011);
		arr2012.push(collectionJSON[j].year_2012);
		arr2013.push(collectionJSON[j].year_2013);

		
	}
	mainArr.push(arr1998);
	mainArr.push(arr2000);
	mainArr.push(arr2002);
	mainArr.push(arr2003);
	mainArr.push(arr2004);
	mainArr.push(arr2006);
	mainArr.push(arr2007);
	mainArr.push(arr2008);
	mainArr.push(arr2009);
	mainArr.push(arr2010);
	mainArr.push(arr2011);
	mainArr.push(arr2012);
	mainArr.push(arr2013);
	
	console.log(mainArr);
	
	return mainArr;
}
function initInfographics(){
	  $(document).ready(function(){
          $('.least-gallery').least();
      });
}



