<template>
	<div id="business" ref="business" class="f-pr">
		<div class="header-outer">
			<com-header class="header" :currentPage="'partners'"></com-header>
		</div>
		<div class="banner-outer">
			<div class="banner">
				<img src="../../common/assets/images/banner-partners.jpg" alt="">
			</div>
		</div>
		<div class="com-partners-outer">
			<div class="com-partners">
				<h2 class="title"></h2>
				<div class="partners-list">
					<div class="partners-list-member f-fl">
						<h3 class="list-title">战略指导</h3>
						<ul class="list">
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">中国社会经济决策咨询中心广州办事处</p>
							</li>
						</ul>
					</div>
					<div class="partners-list-member f-fl">
						<h3 class="list-title">媒体</h3>
						<ul class="list">
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">北京众通社文化传媒有限公司</p>
							</li>
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">中国企业新闻观察网</p>
							</li>
						</ul>
					</div>
					<div class="partners-list-member f-fl">
						<h3 class="list-title">平台</h3>
						<ul class="list">
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">中国商品交易网</p>
							</li>
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">中国农产品批发交易网</p>
							</li>
						</ul>
					</div>
					<div class="partners-list-member f-fl">
						<h3 class="list-title">企业</h3>
						<ul class="list">
							<li class="t-member">
								<div class="partners-logo"></div>
								<p class="name">深圳最多粉科技有限公司</p>
							</li>
						</ul>
					</div>
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
		.com-partners-outer {
			width: 100%;
			margin-bottom: 140px;
			.com-partners {
				width: 1200px;
				margin: 0 auto;
				overflow: hidden;
				.title {
					width: 199px;
					height: 67px;
					background-image: url('../../common/assets/images/partners.png');
					margin: 77px auto 62px;
				}
				.partners-list {
					.partners-list-member {
						width: 278px;
						margin-left: 28px;
						.list-title {
							width: 100%;
							height: 50px;
							line-height: 50px;
							font-size: 18px;
							font-weight: 500;
							text-align: center;
						}
						.list {
							width: 100%;
							.t-member {
								.partners-logo {
									width: 100%;
									height: 150px;
								}
								.name {
									height: 40px;
									font-size: 14px;
									line-height: 40px;
									color: #666666;
									text-align: center;
								}
							}
						}
						&:first-child {
							margin-left: 0;
							.list {
								.t-member:nth-child(1) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-a.jpg');
									}
								}
							}
						}
						&:nth-child(2) {
							.list {
								.t-member:nth-child(1) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-b.jpg');
									}
								}
								.t-member:nth-child(2) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-c.jpg');
									}
								}
							}
						}
						&:nth-child(3) {
							.list {
								.t-member:nth-child(1) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-d.jpg');
									}
								}
								.t-member:nth-child(2) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-e.jpg');
									}
								}
							}
						}
						&:nth-child(4) {
							.list {
								.t-member:nth-child(1) {
									.partners-logo {
										background-image: url('../../common/assets/images/partner-logo-f.jpg');
									}
								}
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
