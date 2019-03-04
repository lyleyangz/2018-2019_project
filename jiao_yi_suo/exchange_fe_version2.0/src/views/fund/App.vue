<template>
	<div class="fund-index">
		<div class="riseandfall-outer">
			<riseAndFall :exchangeType="exchangeType" ref="riseAndFall" class="riseandfall"></riseAndFall>
		</div>
		<div class="header-outer f-pr">
			<com-header class="com-header" :currentPage="'fund'" styleClass="light" :isLogin="isLogin"></com-header>
		</div>
		<section class="user-contain" ref="contentOuter">
			<router-view></router-view> 
		</section>
		<com-footer></com-footer>
	</div>
</template>

<script>
import header from '@components/header/header';
import footer from '@components/footer/footer';
import riseAndFall from '@components/riseAndFall_top/riseAndFall_top';
import { getKinfoList, getbalance } from '@api/api_group';
import eventBus from '@common/eventBus/eventBus';
import { Message } from 'iview';
export default {
    data() {
        return {
			isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
			checkId: this.globalFun.getQueryString('toRecharge')? '2': '1',
			exchangeType: ['BTC','ETH']
        };
    },
    created() {
		document.body.style.backgroundColor="#F6F6FB";
		eventBus.$on('convertFont', () => {
			document.title = this.$t('fund.pageTitle');
		});
	},
    mounted () {
		// this.watchStcoll();
		this.$nextTick(() => {
			this.initHeight();
		});	
	},
    methods: {
		initHeight() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.$refs.contentOuter.setAttribute("style", `min-height: ${h - 262}px`);
		},
	},
    components: {
        'com-header': header,
		'com-footer': footer,	
		riseAndFall
    }
}
</script>
<style lang="scss"  scoped="scoped">
.fund-index{
	background-color: #F6F6FB;
	.user-contain{
		padding:150px 0 30px 0;
		overflow: auto;
		width: 1200px;
		min-width: 1200px;
		margin: 0 auto;
		.left-nav{
			float: left;
			.user-center{
				background-color: #ffffff;
				padding: 0 10px;
				width:180px;
				height:800px;
				text-align: center;
				div{
					height: 94px;
					border-bottom: 1px solid #e5e5e5;
					.balance{
						display: inline-block;
						position: relative;
						top:15px;
						width:48px;
						height: 48px;
						background: url('./../../common/assets/images/balance.png') no-repeat center;
						background-size: 48px 48px;
					}
					.recharge{
						display: inline-block;
						position: relative;
						top:15px;
						width:48px;
						height: 48px;
						background: url('./../../common/assets/images/recharge.png') no-repeat center;
						background-size: 48px 48px;
					}
					.withdraw{
						display: inline-block;
						position: relative;
						top:15px;
						width:48px;
						height: 48px;
						background: url('./../../common/assets/images/withdraw.png') no-repeat center;
						background-size: 48px 48px;
					}
					.bill{
						display: inline-block;
						position: relative;
						top:15px;
						width:48px;
						height: 48px;
						background: url('./../../common/assets/images/bill.png') no-repeat center;
						background-size: 48px 48px;
					}
					span{
						font-size: 20px;
						margin-left:6px;
						color:#333333;
						display: inline-block;
						line-height: 94px;
						cursor: pointer;
					}
					.checkNav{
						color:#00b38a;
					}
				}
			}
		}
		.right-contain{
			// margin-left:20px;
			float: left;
		}
	}
}
</style>
