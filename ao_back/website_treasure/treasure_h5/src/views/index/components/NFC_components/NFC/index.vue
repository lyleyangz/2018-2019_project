<template>
    <div class="nfc_all" v-if="NFCdata">
        <!-- 商品名称 -->
        <div class="first_nfc_title header-bg">
            <h1>{{NFCdata.name}}</h1>
        </div>
        <!-- 商品图片 -->
        <div class="first_nfc_img">
            <div class="commodity_pics" v-if="NFCdata.goodsImgUrl&&NFCdata.goodsImgUrl.length>0">
                <mt-swipe :auto="3000">
                    <mt-swipe-item  v-for="(item,index) in NFCdata.goodsImgUrl" :key="index">
                        <img :src="item" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- 区块链信息 -->
        <div class="first_nfc">
            <!-- 右上角别针 -->
            <div class="image_top_right"></div>
            <div class="border_content">
                <div class="first_nfc_leftTitle">
                        <span class="bg_gradual_change">区块链信息</span>
                    </div>
                <div class="first_nfc_content">
                    <div class="item">
                        <div class="row_one">
                            <span class="lb col" style="display:block">区块ID</span>
                            <span class="cnt">{{NFCdata.publicKey}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="row_one">
                            <span class="lb col" style="display:block">区块生成时间</span>
                            <span class="cnt">{{NFCdata.createTime}}</span>
                        </div>
                    </div>
                    <div class="item" v-if="NFCdata.traceno&&NFCdata.traceno != NFCdata.publicKey">
                        <div class="row_one">
                            <span class="lb col" style="display:block">溯源标识码</span>
                            <span class="cnt">{{NFCdata.traceno}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="row_one">
                            <span class="lb col" style="display:block">区块高度</span>
                            <span class="cnt" v-if="NFCdata.ledgerIndex">{{ Number(NFCdata.ledgerIndex).toFixed(0)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第一层基本信息 -->
        <div class="first_nfc" v-if="NFCdata.basics && NFCdata.basics.length>0">
            <!-- 右上角别针 -->
            <div class="image_top_right"></div>
                <div class="border_content" @click="jumpTo('CustomsReport',{'prove':NFCdata.prove,'chainInfoTrace':NFCdata.chainInfoTrace})">
                    <div class="first_nfc_leftTitle">
                        <span class="bg_gradual_change">基本信息</span>
                    </div>
                    <!-- 第一层商品区块 -->
                    <div class="first_nfc_content">
                        <!-- 循环Item -->
                        <div class="item" v-for="(item,index) in NFCdata.basics" :key="index">
                            <div class="row">
                                <span class="lb col">{{item.name}}</span>
                                <span class="cnt">{{item.value}}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <!-- 第二层国家检测 -->
        <div class="first_nfc">
            <!-- 右上角别针 -->
            <div class="image_top_right">
            </div>
            <div class="border_content">
                <div class="first_nfc_leftTitle" v-if="NFCdata.feeler">
                    <span class="bg_gradual_change">{{NFCdata.feeler}}</span>
                </div>
                <!-- 第二层国家检测 -->
                    <div class="first_nfc_content" @click="jumpTo('TestProof',{'id':NFCdata.id,'chainProvesTrace':NFCdata.chainProvesTrace})" v-if="NFCdata.id">
                    <!-- 循环Item -->
                        <div class="item" v-for="(item,index) in NFCdata.proves">
                            <div class="row">
                                <span class="lb col">{{item.name}}</span>
                                <span class="cnt">{{item.value}}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <!-- 第三层加工地图 -->
        <div class="first_nfc" v-if="sign.center&&sign.center.lng">
            <!-- 右上角别针 -->
            <div class="image_top_right"></div>
            <div class="border_content">
                <div class="first_nfc_leftTitle">
                    <span class="bg_gradual_change">加工成品地 {{NFCdata.addressName}}</span>
                </div>
                <!-- 第三层加工地图 -->
                <div class="first_nfc_content">
                        <div class="model" @click="jumpTo('FinishedProduct',{'bannerUrl':NFCdata.bannerUrl,'position':sign.center})" v-if="NFCdata.bannerUrl && sign.center"></div>
                    <div class="first_nfc_map">
                        <!-- <img src="../../../../common/assets/images/banner.png" alt=""> -->
                            <bdMap :sign='sign' v-if="sign.center.lng"></bdMap>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第5层货源 -->
        <div class="first_nfc">
            <!-- 右上角别针 -->
            <div class="image_top_right"></div>
            <div class="border_content" v-if="NFCdata.trajectorys&&NFCdata.trajectorys.length>0">
                <div class="first_nfc_leftTitle">
                    <span class="bg_gradual_change">货源记录</span>
                </div>
                <!-- 第5层货源 -->
                    <div class="first_nfc_content" @click="jumpTo('SourceRecord',{'data':NFCdata.trajectorys,'position':sign.center})">
                        <div class="Fourth_content">
                            <div class="Fourth_content_one">
                                <img src="../../../../../common/assets/images/icon_1.png" alt="">
                                <span v-if="NFCdata.trajectorys[0]">{{NFCdata.trajectorys[0].receiveName}}</span>
                            </div>
                            <div class="Fourth_content_two">
                                <!-- 分割线  绿线 -->
                                <div class="one_segmenting_line"></div>
                                <img src="../../../../../common/assets/images/the_circle.png" alt="">
                                <span>{{NFCdata.batchName}}</span>
                                <!-- 分割线  绿线 -->
                                <div class="two_segmenting_line"></div>
                            </div>
                            <div class="Fourth_content_three">
                                <img src="../../../../../common/assets/images/icon_2.png" alt="">
                                <span v-if="NFCdata.trajectorys[0]">{{NFCdata.trajectorys[NFCdata.trajectorys.length-1].receiveName}}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <!-- 第6层现场监控 -->
        <div class="first_nfc" v-if="audioData.length&&audioData.length>0">
            <!-- 右上角别针 -->
            <div class="image_top_right"></div>
            <div class="border_content">
                <div class="first_nfc_leftTitle">
                    <span class="bg_gradual_change">现场监控</span>
                </div>
                <!-- 第6层现场监控视频 -->
                <div class="first_nfc_content" v-if="audioData.length&&audioData.length>0">
                    <div class="first_nfc_audio" @click="jumpTo('FieldMonitoring')">
                        <video :src="audioData[0].monitorUrl" v-if="audioData[0]"></video>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第7层商品批次 -->
        <div class="first_nfc">
            <div class="border_content">
                <div class="first_nfc_content">
                    <div class="item">
                        <div class="row">
                            <span class="lb col">商品批次</span>
                            <span class="cnt">{{NFCdata.batchName}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="row">
                            <span class="lb col">商品总量</span>
                            <span class="cnt">{{NFCdata.number}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="row">
                            <span class="lb col">商品剩余</span>
                            <span class="cnt">{{NFCdata.countInventory}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第8层责任人签名 -->
        <div class="first_nfc" v-if="NFCdata.leaderImgurl">
            <div class="border_content">
                <div class="person_signed">
                    <span>责任人签名</span>
                </div>
                <div style="min-height:100%;text-align:center" class="person_putimg">
                    <img :src="NFCdata.leaderImgurl" alt="">
                </div>
            </div>
        </div>
        <!-- 第9层加载更多 -->
        <div class="first_nfc">
            <div class="border_content">
                <div class="first_nfc_leftTitle">
                    <span class="bg_gradual_change">NFC产品溯源记录</span>
                </div>
                <div class="load_more">
                    <div class="item item_title">
                        <div class="row">
                            <span class="lb col">溯源记录</span>
                            <span class="line"></span>
                            <span class="cnt">溯源时间</span>
                        </div>
                    </div>
                    <!-- <div class="load_more_content"> -->
                        <loadMore :id='NFCdata.id' v-if="NFCdata.id"></loadMore>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import phoneNumCheckReg from "@common/settings/phoneNumCheck";
import md5 from "@common/assets/js/md5";
import {
  getChainInfo,
  listNfcHistory,
  getFactoryLocations,
  fieldMonitoring
} from "@api/api_group";
import { Toast } from "mint-ui";
import bdmap from "@common/mapcomment/index.vue";
import loadmore from "@common/loadmore/index.vue";
import { setTimeout } from "timers";
export default {
  components: {
    bdMap: bdmap,
    loadMore: loadmore
  },
  data() {
    return {
      // NFC首页数据
      NFCdata: {
        trajectorys: []
      },
      // 地图经纬度
      sign: {
        height: "5.32rem",
        center: {
          lng: null,
          lat: null
        }
      },
      //   监控视频数据
      audioData: []
    };
  },
  activated(){
    // NFC首页总数据
    this.getChainInfo();
    // 获取监控视频
    this.get();
  },
  mounted() {
    // NFC首页总数据
    // this.getChainInfo();
    // 获取监控视频
    // this.get();
  },
  methods: {
    //   跳转
    jumpTo(router, data) {
      data = data ? data : "";
      this.$router.push({
        name: `${router}`,
        params: {
          data: data
        }
      });
    },
    getChainInfo(){
         getChainInfo({
            address: this.$route.query.id
            // address:'284ab21a746d5a6af37ae35df50fd7b8'
            }).then(res => {
            if (res.code == "200" && res.msg == "success") {
                res.data.basics = (res.data.basics).concat(res.data.goodsPro)
                console.log(res.data)
                //   轮播商品图片
                if (res.data && res.data.goodsImgUrl) {
                res.data.goodsImgUrl = res.data.goodsImgUrl.split(",");
                }
                // 日期处理.0
                if(res.data&&res.data.createTime){
                    res.data.createTime = (res.data.createTime).split(".")[0]
                }
                this.NFCdata = res.data;
                // 讲轨迹ID数据放入res.data.trajectorys中
                // this.NFCdata.trajectorys =  res.data.trajectorys;
                var arr = res.data.trajectorys;
                if (res.data.trajectorys && res.data.trajectorys.length > 0) {
                for (let i in res.data.trajectorys) {
                    arr[i].traceId = res.data.traceId;
                    arr[i].traceName = res.data.traceName;
                    arr[i].ptBatch = res.data.ptBatch;
                }
                }
                this.$set(this.NFCdata, "trajectorys", arr);
                // 坐标
                if (
                res.data.lon !== "0" &&
                res.data.lon != null &&
                res.data.lon != ""
                ) {
                this.sign.center.lng = res.data.lon;
                this.sign.center.lat = res.data.lat;
                }
            }
            });
    },
    // 获取监控视频
    get() {
      fieldMonitoring().then(res => {
        if (res.code === "200" && res.msg === "success") {
          this.audioData = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.nfc_all {
  // 第一层标题
  .first_nfc_title {
    @include font-dpr(18px);
    font-family: "PingFangSC-Medium";
    text-align: center;
    height: 1.1735rem;
    position: fixed;
    width: 100%;
    z-index: 9999;
    top: 0px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    h1 {
      line-height: 1.1735rem;
      color: #ffffff;
    }
  }
  // banner
  .first_nfc_img {
    text-align: center;
    padding-top: 1.1735rem;
    background-size: contain;
    max-width: 100%;
    margin-bottom: 0.32rem;
    overflow: hidden;
    z-index: 1;
    .commodity_pics {
      height: 5.333333rem;
    }
  }
  //   地图莫太沉
  .model {
    cursor: pointer;
    position: absolute;
    width: 100%;
    max-width: 100%;
    height: 5.333333rem;
    z-index: 999999;
    // background-color: red;
    opacity: 0.7;
    // display: none;
  }
  // banner
  .first_nfc_img img {
    background-size: contain;
    width: 100%;
    height: 5.333333rem;
  }
  .first_nfc {
    padding: 0 0.32rem;
    margin-bottom: 0.32rem;
    position: relative;
    .border_content {
      box-shadow: 0.053333rem 0.053333rem 0.4rem rgba(22, 45, 35, 0.4);
      border-radius: 0.08rem;
      background-color: #ffffff;
      .first_nfc_leftTitle {
        height: 1.066667rem;
        line-height: 1.066667rem;
      }
      .first_nfc_leftTitle span {
        width: 1.92rem;
        height: 0.64rem;
        padding: 0.133333rem 0.266667rem;
        @include font-dpr(13px);
        font-family: "PingFangSC-Bold";
        color: #ffffff;
        border-top-right-radius: 0.666667rem;
        border-bottom-right-radius: 0.666667rem;
      }
      .first_nfc_content {
        position: relative;
        .item {
          padding: 0.4rem;
          align-items: center;
          //   height: 1.066667rem;
          //   padding: 0 0.4rem;
          //   line-height: 1.066667rem;
          border-bottom: 0.013333rem solid #e1e1e1;
          font-family: "PingFangSC-Medium";
          @include font-dpr(14px);
          .row {
            align-items: center;
          }
          .row .lb {
            color: #777777;
          }
          .row .cnt {
            color: #333333;
            max-width: 70%;
            word-break: break-word;
          }
          //   第一层椰树处理
          .row_one {
            .col {
              display: block;
              padding-bottom: 0.133333rem;
            }
            .cnt {
              word-break: break-word;
              max-width: 100%;
              display: block;
            }
          }
        }
        // 第四层货源
        .Fourth_content {
          display: flex;
          justify-content: space-around;
          margin-top: 0.8rem;
          padding-bottom: 0.826667rem;
          // height:2rem;
          position: relative;
          text-align: center;
          .Fourth_content_one {
            position: relative;
            width: 33.3%;
            vertical-align: middle;
            span {
              display: block;
              margin-top: 0.373333rem;
            }
          }
          .Fourth_content_two {
            position: relative;
            width: 33.3%;
            vertical-align: middle;
            span {
              display: block;
              margin-top: 0.373333rem;
            }
            .one_segmenting_line {
              position: absolute;
              border: 0.026667rem solid #8adeb0;
              line-height: 0.026667rem;
              width: 50%;
              left: -25%;
              top: 30%;
              vertical-align: middle;
              background-color: #8adeb0;
            }
            .two_segmenting_line {
              position: absolute;
              border: 0.026667rem solid #8adeb0;
              line-height: 0.026667rem;
              width: 50%;
              top: 30%;
              right: -25%;
              vertical-align: middle;
              background-color: #8adeb0;
            }
          }
          .Fourth_content_three {
            width: 33.3%;
            position: relative;
            vertical-align: middle;
            span {
              display: block;
              margin-top: 0.373333rem;
            }
          }
        }
        // 第五层现场监控
        .first_nfc_audio {
          video {
            width: 9.36rem;
            height: 3.6rem;
          }
        }
      }
      //   第六层签名
      .person_signed {
        box-sizing: border-box;
        span {
          display: block;
          padding: 0.346667rem 0 0.8rem 0.4rem;
          color: #777777;
          @include font-dpr(14px);
          font-family: "PingFangSC-Medium";
        }
      }
      .person_putimg {
        overflow: hidden;
        img {
          max-width: 100%;
        }
      }
      //   loadmore
      .load_more {
        .item_title {
          height: 0.866667rem;
          line-height: 0.866667rem;
          color: #ffffff;
          font-family: "PingFangSC-Medium";
          font-size: 0.346667rem;
          text-align: center;
          .cnt {
            width: 50%;
            background-color: #1abd7c;
          }
          .col {
            width: 50%;
            background-color: #1abd7c;
          }
          // 分割线
          .line {
            display: inline-block;
            height: 0.866667rem;
            width: 0.013333rem;
            background-color: #ffffff;
          }
        }
      }
    }
  }
}
.header-bg{
    background: url('../../../../../common/assets/images/header-bg.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
}
</style>