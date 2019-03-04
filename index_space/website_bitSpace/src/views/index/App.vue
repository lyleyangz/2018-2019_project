<template>
	<div id="app" ref="app" class="f-pr">
		<contactBox></contactBox>
		<div class="header-outer">
			<com-header class="header" :currentPage="'index'"></com-header>
		</div>
		<div class="banner-outer">
			
			<div class="banner f-pr">
				<div class="particleCanvas-wraper">
				<particleCanvas class="f-pa bg-canvas"  :num='100'></particleCanvas>
			</div>
				<div class="barcode f-pa"></div>
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide f-pr">
							<img class="image" src="../../common/assets/images/banner1.jpg" alt="">
						</div>
						<div class="swiper-slide f-pr">
							<img class="image" src="../../common/assets/images/banner2.jpg" alt="">
						</div>
						<div class="swiper-slide f-pr">
							<img class="image" src="../../common/assets/images/banner3.jpg" alt="">
						</div>
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev swiper-button-white"></div>
					<div class="swiper-button-next swiper-button-white"></div>
				</div>
			</div>
		</div>
		<div class="bridf-outer">
			<ul class="bridf">
				<li class="t-member">
					<div class="inner">
						<div class="discription">
							<h2 class="title">用户管理</h2>
							<div class="heng"><span class="icon"></span></div>
							<p class="dic">
								负责所有区块链参与者的身份信息管理，包括维护公私钥生成、密钥存储管理 以及用户真实身份和区块链地址对应关系维护等，并且在授权的情况下，监管和审计某些真实身份的交易情况。对数字资产等金融交易类的应用，还提供了风险控制的规则配置，以保证系统交易安全
							</p>
						</div>
						<div class="image f-pr">
							<span class="icon-a icon f-db f-pa reveal-scale"></span>
							<span class="icon-b icon f-db f-pa reveal-top"></span>
							<span class="icon-c icon f-db f-pa reveal-bottom"></span>
						</div>
					</div>
				</li>

				<li class="t-member">
					<div class="inner">
						<div class="image f-pr">
							<span class="icon-a icon f-db f-pa reveal-scale"></span>
							<span class="icon-b icon f-db f-pa reveal-rotate"></span>
						</div>
						<div class="discription">
							<h2 class="title">基础服务</h2>
							<div class="heng"><span class="icon"></span></div>
							<p class="dic">
								基础服务部署在所有区块链的节点上，用来验证业务请求的有效性，并对有效请求完成共识后记录到存储上。对一个新的业务请求，基础服务先对接口适配解析，鉴权处理，然后通过共识算法将交易或者合约加上签名和加密之后，完整一致的存储到共享账本上。共识机制可自适应，在网络和节点都正常情况下具有高并发性，网络异常或者节点欺骗的情况下具有强容错性。		
							</p>
						</div>
					</div>
				</li>

				<li class="t-member">
					<div class="inner">
						<div class="discription">
							<h2 class="title">智能合约</h2>
							<div class="heng"><span class="icon"></span></div>
							<p class="dic">
								负责合约的注册发行以及合约的触发和执行。用户通过某种编程语言定义合约逻辑，发布到区块链上之后，根据合约条款的逻辑，由用户签名或者其他的事件触发执行，完 成交易结算等合约的逻辑
							</p>
						</div>
						<div class="image f-pr">
							<span class="icon-a icon f-db f-pa reveal-scale"></span>
							<span class="icon-b icon f-db f-pa reveal-scale"></span>
							<span class="icon-c icon f-db f-pa reveal-scale"></span>
							<span class="icon-d icon f-db f-pa reveal-fade"></span>
						</div>
					</div>
				</li>
				<li class="t-member">
					<div class="inner">
						<div class="image f-pr">
							<span class="icon-a icon f-db f-pa reveal-scale"></span>
							<span class="icon-b icon f-db f-pa reveal-fade"></span>
						</div>
						<div class="discription">
							<h2 class="title">运营监控</h2>
							<div class="heng"><span class="icon"></span></div>
							<p class="dic">
								负责产品发布过程中的部署、配置修改、合约设置以及产品运行中的实时状态 可视化的输出，如：告警、交易量、网络情况、节点健康状态等
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="sence-outer">
			<div class="sence f-pr">
				<particleCanvas class="f-pa bg-canvas" :num="60"></particleCanvas>
				<div class="discription">
					<h3 class="title">
						<span class="heng"></span>
						<span class="text">应用场景</span>
						<span class="heng"></span>
					</h3>
					<article class="article">
						目前各个商家平台，不论规模大小，都在通过积分体系来锁定用户，为用户提供更多优质服务。但是因为不同平台商家所发布的积分增值业务价值不同，导致每个平台商家的积分增值体系，完全是独立的。无法做到资源共享，积分互通的概念。比特空间此次上线积分增值业务的区块链解决方案也只是利用区块链技术“小试牛刀”，未来将释放出更多的智慧，带来创新潜力爆发，革新未来互联网+、区块链+行业格局。
					</article>
				</div>
			</div>
		</div>
		<div class="prospect-outer">
			<div class="prospect">
				<div class="discription">
					<h3 class="title">
						<span class="heng"></span>
						<span class="text">应用前景</span>
						<span class="heng"></span>
					</h3>
					<ul class="list">
						<li class="t-member">
							<span class="icon"></span>
							<h2 class="title">实体行业</h2>
							<p class="text">2018年进军航空旅游、中石油、中石化等各大积分体系</p>
						</li>
						<li class="t-member">
							<span class="icon"></span>
							<h2 class="title">电商行业</h2>
							<p class="text">目前国内大大小小近2万家电商平台、跨境电商平台</p>
						</li>
						<li class="t-member">
							<span class="icon"></span>
							<h2 class="title">银行体系</h2>
							<p class="text">各行发行的信用卡消费积分</p>
						</li>
						<li class="t-member">
							<span class="icon"></span>
							<h2 class="title">通信行业</h2>
							<p class="text">中国移动、中国联通、中国电信</p>
						</li>
						<li class="t-member">
							<span class="icon"></span>
							<h2 class="title">预付卡</h2>
							<p class="text">交通、超市、票务等</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer-outer">
			<com-footer></com-footer>
		</div>
		<!-- <transition name="fade">
			<Popup v-if="popupIsVisible" class="popup f-pr">
				<div class="contentwraper f-pa" :class="{overflow: popupOverHeight}">
					<div class="imgwraper">
						<img class="f-fl" src="../../common/assets/images/lsh_1.jpg" alt="">
						<img class="f-fl last" src="../../common/assets/images/lsh_2.jpg" alt="">
					</div>
					<div class="btnwraper">
						<span class="btn f-db" @click="popupIsVisible = false">我已阅读完毕</span>
					</div>
				</div>
			</Popup>
		</transition> -->
	</div>
</template>

<script>
import header from '@components/header/header'
import footer from '@components/footer/footer'
import Popup from '@components/popup/popup'
import contactBox from '@components/contactBox/contactBox'
import particleCanvas from '@components/particleCanvas/particleCanvas'
import scrollReveal from 'scrollReveal'
import Swiper from '@common/assets/js/swiper'
import '@common/assets/styles/swiper.min.css'
export default {
	data() {
		return {
			scrollReveal: scrollReveal(),
			bannerSwiper: {},
			noticeSwiper: {},
			popupIsVisible: true,
			popupOverHeight: false
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (!this.globalFun.mobileCheck()) {
				this.initScrollReveal();
				setTimeout(() => {
					this.initSwiper();
				}, 200);
			}
		});
		// 屏幕高度太低的情况下，需加上overflow属性
		let h = document.documentElement.clientHeight || document.body.clientHeight;
		if ((h - 0) * 0.94 < 730) {
			this.popupOverHeight = true;
		}
	},
	methods: {
		initSwiper() {
			this.bannerSwiper = new Swiper ('.banner .swiper-container', {
				effect: 'fade',
				autoplay: {
					disableOnInteraction: false,
					delay: 6000
				},
				speed: 1000,
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				
				// 如果需要滚动条
				scrollbar: '.swiper-scrollbar',
			}); 
		},
		initScrollReveal() {
			this.scrollReveal.reveal('.reveal-top', {
				duration: 1000,
				delay: 1000,
				reset: true,
				origin: 'top',
				distance: '200px',
				opacity: 0.001,
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-bottom', {
				duration: 1000,
				delay: 1000,
				reset: true,
				origin: 'bottom',
				distance: '200px',
				opacity: 0.001,
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-scale', {
				duration: 1000,
				reset: true,
				distance: '0px',
				easing: 'linear',
				scale: 0.01
			});
			this.scrollReveal.reveal('.reveal-rotate', {
				duration: 1000,
				delay: 1000,
				reset: true,
				distance: '0px',
				easing: 'linear',
				rotate: {z: 180}
			});
			this.scrollReveal.reveal('.reveal-fade', {
				duration: 1000,
				delay: 1000,
				reset: true,
				distance: '0px',
				easing: 'linear'
			});
		}
	},
	components: {
		'com-header': header,
		'com-footer': footer,
		contactBox,
		particleCanvas,
		Popup
	}
}
</script>

<style lang="scss"  scoped="scoped">
	#app {
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
				.barcode {
					width: 100px;
					height: 100px;
					top: 10px;
					right: 10px;
					border-radius: 5px;
					background-image: url('../../common/assets/images/barcode.png');
					background-size: 100% 100%;
					z-index: 998;
				}
				.particleCanvas-wraper {
					width: 90%;
					height: 80%;
					position: absolute;
					left: 5%;
					top: 0;
					margin: 0 auto;
				}
				.bg-canvas {
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					z-index: 999;
				}
			}
		}
		.bridf-outer {
			width: 100%;
			.bridf {
				width: 100%;
				.t-member {
					width: 100%;
					height: 560px;
					// 缩小后的改动
					height: 300px;
					// 缩小后的改动
					&:nth-child(2n) {
						background-color: #f6f7f9;
					}
					.inner {
						// width: 1200px;
						// 缩小后的改动
						width: 1000px;
						height: 100%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.image {
							transform: scale(0.75);
							// 缩小后的改动
							.icon {
								background-size: 100% 100%;
							}
							.icon-a {
								z-index: 999;
							}
						}
						.discription {
							// width: 550px;
							// 缩小后的改动
							width: 400px;
							.title {
								height: 30px;
								line-height: 30px;
								font-size: 26px;
								font-weight: 400;
								color: #333333;
							}
							.heng {
								height: 46px;
								overflow: hidden;
								.icon {
									display: block;
									width: 24px;
									height: 5px;
									background-color: #333333;
									margin-top: 18px;
								}
							}
							.dic {
								line-height: 24px;
								font-size: 14px;
								color: #888888;
							}
						}
					}
					&:nth-child(1) {
						.image {
							width: 400px;
							height: 225px;
							// 缩小后的改动
							transform-origin: 80% 50%;
							.icon-a {
								width: 161px;
								height: 179px;
								top: 38px;
								left: 142px;
								background-image: url('../../common/assets/images/yhgl-a.png');
							}
							.icon-b {
								width: 151px;
								height: 225px;
								top: 0;
								left: 270px;
								background-image: url('../../common/assets/images/yhgl-b.png');
							}
							.icon-c {
								width: 177px;
								height: 204px;
								top: 0;
								left: 0;
								background-image: url('../../common/assets/images/yhgl-c.png');
							}
						}
					}
					&:nth-child(2) {
						.image {
							width: 338px;
							height: 338px;
							// 缩小后的改动
							transform-origin: 0% 50%;
							.icon-a {
								width: 180px;
								height: 180px;
								top: 79px;
								left: 79px;
								background-image: url('../../common/assets/images/jcfw-a.png');
							}
							.icon-b {
								width: 338px;
								height: 338px;
								top: 0;
								left: 0;
								background-image: url('../../common/assets/images/jcfw-b.png');
							}
						}
					}
					&:nth-child(3) {
						.image {
							width: 425px;
							height: 308px;
							// 缩小后的改动
							transform-origin: 70% 50%;
							.icon-a {
								width: 199px;
								height: 227px;
								top: 82px;
								left: 70px;
								z-index: 999;
								background-image: url('../../common/assets/images/znhy-a.png');
							}
							.icon-b {
								width: 67px;
								height: 107px;
								top: 138px;
								left: 4px;
								background-image: url('../../common/assets/images/znhy-b.png');
							}
							.icon-c {
								width: 85px;
								height: 107px;
								top: 138px;
								left: 267px;
								background-image: url('../../common/assets/images/znhy-c.png');
							}
							.icon-d {
								width: 449px;
								height: 243px;
								top: 0;
								left: 0;
								background-image: url('../../common/assets/images/znhy-d.png');
							}
						}
					}
					&:nth-child(4) {
						.image {
							width: 283px;
							height: 399px;
							// 缩小后的改动
							transform-origin: 0% 50%;
							.icon-a {
								width: 191px;
								height: 166px;
								top: 134px;
								left: 28px;
								background-image: url('../../common/assets/images/yyjk-a.png');
							}
							.icon-b {
								width: 283px;
								height: 393px;
								top: 0;
								left: 0;
								background-image: url('../../common/assets/images/yyjk-b.png');
							}
						}
					}
				}
			}
		}
		.sence-outer {
			width: 100%;
			.sence {
				width: 100%;
				height: 538px;
				background-image: url('../../common/assets/images/canvasBg.jpg');
				background-size: 100% 100%;
				overflow: hidden;
				.bg-canvas {
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					z-index: 999;
				}
				.discription {
					.title {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 90px;
						margin-bottom: 106px;
						.heng {
							width: 150px;
							height: 3px;
							background-color: #ffffff;
						}
						.text {
							font-size: 32px;
							color: #ffffff;
							font-weight: 300;
							padding: 0 46px;
						}
					}
					article {
						width: 1000px;
						line-height: 28px;
						color: #ffffff;
						font-size: 16px;
						margin: 0 auto;
					}
				}
			}
		}
		.prospect-outer {
			width: 100%;
			.prospect {
				width: 100%;
				height: 538px;
				overflow: hidden;
				.discription {
					.title {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 90px;
						margin-bottom: 106px;
						.heng {
							width: 150px;
							height: 3px;
							background-color: #333333;
						}
						.text {
							font-size: 32px;
							color: #333333;
							font-weight: 300;
							padding: 0 46px;
						}
					}
					.list {
						display: flex;
						justify-content: center;
						.t-member {
							display: flex;
							flex-direction: column;
							align-items: center;
							padding: 0 30px;
							.icon {
								width: 91px;
								height: 91px;
								margin-bottom: 3px;
							}
							.title {
								font-size: 20px;
								font-weight: 500;
								line-height: 42px;
								color: #333333; 
								margin: 0;
							}
							.text {
								width: 196px;
								line-height: 24px;
								font-size: 14px;
								color: #999999;
								text-align: center;
							}
							&:nth-child(1) {
								.icon {
									background-image: url('../../common/assets/images/sthy.png');
								}
							}
							&:nth-child(2) {
								.icon {
									background-image: url('../../common/assets/images/dshy.png');
								}
							}
							&:nth-child(3) {
								.icon {
									background-image: url('../../common/assets/images/hytx.png');
								}
							}
							&:nth-child(4) {
								.icon {
									background-image: url('../../common/assets/images/txhy.png');
								}
							}
							&:nth-child(5) {
								.icon {
									background-image: url('../../common/assets/images/yfk.png');
								}
							}
							// hover
							&:hover {
								.icon {
									box-shadow: 0 0 10px 3px #d8dcdf;
									border-radius: 50%;
								}
								.title {
									color: #22374c;
								}
								.text {
									color: #22374c;
								}
							}
						}
					}
				}
			}
		}
		.notice-outer {
			width: 100%;
			.notice {
				width: 1200px;
				margin: 0 auto;
				.notice-swiper {
					height: 100px;
				}
			}
		}
		.footer-outer {
			width: 100%;
		}
		.popup {
			.contentwraper {
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				max-height: 94%;
				&.overflow {
					overflow-y: scroll;
				}
				.imgwraper {
					display: flex;
					img {
						width: 500px;
						height: 730px;
						&.last {
							margin-left: 10px;
						}
					}
				}
				.btnwraper {
					width: 100%;
					margin-top: 10px;
					.btn {
						width: 120px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						border: 1px solid #ffffff;
						border-radius: 4px;
						color: #ffffff;
						background-color: #b46268;
						margin: 0 auto;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
<style>
	.banner .swiper-pagination-bullet {
		border: 1px solid #ffffff;
		border-radius: 50%;
	}
	.banner .swiper-pagination-bullet-active {
		border: 1px solid #ffffff !important;
		background-color: transparent !important;
		opacity: 1;
	}
	.banner .swiper-button-next, .swiper-button-prev {
		opacity: 0.5;
	}
	.banner .swiper-pagination-bullets {
		bottom: 38px !important;
	}
</style>


