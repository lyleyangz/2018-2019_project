<template>
	<div class="discount">
    <!-- 折扣买头部积分说明 -->
		<div class="discount_title">
      <div class="discount_title_instructions" @click="jumpTo()">
        <mt-cell v-if="Number(temporaryNum)>0" :title="`共获得token：`+temporaryNum" :label="`计算后商品折扣`+discount_label+`元`" is-link>
          <span style="color: #16b673">token说明</span>
        </mt-cell>
        <mt-cell v-if="Number(temporaryNum)<=0" :title="`共获得token：0`" :label="`计算后商品折扣`+discount_label+`元`" is-link>
          <span style="color: #16b673">token说明</span>
        </mt-cell>
      </div>
    </div>
    <!-- 积分说明 -->
    <div class="scores_model" v-show="show_model" @click.stop="show_model=false">
      <div class="scores_model_content">
            <img src="../../../../../common/assets/images/shopping/scores_bg.png" alt="">
            <div class="text f-pa">
                      <div class="scores_model_body">
                            <p>个人钱包中，token具有价值，可兑换通证并提现.商品页token用于折扣购买当前商品</p>
                            <p>1.观看视频、进入钱包、观看视频连续时长、发邀请好友获得的token，只能折扣购买当前产品使用，不属于个人资产；</p>
                            <p>2.好友接受邀请并注册成功获得的token直接进入个人资产钱包，属于个人资产，可兑换通证，并提现；</p>
                            <p>3.被邀请的好友，在平台首次购物，本人同样可以获得token奖励， token奖励直接进入个人资产钱包，属于个人资产，可兑换通证，并交易。</p>
                      </div>
            </div>
            <div class="scores_model_foot">
              <p>注：token的使用最终解释权归百事贝所有</p>
            </div>
      </div>
    </div>
    <!--  -->
    <!-- 获取积分渠道 -->
    <div class="discount_getmethods">
      <div class="discount_getmethods_list">
        <div class="discount_getmethods_item" v-for="(item,index) in get_discount_methods" :key="index" v-show="item.code!=='st_5'&&item.code!=='st_6'&&item.code!=='st_8'">
          <mt-cell :title="`${item.name}`" :label="item.description">
            <mt-button plain size="small" v-if="item.status !== 2&&item.type!==1" @click.native="handleClick(item)">{{item.typeName}}</mt-button>
            <!-- 待领取 -->
            <mt-button plain size="small" style="color:#16b673;border: 0.026667rem solid #16b673" v-if="item.status === 2" @click.native="getcount(item)">领取</mt-button>
            <!-- 临时积分 -->
            <mt-button plain size="small" v-if="item.type == 1&&scoreType[item.sourceId]!==2&&item.pathType !== 'v_1'" @click.native="handleClick(item)">{{item.typeName}}</mt-button>
            <mt-button plain size="small" style="color:#16b673;border: 0.026667rem solid #16b673" v-if="item.type == 1&&scoreType[item.sourceId]==2" @click.native="getOnceScore(item)">领取</mt-button>
            <!-- <mt-button plain size="small" v-if="item.type == 1&&scoreType[item.code]!==2" @click.native="handleClick(item)">{{item.typeName}}</mt-button> -->
            <!-- 针对nfc视频 -->
            <mt-button plain size="small" v-if="item.pathType == 'v_1'&&item.type == 1&&scoreType[item.pathType] !==2" @click.native="handleClick(item)">{{item.typeName}}</mt-button>
            <mt-button plain size="small" style="color:#16b673;border: 0.026667rem solid #16b673" v-if="item.pathType == 'v_1'&&item.type == 1&&scoreType[item.pathType]==2" @click.native="getOnceScore(item)">领取</mt-button>
            <!-- <mt-button plain size="small" style="color:#16b673;border: 0.026667rem solid #16b673" v-if="item.type == 1&&scoreType[item.sourceId]==2" @click.native="getOnceScore(item)">领取</mt-button> -->
            <!-- 已领取 -->
            <!-- <span class="span_text" style="color:#16b673" v-if="item.status === 3">已领取</span> -->
          </mt-cell>
        </div>
      </div>
    </div>
    <!-- 使用说明 -->
    <div class="discount_instructions">
      <div class="discount_instructions_title">使用说明:</div>
      <div class="discount_instructions_content">
        <p>除邀请好友注册、好友购买商品，获得的token以及创建钱包获得的奖励token，其余token不购买商品，离开此页面会失效。</p><p>注：token的使用最终解释权归百事贝所有。</p>
      </div>
    </div>
    <!-- 复制 -->
    <div class="model_copy" v-if="model_copy_show">
          <div class="model_pay" v-show="model_copy_show" @click.stop="model_copy_show=false">
            <!--  -->
              <div class="mint-radiolist" @click.stop="fun">
                <div class="pay">
                      <div class="sure_cnt">邀请好友链接：{{copy_content}}</div>
                      <div class="sure_pay" v-clipboard:copy="copy_content" v-clipboard:success="onCopy" v-clipboard:error="onError">
                        <span>复制地址</span>
                      </div>
                  </div>
              </div>
          </div>
    </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import {
  getCounts,
  getCount,
  countsReport,
  tokenValue,
  sysmData
} from "@api/api_shopping";
import eventBus from "../../../../../common/eventBus/eventBus.js";

export default {
  props: ["navbar_1_detail"],
  data() {
    return {
      show_model: false,
      creat_wallet: true,
      discount_label: 0,
      // 获取积分方式
      get_discount_methods: [],
      // 判断领取状态
      allready: true,
      // 复制模态层弹窗
      model_copy_show: false,
      // 复制内容
      copy_content: "",
      // 邀请好友要的数据
      copycount: {},
      // 临时积分统计
      temporaryNum: 0,
      // 是否有钱包
      hava_wallet: true,
      // 是否有token
      have_token: true,
      // token值
      token: null,
      // vaac值多少钱
      tokenVAAC: null,
      // token值多少vaac
      vaacCut: null,
      // token价值
      tokenValueMoney: null,
      // 临时积分类型
      countsType: null,
      //临时积分默认
      scoreType: {},
      // 
      chainData:null,
    };
  },
  created() {
    this.copy_content =
      window.location.host +
      "/spread.html#/register?parentId=" +
      sessionStorage.getItem("userId");
    this.token = sessionStorage.getItem("token");

    // 判断是否有登录/钱包
    if (this.$route.query && this.$route.query.wallet) {
      if (this.$route.query.wallet == 0) {
        this.hava_wallet = false;
      }
    }
    //
    if (!this.token) {
      this.have_token = false;
    }
  },
  mounted() {
    if (sessionStorage.getItem("temporaryNum")) {
      this.temporaryNum = sessionStorage.getItem("temporaryNum");
    }
    if (sessionStorage.getItem("countsType")) {
      this.countsType = sessionStorage.getItem("countsType");
    }
    if (JSON.parse(sessionStorage.getItem("scoreType"))) {
      this.scoreType = JSON.parse(sessionStorage.getItem("scoreType"));
    }
    if(JSON.parse(sessionStorage.getItem("commodityDetail"))){
      this.chainData = JSON.parse(sessionStorage.getItem("commodityDetail"))
    }
    // 监控视频是否被播放？
    if(!JSON.parse(sessionStorage.getItem("VIDEO"))){
        if(this.scoreType.hasOwnProperty("v_1")){
          this.scoreType.v_1 = 1;
          sessionStorage.setItem("scoreType", JSON.stringify(this.scoreType));
        }
    }
    if(JSON.parse(sessionStorage.getItem("VIDEO"))&&JSON.parse(sessionStorage.getItem("v_1Type"))){
      this.createResports(JSON.parse(sessionStorage.getItem("v_1Type")))
    }
    // 外部视频是否被播放
    if(!JSON.parse(sessionStorage.getItem("OUT_VIDEO"))&&JSON.parse(sessionStorage.getItem("current_video_id"))){
        if(this.scoreType.hasOwnProperty(JSON.parse(sessionStorage.getItem("current_video_id")))){
          this.scoreType[JSON.parse(sessionStorage.getItem("current_video_id"))] = 1;
          sessionStorage.setItem("scoreType", JSON.stringify(this.scoreType));
        }
    }
    if(JSON.parse(sessionStorage.getItem("OUT_VIDEO"))&&JSON.parse(sessionStorage.getItem("v_3Type"))){
      this.createResports(JSON.parse(sessionStorage.getItem("v_3Type")))
    }
    this.vaccTurnMoney();
    this.sysData();
    this.init(this.countsType,()=>{
      // 初始化对页面详情，签到  直接领取特殊处理
      for(let i in this.get_discount_methods){
            if (this.have_token && this.hava_wallet && this.get_discount_methods[i].code == "st_2") {
              switch (this.get_discount_methods[i].type) {
                // 临时积分领取方式
                case 1:
                  this.getOnceScore(this.get_discount_methods[i]);
                  break;
                // 永久积分
                case 2:
                  this.creatcountsReport(this.get_discount_methods[i]);
                  break;
                default:
                  return;
              }
            }
            if(this.have_token&&this.hava_wallet&&this.$route.name == "commodityDetail" && this.get_discount_methods[i].pathType == 'p_2'){
              if(this.scoreType&&this.get_discount_methods[i].status == 1 &&this.scoreType[this.get_discount_methods[i].sourceId] !== 2){
                switch (this.get_discount_methods[i].type) {
                // 临时积分领取方式
                case 1:
                  this.getOnceScore(this.get_discount_methods[i]);
                  break;
                // 永久积分
                case 2:
                  this.creatcountsReport(this.get_discount_methods[i]);
                  break;
                default:
                  return;
                }
              }
            }
             if (this.hava_wallet && this.get_discount_methods[i].status == 1 && this.get_discount_methods[i].code === "st_1") {
                this.creatcountsReport(this.get_discount_methods[i]);
                // return;
              }
          }
    });
  },
  methods: {
    jumpTo() {
      this.show_model = !this.show_model;
    },
    // 初始化
    init(data, callback) {
      data = data ? data : "";
      getCounts({
        codes: data
      }).then(res => {
        if (res.code === "200") {
          this.get_discount_methods = res.data;
          if (callback) {
            callback();
          }
        }
      });
    },
    fun() {},
    handleClick(signed) {
      if (!this.have_token) {
        Toast("请先登录!");
        return false;
      }
      if (this.have_token && !this.hava_wallet) {
        Toast("请先注册钱包！");
        return false;
      }
      // 分享商品
      if(signed.code === "st_9"){
        eventBus.$emit("shareOn");
      }
    //  if (this.hava_wallet && signed.code === "st_1") {
    //     this.creatcountsReport(signed);
    //     return;
    //   }
      switch (signed.pointType) {
        // 固定型
        case 1:
          this.fixedType(signed);
          break;
        // 指向型积分
        case 2:
          this.actionType(signed);
          break;
        default:
          return;
      }
    },
    // 活动类型(固定)
    fixedType(data){
      // 进入钱包页面 每日限领
      if (data.code === "st_1") {
        window.android_client.goWallet();
      }
      // 邀请好友  每日限领
      if (data.code === "st_4") {
        this.copycount = data;
        this.model_copy_show = !this.model_copy_show;
        return;
      }
      switch (data.type) {
        // 临时积分领取方式
        case 1:
          this.getOnceScore(data);
          break;
        // 永久积分
        case 2:
          this.creatcountsReport(data);
          break;
        default:
          return;
      }
    },
    // 活动类型(指向)
    actionType(data){
      switch (data.type) {
        // 临时积分领取方式
        case 1:
          this.getOnceScore(data);
          break;
        // 永久积分
        case 2:
          this.creatcountsReport(data);
          break;
        default:
          return;
      }
    },
    // 积分活动行为
    scoresAction(signed){
      var _this = this;
      // pointType 指向类型还是固定类型
      switch (signed.pathType) {
        case 'p_1':
        // 去商城首页
          _this.$router.go(-1)
          break;
        // case 'p_2':
        // 去商品详情页
          // _this.scoreType[signed.pathType] = 2;
          // sessionStorage.setItem("scoreType", JSON.stringify(_this.scoreType));
          // this.init(this.countsType)
          // _this.$forceUpdate()
          return;
          break;
        case 'p_3':
        // 查看积分说明
          _this.show_model = true;
          break;
        case 'p_4':
        // 去溯源首页
          location.href = "/#/NFC?id="+_this.chainData.hashAddress
          break;
        case 'p_7':
        // 去溯源现场监控
          location.href = "/#/NFC/FieldMonitoring"
          break;
        case 'p_8':
        // 去钱包
          window.android_client.goWallet();
          _this.$forceUpdate()
          break;
        case 'p_9':
        // 去订单
          _this.$router.push({
            path:'/order/list'
          })
          break;
        case 'p_12':
        // 去商城首页
          _this.$router.go(-1);
          // _this.$router.push({
          //   path:`/commodity?token=${this.token}&wallet=${this.wallet}`
          // })
          break;
        case 'v_1':
        // 去看监控视频
          location.href = "/#/NFC/FieldMonitoring"
          break;
        case 'v_3':
        // 去临时电影
          _this.$router.push({
            path:"/videoPlay/index",
            query:{
              src:signed.url,
              id:signed.sourceId
            }
          })
          sessionStorage.setItem('current_video_id',signed.sourceId)
          break;
        case 'p_10':
        // 跳转安卓邀请好友
          window.android_client.goInviteFriend();
          _this.$forceUpdate()
          break;
        case 'p_11':
        // 去外部页面
          if(signed.url){
            let urlStr = signed.url;
            if(urlStr.indexOf("http")>=0){
              location.href = signed.url;
            }else if(urlStr.indexOf("https")>=0){
              location.href = signed.url;
            }else{
              location.href = "http://"+signed.url
            }
          }
          break;
        default:
          return;
      }
    },
    // 创建领取记录 变成待领取状态
    creatcountsReport(data) {
      var _this = this;
      if(data.pathType == "v_1"){
        this.scoresAction(data);
        sessionStorage.setItem("v_1Type",JSON.stringify(data));
      }else if(data.pathType == "v_3"){
        this.scoresAction(data);
        sessionStorage.setItem("v_3Type",JSON.stringify(data));
      }else{
        this.createResports(data)
      }
    },
    // 调接口永久积分创建记录
    createResports(data){
      var _this = this;
      countsReport({
        score: data.score,
        typeName: data.typeName,
        description: data.description,
        limitType: data.limitType,
        typeCode: data.code,
        pathType:data.pathType,
        pathTypeName:data.pathTypeName
      }).then(res => {
        if (res.code == 200) {
          _this.init(_this.countsType);
          sessionStorage.removeItem("VIDEO");
          sessionStorage.removeItem("v_1Type"); 
          sessionStorage.removeItem("OUT_VIDEO");
          sessionStorage.removeItem("v_3Type");    
        }
      });
    },
    // 临时积分
    getOnceScore(data) {
      var _this = this;
      if (this.scoreType[data.sourceId] == 2 || this.scoreType[data.pathType] == 2) {
        // 临时积分存本地
        // 临时积分累加
        this.temporaryNum = Number(this.temporaryNum) + Number(data.score);
        if (this.countsType) {
          this.countsType = this.countsType + "," + data.sourceId;
          let p_Numer_arr = Array.from((new Set(this.countsType.split(','))));
          this.countsType = p_Numer_arr.join(',');
        }else{
          this.countsType = data.sourceId;
        }
        sessionStorage.setItem("countsType", this.countsType);
        sessionStorage.setItem("temporaryNum", this.temporaryNum);
        if (this.tokenVAAC && this.vaacCut) {
            this.discount_label = (this.temporaryNum*this.vaacCut*this.tokenVAAC).toFixed(2);
            sessionStorage.setItem("temporaryNumVal", this.temporaryNum*this.vaacCut*this.tokenVAAC);
        }
        this.init(this.countsType, function() {
          if(data.sourceId){
            _this.scoreType[data.sourceId] = 1;
          }
          sessionStorage.setItem("scoreType",JSON.stringify(_this.scoreType));
          Toast("领取成功");
          sessionStorage.removeItem("VIDEO");
          sessionStorage.removeItem("OUT_VIDEO");
        });
      } else {
        var _this = this;
        if(data.pathType == 'v_1'){
          this.scoreType[data.pathType] = 2;
        }
        if(data.sourceId && data.pathType !== 'v_1'){
          this.scoreType[data.sourceId] = 2;
        }
        sessionStorage.setItem("scoreType", JSON.stringify(this.scoreType));
        if(data.pointType == 2){
          this.scoresAction(data);
        }else{
           this.init(this.countsType); 
        }
      }
    },
    // 待领取积分 可领
    getcount(data) {
      if (data.status == 2) {
        getCount({
          id: data.recordId,
          score: data.score,
          description: data.description
        }).then(res => {
          if (res.code == "200" && res.msg == "success") {
            Toast("领取成功");
            if (data.code == "st_1") {
              this.creat_wallet = false;
            }
            this.init(this.countsType);
          }
        });
      }
    },
    // vaac值多少钱
    vaccTurnMoney() {
      tokenValue().then(res => {
        if (res.code == "200" && res.msg == "success") {
          this.tokenVAAC = Number(res.data.price);
        }
      });
    },
    // token=> 通证    token手续费
    sysData() {
      sysmData().then(res => {
        if (res.code == "200" && res.msg == "success") {
          for (let i in res.data.sysparamList) {
            if (res.data.sysparamList[i].paramCode == "TOKEN_EXCHANGE_VAAC") {
              // "token兑换VAAC比例"
              this.vaacCut = Number(res.data.sysparamList[i].paramUrl);
              if(this.temporaryNum&&this.tokenVAAC){
                this.discount_label = (this.temporaryNum * this.vaacCut * this.tokenVAAC).toFixed(2);
              }
            }
          }
        }
      });
    },
    onCopy() {
      Toast("复制成功");
      this.model_copy_show = false;
      switch (this.copycount.type) {
        // 临时积分领取方式
        case 1:
          this.getOnceScore(this.copycount);
          break;
        // 永久积分
        case 2:
          this.creatcountsReport(this.copycount);
          break;
        default:
          return;
      }
    },
    onError(e) {
      console.log(e);
    }
  },
  beforeDestroy(){
	}
};
</script>
<style lang="scss">
@import "../../../../../common/styles/mixin.scss";
.discount_getmethods .mint-cell:last-child {
  background-image: none !important;
}
// 积分头部的积分说明
.discount_title .discount_title_instructions .mint-cell-wrapper {
  padding: 0.266667rem;
}
.discount_title .discount_title_instructions .mint-cell-wrapper {
  .mint-cell-text {
    @include font-dpr(13px);
    color: #333333;
  }
  .mint-cell-label {
    margin-top: 0.426667rem;
    @include font-dpr(12px);
    color: #999999;
  }
  .mint-cell-value {
    @include font-dpr(13px);
    color: #16b673;
    .mint-button--small {
      padding: 0;
    }
  }
}
// 积分获取方式
.discount {
  .discount_getmethods {
    margin-bottom: 0.613333rem;
    .discount_getmethods_list {
      .discount_getmethods_item {
        // margin: 0 0.12rem;
        border: 0.026667rem solid transparent;
        border-radius: 0.266667rem;
        margin-top: 0.293333rem;
        overflow: hidden;
        box-shadow: 0px 0.026667rem 0.133333rem 0px rgba(153, 153, 153, 0.35);
        .mint-cell-wrapper {
          padding: 0.48rem 0.266667rem;
          background-image: none !important;
          .mint-cell-title {
            .mint-cell-text {
              @include font-dpr(13px);
              color: #333333;
            }
            .mint-cell-label {
              margin-top: 0.64rem;
              @include font-dpr(12px);
              color: #999999;
            }
          }
          // 按钮
          .mint-cell-value {
            button {
              width: 2.2rem;
              height: 0.666667rem;
              border: 0.026667rem solid #16b673;
              color: #16b673;
              @include font-dpr(13px);
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.666667rem;
              margin-right: 0.053333rem;
              background-color: #ffffff;
            }
          }
        }
        // &:nth-child(1) {
        //   margin-top: 0;
        // }
      }
    }
  }
  //
  // 2018-11-14 新增区块
  .item_three {
    background-color: #ffffff;
    margin: 0.133333rem 0;
    .row_three {
      padding: 0.266667rem 0.133333rem;
      @include font-dpr(8px);
      font-family: "MicrosoftYaHei";
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.453333rem;
      letter-spacing: 0px;
      color: #000000;
      .item {
        margin-top: 0.186667rem;
        &:nth-child(1) {
          margin-top: 0;
        }
        .row {
          .cnt {
            display: inline-flex;
            align-items: center;
          }
          .col {
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.discount {
  .discount_instructions {
    padding: 0 0.32rem 0.666667rem;
    border-bottom: 0.026667rem solid #d1d1d1;
    .discount_instructions_title {
      @include font-dpr(13px);
      color: #333333;
      margin-bottom: 0.133333rem;
    }
    .discount_instructions_content {
      @include font-dpr(11px);
      letter-spacing: 0.026667rem;
      color: #333333;
    }
  }
  .model_copy {
    .model_pay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      background-color: rgba(153, 153, 153, 0.55);
      .mint-radiolist {
        position: fixed;
        width: 100%;
        // height:100%;
        overflow: hidden;
        box-sizing: border-box;
        bottom: 0;
        background-color: #ffffff;
        .pay {
          // margin-top: 0.933333rem;
          // 确定按钮

          .sure_pay {
            // margin-top: 1.146667rem;
            width: 100%;
            height: 0.933333rem;
            animation: model_height_animation 0.2s;
            background-color: #16b773;
            // border-radius: 0.133333rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: flex-end;
            bottom: 0;
            span {
              display: inline-block;
              height: 0.346667rem;
              font-family: "MicrosoftYaHei";
              @include font-dpr(13px);
              font-weight: normal;
              font-stretch: normal;
              line-height: 0.346667rem;
              letter-spacing: 0.08rem;
              color: #ffffff;
            }
          }
          .sure_cnt {
            padding: 0.3rem 0.5rem;
          }
        }
      }
    }
  }
  // 积分说明
  .scores_model {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    background-color: rgba(153, 153, 153, 0.35);
    display: flex;
    animation: model_animation 0.5s;
    .scores_model_content {
      width: 100%;
      padding: 1.2rem 0.173333rem 0.48rem;
      display: inherit;
      img {
        width: 100%;
      }
      .text {
        padding: 0 0.533333rem;
        .scores_model_body {
          margin-top:2.053333rem;
          p {
            @include font-dpr(12px);
            font-family: 'MicrosoftYaHei';
            color:#333333;
            line-height: .466667rem;
            margin-bottom: 0.626667rem;
          }
        }
      }
      .scores_model_foot {
        @include font-dpr(12px);
        font-family: 'MicrosoftYaHei';
        color:#333333;
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding-bottom: 0.8rem;
      }
    }
  }
}
/*增加动画animation*/
@keyframes model_height_animation {
  0% {
    height: 0.186667rem;
  }
  25% {
    height: 0.373333rem;
  }
  50% {
    height: 0.56rem;
  }
  75% {
    height: 0.746667rem;
  }
  100% {
    height: 0.933333rem;
  }
}
/*增加动画animation*/
@keyframes model_animation {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>