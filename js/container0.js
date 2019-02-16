//散点图
/*<html>
	<head>
		<title>共享单车热度趋势折线图</title>
		<style type="text/css">
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
			
			.tooltip{
				position:absolute;
				width:80;
				height:25;
				font-family: simsun;  
				font-size: 17px; 
				fill:black;
				text-align: center;  
				border-style: solid;   
				border-width: 1px;  
				background-color: white;  
				border-radius: 5px;  
				}  

	</style>
	
	<body>
		<!--<p>共享单车搜索热度趋势图	数据来源：<a href="http://index.baidu.com/?tpl=trend&word=%B9%B2%CF%ED%B5%A5%B3%B5">百度指数</a></p>-->
		<script src="d3.min.js" charset="utf-8"></script>
		<script>*/
			var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
			var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
			
			//定义数据集
			var dataset=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			571, 902, 960, 1016, 1320, 1956, 2553, 2298, 2669, 5077, 3805, 2749, 3894, 4188, 3766, 3534, 5515, 10722, 16872, 24290, 
			27649, 30113, 32135, 29546, 27455, 22081, 22623, 20310, 22081, 22623, 20310, 23388, 21731, 20143, 21554, 18575, 33145, 30521, 26895, 18364, 17383, 15222);
			
			//定义横坐标
			var monthset=new Array("2016年1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "2017年1月", "2月", "3月", "4月", "5月", "6月", "7月");
			
			var width = 900;
			var height = 650;
			
			//色彩序数比例尺
			var color=d3.scale.category20c();
			
			//定义线性比例变换
			var mindata = d3.min(dataset);
			var maxdata = d3.max(dataset);
			var scalemin = 100;
			var scalemax = height-50;
			
			//线性比例尺
			var linearData=d3.scale.linear()
								   .domain([0,d3.max(dataset)])		//设置定义域
								   .range([0,height-50]);			//设置值域
			//对数比例尺
			var logData=d3.scale.log()
							    .domain([mindata,maxdata])    //值域0-1
							    .range([scalemin,scalemax]);  //线性变换为值域[scalemin,scalemax]
			
			//X轴
			var xScale=d3.scale.linear()
			                   .domain([0,monthset.length])
							   .range([0,width-70]);

			var xAxis=d3.svg.axis()      //控制轴的刻度的生成
			                .scale(xScale)
							.ticks(20)
							.orient("bottom");

			//Y轴
			var yScale=d3.scale.linear()
			                   .domain([0,maxdata])
							   .range([height-50,0]);
			
			var yAxis=d3.svg.axis()
			                .scale(yScale)
							.ticks(10)
							.orient("left");
			
			//定义svg
			var svg = d3.select("#container0")
						.append("svg")
						.attr("width", width+10)
						.attr("height", height);
			
			
			var gxAxis=svg.append("g")
						  .attr("class","axis")
						  .attr("transform","translate(70,"+(height-30)+")")
						  .call(xAxis);

	        var gyAxis=svg.append("g")
						  .attr("class","axis")
						  .attr("transform","translate(70,20)")
						  .call(yAxis);
			
			//添加提示框
			var tooltip = d3.select("body")  
							.data(dataset)
							.enter()
							.append("div")  
							.attr("class","tooltip")  
							.style("opacity",0.0);

			//定义直方矩形的宽度
			var padding={top:20,right:20,bottom:20,left:20};
			var rectStep=(width-50)/dataset.length;
			var rectWidth=rectStep*0.9;
			var rectStep2 = (width-70)/monthset.length;
			var rectWidth2 = rectStep2*0.9;
			
			
			//数据文本显示
			var dataText=svg.selectAll(".datatext")
							.data(dataset)
							.enter()
							.append("text")
							.attr("class",".datatext")
							.attr("fill","black")
							.style("opacity", 0)
							.attr("font-size","15px")
							.attr("text-anchor","middle")
							.attr("x",function(d,i){
								return i*rectStep+70;
							})
							.attr("y",function(d,i){
								return yScale(d);
							})
							.attr("dx",rectWidth/2)
							.attr("dy","1em")
							.text(function(d){
								return d;
							});
							
			//添加矩形
			var rect = svg.selectAll("rect")
						  .data(dataset)
						  .enter()
						  .append("rect")
						  .attr("fill", function(d){
							return color(d);
							})
						  .style("fill-opacity", 0)
						  .attr("x", function(d, i){
							return i*rectStep+70;
							})
						  .attr("y", function(d, i){
							return yScale(d)+20;
							})
						  .attr("width", rectWidth)
						  .attr("height", function(d){
							return linearData(d);
							})
						  .on("mouseover", function(){
						    d3.select(this)
								.style("fill-opacity", 1);
								
							tooltip.html(function(d){
								return d;
								})
								   .style("fill", "black")
								   .style("left", (d3.event.pageX) + "px")  
								   .style("top", (d3.event.pageY+20) + "px") 
								   .style("opacity", 1);
							})
						  .on("mousemove", function(d){  
								tooltip.style("left",(d3.event.pageX)+"px")  
									   .style("top",(d3.event.pageY+20)+"px");  
										 })  
						  .on("mouseout", function(){
						  
							  d3.select(this)
								.style("fill-opacity", 0);
								
							  tooltip.style("opacity", 0);
							});
							
			
			//折线图上的节点
			var circle = svg.selectAll("circle")
							.data(dataset)
							.enter()
							.append("circle")
							.attr("r", 6)
							.style("fill", "#00FF00")
							.attr("cx", function(d, i){
								return i*rectStep+70+rectWidth/2;
								})
							.attr("cy", function(d, i){
								return yScale(d)+20;
								})
							.style("fill-opacity", 0)
							.transition()
							.duration(1000)
							.ease("bounce")
							.delay(function(d, i){
								return 50*i;
								})
							.style("fill-opacity", 1);
			
			//横坐标显示
			var monthText = svg.selectAll(".monthtext")
							   .data(monthset)
							   .enter()
							   .append("text")
							   .attr("class", ".monthtext")
							   .attr("fill", "black")
							   .attr("font-size","12px")
							   .attr("text-anchor","middle")
							   .attr("x",function(d,i){
									return i*rectStep2+70;
								})
							   .attr("y",height-20)//******************
							   .attr("dx",rectWidth2/2)
							   .attr("dy", "1em")
							   .text(function(d){
									return d;
								});
							
			function draw(){
				var updateRect=svg.selectAll("rect")
								  .data(dataset);
				var enterRect=updateRect.enter();
				var exitRect=updateRect.exit();
				
				var mindata=d3.min(dataset);
				var maxdata=d3.max(dataset);
				var rectStep=width/dataset.length;
				var rectWidth=rectStep*0.9;
				
				updateRect.attr("fill","LawnGreen")
						  .attr("x",function(d,i){
							return i*rectStep;
							})
						  .attr("y",function(d,i){
							return height-((d-mindata)*(scalemax-scalemin)/(maxdata-mindata)+100);
						  })
						  .attr("width",rectWidth)
						  .attr("height",function(d){
							return ((d-mindata)*(scalemax-scalemin)/(maxdata-mindata)+80);
						});
				enterRect.append("rect")
						  .attr("fill","DarkKhaki")
						  .attr("x",function(d,i){
							return i*rectStep;
							})
						  .attr("y",function(d,i){
							return height-((d-mindata)*(scalemax-scalemin)/(maxdata-mindata)+100);
						  })
						  .attr("width",rectWidth)
						  .attr("height",function(d){
							return ((d-mindata)*(scalemax-scalemin)/(maxdata-mindata)+80);
						});
				exitRect.remove();
				
				var updateText=svg.selectAll(".textvalue")
								 .data(dataset);
				var enterText=updateText.enter();
				var exitText=updateText.exit();
			}
	
		/*</script>
	</body>
</html>*/