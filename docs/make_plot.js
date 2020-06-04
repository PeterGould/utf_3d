Plotly.d3.csv('data.csv', function(err, rows){
function unpack(rows, key,group) {
	var t1 = rows.map(function(row)
	{ 
		if (row.group == group) return row[key];
	 });
	 return(t1.filter(function(x){return x!=undefined;}))
	}
var colors=[];
var regions = []
var last_one = '';
rows.forEach(function(x){
	if(x.color!=last_one){
		colors.push(x.color);
		regions.push(x.region);
	}
	last_one = x.color;
})
var data = [];
for(var k = 0; k < 13;k++){
	var a_data = {
		x:unpack(rows, 'x',k), y: unpack(rows, 'y',k), z: unpack(rows, 'z',k),
		site_name:unpack(rows,"site_name"),
		mode: 'markers',
		name:regions[k],
		hovertext:unpack(rows,'site_name',k),
		marker: {
			size: 6,
			color:colors[k],
			line: {
			color: '#000000',
			width: 0.5},
			opacity: 0.8},
		type: 'scatter3d'
	};
	data.push(a_data)
}

//last set is a surface
var x = data[12].x.slice(0,25)
var y = data[12].y.filter(function(x,y){return y%25==0});
var z = []
for(var k =0;k<25;k++){
	z.push(data[12].z.slice((k*25),(k+1)*25));
}
data[12].type = 'surface';
data[12].marker.color = 'rgba(50,50,50,50)';
data[12].color = 'rgba(50,50,50,0.5)';
data[12].opacity = 0.5;
data[12].vertexcolor = 'rgba(255,255,255,1)';
data[12].x = x;
data[12].y = y;
data[12].z = z;
data[12].contours= {
    x: { show: true },
    y: { show: true },
    z: { show: false }
  };
  data[12].showscale=false;
var layout = {
	/*margin: {
	l: 5,
	r: 5,
	b: 5,
	t: 5
  },*/
  title:{
	  text:'Universal Response Function'
	  ,y:0
  }
  ,scene:{
	xaxis:{
		title:{
			text:"Pop TMIN01"
		}
	}
	,yaxis:{
		title:{
			text:"Site MAT"
	}
	,zaxis:{
		title:{
			text:"VolYld"
	}
}
}
}
};
Plotly.newPlot('myDiv', data, layout);
});