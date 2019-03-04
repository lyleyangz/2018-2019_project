<template>
	<div id="app" class="f-pr">
		<div class="header-wraper f-pr">
			<com-header class="com-header f-pa" :currentPage="'notice'" :isLogin='isLogin'></com-header>
		</div>
		<div class="router" ref="router">
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
			isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false
        };
    },
    created() {
		let _this = this;
        _this.$Spin.show();
		setTimeout(()=>{
            _this.$Spin.hide();
		},2000)
	},
	mounted () {
		this.$nextTick(() => {
			if (this.globalFun.mobileCheck()) {
				let h = document.documentElement.clientHeight - 78 - 344;
				this.$refs.router.setAttribute('style', `min-height:${h}px;`);
			}
		});	
	},
    methods: {

    },
    components: {
        'com-header': header,
		'com-footer': footer
    }
}
</script>

<style lang="scss"  scoped="scoped">
	#app {
		width: 100%;
		min-height: 100%;
		background-color: #f8fbfe;
		.header-wraper {
			width: 100%;
			z-index: 999;
			.com-header {
				width: 100%;
			}
		}
		.router {
			width: 100%;
			padding-top: 78px;
		}
	}
</style>
<style>

</style>
