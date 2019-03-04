<template>
	<div id="team" ref="team" class="f-pr">
		<div class="header-outer">
			<com-header class="header" :currentPage="'team'"></com-header>
		</div>
		<div class="banner-outer">
			<div class="banner">
				<img src="../../common/assets/images/banner-team.jpg" alt="">
			</div>
		</div>
		<div class="team-member-outer">
			<ul class="team-member">
				<li class="t-member f-pr">
					<div class="image f-pa"><img src="../../common/assets/images/sms-team.jpg" alt=""></div>
					<div class="discription-wraper f-pa">
						<div class="discription f-pa">
							<h3 class="title">史密斯教授</h3>
							<p class="dis">来自美国加利福尼亚州，主导区块链技术的研发以及应用工作。专注于区块链底层技术，在区块链算法、区块链去中心化等方面造诣颇深。</p>
						</div>
					</div>
				</li>
				<li class="t-member f-pr">
					<div class="image f-pa"><img src="../../common/assets/images/wts-team.jpg" alt=""></div>
					<div class="discription-wraper f-pa">
						<div class="discription f-pa">
							<h3 class="title">沃特森</h3>
							<p class="dis">来自麻省理工，担任区块链研究顾问，曾就职于IBM、美国金融中心华尔街等，在区块链领域有独到的见解。</p>
						</div>
					</div>
				</li>
				<li class="t-member f-pr">
					<div class="image f-pa"><img src="../../common/assets/images/sjm-team.jpg" alt=""></div>
					<div class="discription-wraper f-pa">
						<div class="discription f-pa">
							<h3 class="title">史记明先生</h3>
							<p class="dis">来自香港大学，负责区块链技术的加密技术，曾应用于医疗、保险等领域，在业内卓有成就。</p>
						</div>
					</div>
				</li>
				<li class="t-member f-pr">
					<div class="image f-pa"><img src="../../common/assets/images/qtcy-team.jpg" alt=""></div>
					<div class="discription-wraper f-pa">
						<div class="discription f-pa">
							<h3 class="title">其他成员</h3>
							<p class="dis">来自腾讯、华为、Adobe、迈瑞医疗。</p>
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
import scrollReveal from 'scrollReveal'
export default {
	data() {
		return {
			scrollReveal: scrollReveal()
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.initScrollReveal();
		});	
	},
	methods: {
		initScrollReveal() {
			this.scrollReveal.reveal('.reveal-left', {
				duration: 2000,
				reset: true,
				origin: 'left',
				distance: '300px',
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-right', {
				duration: 2000,
				reset: true,
				origin: 'right',
				distance: '300px',
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-right-nodelay05', {
				duration: 500,
				reset: true,
				origin: 'right',
				distance: '300px',
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-left-delay1', {
				duration: 500,
				delay: 250,
				reset: true,
				origin: 'left',
				distance: '300px',
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-right-delay2', {
				duration: 500,
				delay: 500,
				reset: true,
				origin: 'right',
				distance: '300px',
				easing: 'linear'
			});
			this.scrollReveal.reveal('.reveal-left-delay3', {
				duration: 500,
				delay: 750,
				reset: true,
				origin: 'left',
				distance: '300px',
				easing: 'linear'
			});
		}	
	},
	components: {
		'com-header': header,
		'com-footer': footer
	}
}
</script>

<style lang="scss"  scoped="scoped">
	#team {
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
		.team-member-outer {
			width: 100%;
			background-color: #f6f7f9;
			.team-member {
				width: 1075px;
				margin: 0 auto;
				padding-bottom: 134px;
				overflow: hidden;
				.t-member {
					height: 300px;
					margin-top: 60px;
					.image {
						width:  522px;
						height: 300px;
						top: 0;
						z-index: 2;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.discription-wraper {
						width: 700px;
						height: 240px;
						top: 74px !important;
						background-color: #ffffff;
						.discription {
							.title {
								font-size: 24px;
								line-height: 24px;
								color: #333333;
								font-weight: 400;
							}
							.dis {
								width: 294px;
								font-size: 14px;
								color: #666666;
								line-height: 24px;
								margin-top: 29px;
							}
						}
					}
					&:nth-child(2n - 1) {
						.image {
							top: 45px;
							left: 0;
						}
						.discription-wraper {
							top: 0;
							right: 0;
							.discription {
								top: 50%;
								transform: translateY(-50%);
								left: 202px;
								text-align: left;
							}
						}
					}
					&:nth-child(2n) {
						.image {
							top: 45px;
							right: 0;
						}
						.discription-wraper {
							top: 0;
							left: 0;
							.discription {
								top: 50%;
								transform: translateY(-50%);
								right: 202px;
								text-align: right;
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
</style>
