<template>
	<div class="safe-index">
        <div class="riseandfall-outer">
			<riseAndFall :exchangeType="exchangeType" ref="riseAndFall" class="riseandfall"></riseAndFall>
		</div>
        <div class="header-outer f-pr">
			<com-header class="com-header" :currentPage="'userCenter'" styleClass="light" :isLogin="isLogin"></com-header>
		</div>
		<section class="user-contain" ref="container">
			<!-- <div class="left-nav">
			   <section class="user-center">
				<div>
					<i class="safe"></i>
					<span  @click="checkNav(1)" v-bind:class="{checkNav:checkId == '1'}">安全中心</span>
				</div>
				<div>
					<i class="share"></i>
					<span @click="checkNav(2)" v-bind:class="{checkNav:checkId == '2'}">分享中心</span>
				</div>
				<div>
					<i class="identity"></i>
					<span @click="checkNav(3)" v-bind:class="{checkNav:checkId == '3'}">身份认证</span>
				</div>
			  </section>
	     	</div> -->
			<div class="right-contain">
				<!-- <com-safe v-if="checkId == '1'"></com-safe> -->
				<!-- <com-share v-if="checkId == '2'"></com-share> -->
				<!-- <com-identity  v-if="checkId == '3'"></com-identity>-->
				<router-view></router-view> 
			</div>
		</section>
		<com-footer></com-footer>	
	</div>
</template>

<script>
import header from "@components/header/header";
import footer from "@components/footer/footer";
import { getbalance } from "@api/api_group";
import riseAndFall from '@components/riseAndFall_top/riseAndFall_top';
import eventBus from '@common/eventBus/eventBus';
export default {
    data() {
        return {
            isLogin: localStorage.getItem("YJS_isLogin") === "true" ? true : false,
            checkId: "1",
            isSafe: true,
            exchangeType: ['BTC','ETH']
        };
    },
    created() {
        document.body.style.backgroundColor="#F6F6FB";
		eventBus.$on('convertFont', () => {
			document.title = this.$t('userCenter.pageTitle');
		});
    },
    mounted() {
        this.$nextTick(() => {
            if (this.globalFun.mobileCheck()) {
                let h = document.documentElement.clientHeight - 78 - 344;
                this.$refs.container.setAttribute("style", `min-height:${h}px;`);
            }
        });
        window.addEventListener("popstate", function(e) {
            window.location.reload();
        });
    },
    methods: {
        checkNav: function(val) {
            //左侧tab菜单
            let _this = this;
            _this.checkId = val;
            if (val == "1") {
                //安全中心
                this.$router.push({
                    path: "/safe"
                });
            } else if (val == "2") {
                //分享中心
                this.$router.push({
                    path: "/share"
                });
            } else {
                //身份认证
                this.$router.push({
                    path: "/identity"
                });
            }
        }
    },
    components: {
        "com-header": header,
        "com-footer": footer,
        riseAndFall
    }
};
</script>

<style lang="scss"  scoped="scoped">
.safe-index {
    background-color: #F6F6FB;
    .user-contain {
        padding: 150px 0 30px 0;
        overflow: auto;
        width: 1200px;
        min-width: 1200px;
        margin: 0 auto;
        .left-nav {
            float: left;
            .user-center {
                background-color: #ffffff;
                padding: 0 10px;
                width: 180px;
                height: 800px;
                text-align: center;
                div {
                    height: 94px;
                    border-bottom: 1px solid #e5e5e5;
                    .safe {
                        display: inline-block;
                        position: relative;
                        top: 15px;
                        width: 48px;
                        height: 48px;
                        background: url("./../../common/assets/images/safe.png") no-repeat
                        center;
                        background-size: 48px 48px;
                    }
                    .share {
                        display: inline-block;
                        position: relative;
                        top: 15px;
                        width: 48px;
                        height: 48px;
                        background: url("./../../common/assets/images/share.png") no-repeat
                        center;
                        background-size: 48px 48px;
                    }
                    .identity {
                        display: inline-block;
                        position: relative;
                        top: 15px;
                        width: 48px;
                        height: 48px;
                        background: url("./../../common/assets/images/identity.png")
                        no-repeat center;
                        background-size: 48px 48px;
                    }
                    span {
                        font-size: 20px;
                        margin-left: 6px;
                        color: #333333;
                        display: inline-block;
                        line-height: 94px;
                        cursor: pointer;
                    }
                    .checkNav {
                        color: #00b38a;
                    }
                }
            }
        }
    }
}
</style>
