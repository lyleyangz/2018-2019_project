<template>
	<div :class="$i18n.locale">
		<div class="riseandfall-outer">
			<riseAndFall :exchangeType="exchangeType" ref="riseAndFall" class="riseandfall"></riseAndFall>
		</div>
		<div class="header-outer f-pr">
			<com-header class="com-header" :currentPage="'currency'" styleClass="light" :isLogin="isLogin"></com-header>
		</div>
		<section class="user-contain"  ref="container">
			<router-view></router-view> 
		</section>
		<com-footer></com-footer>
	</div>
</template>

<script>
import header from '@components/header/header';
import footer from '@components/footer/footer';
import eventBus from '@common/eventBus/eventBus';
import riseAndFall from '@components/riseAndFall_top/riseAndFall_top';
import { Message } from 'iview';

export default {
    data() {
        return {
			isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
			exchangeType: ['BTC','ETH']
        };
    },
    created() {
		document.body.style.backgroundColor="#F6F6FB";
		eventBus.$on('convertFont', () => {
			document.title = this.$t('header.currency')
			this.convertingFont = true;
			setTimeout(() => {
				this.convertingFont = false;
			}, 200);
		});
	},
	mounted () {
		this.$nextTick(() => {
			if (this.globalFun.mobileCheck()) {
				let h = document.documentElement.clientHeight - 78 - 344;
				this.$refs.container.setAttribute('style', `min-height:${h}px;`);
			}
			this.send_text = this.$t('register.cnt.sendText');
		});	
	},
    components: {
        'com-header': header,
		'com-footer': footer,
		riseAndFall
    }
}
</script>

<style lang="scss"  scoped="scoped">

.user-contain{
	padding:150px 0 30px 0;
	overflow: auto;
	width: 1200px;
	min-width: 1200px;
	margin: 0 auto 200px auto;
}

</style>