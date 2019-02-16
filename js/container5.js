//直方图（痛点）
/*<html>
	<head>
	<title>共享单车用户痛点分析直方图</title>
	<style>
		.axis path,
		.axis line{
			fill:none;
			stroke:green;
			shape-rendering:crispEdges;
		}
		.axis text{
			font-family:sans-serif;
			font-size:12px;
			fill:green;
		}
	</style>
	</head>
	<body>
		<script src="d3.min.js" charset="utf-8"></script>
		<script>*/
			var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
			var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;

			//定义数据集
			var dataset = new Array(44.2, 39.9, 29.7, 27.5, 23.9, 8.0, 5.8, 5.1);
			
			//定义横坐标
			var goodset = new Array("车辆数量、分布有待优化", "停车点少", "押金较高", "定位不准", "单车骑行效果不佳", "客服质量有待提高", "注册不便", "APP使用不便");

			var width=950;
			var height=530;
			
			//线性比例变换
			var mindata=d3.min(dataset);
			var maxdata=d3.max(dataset);
			var scalemin=100;
			var scalemax=height-50;

			//色彩序数比例尺
			var color=d3.scale.category20c();

			//线性比例尺
			var linearData=d3.scale.linear()
								   .domain([0,d3.max(dataset)])
								   .range([0,height-50]);
			//对数比例尺
			var logData=d3.scale.log()
						  .domain([mindata,maxdata])    //值域0-1
						  .range([scalemin,scalemax]);  //线性变换为值域[scalemin,scalemax]

			//X轴
			var xScale=d3.scale.linear()
			                   //.domain([1,dataset.length+1])
							   //.range([0,w-100]);
							   .domain([0, 100])
							   .range([0, w-600]);

			var xAxis=d3.svg.axis()
			                .scale(xScale)
							.ticks(10)
							.orient("bottom");

			//Y轴
			var yScale=d3.scale.linear()
			                   //.domain([0,d3.max(dataset)])
							   //.range([height-50,0]);
							   .domain([0, dataset.length])
							   .range([0, height-50]);
			
			var yAxis=d3.svg.axis()
			                .scale(yScale)
							.ticks(10)
							.orient("left");
			
			var svg=d3.select("#container5")
					  .append("svg")
					  .attr("width",width)
					  .attr("height",height);

			

	        var gyAxis=svg.append("g")
						  .attr("class","axis")
						  //.attr("transform","translate(50,20)")
						  .attr("transform","translate(300,20)")
						  .call(yAxis);
					  
					  
			var padding={top:20,right:20,bottom:20,left:20};
			//var rectStep=35;
			var rectStep=(height-50)/dataset.length;
			var rectHeight=rectStep*0.6;
			
			//定义矩形
			var rect=svg.selectAll("rect")
						.data(dataset)
						.enter()
						.append("rect")
						.attr("fill",function(d){
							return color(d);
						})
						//.attr("opacity",0.5)
						.attr("x", 300)
						
						.attr("y",function(d, i){
							return i*rectStep+20;
							})
						//.attr("height",0)
						//.transition().duration(1000).ease("bounce")
						//.attr("y",function(d,i){
							// return yScale(d)+20;
						//})
						.attr("width", 0)
						.transition()
						.duration(2000)
						.ease("bounce")
						.delay(function(d, i){
							return 200*i;
							})
						.attr("height",rectHeight)
						.attr("width",function(d){
							return linearData(d);
							});
				
				//设置数据文本
				var datatext = svg.selectAll(".datatext")	 
								  .data(dataset)
								  .enter()
								  .append("text")
								  .attr("class",".datatext")
								  .attr("fill","black")
								  .attr("font-size","17px")
								  .attr("text-anchor","top")
								  .attr("x",function(d,i){
										return linearData(d)+300;
								    })
								  .attr("y",function(d,i){
										return i*rectStep+20;
									})
								  .attr("dx","1em")
								  .attr("dy", rectHeight/2)
								  .text(function(d){
									return d+"%";
									});
				
				//设置选项文本
				var goodtext = svg.selectAll(".goodtextt")
								  .data(goodset)
								  .enter()
								  .append("text")
								  .attr("class", "goodtext")
								  .attr("fill", "black")
								  .attr("font-size","17px")
							      .attr("text-anchor","end")
								  .attr("x", 300)
								  .attr("y", function(d,i){
										return i*rectStep+20;
									})
								  .attr("dx", "-2em")
								  .attr("dy", rectHeight/2)
								  .text(function(d){
									return d;
									});
		/*</script>
	</body>
</html>*/