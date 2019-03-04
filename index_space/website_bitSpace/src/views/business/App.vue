<template>
	<div id="business" ref="business" class="f-pr">
		<div class="header-outer">
			<com-header class="header" :currentPage="'business'"></com-header>
		</div>
		<div class="banner-outer">
			<div class="banner">
				<img src="../../common/assets/images/banner-business.jpg" alt="">
			</div>
		</div>
		<div class="bridf-outer">
			<ul class="bridf">
				<li class="t-member-outer">
					<div class="t-member">
						<div class="image f-pr">
							<span class="circle f-db f-pa"></span>
							<span class="con f-db f-pa"></span>
						</div>
						<div class="discription">
							<p class="text">区域链技术研究</p>
							<span class="f-db num"></span>
						</div>
					</div>
				</li>
				<li class="t-member-outer">
					<div class="t-member">
						<div class="discription">
							<span class="f-db num"></span>
							<p class="text">撮合技术</p>
						</div>
						<div class="image f-pr">
							<span class="circle f-db f-pa"></span>
							<span class="con f-db f-pa"></span>
						</div>
					</div>
				</li>
				<li class="t-member-outer">
					<div class="t-member">
						<div class="image f-pr">
							<span class="circle f-db f-pa"></span>
							<span class="con f-db f-pa"></span>
						</div>
						<div class="discription">
							<p class="text">防伪追溯体系</p>
							<span class="f-db num"></span>
						</div>
					</div>
				</li>
				<li class="t-member-outer">
					<div class="t-member">
						<div class="discription">
							<span class="f-db num"></span>
							<p class="text">区块链技术的实际落地方案</p>
						</div>
						<div class="image f-pr">
							<span class="circle f-db f-pa"></span>
							<span class="con f-db f-pa"></span>
						</div>
					</div>
				</li>
				<li class="t-member-outer">
					<div class="t-member">
						<div class="image f-pr">
							<span class="circle f-db f-pa"></span>
							<span class="con f-db f-pa"></span>
						</div>
						<div class="discription">
							<p class="text">安全防护体系</p>
							<span class="f-db num"></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer-outer">
			<com-footer></com-footer>
		</div>
	</div>
</template>

<script>
import header from '@components/header/header'
import footer from '@components/footer/footer'
export default {
	data() {
		return {}
	},
	mounted() {},
	methods: {},
	components: {
		'com-header': header,
		'com-footer': footer
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
		.bridf-outer {
			width: 100%;
			.bridf {
				width: 100%;
				margin: 0 auto;
				.t-member-outer {
					width: 100%;
					height: 320px;
					.t-member {
						width: 1000px;
						height: 100%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.image {
							width: 314px;
							height: 314px;
							.circle {
								width: 100%;
								height: 100%;
								left: 0;
								top: 0;
								background-image: url('../../common/assets/images/q-business.png');
								z-index: 2;
								animation: rotate 2s   linear  forwards infinite; 
							}
							.con {
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
							}
						}
						.discription {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.text {
								font-size: 26px;
								color: #333333;
							}
						}
					}
					&:nth-child(2n) {
						background-color: #f6f7f9;
					}
					&:nth-child(1) {
						.image {
							.con {
								left: 54%;
								top: 53%;
								width: 238px;
								height: 197px;
								background-image: url('../../common/assets/images/qkl-business.png');
							}
						}
						.discription {
							.text {
								margin-right: 80px;
							}
							.num {
								width: 92px;
								height: 198px;
								background-image: url('../../common/assets/images/1-business.png');
							}
						}
					}
					&:nth-child(2) {
						.image {
							.con {
								left: 54%;
								top: 53%;
								width: 186px;
								height: 164px;
								background-image: url('../../common/assets/images/chjs-business.png');
							}
						}
						.discription {
							.text {
								margin-left: 80px;
							}
							.num {
								width: 138px;
								height: 198px;
								background-image: url('../../common/assets/images/2-business.png');
							}
						}
					}
					&:nth-child(3) {
						.image {
							.con {
								width: 182px;
								height: 220px;
								background-image: url('../../common/assets/images/fw-business.png');
							}
						}
						.discription {
							.text {
								margin-right: 80px;
							}
							.num {
								width: 139px;
								height: 202px;
								background-image: url('../../common/assets/images/3-business.png');
							}
						}
					}
					&:nth-child(4) {
						.image {
							.con {
								left: 46%;
								width: 238px;
								height: 202px;
								background-image: url('../../common/assets/images/jjfa-business.png');
							}
						}
						.discription {
							.text {
								margin-left: 80px;
							}
							.num {
								width: 150px;
								height: 198px;
								background-image: url('../../common/assets/images/4-business.png');
							}
						}
					}
					&:nth-child(5) {
						.image {
							.con {
								width: 159px;
								height: 162px;
								background-image: url('../../common/assets/images/aqfh-business.png');
							}
						}
						.discription {
							.text {
								margin-right: 80px;
							}
							.num {
								width: 140px;
								height: 198px;
								background-image: url('../../common/assets/images/5-business.png');
							}
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
