<template>
    <div class="success">
        <!-- <img src="../../../../common/assets/images/spread/success-bg1.png" alt=""> -->
        <div class="cnt">
            <div v-if="params.flag==1 || params.flag==2">
                <div class="title" v-if="params.flag==1">登录成功！</div>
                <div class="title" v-if="params.flag==2">恭喜您，注册成功！</div>
                <div class="red">您的"{{params.name}}"已打包准备好，送给 TA吧！</div>
                <div class="give">
                    <button @click="give">赠送</button>
                </div>
            </div>
            <div v-if="params.flag==3 || params.flag==4">
                <div class="gift light" v-if="params.flag==3">
                    <div class="bg"></div>
                    <div class="text">礼品领取成功!</div>
                </div>
                <div class="gift dark" v-if="params.flag==4">
                    <div class="bg"></div>
                    <div class="text">好可惜，礼包已被其他人领取~</div>
                </div>
                <div class="gift-tip">
                    <p>下载登录APP，进入"个人中心"-"礼品"，查看收到的礼品，</p> 
                    <p>请及时补全收货信息，方便我们及时为您发货！ </p>
                </div>
            </div>
            <div class="load-tip">
                <p>下载APP获得更多价格</p>
                <p>以及不间断的获取Token!</p>
            </div>
            <div class="load">
                <button @click="load">立即下载APP</button>
            </div>
            <div class="lb">您的满意，我们的心意！</div>
            <ul class="tip" v-if="params.flag==3 || params.flag==4">
                <li>温馨提示：</li>
                <li>1. token可购商城任一商品</li>
                <li>2. 购买商品时，若token足额，可全额抵扣</li>
                <li>3. token可随时兑换通证，兑换后可立即提现 </li>
            </ul>
        </div>

        <div class="modal" v-if="modal.is">
            <div class="modal-cnt">
                <i class="fail"></i>
                <div class="lb">礼包已被其他人领取~</div>
                <div class="tip">下载APP奢侈珠宝超值低价购买</div>
                <div class="btn"><button @click="modal.is=false">朕知道了</button></div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import { existReceive } from '@api/api_gift';
	import {Toast,MessageBox} from 'mint-ui';
	export default {        
		data() {
			return {
                params:{
                    flag:1,// 1.登录成功 2.注册成功 3.礼品领取成功 4.礼品领取失败
                    name:""
                },
                modal:{
                    is: false
                }
                
			}
		},
		created() {
            this.params = this.$route.query;
            document.title = "成功";
        },
        mounted(){
            
        },
		methods: {
            give(){
               
                existReceive({
                    giftId: this.params.id
                }).then(res=>{
                    if(res.code == 200){
                        if(res.data==1401){
                            this.modal.is = true;
                        }else{
                            this.$router.push({
                                path:"/give/"+this.params.id+"/3"
                            })
                        }
                    }
                })
            },
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
@import "./index.less";
</style>
