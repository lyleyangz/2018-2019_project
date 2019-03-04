<template>
	<div id="business" ref="business" class="f-pr">
		<contactBox></contactBox>
		<div class="header-outer">
			<com-header class="header" :currentPage="'contactUs'"></com-header>
		</div>
		<div class="banner-outer">
			<div class="banner">
				<img src="../../common/assets/images/banner-contactUs.jpg" alt="">
			</div>
		</div>
		<div class="con-message-outer">
			<div class="con-message">
				<h2 class="title"></h2>
				<div class="dt" id="bd-map"></div>
				<div class="message-member-wraper">
					<p class="message-member f-pr"><span class="shu f-pa"></span>公司地址：深圳市南山区创维半导体设计大厦西座307</p>
					<p class="message-member">公司电话：0755-26586649 &nbsp; 400-014-8878</p>
					<p class="message-member">交通路线：高新园地铁站C出口（1号线）</p>
				</div>
			</div>
		</div>
		<div class="footer-outer">
			<com-footer></com-footer>
		</div>
	</div>
</template>

<script>
import header from '@components/header/header'
import footer from '@components/footer/footer'
import contactBox from '@components/contactBox/contactBox'
export default {
	data() {
		return {}
	},
	mounted() {
		this.initMap();
	},
	methods: {
		initMap() {
			const map = new BMap.Map("bd-map");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
			//添加地图类型控件
			map.addControl(new BMap.MapTypeControl({
				mapTypes:[
					BMAP_NORMAL_MAP,
					BMAP_HYBRID_MAP
				]}));	 
			const walking = new BMap.WalkingRoute(map, {
				renderOptions:{
					map: map,
					autoViewport: false
				}
			}); 
			map.enableScrollWheelZoom();
            map.disableDoubleClickZoom();
            	// 创建地址解析器实例
			const myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint("深圳市南山区创维半导体设计大厦西座", function(point){
				if (point) {
					map.centerAndZoom(point, 20);
					map.addOverlay(new BMap.Marker(point));
				}
			}, "深圳市南山区");
		}
	},
	components: {
		'com-header': header,
		'com-footer': footer,
		contactBox
	}
}
</script>

<style lang="scss"  scoped="scoped">
	#business {
		width: 100%;
		height: 100%;
		.header-outer {
			width: 100%;
			height: 58px;
		}
		.banner-outer {
			width: 100%;
			.banner {
				width: 100%;
				img {
					width: 100%;
				}
			}
		}
		.con-message-outer {
			width: 100%;
			.con-message {
				width: 1200px;
				margin: 0 auto;
				overflow: hidden;
				.title {
					width: 206px;
					height: 68px;
					background-image: url('../../common/assets/images/contact-us.png');
					margin: 78px auto 80px;
				}
				.dt {
					width: 1200px;
					height: 443px;
					margin: 0 auto 62px;
				}
				.message-member-wraper {
					margin-bottom: 237px;
					.message-member {
						line-height: 35px;
						font-size: 18px;
						color: #333333;
						text-indent: 17px;
						.shu {
							width: 3px;
							height: 17px;
							background-color: #333333;
							left: 0;
							top: 9px;
						}
					}
				}
			}
		}
		.footer-outer {
			width: 100%;
		}
	}
	// animation
	@keyframes rotate {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
	
</style>
<style>
/* // 百度地图相关 */
	.anchorBL {
		 width: 0 !important;
		 height: 0 !important;
		 display: none;
	 }
</style>
