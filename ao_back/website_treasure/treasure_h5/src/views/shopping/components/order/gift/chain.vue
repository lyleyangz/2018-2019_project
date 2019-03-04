<template>
	<div class="chain" id="chain">
       <div class="tip">
            <p>链条说明：</p> 
            <p>链条为礼品转赠路径，蓝色圈为礼品转赠节点</p>
            <p>橙色圈为礼品接收节点</p>
       </div>
		
	   
        
	</div>
</template>

<script>
import {Toast,Indicator,MessageBox} from 'mint-ui';
import { giftChain } from "@api/api_gift";

export default {
    name: 'Scale',
    data() {
        return {
			id: '',
			chainList: [],
			root:{
				"nodes":[],
				"edges":[]
			},
			source: 0,
			target: 0,
			count: 0
        }
    },
    methods: {
		giftChain(){
			giftChain({
				orderId: this.$route.params.id
			}).then(res=>{
				var my = res.data;
				this.setNodes(my);
				this.chainList = my.list;
				this.setList(this.chainList,0);
				this.init();
				
			});
		},
		setList(list,pid){
			for(var index in list){
				this.count +=1;
				// console.log(this.count + "=" +pid)
				var item = list[index];
				this.setNodes(item);
				this.root.edges.push({ "source": pid , "target": this.count })
				if(item.list.length>0){
					this.setList(item.list,this.count)
				}
			}
		},
		setNodes(item){
			var type = item.status == 1 || item.status == 2?3:item.sex
			this.root.nodes.push({
				"name": item.nickname || item.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2"),
				"type": type, 
				"image" : item.photoUrl || require('../../../../../common/assets/images/defHead.png'),
			})
		},
		init(){
			var width = 375;
			var height = 582;
			var img_w = 57;
			var img_h = 57;
			var radius = 30;    //圆形半径
			var root = this.root;
			var svg = d3.select("#chain").append("svg").attr("width",width).attr("height",height);

			//D3力导向布局
			var force = d3.layout.force()
				.nodes(root.nodes)
				.links(root.edges)
				.size([width,height])
				.linkDistance(100)
				.charge(-1000)
				.start();

			//边             
			var edges_line = svg.selectAll("line")
				.data(root.edges)
				.enter()
				.append("line")
				.style("stroke","#ccc")
				.style("stroke-width",1);

			//边上的文字（人物之间的关系）            
			var edges_text = svg.selectAll(".linetext")
				.data(root.edges)
				.enter()
				.append("text")
				.attr("class","linetext")
				


			// 圆形图片节点（人物头像）
			var nodes_img = svg.selectAll("image")
				.data(root.nodes)
				.enter()
				.append("circle")
				.attr("class", function(d,i){
					var className = "";
					if(d.type == 1){
						className = "man";
					}else if(d.type == 3){
						className = "receive";
					}else{
						className = "women";
					}
					return className
				})
				.attr("r", radius)
				.attr("fill", function(d, i){

					//创建圆形图片
					var defs = svg.append("defs").attr("id", "imgdefs")

					var catpattern = defs.append("pattern")
											.attr("id", "catpattern" + i)
											.attr("height", 1)
											.attr("width", 1)

					catpattern.append("image")
							.attr("x", - (img_w / 2 - radius))
							.attr("y", - (img_h / 2 - radius))
							.attr("width", img_w)
							.attr("height", img_h)
							.attr("xlink:href", d.image)

					return "url(#catpattern" + i + ")";

				})
				.on("mouseover",function(d,i){
					//显示连接线上的文字
					edges_text.style("fill-opacity",function(edge){
						if( edge.source === d || edge.target === d ){
							return 1.0;
						}
					});
				})
				.on("mouseout",function(d,i){
					//隐去连接线上的文字
					edges_text.style("fill-opacity",function(edge){
						if( edge.source === d || edge.target === d ){
							return 0.0;
						}
					});
				})
				.call(force.drag);


			var text_dx = -10;
			var text_dy = 20;

			var nodes_text = svg.selectAll(".nodetext")
				.data(root.nodes)
				.enter()
				.append("text")
				.attr("class","nodetext")
				.attr("dx",text_dx)
				.attr("dy",text_dy)
				.text(function(d){
					return d.name;
				});


			force.on("tick", function(){

				//限制结点的边界
				root.nodes.forEach(function(d,i){
					d.x = d.x - img_w/2 < 0     ? img_w/2 : d.x ;
					d.x = d.x + img_w/2 > width ? width - img_w/2 : d.x ;
					d.y = d.y - img_h/2 < 0      ? img_h/2 : d.y ;
					d.y = d.y + img_h/2 + text_dy > height ? height - img_h/2 - text_dy : d.y ;
				});

				//更新连接线的位置
				edges_line.attr("x1",function(d){ return d.source.x; });
				edges_line.attr("y1",function(d){ return d.source.y; });
				edges_line.attr("x2",function(d){ return d.target.x; });
				edges_line.attr("y2",function(d){ return d.target.y; });

				//更新连接线上文字的位置
				edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
				edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });


				//更新结点图片和文字
				nodes_img.attr("cx",function(d){ return d.x });
				nodes_img.attr("cy",function(d){ return d.y });

				nodes_text.attr("x",function(d){ return d.x });
				nodes_text.attr("y",function(d){ return d.y + img_w/2; });
			});
		}
    },
    created() {
       
    },
    mounted() {
		this.giftChain();
		
    }
}
</script>
<style lang='scss' scoped>
@import 'chain.less';

</style>
<style>
.women{
	stroke: #eb6877;
  	stroke-width: 1.5px;
}
.man{
	stroke: #7ecef4;
  	stroke-width: 1.5px;
}
.receive{
	stroke: orange;
  	stroke-width: 1.5px;
}
</style>

