var geochart,lineChart,columnChart,pieChart;

function ajaxCall(url, method) {
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

function init(){
	var obj = null;
	$("#navigation li").click(function(e) {
		
		if(obj == null){
			obj = e;
		}else{
			obj.className = "";
			
		}
		
		e.currentTarget.className = "active";
	   $("#main-content").hide(400);
	   obj =  e.currentTarget;
	   $.ajax({
			type: 'GET',
	        url: '/animalInformation/'+e.target.id,
	        contentType: 'application/json'
	    }).done(function(response) {
	    	$("#main-content").load("animalProfile", {data : response}, function(response, status, xhr) {});
	    	$("#main-content").show(400);
	    }).error(function(response) {
	    	
	    });
	});
}

function selectAnalysisCategory(type){
	$("#selectCategoryDiv").slideUp(function(){
		$("#statsWorkspace").slideDown();
	});
	
}

function showAnalyseDataOptions(){
	$("#statsWorkspace").slideUp(function(){
		$("#selectCategoryDiv").slideDown();
	});
}


function initCharts(){
	google.load('visualization', '1', {'packages': ['geochart']});
	google.setOnLoadCallback(function(){
	});
	
	google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(function(){
	});
}

function drawGeoChart(){
	delete geochart;
	geochart = new google.visualization.GeoChart(document.getElementById('charts'));
	 var data = google.visualization.arrayToDataTable([
       ['Country', 'Popularity'],
       ['Germany', 200],
       ['United States', 300],
       ['Brazil', 400],
       ['Canada', 500],
       ['France', 600],
       ['RU', 700]
     ]);
	 var options = {};
	 geochart.draw(data, options);
}

function drawLineChart() {
	delete lineChart;
	lineChart = new google.visualization.LineChart(document.getElementById('charts'));
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
    		title: 'Company Performance',
    	    curveType: 'function',
    	    legend: { position: 'bottom' }
    };

    lineChart.draw(data, options);
}

function drawColumnChart() {
	delete columnChart;
	columnChart = new google.visualization.ColumnChart(document.getElementById('charts'));
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
      title: 'Company Performance'
    };

    columnChart.draw(data, options);
}

function drawPieChart() {
	delete pieChart;
	pieChart = new google.visualization.PieChart(document.getElementById('charts'));
	var data = google.visualization.arrayToDataTable([
	  ['Task', 'Hours per Day'],
	  ['Work',     11],
	  ['Eat',      2],
	  ['Commute',  2],
	  ['Watch TV', 2],
	  ['Sleep',    7]
	]);
	
	var options = {
	  title: 'My Daily Activities',
	  is3D: true,
	};
	
	pieChart.draw(data, options);
}


