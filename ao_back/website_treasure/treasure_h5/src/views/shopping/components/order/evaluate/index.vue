<template>
	<div class="evaluate">
		<!-- <mt-header class="myHeader" fixed title="售后申请">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header> -->
        <div class="orderInfo row">
            <div class="img">
                <img :src="info.proUrl" alt="">
            </div>
            <div class="col">
                <div class="name">{{info.proName}}</div>
                <div class="row star">
                    <div>评价：</div>
                    <div class="col">
                        <i :class="index<params.star?'active':''" v-for="(item,index) of 5" :key="index" @click="checkStar(index)"></i>
                    </div>
                    <div>{{starList[params.star]}}</div>
                </div>
            </div>
        </div>
        <div class="remark">
            <textarea name="" id="" cols="30" rows="10" v-model="params.content" placeholder="评价内容" maxlength="200"></textarea>
            <div class="tip">200字内</div>
        </div>

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
</template>

<script>
    import eventBus from "@/common/eventBus/eventBus.js";
	import { orderDetail,addEvaluate } from "@api/api_order";
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                info:{},
                params:{
                    star:0,
                    content:"",
                    picUrl:"",
                    isFeedback: 0
                },
                starList:{
                    "1":"非常不满意",
                    "2":"不满意",
                    "3":"基本满意",
                    "4":"满意",
                    "5":"非常满意",
                },
                imgList:[]

			}
		},
		mounted() {
            this.getInfo();
            document.title = "评价";
			window.scrollTo(0,0);
            window.openImageChooserCallback = this.openImageChooserCallback;
		},
		methods: {
            getInfo(){
                orderDetail({
                    id: this.$route.params.id
                }).then(res=>{
                    this.info = res.data || {};  
                })
            },
            submit(){
                this.params.orderId = this.$route.params.id;
                this.params.picUrl = this.imgList.join(",");
                addEvaluate(this.params).then(res=>{
                    if(res.code == 200){
                        Toast("评价成功")
                        eventBus.$emit("refreshList");
                        this.$router.go(-1);
                    }
                })
            },
			checkStar(index){
                this.params.star = index+1  ;
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
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
@import 'index.less';
</style>