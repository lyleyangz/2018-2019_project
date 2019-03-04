<template>
    <div class="give">
        <div class="code">
            <div>防伪溯源码</div>
            <div class="val">{{info.traceno}}</div>
        </div>
        <div class="info">
            <img :src="info.proUrl" alt="">
            <div v-if="type==1 || type==3">商品价值（元）:{{(info.price || 0).toFixed(2)}}</div>
        </div>
        
        <div class="ipt">
            <div v-if="type==1 || type==3">
                <div class="title">金镶澳绿宝项链准备完毕，送出去吧！</div>
                <div class="name">
                    <label>送礼人：</label>
                    <div><input type="text" v-model="params.name" placeholder="10字内" maxlength="10"></div>
                </div>
                <div class="remark">
                    <label>传达心意，写下您想对TA说的话:</label>
                    <div><textarea maxlength="20" v-model="params.wish" placeholder="祝福不在多，在于心意，一字一句（20字数以内）"></textarea></div>    
                </div>
            </div>
            <div v-if="type==2">
                <div class="name">
                    <label>您的好友：</label>
                    <label>{{params.name}}</label>
                </div>
            
                <div class="remark">
                    <label>赠送给您价值{{(info.price || 0).toFixed(2)}}元{{info.proName}}一枚</label>
                    <div><textarea maxlength="20" v-model="params.wish" placeholder="祝福不在多，在于心意，一字一句（20字数以内）"></textarea></div>    
                </div>
            </div>
           
        </div>
        
        <div class="btn row" v-if="type==1">
            <button @click="give">送给朋友</button>
        </div>
        <div class="btn row" v-if="type==2">
            <button @click="receive(1)">转赠礼包</button>
            <button @click="receive(2)">前往领取</button>    
        </div>
        <div class="btn row" v-if="type==3">
            <button @click="giftGather">自己收取</button>
            <button @click="give">送给朋友</button>    
        </div>
        <div class="chain" @click.stop="chain(info.orderId)" v-if="info.photoUrls">
            <div class="title">礼包链条（{{info.photoUrls.split(',').length}}）</div>
            <div class="row imgList">
                <div class="col">
                    <img :src="item==''?require('../../../../common/assets/images/defHead.png'):item" alt="" v-for="(item,index) of info.photoUrls.split(',')" :key="index">
                </div>
                <div class="arrow"></div>
            </div>
        </div>

        <div class="footer row" v-if="type==2">
            <div class="col">
                <button @click="receive(2)">注册</button>
            </div>
        </div>
        <div class="modal" v-if="modal.is" @click="modal.is=false">
            <div class="modal-cnt">
                <div class="close" v-show="!modal.open" @click.stop="modal.is=true">
                    <img class="bg" src="../../../../common/assets/images/gift-close.png" alt="">
                    <i @click.stop="modal.is=false"></i>
                    <div class="cnt">
                        <div class="btn" @click.stop="open"></div>
                        <div class="title">就差最后一步，点击即可领取！</div>
                        <div class="tip">
                            <p>您的好友{{params.name}}赠送</p>
                            <p>您一份神秘珠宝大礼包！</p>
                        </div>
                    </div>
                </div>
                <div class="open" v-show="modal.open" @click.stop="modal.is=true">
                    <img class="bg" src="../../../../common/assets/images/gift-open.png" alt="">
                    <div class="cnt">
                        <div class="title">
                            <p>您的好友{{params.name}}送您一份</p>
                            <p>神秘珠宝大礼包！</p>
                        </div>
                        <!-- <div class="qrcode">
                            <div>长按二维码拆开礼包</div>
                            <div class="row"><img src="../../../../common/assets/images/qrcode.png" alt=""></div>
                            <div>将图片截图保存发送给TA！</div>
                        </div>
                        <div class="tip">澳绿宝区块链珠宝溯源商城</div> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" v-if="shareModal.is">
            <v-share :ID="null" :shareData="shareData"></v-share>
        </div>
    </div>
    
</template>
<script>
    import eventBus from "../../../../common/eventBus/eventBus.js";
	import { giftDetail,giftPresent,giftGather} from "@api/api_gift";
    import {Toast,MessageBox,Indicator} from 'mint-ui';
    import share from "../../../shopping/components/shopping_component/share/index";
	export default {        
		data() {
			return {
                modal:{
                    is: false,
                    open: false
                },
                shareModal:{
                    is: false
                },
                type: this.$route.params.type, // 1.支付成功后调整赠送页面 2.好友领取礼物
                info:{},
                params:{},
                shareData:{}
			}
        },
        components:{
            'v-share':share
        },
		created() {            
            document.title = "送给好友";
        },
        mounted(){
            eventBus.$on("shareOff",()=>{
                this.shareModal.is = false;
            })
            if(this.type == 2){
                this.modal.is = true;
            }
            this.detail();
        },
		methods: {
            detail(){
                giftDetail({
                    giftId: this.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        this.info = res.data || {};
                        if(this.type!=3){
                            this.params.name = this.info.name || '';
                            this.params.wish = this.info.wish || '';    
                        }
                    }
                })
            },
            give(){
                if(!this.params.name){
                    Toast('你还没输入送礼人~');
                    return false;
                }
                if(!this.params.wish){
                    Toast('你还没输入祝福语~');
                    return false;
                }
                this.params.giftId = this.info.giftId;
                giftPresent(this.params).then(res=>{
                    if(res.code == 200){
                        this.shareData = {
                            name: this.params.name,
                            cover: this.info.proUrl,
                            proName: this.info.proName,
                            price: this.info.price.toFixed(2),
                            shareUrl: window.location.protocol+"//"+window.location.host+"/spread.html#/give/"+res.data+"/2",
                            type:1
                        }
                        this.shareModal.is = true;
                    }
                })
            },
            giftGather(){
                Indicator.open();
                giftGather({
                    giftId: this.$route.params.id
                }).then(res=>{
                    Indicator.close();
                    if(res.code == 200){
                        if(res.data == 1401){
                            this.$router.push({
                                path:"/success?flag=4",
                            })
                        }else{
                            this.$router.push({
                                path:"/success?flag=3",
                            })
                        }
                    }
                })
            },
            open(){
                var _this = this;
                _this.modal.open=true;
                setTimeout(()=>{
                    _this.modal.is = false;
                },2000);
            },
            receive(type){
                this.$router.push({
                    path:"/registerGift?name="+this.info.proName+"&id="+this.$route.params.id+"&type="+type,
                })
            },
            chain(orderId){
                location.href = "/shopping.html#/gift/chain/"+orderId
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
</style>