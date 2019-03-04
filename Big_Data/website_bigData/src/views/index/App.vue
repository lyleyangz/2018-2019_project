<template>
	<div id="app">  
    	<com-header :class="scrollClass"></com-header>
		<div class="body-center" ref="contentOuter">
    		<router-view></router-view>
		</div>
	  	<com-footer></com-footer>
	</div>
</template>

<script>
import header from "@components/header/header";
import footer from "@components/footer/footer";
import eventBus from "@common/eventBus/eventBus";
export default {
	data() {
		return {
			scrollClass: "",
			isScroll: true
		};
	},
	created() {
		eventBus.$on('header', (flag) => {
			this.isScroll = flag;
			if(!this.isScroll){
				this.scrollClass = "scroll-detail";
			}else{
				this.scrollClass = "";
			}		
		});
	},
	mounted() {
		this.initHeight();
		window.addEventListener('scroll', this.menu)
	},
	methods: {
		initHeight() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.contentOuter.setAttribute(
				"style",
				`min-height: ${h - 130}px`
			);
		},
		menu() {
			if(this.isScroll){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				this.scrollClass = scrollTop>=150?'scroll':''
			}
			
		}
	},
	components: {
		"com-header": header,
		"com-footer": footer
	}
};
</script>

<style lang="scss"  scoped="scoped">
#app {
	.body-center{
		
	}
}
</style>
