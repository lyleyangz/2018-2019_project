<template>
	<div class="afterSaleDetail">
		<!-- <mt-header class="myHeader" fixed title="售后申请">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header> -->
        <div class="cnt">
            <div class="row">
                <div class="col">订单编号: {{info.oNum}}</div>
                <div :class="info.checkBack==3?'green':'red'">{{statusList[info.checkBack]}}</div>
            </div>
            <div class="row">
                <div>消费token: {{info.consumeGold}}</div>
                <div class="ml">消费通证: {{info.vaacAccount}}</div>
            </div>
            <div class="row">
                <div>实付金额(元): {{total.toFixed(2)}}</div>
            </div>
            <div class="row">
               售后申请：申请退款
            </div>
            <div>申请原因：</div>
            <div v-if="id">
               {{info.backReason}}
            </div>
            <div v-if="!id" class="remark">
               <textarea v-model="params.backReason" cols="30" rows="10" maxlength="300" placeholder="请输入申请原因"></textarea>
               <div class="tip">300字内</div>
            </div>
            <div v-if="id">
                <div class="imgList row" >
                    <div class="img" v-for="(itemImg,indexImg) of info.backPicurl.split(',')" :key="indexImg">
                        <img :src="itemImg">
                    </div>
                </div>
                <div class="date">申请时间: 2018-12-16  11:36:56 </div>
            </div>
            <div v-if="!id">
                <div class="row uploadImg">
                    <div class="img" v-for="(item,index) of imgList" :key="index">
                        <i class="close" @click="delImg(index)"></i>
                        <img :src="item" alt="">
                    </div>
                    <div class="add" @click="uploadImg" v-if="imgList.length<3">
                        <div>
                            <i></i>
                            <div>添加图片</div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <button @click="submit">提交</button>
                </div>
            </div>

        </div>
        <div v-if="id && info.checkBack==2">
            <div class="reply">
                <div>小宝回复：</div>
                <div>你的原因不支持退款，如有更多疑问，请联系我们的客服.</div>
            </div>
            <div class="btn">
                <button @click="again">重新提交</button>
            </div>
        </div>

        <div class="tip">
            <div>温馨提示：</div>
            <ul>
                <li>1.审核通过后，现金原支路径返还；</li>
                <li>2.token、通证将退还至账户余额中请留意查收；</li>
                <li>3.劳动获取的临时token将被燃烧掉；</li>
                <li>4.token、通证实时到账，现金将在15个工作日内退还到您的支付账户中。</li>
            </ul>
        </div>
	</div>
</template>

<script>
	import { orderDetail,orderAftersale,aftersaleDetail } from "@api/api_order";
	import {Toast,Indicator,MessageBox} from 'mint-ui';
	
	export default {        
		data() {
			return {
                id: this.$route.query.id || '',
                info:{},
                detail:{},
                params:{
                    backReason: "",
                    backPicurl: "",
                    id: this.$route.query.orderId
                },
                statusList:{
                    "1": "审核中",
                    "2": "审核未通过",
                    "3": "审核通过"
                },
                total: 0,
                imgList:[]
			}
		},
		mounted() {

            if(this.id){
                this.getDetail();
                document.title = "售后申请详情";
            }else{
                this.getInfo();
                document.title = "售后申请";
            }
            
            window.scrollTo(0,0);
            window.openImageChooserCallback = this.openImageChooserCallback;
		},
		methods: {
			getInfo(){
                orderDetail({
                    id: this.$route.query.orderId
                }).then(res=>{
                    this.info = res.data || {};
                    var val = Number(this.info.totalPrice)-Number(this.info.discountPrice);
                    if(val>0){
                        this.total = val;
                    }
                })
            },
            getDetail(){
                aftersaleDetail({
                    id: this.id
                }).then(res=>{
                    this.info = res.data || {};
                })
            },
            uploadImg(){
                try{
                    // Indicator.open();
                    window.android_client.openImageChooser();
                    setTimeout(() => {
                        Indicator.close();
                    }, 5000);
                }catch(e){
                    // Indicator.close();
                    this.imgList.push("http://albups.xsl.one/upload/imgs/20181121/1542770779140_848.png");
                }             
            },
            openImageChooserCallback(img){
                Indicator.close();
                this.imgList.push(img);
            },
            delImg(index){
                this.imgList.splice(index,1);
            },
            again(){
                this.id = "";
                this.params.id = this.info.id;
            },
            submit(){
                if(!this.params.backReason){
                    Toast('请输入申请原因');
                    return false;
                }
                if(this.imgList.length == 0){
                    Toast('请上传图片');
                    return false;
                }
                this.params.backPicurl = this.imgList.join(",");

                var _this = this;
                orderAftersale(this.params).then(res=>{
                    if(res.code == 200){
                        MessageBox.alert('提交成功,我会尽快处理,为您带来的不变敬请谅解！',"").then(action => {
                            _this.$router.go(-1);
                        });
                    }
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
@import 'detail.less';
</style>