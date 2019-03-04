<template>
    <div class="commodity">
        <div class="model" :class="model_true?'jump_right':'jump_left'" v-show="model_true" @click="model_show()">
			<!-- 模态层左边list -->
			<div class="left_list">
				<div class="left_img">
					<img src="../../../../../common/assets/images/shopping/logo.png" alt="">
				</div>
				<div class="left_sort" v-if="sortsItem && sortsItem.length>0">
					<div class="left_sort_item" @click.stop="sortsGetAll()">
					<mt-cell title="全部" is-link :class="{'active_listcell':activeAll}">
						<img slot="icon" v-show="activeAll" src="../../../../../common/assets/images/shopping/all_active.png" width="24" height="24">
						<img slot="icon" v-show="!activeAll" src="../../../../../common/assets/images/shopping/all_default.png" width="24" height="24">
					</mt-cell>
					</div>
					<div class="left_sort_item" v-for="(item,index) in sortsItem"  @click.stop="sorts(item)" :key="index">
					<mt-cell :title="item.name" is-link :class="{'active_listcell':item.id == active_sorts}">
						<img slot="icon" :src="item.icon" width="24" height="24">
					</mt-cell>
					</div>
				</div>
			</div>
			<!-- 模态层中间触发按钮 -->
			<div class="mid_btn">
				<mt-button @click.stop="model_show()">
				<img src="../../../../../common/assets/images/shopping/model_btn.png" height="20" width="20" slot="icon">
				</mt-button>
			</div>
			<!-- 模态层右边阴影 -->
			<div class="right"></div>
       	</div>
       <!-- 商品列表 -->
       <div class="shopping_index">
			<!-- 商品列表触发按钮 -->
			<div class="is_index" v-show="!model_true">
				<mt-button @click.stop="model_show()">
					<img src="../../../../../common/assets/images/shopping/model_btn.png" height="20" width="20" slot="icon">
				</mt-button>
			</div>
			<div class="shopping_list" ref="wrapper" v-if="index_data && index_data.length>0"  :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="true" bottomDropText="↓" :bottomPullText="loadmore_signed">
				<div class="shopping_item" v-for="(item,index) in index_data" @click="jumpTo(item.id,item)" :key="index">
					<div class="shopping_title_img" v-if="item.cover">
						<div class="shopping_title_img_share">
							<span @click.stop="share(item)"></span>
						</div>
						<img :src="item.cover" alt="">
					</div>
					<div class="shopping_title_img" v-if="!item.cover">
						<div class="shopping_title_img_share">
							<span @click.stop="share(item)"></span>
						</div>
						<img src="../../../../../common/assets/images/pro_default.png" alt="">
					</div>
					<div class="shopping_content">
						<div class="item">
							<div class="row row_one">
								<span class="lb col">{{item.proName}}</span>
								<span class="cnt">￥{{item.price}}</span>
							</div>
						</div>
						<div class="item">
							<div class="row row_two">
								<span class="lb col">商品批次：{{item.proBatch}} <label>当前库存：{{item.leftCount}}</label></span>
							</div>
						</div>
						<div class="item_three" @click.stop="nfc(item)">
							<div class="row_three">
							<div class="item">
								<div class="row">
									<span class="cnt">区块地址：</span>
									<span class="lb col">{{item.hashAddress}}</span>
								</div>
							</div>
							<div class="item">
								<div class="row">
									<span class="cnt">区块生成时间：</span>
									<span class="lb col">{{item.qkTime}}</span>
								</div>
							</div>
							<div class="item">
								<div class="row">
									<span class="cnt">区块高度：</span>
									<span class="lb col">{{(Number(item.qkLedgerIndex) || 0).toFixed(0)}}</span>
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
		  		</mt-loadmore>
			</div>
			<div class="nodata" v-if="index_data.length==0">
				<img src="../../../../../common/assets/images/no-data.png">
				<span class="lb">暂无商品</span>
			</div>
        </div>
		<!-- 分享商品 -->
		<v-share v-if="share_show" :shareData="shareData"></v-share>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { getListgoods, getSorts } from "@api/api_shopping";
import eventBus from "../../../../../common/eventBus/eventBus.js";
import share from "../share/index";
export default {
	components:{
		'v-share':share
	},
	data() {
		return {
			// 抽屉高亮
			active:false,
			active_sorts:null,
			activeAll:true,
			// 抽屉分类
			sortsItem: [],
			// 计算高度
			wrapperHeight: Number,
			model_true: false,
			loadmore_signed: "加载更多",
			bottomAllLoaded: false,
			// 总数据
			index_data: [],
			// 当前页
			currentPage: 1,
			// 总数据条数
			totalDataNumber: Number,
			// 总页数
			totalPage: Number,
			// 每页显示条数
			everyPageData: 2,
			// 当前搜索的分类
			proClassifyCurrent: null,
			data: [],
			// 是否有更多商品
			isMore: false,
			// 有token  没钱包 ； 有token  有钱包 ； 无token 无钱包(0 无 1 有)
			token: this.$route.query.token || null,
			userId: this.$route.query.id || null, //用户id
			wallet: this.$route.query.wallet == 1 ? 1 : 0,
			// 分享
			share_show:false,
			shareData:{}
		};
	},
	created() {
		document.title = "澳绿宝商城";
	},
	activated(){
		this.active_sorts =  sessionStorage.getItem("active_sort")
	},
	mounted() {
		sessionStorage.removeItem("active_sort");
		sessionStorage.removeItem("countsType");
		// sessionStorage.removeItem("scoreType");
		sessionStorage.removeItem("TOPAYDATA");
		sessionStorage.removeItem("VIDEO");
		sessionStorage.removeItem("OUT_VIDEO");
		sessionStorage.removeItem("order_type")
		if (this.token) {
			sessionStorage.setItem("token", this.token);
		}
		if (this.userId) {
			sessionStorage.setItem("userId", this.userId);
		}
		if (this.wallet >= 0) {
			sessionStorage.setItem("wallet", this.wallet);
		}
		this.getGoods(res => {
			this.index_data = res.data.entities;
		});
		this.active_sorts =  sessionStorage.getItem("active_sort")

		eventBus.$on("shareOff",()=>{
			this.share_show = !this.share_show;
		})
	},
	methods: {
		nfc(item){
			location.href = "/#/home?id="+item.hashAddress    
		},
		// 获取全部
		sortsGetAll(){
			sessionStorage.removeItem("active_sort");
			this.activeAll = true;
			this.active_sorts = null;
			this.proClassifyCurrent = null;
			this.currentPage = 1;
			this.getGoods(res => {
					this.index_data = res.data.entities;
					this.model_true = false;
				});
		},
		// 抽屉分类
		sorts(data) {
			this.activeAll = false;
			sessionStorage.setItem("active_sort", data.id);
			this.active_sorts = data.id;
			this.currentPage = 1;
			if (data && data.name) {
				this.proClassifyCurrent = data.name;
				this.getGoods(res => {
					this.index_data = res.data.entities;
					this.model_true = false;
				});
			}
		},
		//   跳转
		jumpTo(id, data) {
			data = data ? data : "";
			sessionStorage.setItem("commodityDetail", JSON.stringify(data));
			sessionStorage.removeItem("selectedNav");
			sessionStorage.removeItem("scoreType");
            sessionStorage.removeItem("temporaryNum");
            sessionStorage.removeItem("temporaryNumVal");
			if (id) {
				var url = `/commodityDetail/${id}?`;
				if (this.token) {
					url += `token=${this.token}&`;
				}
				url += `wallet=${this.wallet}`;
				this.$router.push({
					path: url
				});
			}
		},
		loadTop() {
			var _this = this;
			_this.currentPage = 1;
			setTimeout(() => {
				_this.getGoods(res => {
					_this.index_data = res.data.entities;
					_this.$refs.loadmore.onTopLoaded();
				});
			}, 500);
		},
		// 加载更多
		loadBottom() {
			var _this = this;
			setTimeout(() => {
				if (!this.isMore) {
					_this.loadmore_signed = "全部加载完毕";
					setTimeout(() => {
						_this.$refs.loadmore.onBottomLoaded();
						// _this.bottomAllLoaded = true;
					}, 500);
					return;
				} else {
					++_this.currentPage;
					_this.getGoods(res => {
						_this.index_data = _this.index_data.concat(res.data.entities);
						_this.$refs.loadmore.onBottomLoaded();
					});
					_this.wrapperHeight = document.documentElement.clientHeight - _this.$refs.wrapper.getBoundingClientRect().top +1;
				}
			}, 500);
		},
		// 获取商品数据
		getGoods(callback) {
			//   溯源记录
			getListgoods({
				pageNo: this.currentPage,
				pageSize: this.everyPageData,
				proClassify: this.proClassifyCurrent
			}).then(res => {
				if (res.code == 200 ) {
					// 总数据量
					this.totalDataNumber = res.data.count;
					// 总页数
					this.isMore = res.data.count > this.currentPage * this.everyPageData;
					// 当前页数
					this.currentPage = res.data.pageNo;
					// 数据
					if(callback){
						callback(res);
					}
				}
			});
		},
		// 获取抽屉
		getSortsMsg() {
			getSorts().then(res => {
				if (res.code === "200" && res.msg === "success") {
				this.sortsItem = res.data;
				}
			});
		},
		// 控制模态层切换
		model_show() {
			if (!this.model_true) {
				this.getSortsMsg();
			}
			this.model_true = !this.model_true;
		},
		// 分享
		share(data){
			this.share_show = !this.share_show;
			let share_data = {
				cover: data.cover,
				proName: data.proName,
				price: data.price,
				shareUrl: location.href.split(location.hash)[0]+'#/commodityDetail/'+data.id,
				type:2
			}
			this.shareData = share_data;
		}
	},
	beforeDestroy(){
		eventBus.$off('shareOff')
	}
};
</script>
<style>
.commodity .model .left_list .left_sort .mint-cell-text {
  	margin-left: 0.2rem;
}
.commodity .model .left_list .left_sort .mint-cell img {
	width: 0.64rem;
	height: 0.64rem;
}
.commodity .model .left_list .left_sort .mint-cell {
	background-image:none;
}
.commodity .mint-button--default {
 	background-color: transparent;
	 box-shadow:none
}
</style>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
@keyframes jump_right {
	0% {
		left: -4rem;
	}
	100% {
		left: 0;
	}
}
@keyframes jump_left {
	0% {
		left: 0rem;
	}
	100% {
		left: -4rem;
	}
}

.commodity {
	position: relative;
	background: #F4F4F4;
	// 首页模态层
	.model {
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: left 2s linear;
		z-index: 999999;
		// width: 100%;
		// 模态层左边分类列表
		.left_list {
		background-color: #ffffff;
		width: 4.586667rem;
		.left_img {
			margin: 1.146667rem auto 1.466667rem auto;
			
			width: 3.146667rem;
			height: 2.186667rem;
		}
		//
		.left_sort {
			
		}
		}
		// 模态层中间按钮
		.mid_btn {
		background-color: rgba(8, 7, 8, 0.6);
		z-index: 9999;
		}
		// 模态层右边背景虚化
		.right {
		flex: 1;
		background-color: rgba(8, 7, 8, 0.6);
		z-index: 1;
		}
	}
	.jump_right {
		animation: jump_right 0.3s ease alternate;
	}
	.jump_left {
		animation: jump_left 0.3s ease alternate;
	}
	.shopping_index {
		// z-index: 999999;
		// 首页按钮重置样式
		
		.is_index {
		z-index: 9999;
		height: 1rem;
		position: fixed;
		top:0;
		}
		//
		.shopping_list {
		overflow: scroll;
		// touch-action: none;
		height: 100vh;
		width: 100%;
		.shopping_item {
			margin-bottom: .28rem;
			// &:nth-child(1) {
			//   margin-top: 0;
			// }
			.shopping_title_img {
				display: flex;
				position: relative;
			.shopping_title_img_share{
				position: absolute;
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				span{
					width: .666667rem;
					height: .666667rem;
					display: inline-block;
					background: url('../../../../../common/assets/images/shopping/share.png') no-repeat;
					background-size: contain;
					margin: .133333rem;
				}
			}
			img {
				width: 100%;
				height: 6.48rem;
			}
			}
			.shopping_content {
			background: #fff;
			padding: .186667rem .12rem .4rem .12rem;
			.item {
				
				// 商品详情第一行文本
				.row_one {
					margin: 0 .133333rem .2rem .133333rem;
					line-height: .4rem;
					letter-spacing: .029333rem;
					.col {
						@include font-dpr(14px);
						color: #333333;
					}
					.cnt {
						@include font-dpr(14px);
						color: red;
						font-weight: bold;
					}
				}
				// 商品详情第二行文本
				.row_two {

					@include font-dpr(11px);
					line-height: .453333rem;
					color: #666666;
					margin:0 .133333rem .266667rem .133333rem;
					label{
						margin-left: .44rem;
					}
				}
			}
			//
			// 2018-11-14 新增区块
			.item_three {
				background-color: rgba(244, 244, 244, 1);
				border-radius: .066667rem;
				border: solid 0px rgba(181, 181, 181, 1);
				
				.row_three {
					padding: .213333rem .146667rem;
					line-height: .453333rem;
					@include font-dpr(11px);
					color: #16b733;
					.item{
						margin-top: .173333rem;
					}
					.item:nth-child(1){
						margin-top: 0;
					}
					
				}
			}
			}
		}
		}
	}
}
.nodata{
	text-align: center;
	background: #fff;
	img{
		width: 5.466667rem;
		height: 5.333333rem;
		margin: 5rem auto 0.5rem auto;
		display: block;
	}
	.lb{
		
		@include font-dpr(14px);
		color: #999;
		display: block;
		letter-spacing:.08rem;
	}
}
// 列表激活色
.active_listcell {
  	background-color: #e8f9f2;
}
// 模态层过渡动画
 
</style>
<style>
.mint-cell{
	min-height: .96rem;
}
.mint-cell-text{
	font-size:13px;
	color:#666;
	letter-spacing: .021333rem;
}
.active_listcell .mint-cell-text{
	color: #1bc07e;
}

.mint-cell-allow-right::after{
	border: solid 1px #c8c8cd;    
	border-bottom-width: 0;
    border-left-width: 0;
	width: 7px;
    height: 7px;
}
.active_listcell .mint-cell-allow-right::after{
	border: solid 1px #1bc07e;
    border-bottom-width: 0;
    border-left-width: 0;
}
</style>
