<template>
	<div class="notice-content">
		<div class="header-outer">
			<com-header class="header" :currentPage="currentPage"></com-header>
		</div>
		<div class="article">
			<router-view class="article-router"></router-view>
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
		return {
			currentPage: this.globalFun.getQueryString('page').split('#')[0],
			listData: []
		}
	},
	created() {
		
	},
	components: {
		'com-header': header,
		'com-footer': footer
	}
}
</script>

<style lang="scss"  scoped="scoped">
	.notice-content {
		width: 100%;
		min-height: 100%;
		background-color: #ebebeb;
		.header-outer {
			width: 100%;
			height: 58px;
		}
		.article {
			width: 1200px;
			min-height: 500px;
			max-height: 800px;
			overflow-x: hidden;
			overflow-y: scroll;
			background-color: #ffffff;
			margin: 18px auto 190px;
			.article-router {
				width: 100%;
			}
		}
		.footer-outer {
			width: 100%;
		}
	}
</style>



