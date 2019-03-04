<template>
	<div id="aboutUs" ref="aboutUs" class="f-pr">
		<div class="header-outer">
			<com-header class="header" :currentPage="'aboutUs'"></com-header>
		</div>
		<div class="banner-outer">
			<div class="banner">
				<img src="../../common/assets/images/banner-aboutUs.jpg" alt="">
			</div>
		</div>
		<div class="introduction-outer">
			<div class="introduction">
				<div class="title"></div>
				<div class="content">
					<div class="dic">
						<p>深圳前海比特空间科技有限公司成立于2013年，是国内领先的区块链技术应用服务提供商，致力于推动区块链技术进步，拓展先进技术的场景应用，引领区块链行业发展。</p>
						<p>目前公司在区块链技术应用领域取得了卓有成效的成果，整合全球资源、立足自主创新、走出了一条创新驱动型健康发展之路。公司大力实施科技创新战略，不断完善技术标准，广泛吸纳行业专业技术人才，核心成员来自于国内外一线高科技企业和知名院校,引领国内外区块链技术的研发以及应用发展。</p>
						<p>比特空间提供企业级区块链基础设施，行业解决方案，以及安全、可靠、灵活的区块链技术。充分利用计算机技术+区块链+溯源+大数据，发挥公司的技术优势，和广大合作伙伴一起携手努力，用先进技术帮助国内的企业建立更加合理完善的产品行销流程体系，创造出良好的经济效益。</p>
					</div>
					<div class="image"></div>
				</div>
			</div>
		</div>
		<div class="data-eye-outer">
			<div class="data-eye">
				<div class="title"></div>
				<ul class="data f-pr">
					<li class="t-member f-pa reveal-right-nodelay05">
						<h3 class="time">2013</h3>
						<p class="dic">在公司领导敏锐的市场前瞻性下组建前海比特空间科技有限公司</p>
					</li>
					<li class="t-member f-pa reveal-left-delay1">
						<h3 class="time">2013-2015</h3>
						<p class="dic">公司通过多种渠道获得该领域高端人才，进行区块链底层技术研究</p>
					</li>
					<li class="t-member f-pa reveal-right-delay2">
						<h3 class="time">2016</h3>
						<p class="dic">公司从底层区块链技术研究方向往实际应用层转移</p>
					</li>
					<li class="t-member f-pa reveal-left-delay3">
						<h3 class="time">2017</h3>
						<p class="dic">经过多年的努力奋斗，成功研发出一整套区块链技术的实际落地方，已经开始走向市场</p>
					</li>
				</ul>
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
	#aboutUs {
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
		.introduction-outer {
			width: 100%;
			.introduction {
				width: 1200px;
				margin: 0 auto;
				overflow: hidden;
				.title {
					width: 276px;
					height: 68px;
					background-image: url('../../common/assets/images/company-introduction.png');
					margin: 20px auto 0;
				}
				.content {
					width: 100%;
					height: 600px;
					margin-top: 22px;
					margin-bottom: 5px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.dic {
						width: 598px;
						line-height: 35px;
						font-size: 18px;
						color: #333333;
						p {
							text-indent: 2em;
						}
					}
					.image {
						width: 372px;
						height: 442px;
						background-image: url('../../common/assets/images/b-aboutUs.png');
					}
				}
			}
		}
		.data-eye-outer {
			width: 100%;
			background-color: #f6f7f9;
			.data-eye {
				width: 1200px;
				height: 500px;
				margin: 0 auto;
				overflow: hidden;
				.title {
					width: 167px;
					height: 68px;
					background-image: url('../../common/assets/images/data-eye-aboutUs.png');
					margin: 30px auto 0;
				}
				.data {
					width: 112px;
					height: 224px;
					background-image: url('../../common/assets/images/sjz-aboutUs.png');
					margin: 30px auto 0;
					.t-member {
						width: 420px;
						.time {
							width: 100%;
							font-size: 25px;
							font-weight: 600;
							color: #22374c;
						}
						.dic {
							width: 100%;
							line-height: 32px;
							font-size: 14px;
							color: #666666;
						}
						&:nth-child(1) {
							left: 150px;
							top: -7px;
						}
						&:nth-child(2) {
							left: -450px;
							top: 65px;
						}
						&:nth-child(3) {
							left: 150px;
							top: 134px;
						}
						&:nth-child(4) {
							left: -450px;
							top: 200px;
						}
						&:nth-child(2n) {
							text-align: right;
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
