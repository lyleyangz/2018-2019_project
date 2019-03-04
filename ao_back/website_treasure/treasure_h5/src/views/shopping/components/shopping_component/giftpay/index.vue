<template>
    <div class="give">
        <div class="code">
            <div>防伪溯源码</div>
            <div class="val" v-if="code">{{code}}</div>
        </div>
        <div class="info" v-if="payData">
            <img :src="payData.proUrl" alt="">
            <div>商品价值(元)：{{payData.singlePrice}}</div>
        </div>
        
        <div class="ipt">
            <div class="title" v-if="payData">您的{{payData.proName}}已装备好，送给她(他)吧！</div>
            <div class="name">
                <label>送礼人：</label>
                <div><input type="text" maxlength="10" v-model="userInput.name" placeholder="10字内"></div>
            </div>
            <div class="remark">
                <label>写上你珍藏已久的心意，我们帮你实现:</label>
                <div><textarea maxlength="20" v-model="userInput.wish" placeholder="祝福不在多，在于心意，一字一心（20字以内）"></textarea></div>    
            </div>
        </div>
        <div class="btn row">
            <button @click="returnIndex()">再送一份</button><button @click="give()">送给朋友</button>
        </div>
        <div class="chain">
            <div class="title">活动须知</div>
            <div class="content">
                <p>若未在本页面送给好友，可在个人中心礼品中再次分享！</p>
                <p>订单记录请在->个人中心->订单->礼品订单中查看</p>
            </div>
        </div>

        <div class="modal" v-if="modal.is">
            <v-share :shareData="shareData"></v-share>
        </div>
    </div>
    
</template>
<script>
    import { giftPresent } from '@api/api_gift';
    import eventBus from "../../../../../common/eventBus/eventBus.js";
    import {Toast,MessageBox} from 'mint-ui';
    import share from "../share/index";
	export default {  
        props:['code',"giftID"], 
        components:{
            'v-share':share
        },    
		data() {
			return {
                modal:{
                    is: false,
                    open: false
                },
                // 
                share_QRcode:null,
                // 
                userInput:{
                    name:"",
                    wish:"",
                    giftId:this.giftID
                },
                // 
                payData:null,
                shareData:{},
                btnDisabled:false
			}
		},
		created() {
            document.title = "送给好友";
            this.payData = JSON.parse(sessionStorage.getItem("TOPAYDATA")).share_data;
        },
        mounted(){
            eventBus.$on("shareOff",()=>{
                this.modal.is = false;
            })
        },
		methods: {
           give(){
               if(!this.userInput.name){
                   Toast('你还没有输入送礼人~');
                   return
               }
               if(!this.userInput.wish){
                   Toast('你还没有输入祝福语~');
                   return
               }
               if(this.giftID){
                   giftPresent(this.userInput).then((res)=>{
                       if(res.code == "200" && res.msg == "success"){
                           Toast("转赠成功!")
                            setTimeout(()=> {
                               this.modal.is = !this.modal.is;
                               let sharedata = {
                                    cover: this.payData.proUrl,
                                    proName: this.payData.proName,
                                    price: this.payData.singlePrice,
                                    shareUrl: window.location.protocol+"//"+window.location.host+"/spread.html#/give/"+res.data+"/2",
                                    type:1,
                                    name:this.userInput.name
                               }
                               this.shareData = sharedata;
                            },800)
                       }
                   })
               }
            },
            returnIndex(){
                this.$router.go(-1)
            }
        },
        beforeDestroy(){
            eventBus.$off("shareOff")
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
@import "./index.less";
</style>