//饼状图
/*<html>
	<head>
	<meta charset="UTF-8">
		<title>饼图</title>
		<style type="text/css">
		
		p{ font-size:20px;}
		#r{ margin-right:200px; float:right}
		#l{ margin-left:150px; float:left;}
		</style>
	</head>
	<body>
		<!--<p id="demo"></p>-->
		<p align="left" id="l"><strong>共享单车出现前人们的出行方式占比</strong></p>
		<p align="right" id="r"><strong>共享单车出现后人们的出行方式占比</strong></p>
		
		<script src="d3.min.js" charset="utf-8"></script>
		<script>*/
			var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
			var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
			//x=document.getElementById("demo");
			//设定Svg宽度和高度
			var width=950;
			var height=530;
			
			//定义一个svg
			var svg=d3.select("#container1")
					  .append("svg")
					  .attr("width",width)
					  .attr("height",height);
	
			//初始数据
			var dataset=[["小汽车",29.8],["地铁和公交",31.2],["自行车",5.5],["其他",33.5]];
			
			//转换数据
			var pie=d3.layout.pie()
					  .value(function(d){
							return d[1];
					  }) //值访问器(从接收的数据中提取初始值)
					  .sort(null);
					   
			var piedata=pie(dataset);
			console.log(piedata);
			
			
			//外半径和内半径
			var outerRadius = 150;
			var innerRadius=110;
			
			//创建一个弧生成器
			var arc=d3.svg.arc()
					 .innerRadius(innerRadius)
					 .outerRadius(outerRadius);    
						  
			//颜色序数比例尺
			var color=d3.scale.category20c();		  
			
			//新drag
			var drag = d3.behavior.drag()
    						.on("drag",dragmove);
							
			//添加对应数组的弧组，即<g>元素
			var arcs=svg.selectAll("g")
					  .data(piedata)
					  .enter()
					  .append("g")
					  .attr("transform","translate("+(1.2*width/4)+","+(height/2)+")");
			
			//设置弧的路径元素的属性
			arcs.append("path")//给每个分组元素g添加一个路径
				.attr("fill",function(d,i){
					return color(i); //设定颜色
				})
				.attr("stroke","white")
			    .attr("stroke-width","2px")
				.on("mouseover",function(d,i){
					d3.select(this)
					  .attr("fill","green");
				})
				.on("mouseout",function(d,i){
					d3.select(this)
						.transition()
						.duration(500)
						.attr("fill",color(i));
					
				})
				.attr("d",function(d){
					return arc(d); //使用弧生成器获取路径
				})
				.each(function(d) 
    			{
    				d.dx=width/16;
    				d.dy=height/8;
    			}
    			)
				.call(drag)
		   
      	    	function dragmove(d)
    			{
    				d.dx+= d3.event.dx;
    				d.dy+= d3.event.dy;
    				
    				d3.select(this)
    					.attr("transform","translate("+d.dx+","+d.dy+")");
    			};
				
    
					  
		    //添加弧内文字
			arcs.append("text")
				.attr("transform",function(d){
						var x = arc.centroid(d)[0] ;		//文字的x坐标
						var y = arc.centroid(d)[1] ;		//文字的y坐标
							return "translate(" + x + "," + y + ")";
					})
					.attr("text-anchor","middle")
					.text(function(d){
						var percent=Number(d.value) / 
							  d3.sum(dataset,function(d){return d[1]; })*100;
						return percent.toFixed(1) + "%";
					})
					.attr("fill","black")
					.attr("font-size","13px");
					
				
			//添加弧外连接文字的线
			arcs.append("line")
				.attr("stroke","black")
				.attr("x1",function(d){ return arc.centroid(d)[0]*1.3; })
				.attr("y1",function(d){ return arc.centroid(d)[1]*1.3; })
				.attr("x2",function(d){ return arc.centroid(d)[0]*1.6; })
				.attr("y2",function(d){ return arc.centroid(d)[1]*1.6; });
				
			//添加弧外的文字元素
			arcs.append("text")
				.attr("transform",function(d){
					var x=arc.centroid(d)[0]*1.8;
					var y=arc.centroid(d)[1]*1.8;
					return "translate("+x+","+y+")";
				})
				.attr("text-anchor","middle")
				.text(function(d){
					return d.data[0];
				});
				
			/*var sum=0;  
            piedata.forEach(function(d,i){  
                d._endAngle=d.endAngle;  
                d.endAngle=d.startAngle;  
                d.duration=2000*(d.data/d3.sum(dataset));//动画时长2秒，计算每一个弧形所用动画时间  
                d.delaytime=sum;  
                sum+=d.duration;  
            }) */ 
				
			//////////////////////////

			//var dataset2=[["小汽车",26.6],["公交和地铁",30.7],["自行车",11.6],["其他",31.1]];
			var dataset2=[["1",0],["2",0],["3",0],["4",0],["小汽车",26.6],["地铁和公交",30.7],["自行车",11.6],["其他",31.1] ];
					
			
			//转换数据
			var pie=d3.layout.pie()
					  .value(function(d){
							return d[1];
					  }); //值访问器
					  
			var piedata2=pie(dataset2);
			
			console.log(piedata2);
			
			//外半径和内半径
			var outerRadius2 =150;
			var innerRadius2=110;
			
			//创建一个弧生成器
			var arc2=d3.svg.arc()
					 .innerRadius(innerRadius2)
					 .outerRadius(outerRadius2);
						  
			//颜色序数比例尺
			var color2=d3.scale.category10();		  
			
			//添加对应数组的弧组，即<g>元素
			var arcs2=svg.selectAll("g")
					  .data(piedata2)
					  .enter()
					  .append("g")
					  .attr("transform","translate("+(3*width/4)+","+(height/2)+")");
			
			//添加弧的路径元素
			arcs2.append("path")//给每个分组元素g添加一个路径
				.attr("fill",function(d,i){
					return color2(i); //设定颜色
				})
				.attr("opacity",0.5)
				.attr("stroke","white")
			    .attr("stroke-width","2px")
				.on("mouseover",function(d,i){
					d3.select(this)
					  .attr("opacity",1)
					  .transition()
					  .duration(500)
					  .ease("linear")
					  .attr("transform",function(d,i){
					  var midAngle = (d.startAngle + d.endAngle) / 2;  
                      return "translate(" + (20 * Math.sin(midAngle)) + "," + (-20 * Math.cos(midAngle)) + ")";  
					  });
				})
				.on("mouseout",function(d,i){
					d3.select(this)
						.transition()
						.duration(500)
						.attr("fill",color2(i))
						.attr("opacity",0.5)
						.transition()
						.duration(500)
						.ease("linear")
						.attr("transform",function(d,i){
						var midAngle=(d.startAngle+d.endAngle)/2;  
						return "translate("+(1*Math.sin(midAngle))+","+(-1*Math.cos(midAngle))+")";  
                            return "translate(0)";  
						});
					
				})
				.attr("d",function(d){
					return arc(d); //使用弧生成器获取路径
				});
					  
		    //添加弧内文字
			arcs2.append("text")
				.attr("transform",function(d){
						var x = arc2.centroid(d)[0];		//文字的x坐标
						var y = arc2.centroid(d)[1];		//文字的y坐标
							return "translate(" + x + "," + y + ")";
					})
					.attr("text-anchor","middle")
					.text(function(d){
						var percent2=Number(d.value) /
							  d3.sum(dataset2,function(d){return d[1]; })*100;
						return percent2.toFixed(1) + "%";
					})
					.attr("fill","black")
					.attr("font-size","13px");
					
				
			//添加弧外文字
			arcs2.append("line")
				.attr("stroke","black")
				.attr("x1",function(d){ return arc2.centroid(d)[0]*1.3; })
				.attr("y1",function(d){ return arc2.centroid(d)[1]*1.3; })
				.attr("x2",function(d){ return arc2.centroid(d)[0]*1.6; })
				.attr("y2",function(d){ return arc2.centroid(d)[1]*1.6; });
				
			//添加弧外的文字元素
			arcs2.append("text")
				.attr("transform",function(d){
					var x=arc2.centroid(d)[0]*1.8;
					var y=arc2.centroid(d)[1]*1.8;
					return "translate("+x+","+y+")";
				})
				.attr("text-anchor","middle")
				.text(function(d){
					return d.data[0];
				});

		/*</script>
</body>
</html>*/