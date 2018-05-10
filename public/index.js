	let sensorIDs = [];
	let timestamp = [];
	let measure = [];
	let capabilityIDs = [];
	let k='';
	var tt=0;
	var graph=[];
	var v;
	let sensorMap = new  Map();
//var TESTER;
	var GRAPH_INC = 0;

setInterval(hitAPI,20000)
function hitAPI() {
	GRAPH_INC++;
	// let url = document.getElementById('api_url').value;
		// console.log('hi' + url);
		let url = "https://nagarro.eu10.cp.iot.sap/iot/core/api/v1/devices/";
		let d_no = document.getElementById('d_no').value;
		url = url + d_no + '/measures';
	     capabilityIDs = [];
			  sensorIDs = [];
			  timestamp = [];
			  measure = [];
	let xhr = new XMLHttpRequest();
		console.log('a');
		console.log('aaa');



	xhr.onreadystatechange = function() {

		console.log("this is response text :"+ xhr.responseText);
		if(xhr.readyState==4)
		{
			console.log('aa');
			console.log("status"+xhr.status)

		if( xhr.status == 200) {
			console.log('aaaa');
						console.log('lol: ' + xhr.responseText);
			populateDOM(xhr.responseText, url);
		}
	}
	}
			xhr.open("GET", url, true);
		//xhr.setRequestHeader( 'Content-Type', 'application/json' );
		  xhr.setRequestHeader("Authorization", "Basic aW90cG9jOmxkMDpuUi58");

	xhr.send(null);
}


function populateDOM(jsonData, url) {

	// let jsonData =  t;

	let ele2 = document.getElementById('div2');
	let ele1 = document.getElementById('div1');

	// Extracting Device Number

	let temp =  url;
	let startIndex = url.indexOf('devices') + 8;
	temp = temp.slice(startIndex);
	let endIndex = temp.indexOf('/');
	let device_no = temp.slice(0, endIndex);

	// Extracting data

	let data = JSON.parse(jsonData);
	for(var i in data) {
		sensorIDs.push(data[i].sensorId);
		timestamp.push(data[i].timestamp);
		measure.push(JSON.stringify(data[i].measure));
		capabilityIDs.push(data[i].capabilityId);
		var j = sensorMap.get(data[i].capabilityId);
		if(j == undefined) {
			sensorMap.set(data[i].capabilityId, new Set([data[i].sensorId]));
		}
		else {
			j.add(data[i].sensorId);
		}
	}

	// console.log(sensorMap);

	// Populating DOM




	// Populating DOM Modern

	let sensorSet = new Set(sensorIDs);
	let capabilitySet = new  Set(capabilityIDs);

	let str = "";

	let itrSensor = sensorSet.values();
	let itrCap = capabilitySet.values();


	// Populating Capabilities

	let htmlStr3 = "";
	htmlStr3 += "<table class='highlight'><thead>";

	for(var i = 0; i<capabilitySet.size; i++) {
		let temp3 = itrCap.next().value;
		htmlStr3 += '<th><a class="waves-effect waves-light btn" onclick="showSensors(\'' + temp3 + '\')">' + temp3 + '</a></th>'
		//setInterval(showSensors(temp3),2000)
	}
	htmlStr3 += '</thead><tbody>';


	// Populating Sensor Table

	//let htmlStr2 = "";
	//htmlStr2 += "<a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Sensors</a><ul id='dropdown1' class='dropdown-content'>";
	//for(var i = 0; i<sensorSet.size; i++) {
	//	let temp2 = itrSensor.next().value;
	//	htmlStr2 += '<li><a href="#!" class="waves-effect waves-light btn" onclick="showSensorData(\'' + temp2 + '\')">' + temp2 +  '</a></li>';
	//}
	//htmlStr2 += '</ul>';


	htmlStr3 += "</tbody></table>";

	ele2.innerHTML = htmlStr3;
	//document.getElementById('div3').innerHTML = htmlStr2;
	$('.dropdown-trigger').dropdown();
	setInterval(a,30000);
	function a(){
	if(tt==1)
	showSensors(k)}// }, 1000);}
}


function showSensorData(sensor_ID) {
	let htmlStr='';
	dataval=''

	htmlStr = '<table id="t2"><tr><th>S. No.</th><th>Timestamp</th><th>Measure</th></tr>';
	for(var i = 0; i<sensorIDs.length; i++) {
		if(sensor_ID == sensorIDs[i]) {
			htmlStr += '<tr><td>' + (i+1) + '</td><td>' + timestamp[i] + '</td><td>' + measure[i] + '</td></tr>';
		   dataval=measure[i];
		   if(dataval.slice(16,17)=='"')
			   {
					 console.log("ravi :"+dataval.slice(15,16))
			     v=parseInt(dataval.slice(15,16))
			    xx= graph.push(v)

			   }
		   else
			   {
			console.log("gaurav :"+dataval.slice(15,17))
			v=parseInt(dataval.slice(15,17));
			xx=graph.push(v)
			//var b=graph.pop()
			console.log("ddddd: "+xx)
			}
		   //console.log("...."+graph.pop())
		}
	}
	prepGraphData();
	htmlStr += '</table>';
		document.getElementById('div4').innerHTML = htmlStr;

	//setInterval(showSensorData(sensor_ID),2000)

}



function showSensors(capabilty_id) {
	//  TESTER = document.getElementById('tester');
	// Plotly.plot( TESTER, [{
	// x: 0,
	// y: 0}], {
	// margin: { t: 0 } } );
	 graph=[]
	k=capabilty_id;
	tt=1;
	let ele3 = document.getElementById('div5');
	var htmlReply = '';
	for(var[key, value] of sensorMap) {
		if(key == capabilty_id) {
			let set1 = sensorMap.get(key);
			let itrMap = set1.values();

			for(var i = 0; i<set1.size; i++) {
				var temp = itrMap.next().value;
				htmlReply +=showSensorData(temp)
				//htmlReply += '<a class="waves-effect waves-light btn" onclick="showSensorData(\'' + temp + '\')">' + temp + '</a>&nbsp;&nbsp;';
			}
		}
	}
	ele3.innerHTML = htmlReply;
}


//require('plotly')(username, api_key);

function prepGraphData() {

	let graphNo = [];
	// // let newGraph = [];
	 for(var i = 0; i<graph.length; i++) {
		graphNo.push(i+1);
//	 	graph[i] += GRAPH_INC;
	 }



	var n = 100;
	var x = [], y = [], z = [];
	var dt = 0.015;

	for (i = 0; i < n; i++) {
	  x[i] = Math.random() * 2 - 1;
	  y[i] = Math.random() * 2 - 1;
	  z[i] = 30 + Math.random() * 10;
	}

	Plotly.plot('tester', [{
	  x: x,
	  y: z,
	  mode: 'markers'
	}], {
	  xaxis: {range: [-40, 40]},
	  yaxis: {range: [0, 60]}
	})

	function compute () {
	  var s = 10, b = 8/3, r = 28;
	  var dx, dy, dz;
	  var xh, yh, zh;
	  for (var i = 0; i < n; i++) {
	    dx = s * (y[i] - x[i]);
	    dy = x[i] * (r - z[i]) - y[i];
	    dz = x[i] * y[i] - b * z[i];

	    xh = x[i] + dx * dt * 0.5;
	    yh = y[i] + dy * dt * 0.5;
	    zh = z[i] + dz * dt * 0.5;

	    dx = s * (yh - xh);
	    dy = xh * (r - zh) - yh;
	    dz = xh * yh - b * zh;

	    x[i] += dx * dt;
	    y[i] += dy * dt;
	    z[i] += dz * dt;
	  }
	}

	function update () {
	  compute();

	  Plotly.animate('tester', {
	    data: [{x: graph, y: graph}]
	  }, {
	    transition: {
	      duration: 0
	    },
	    frame: {
	      duration: 0,
	      redraw: false
	    }
	  });

	  requestAnimationFrame(update);
	}

	requestAnimationFrame(update);










	Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows){

	  function unpack(rows, key) {
	  return rows.map(function(row) { return row[key]; });
	}


	var trace1 = {
	  type: "scatter",
	  mode: "lines",
	  name: 'AAPL High',
	  x: graph,
	  y: graphNo,
	  line: {color: '#17BECF'}
	}

	var trace2 = {
	  type: "scatter",
	  mode: "lines",
	  name: 'AAPL Low',
	  x: graph,
	  y: graphNo,
	  line: {color: '#7F7F7F'}
	}

	var data = [trace1,trace2];

	var layout = {
	  title: 'Basic Time Series',
	};

	Plotly.newPlot('myDiv', data, layout);
	})




















//	graph=[];
		//var plotly =require('plotly')("gaurav1411","kfqvVZGJ1ngPWxEAgPRq");
		// TEMP:
		//TESTER.innerHTML=''




	// 	var TESTER='';
	// TESTER = document.getElementById('tester');
	// let graphNo = [];
	// // let newGraph = [];
	// for(var i = 0; i<graph.length; i++) {
	// 	graphNo.push(i+1);
	// 	graph[i] += GRAPH_INC;
	// }
	// Plotly.plot( TESTER, [{
	// x: graphNo,
	// y: graph }], {
	// margin: { t: 0 } } );




	// Plotly.plot(data, graphOptions, function (err, msg) {
	//
	//     console.log(msg);
	// });

}
function showGraph(sensor_id) {
	let ele4 = document.getElementById('div6');

	ele4.innerHTML = 'SHOWING GRAPH OF SENSOR ID: ' + sensor_id;
}
