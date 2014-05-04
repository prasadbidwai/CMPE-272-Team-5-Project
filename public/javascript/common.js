var geochart, lineChart, columnChart, pieChart,countryCode;

/*function ajaxCall(url, method) {
	var result = "";
	$.ajax({
		url : "/" + url,
		type : method,
		async : false,
		success : function(data) {
			result = data;
		}
	});
	return result;
}
*/

function ajaxCall(url, type, callback){
	$.ajax({
		type : type,
		url : url,
		contentType : 'application/json'
	}).done(function(response) {
		callback(response)
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
		
		ajaxCall('/animalInformation/' + e.target.id,"GET",function(response){
			$("#main-content").load("animalProfile", {data : response}, function(response, status, xhr) {});
			$("#main-content").show(400);
		});
	
	});
}

function selectAnalysisCategory(type) {
	$("#selectCategoryDiv").slideUp(function() {
		$("#statsWorkspace").slideDown();
	});
	
	ajaxCall('/statPageInfo',"GET",function(response){
		//console.log(convertJSONToArray(response));
		 
		//$("#country").typeahead({source:response});
		$("#statsContent").load("statContent", {data : response}, function(response, status, xhr) {
		});
	});
	
	
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
}

function countrySelected(obj){
	countryCode = obj.value;
	if(obj.value != 0){
		$("#worldMapBtn").attr("disabled", "disabled");
	}else{
		$("#worldMapBtn").removeAttr("disabled");
	}
	alert(obj.value);
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
}


function updateChart(obj){
	if(obj.name == "animalType"){
		if($(obj).is(":checked")){
			drawGeoChart(obj.value);
		}
	}else{ //
		if($(obj).is(":checked")){
			drawGraphs(obj.value);
		}
	}

}

function drawGraphs(graphType){
	ajaxCall("/chartInformation/"+countryCode,"GET",function(response){
		var data = createArrayForBarGraph(response);
		if(graphType = "column"){
			drawColumnChart(data);
		}else if(graphType == "pie"){
			console.log("pie");
			drawPieChart(data);
		}
	});
}

function createArrayForBarGraph(data){
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

function drawGeoChart(animalType) {
	$.ajax({
		type : 'GET',
		url : '/worldInformation/' + animalType
	}).done(function(response) {
		delete geochart;
		geochart = new google.visualization.GeoChart(document
				.getElementById('charts'));
		
		var data = google.visualization.arrayToDataTable(createJSON(response),false);
		var options = {};
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
	delete lineChart;
	lineChart = new google.visualization.LineChart(document
			.getElementById('charts'));
	var data = google.visualization
			.arrayToDataTable([ [ 'Year', 'Sales', 'Expenses', 'test' ],
					[ '2004', 1000, 400, 300 ], [ '2005', 1170, 460, 1300 ],
					[ '2006', 660, 1120, 800 ], [ '2007', 1030, 540, 400 ] ]);

	var options = {
		title : 'Company Performance',
		curveType : 'function',
		legend : {
			position : 'bottom'
		}
	};

	lineChart.draw(data, options);
}

function drawColumnChart(data) {
	delete columnChart;
	columnChart = new google.visualization.ColumnChart(document
			.getElementById('charts'));

	var data = google.visualization.arrayToDataTable(data,false);
	var options = {
		title : ''
	};

	columnChart.draw(data, options);
}

function drawPieChart(data) {
	delete pieChart;
	pieChart = new google.visualization.PieChart(document
			.getElementById('charts'));
	var data = google.visualization.arrayToDataTable(data,false);

	var options = {
		title : 'My Daily Activities',
		is3D : true,
	};

	pieChart.draw(data, options);
}

function initInfographics(){
	  $(document).ready(function(){
          $('.least-gallery').least();
      });
}

