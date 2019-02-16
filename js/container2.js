//力导向图
/*<html>
	<head>
		<title>力导向图</title>
		<style>
			  .forceLine {
				 stroke: #444 ;
				 stroke-width: 1 ;
			  }
			  
			  .forceCircle {
				 stroke: black ;
				 stroke-width: 1;
			  }
			  
			  .forceText {
				 fill: black ;
				 text-anchor: middle ;
				 font-size: 17;
				 font-family: arial;
			  }
		</style>
	</head>
	
	<body>
		<script src="d3.min.js" charset="utf-8"></script>
		<script>*/
			var w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
			var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
			
			var width = 950;
			var height = 560;
			
			//颜色
			var color = d3.scale.category20();
			
			//定义svg
			var svg=d3.select("#container2")
					  .append("svg")
					  .attr("width", width)
					  .attr("height", height);
					 
			//添加各节点信息
			var nodes = [{name:"共享单车"},
						 //{name:"ofo"},
						 //{name:"摩拜单车"},
						 //{name:"阿里巴巴"},
						 //{name:"腾讯"},
						 {name:"共享住宿"},
						 {name:"共享洗衣机"},
						 {name:"共享电视"},
						 {name:"共享烧烤箱"},
						 {name:"共享汽车"},
						 {name:"共享空间"},
						 {name:"共享睡舱"},
						 {name:"共享雨伞"},
						 {name:"共享飞机"},
						 {name:"共享充电宝"},
						 {name:"共享耳机"},
						 {name:"共享餐厅"}];
			
			//添加各节点关系
			var edges = [{source:0, target:1},
						 {source:0, target:2}, 
						 //{source:1, target:3, relation:"ofo新一轮融资于7月完成，阿里巴巴领投"},
						 //{source:2, target:4, relation:"摩拜新一轮融资于6月完成，腾讯领投"},
						 {source:0, target:5},
						 {source:0, target:6},
						 {source:0, target:7},
						 {source:0, target:8},
						 {source:0, target:9},
						 {source:0, target:10},
						 {source:0, target:11},
						 {source:0, target:12},
						 {source:0, target:3},
						 {source:0, target:4}];
						 //{source:0, target:15, relation:"共享经济的衍生"},
						 //{source:0, target:16, relation:"共享经济的衍生"}];
			
			//转换数据
			var force = d3.layout.force()
								 .nodes(nodes) //设定顶点数组
								 .links(edges) //设定边数组
								 .size([width, height]) //设定作用范围
								 .linkDistance(250) //设定边的距离
								 .charge(-1500); //设定顶点的电荷数
								 
			force.start(); 
			
			console.log(nodes);
			console.log(edges);
			
			//绘制连线
			var lines = svg.selectAll(".forceLine")
						   .data(edges)
						   .enter()
						   .append("line")
						   .attr("class", "forceLine");
			
			//绘制连线上的文字
			var edges_text = svg.selectAll(".linrtext")
								.data(edges)
								.enter()
								.append("line")
								.attr("class", "linetext")
								.text(function(d){
									return d.relation;
									});
			//绘制节点
			var circles = svg.selectAll(".forceCircle")
							 .data(nodes)
							 .enter()
							 .append("circle")
							 .attr("class", "forceCircle")
							 .attr("r", 20)  //节点大小
							 .style("fill-opacity", 1)
							 .style("fill", function(d, i){
								return color(i);
								}) 
							 .on("mouseover", function(){
								d3.select(this)
								  .attr("r", 40)
								  .style("fill-opacity", 0.5);
								  })
								  
							 .on("mouseout", function(){
								d3.select(this)
								  .attr("r", 20)
								  .style("fill-opacity", 1);
								  })
							 .call(force.drag);  //可拖拽
			
								
			
			
			//绘制文字————————————字显示在中间
			var texts = svg.selectAll(".forceText")
						   .data(nodes)
						   .enter()
						   .append("text")
						   .attr("class", "forceText")
						   .attr("x", function(d){
								return d.x;
								})
						   .attr("y", function(d){
								return d.y;
								})
						   .attr("dy", ".3em")
						   .text(function(d){
								return d.name;
								});
			
			
							
			//tick事件的监听器
			force.on("tick", function(d){
			
				//更新连线的端点坐标
				lines.attr("x1",function(d){ return d.source.x; });
				lines.attr("y1",function(d){ return d.source.y; });
			    lines.attr("x2",function(d){ return d.target.x; });
				lines.attr("y2",function(d){ return d.target.y; });

				//更新节点的坐标
				circles.attr("cx", function(d){return d.x;})
					   .attr("cy", function(d){return d.y;});
				//nodes_img.attr("cx", function(d){return d.x;})
					     //.attr("cy", function(d){return d.y;});
					   
				//更新节点的文字坐标
				texts.attr("x", function(d){return d.x;})
					 .attr("y", function(d){return d.y;});
			});
			
			//力导向图运动开始时
			force.on("start", function(){
				console.log("运动开始");
			});
			
			//力导向图运动结束时
			force.on("end", function(d){
				console.log("运动结束");
			});
		/*</script>
	
	</body>

</html>*/