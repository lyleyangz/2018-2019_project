<template>
    <section class="header">
		<div class="page-board">
			<div class="logo"></div>
			<ul class="menu">
				<li :class="index == defIndex?'active':''" v-for="(item,index) of menuList" :key="index" @click="checkItem(item,index)">
					{{item.title}}
				</li>
			</ul>
		</div>
    </section>
</template>

<script>
import eventBus from "@common/eventBus/eventBus";
export default {
	data() {
		return {
			menuList: [{
				title: "首页",
				url: "/home"
			},{
				title: "大数据新闻",
				url: "/bigdatanews"
			},{
				title: "国家政策",
				url: "/nationalpolicy"
			},{
				title: "企业发布",
				url: "/enterpriseRelease"
			},{
				title: "行业公告",
				url: "/companyannouncement"
			},{
				title: "交易中心",
				url: "/tradingcenter"
			},{
				title: "会员名录",
				url: "/membership"
			},{
				title: "百问百答",
				url: "/interlocution"
			},{
				title: "关于我们",
				url: "/aboutUs"
			},{
				title: "联系我们",
				url: "/contactUs"
			}],
			defIndex: -1,
			isScroll: false
		};
	},
	created() {},
	mounted() {
	
	},
	watch: {
		$route(to, from) {
			var href = to.path;
			for (var index in this.menuList) {
				let item = this.menuList[index];
				if (href.search(item.url) >= 0) {
					this.defIndex = index;
				}
				if((to.path.search(item.url)==0 && to.path.length == item.url.length)){
					if(to.path.search("/coming")>=0){
						eventBus.$emit('header', false);
					}else{
						eventBus.$emit('header', true);
					}
					
				}
			}
			
		}
	},
	methods: {
		checkItem(item, index) {
			this.defIndex = index;
			this.$router.push({
				path: item.url
			});
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
.header {
	position: fixed;
	background: rgba(0,0,0,0);
	background: linear-gradient(  
    to bottom,   
    rgba(0,0,0,1) 0%,   
    rgba(0,0,0,0) 100%);  
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	.page-board {
		display: flex;
		align-items: center;
		transition: all 0.5s ease 0s;
		padding: 16px 0 17px 0;
		.logo {
			background: url("./../../assets/images/logo.png") no-repeat;
			width: 275px;
			height: 47px;
		}
		.menu {
			flex: 1;
			text-align: right;
			li {
				display: inline-block;
				margin-left: 30px;
				font-size: 16px;
				color: #fff;
				cursor: pointer;
				transition: all 0.3s ease 0s;
				position: relative;
				&:hover {
					color: #fa3737;
				}   
				&::before{
					position: absolute;
					width: 0;
					height: 2px;
					transition: all 0.5s ease 0s;
					content: "";
					background: #fa3737;
					border-radius: 2px;
					bottom: -28px;
					left: -10%;
				}
			}
			li.active {
				color: #fa3737;
				position: relative;
				&::before {
					position: absolute;
					width: 120%;
					height: 2px;
					bottom: -28px;
					left: -10%;
				}
			}
		}
	}
	&:hover{
		background: #231815;
	}
}
.scroll {
	background: #231815;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
	.page-board {
		padding: 7px 0 8px 0;
		.menu {
			li.active {
				&::before {
					bottom: -19px;
				}
			}
		}
	}
}
.scroll-detail {
	background: #231815;
	// box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}
</style>