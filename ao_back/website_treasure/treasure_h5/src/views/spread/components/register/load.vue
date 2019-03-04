<template>
	<div class="spread">
        <div class="load">
            <img src="../../../../common/assets/images/spread/load.png" alt="">
            <div class="cnt">
                <ul class="block">
                    <li class="tip">
                        <div class="title">温馨提示：</div>
                        <div>
                            <p>1.token可购商城任一商品</p>
                            <p>2.购买商品时，若token足够，可全额抵扣</p>
                            <p>3.token可随时兑换通证，兑换后可立即提现</p>
                        </div>
                    </li>
                    <li class="red">立即下载app获得更多惊喜！</li>
                    <li>
                        <div class="btn" @click="load">立即下载APP</div>
                        <div class="lb">您的满意，我们的心意！</div>
                    </li>
                </ul>
            </div>
        </div>
	</div>
</template>

<script>
    import {Toast,MessageBox} from 'mint-ui';
    
	
	export default {        
		data() {
			return {
                
			}
		},
		created() {
            document.title = "注册成功";
		},
		methods: {
            load(){
                var versions = this.globalFun.browserCheck.versions;
                if(versions.ios){
                    Toast("ios即将上线")
                }else{
                    location.href = "http://h5.mokalifang.com/load/mobei.apk";
                }
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";

.load{
   
   .cnt{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       .block{
            padding: 7.3rem 0 0 0;
       }
       .tip{
           padding: 0 1rem  0 2.053333rem;
           .title{
               @include font-dpr(12px);
               margin-bottom: .226667rem;
           }
           p{
               @include font-dpr(10px);
               line-height: .346667rem;
               margin-bottom: .213333rem;
           }
       }
       .red{
            color: #ff000b;
            text-align: center;
            margin-top: .933333rem;
        }
        .btn{
            width: 4rem;
            height: .666667rem;
            background-color: rgba(254, 36, 43, 1);
            border-radius: .133333rem;
            margin: .973333rem auto .173333rem auto;
            text-align: center;
            line-height: .666667rem;
            @include font-dpr(11px);
            color: #fff;
        }
        .lb{
            text-align: center;
            @include font-dpr(8px);
        }
   }
}
</style>