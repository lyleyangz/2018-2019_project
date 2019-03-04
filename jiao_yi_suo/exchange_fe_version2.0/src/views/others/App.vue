<template>
	<div class="others">
		<div class="header-outer f-pr">
			<com-header ref="header" class="com-header" :currentPage="''" styleClass="light" :isLogin="isLogin" :isOther="isOther" :tip="tip"></com-header>
		</div>
		<div class="contentOuter" ref="contentOuter">
			<router-view></router-view>
		</div>
		<com-footer></com-footer>
	</div>
</template>

<script>
import header from '@components/header/header';
import footer from '@components/footer/footer';

export default {
	data() {
		return {
			isLogin:false,
			isOther: true,
			tip: ""
		};
	},
	mounted() {
		this.initHeight();
	},
	methods: {
		setTip(tip){
			this.tip = tip;
		},
		setIsLogin(){
			this.$refs.header.bindIsLogin(); 
		},
		initHeight() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.contentOuter.setAttribute("style", `min-height: ${h - 262}px`);
		},
	},
    components: {
        'com-header': header,
		'com-footer': footer
    }
}
</script>

<style lang="scss"  scoped="scoped">
	.others {
		.header-outer {
			width: 100%;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 0;
			top: 0px;
			z-index: 999;
		}
		.contentOuter {
			padding-top: 78px;
		}
	}

</style>
