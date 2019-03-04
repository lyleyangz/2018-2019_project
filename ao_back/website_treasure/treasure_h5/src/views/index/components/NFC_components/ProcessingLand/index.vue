<template>
	<div class="ProcessingLand">
		<div class="ProcessingLand_header">
            <v-header :head="landData.locName"></v-header>
		</div>
        <!-- nav -->
		<div class="ProcessingLand_nav">
            <div class="nav_bar">
                <span :class="{ 'active':selected}" @click="tabNav('1')" v-if="idSave.artistId || idSave.driverId">加工地信息</span>
                <span :class="{ 'active':selectedTwo}" @click="tabNav('2')" v-if="idSave.artistId">制作大师</span>
                <span :class="{ 'active':selectedThree}" @click="tabNav('3')" v-if="idSave.driverId">承运人信息</span>
            </div>
            <div v-if="selected" class="Field">
                <div class="first_nfc_img" v-if="landData.locPicUrl">
                    <img :src="landData.locPicUrl" alt="">
                </div>
                <!-- 第一层基本信息 -->
                <div class="first_nfc">
                    <!-- 右上角别针 -->
                    <div class="image_top_right">
                    </div>
                    <div class="border_content">
                        <!-- 第一层加工地详情 -->
                        <div class="first_nfc_leftTitle"  v-if="landData.locInfo && landData.locInfo.length>0">
                            <span class="bg_gradual_change">加工地详情</span>
                        </div>
                        <!-- 第一层 -->
                        <div class="first_nfc_content">
                            <div class="item" v-for="(item,index) in landData.locInfo" v-if="landData.locInfo" :key="index">
                                <div class="row">
                                    <span class="lb col">{{item.attrName}}</span>
                                    <span class="cnt">{{item.attrVal}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 第二层矿场相关资质 -->
                        <div class="first_nfc_leftTitle"  v-if="landData.locAptitudeInfo&&landData.locAptitude">
                            <span class="bg_gradual_change">{{landData.locName}}相关资质</span>
                            <!-- <span class="bg_gradual_change" v-if="landData.locAptitude&&landData.locAptitude==0" @click="jumpTo('Prove',landData.locAptitudeInfo)">{{landData.locName}}相关资质</span> -->
                        </div>
                        <div class="first_nfc_content" @click="jumpTo('Prove',landData.locAptitudeInfo)" v-if="landData.locAptitudeInfo">
                            <div class="item" v-for="(item,index) in landData.locAptitude" :key="index">
                                <div class="row">
                                    <span class="cnt">{{item.aptitudeName}}</span>
                                    <span class="lb col">{{item.aptitudeProof}}</span>
                                </div>
                            </div>
                            <div  v-if="landData.locAptitude.length==0" class="item">
                              <div class="row">
                                    <span class="cnt">暂无</span>
                                </div>
                            </div>
                        </div>
                        <!-- 第3层矿场矿场相关数据监测 -->
                        <div class="first_nfc_leftTitle" v-if="landData.monitorData">
                            <span class="bg_gradual_change">矿场相关数据监测</span>
                        </div>
                        <div class="first_nfc_content" @click="jumpTo('watchProve',landData.monitorProof)" v-if="landData.monitorProof">
                            <div class="monitorData" v-if="landData.monitorData" v-html="landData.monitorData"></div>
                        </div>
                        <!-- 第4层矿场存放位置 -->
                        <div class="first_nfc_leftTitle" v-if="landData.saveLoc">
                            <span class="bg_gradual_change">物料存放位置</span>
                        </div>
                        <!-- <div class="first_nfc_content">
                            <div class="saveLocPicurl" v-if="landData.saveLocPicurl" v-html="landData.saveLocPicurl"></div>
                        </div> -->
                        <div class="first_nfc_content" @click="jumpTo('fieldposition',landData.saveLocPicurl)" v-if="landData.saveLocPicurl">
                            <div class="item">
                                <div class="row">
                                    <span class="cnt">{{landData.site}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 第5层加工地相关负责人 -->
                        <div class="first_nfc_leftTitle" v-if="landData.chargePerson || landData.otherChargePerson">
                            <span class="bg_gradual_change">加工地相关负责人</span>
                        </div>
                        <div class="first_nfc_content">
                            <div class="item" v-if="landData.chargePerson">
                                <div class="row">
                                    <span class="lb col">{{landData.chargePerson}}</span>
                                    <span class="cnt"></span>
                                </div>
                            </div>
                            <div class="item" v-if="landData.otherChargePerson">
                                <div class="row">
                                    <span class="lb col">{{landData.otherChargePerson}}</span>
                                    <span class="cnt"></span>
                                </div>
                            </div>
                        </div>
                        <!-- 第6层地图 -->
                        <div class="first_nfc_leftTitle" v-if="sign.center&&sign.center.lng">
                            <span class="bg_gradual_change">加工成品地</span>
                        </div>
                        <!-- 第6层地图 -->
                        <div class="first_nfc_content">
                            <div class="first_nfc_img">
                                <!-- <img src="../../../../common/assets/images/banner.png" alt=""> -->
                                <bdMap :sign='sign'  v-if="sign.center.lng"></bdMap>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedTwo" class="maker"> 
               <div class="marker_head">
                   <div class="marker_headportrait" v-if="masterMsg.headUrl">
                       <img :src="masterMsg.headUrl" alt="">
                   </div>
                   <!-- 制作者介绍 -->
                   <div class="marker_introduce">
                       <!-- 姓名 -->
                       <div class="name" v-if="masterMsg.mName">{{masterMsg.mName}}</div>
                       <!-- 性别和出生 -->
                       <div class="born">
                           <span v-if="masterMsg.sex">性别：{{masterMsg.sex==1 ? '男':'女'}}</span>
                           <span v-if="masterMsg.born">出生日期：{{globalFun.dateFormat(masterMsg.born,'yyyy-MM-dd')}}</span>
                       </div>
                       <!-- 作品风格 -->
                       <div class="design_style" v-if="masterMsg.style && masterMsg.style.length>0">
                           <div class="design_style_title">
                               <span class="left_line"></span>
                               <span>作品风格</span>
                               <span class="right_line"></span>
                           </div>
                           <div class="design_signed_list">
                               <span class="design_signed_item" v-for="(item,index) in masterMsg.style">{{item}}</span>
                           </div>
                       </div>
                   </div>
               </div>
               <!-- 设计师简介 -->
               <div class="maker_midd">
                   <!-- 设计师简介 -->
                    <div class="designer_introduction" v-if="masterMsg.personIntro">
                        <div class="designer_introduction_title">
                            设计师简介
                        </div>
                        <div class="designer_introduction_content">
                            {{masterMsg.personIntro}}
                        </div>
                    </div>
                    <!-- 作品集 -->
                    <div class="designer_works" v-if="masterMsg.productionUrl || masterMsg.productionIntro">
                        <div class="designer_works_title">
                            作品
                        </div>
                        <div class="designer_works_content">
                            <div class="designer_works_content_img" v-if="masterMsg.productionUrl">
                                <img :src="masterMsg.productionUrl" alt="">
                            </div>
                            <div class="designer_works_content_text" v-if="masterMsg.productionIntro">
                              {{masterMsg.productionIntro}}
                            </div>
                        </div>
                    </div>
                    <!-- 珠宝大叔独家对话 -->
                    <div class="designer_works" v-if="masterMsg.testimonialsUrl">
                        <div class="designer_works_title">
                            珠宝大师独家对话
                        </div>
                        <div class="designer_works_content">
                            <!-- <div class="video_play" @click="videoPlay('play')" v-show="video_play_show"></div>
                            <div class="video_pause" @click="videoPlay('pause')" v-show="video_pause_show"></div> -->
                            <div class="designer_works_content_audio">
                                <video controls :src="masterMsg.testimonialsUrl" id="video">您的手机插件不支持 video 视屏播放。</video>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            <div v-if="selectedThree" class="person">
                <div class="ProcessingLand_list">
                    <div class="ProcessingLand_item">
                        <div class="first_nfc">
                            <!-- 右上角别针 -->
                            <div class="image_top_right">
                            </div>
                            <div class="border_content">
                                <div class="first_nfc_leftTitle">
                                    <span class="bg_gradual_change">基本信息</span>
                                </div>
                                <!-- 第一层 -->
                                <div class="person_content" v-if="driverMsg.name">
                                    <div class="person_tou">
                                        <img :src="driverMsg.photos" alt="">
                                    </div>
                                    <div class="person_content_list">
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">姓名</span>
                                                <span class="cnt">{{driverMsg.name}}</span>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">性别</span>
                                                <span class="cnt">{{driverMsg.sex === 1 ? '女':'男'}}</span>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">出生日期</span>
                                                <span class="cnt">{{driverMsg.birthday}}</span>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">联系方式</span>
                                                <span class="cnt">{{driverMsg.phone}}</span>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">驾龄</span>
                                                <span class="cnt">{{driverMsg.drivingAge}}</span>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="row">
                                                <span class="lb col">驾驶证</span>
                                                <span class="cnt">{{driverMsg.drivingLicenseType}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 第二块陈数据 -->
                        <div class="first_nfc">
                            <!-- 右上角别针 -->
                            <div class="image_top_right">
                            </div>
                            <div class="border_content">
                                <!-- 第一层 -->
                                <div class="first_nfc_content">
                                    <div class="item">
                                        <div class="row">
                                            <span class="lb col">健康</span>
                                            <span class="cnt">{{driverMsg.health}}</span>
                                        </div>
                                    </div>
                                    <!-- <div class="item">
                                        <div class="row">
                                            <span class="lb col">违章记录</span>
                                            <span class="cnt">无</span>
                                        </div>
                                    </div> -->
                                    <div class="item">
                                        <div class="row">
                                            <span class="lb col">疾病史</span>
                                            <span class="cnt">{{driverMsg.medicalHistory}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 第二层数据 -->
                                <div class="first_nfc_leftTitle" v-if="driverMsg.content">
                                    <span class="bg_gradual_change">承运人所获成就</span>
                                </div>
                                <!-- 第er层 -->
                                <div class="first_nfc_content">
                                    <div class="driver_item" v-if="driverMsg.content">
                                        <!-- <div class="row"> -->
                                            <!-- <span class="lb col">荣获国家认证安全仓库模范</span> -->
                                            <!-- <span class="cnt">国家模范级司机</span> -->
                                        <!-- </div> -->
                                        <div v-html="driverMsg.content"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import bdmap from "@common/mapcomment/index.vue";
import header from "@common/header/index.vue";
import { getSingleMasterRef, processingLand, driver } from "@api/api_group";

export default {
  components: {
    bdMap: bdmap,
    "v-header": header
  },
  data() {
    return {
      // 地图经纬度
      sign: {
        height: "5.32rem",
        center: {
          lng: null,
          lat: null
        }
      },
      //   tab三状态
      selected: true,
      selectedTwo: false,
      selectedThree: false,
      //   加工地详情数据
      landData: {},
      //   大师data
      masterMsg: {},
      // 司机信息
      driverMsg: {},
      // 各种ID暂存
      idSave: {}
      //   视频播放按钮控制
      //   video_play_show: true,
      //   video_pause_show: false
    };
  },
  created() {
    this.idSave = JSON.parse(sessionStorage.getItem("QWE_ID"));
    this.getLandData(this.idSave.receive);
    this.tabNav("1");
  },
  mounted() {},
  activated() {
    this.idSave = JSON.parse(sessionStorage.getItem("QWE_ID"));
    this.getLandData(this.idSave.receive);
    this.tabNav("1");
  },
  methods: {
    // tabNav切换
    tabNav(singed) {
      if (singed === "1") {
        this.selected = true;
        this.selectedTwo = false;
        this.selectedThree = false;
      } else if (singed === "2") {
        // 获取大师信息
        this.getMasterMessage(this.idSave.artistId);
        this.selected = false;
        this.selectedTwo = true;
        this.selectedThree = false;
      } else {
        //   获取老司机信息
        this.getDriverMsg(this.idSave.driverId);
        this.selected = false;
        this.selectedTwo = false;
        this.selectedThree = true;
      }
    },
    // 获取加工地详情
    getLandData(landID) {
      processingLand({
        id: landID
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          // 场地位置坐标
          if (res.data.longitude && res.data.latitude) {
            let signMap = {
              lng: res.data.longitude,
              lat: res.data.latitude
            };
            this.sign.center = signMap;
          }
          // response数据格式处理
          res.data.locInfo = JSON.parse(res.data.locInfo);
          res.data.locAptitude = JSON.parse(res.data.locAptitude);
          this.landData = res.data;
        }
      });
    },
    //
    // 获取司机详情
    getDriverMsg(driverid) {
      driver({
        id: driverid
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          this.driverMsg = res.data;
        }
      });
    },
    // 作者详情接口
    getMasterMessage(masterID) {
      getSingleMasterRef({
        id: masterID
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          if (res.data.style) {
            res.data.style = res.data.style.split(",");
          }
          this.masterMsg = res.data;
        }
      });
    },
    // 视频播放
    // videoPlay(signed) {
    //   var _videoPlay = document.getElementById("video");
    //   console.log(_videoPlay);
    //   if (signed === "play") {
    //     _videoPlay.play();
    //     this.video_play_show = !this.video_play_show;
    //   } else {
    //     _videoPlay.controls = true;
    //     _videoPlay.pause();
    //     this.video_pause_show = !this.video_pause_show;
    //   }
    // },
    //   跳转
    jumpTo(router, data) {
      data = data ? data : "";
      this.$router.push({
        name: `${router}`,
        params: {
          data: data
        }
      });
    }
  }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.ProcessingLand_nav {
  .nav_bar {
    display: flex;
    width: 100%;
    background-color: #ffffff;
    padding-top: 1.173333rem;
    .active {
      @include font-dpr(15px);
      color: #23d89d;
      font-family: "MicrosoftYaHei";
    }
  }
  .nav_bar span {
    @include font-dpr(15px);
    justify-content: space-between;
    flex-shrink: 1;
    width: 50%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 1.333333rem;
    color: #999999;
    font-family: "MicrosoftYaHei";
  }
  //   公共
  // 第一层标题
  .first_nfc_title {
    @include font-dpr(18px);
    font-family: "PingFangSC-Medium";
    text-align: center;
    height: 1.173333rem;
    h1 {
      line-height: 1.173333rem;
      color: #ffffff;
    }
  }
  // banner
  .first_nfc_img {
    cursor: pointer;
    text-align: center;
    background-size: contain;
    max-width: 100%;
    // height: 5.333333rem;
    margin-bottom: 0.32rem;
    overflow: hidden;
  }
  // banner
  .first_nfc_img img {
    background-size: contain;
    max-width: 100%;
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
        .item {
          height: 1.066667rem;
          padding: 0 0.4rem;
          line-height: 1.066667rem;
          border-bottom: 0.013333rem solid #e1e1e1;
          font-family: "PingFangSC-Medium";
          @include font-dpr(14px);
          .row .lb {
            color: #777777;
          }
          .row .cnt {
            color: #333333;
          }
        }
        // 监测padding
        .monitorData {
          padding: 0 0.4rem;
        }
        // 存放位置富文本
        .saveLocPicurl {
          padding: 0 0.4rem;
        }
      }
    }
  }
  //   制作大师
  .maker {
    .marker_head {
      margin-top: 0.023333rem;
      margin-bottom: 0.16rem;
      padding: 0.4rem 0 0.746667rem;
      background-color: #ffffff;
      // 头像
      .marker_headportrait {
        width: 4.186667rem;
        height: 4.186667rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 0.8rem;
        box-shadow: 0.053333rem 0.053333rem 0.4rem rgba(0, 0, 0, 0.15);
        img {
          width: 4.186667rem;
          height: 4.186667rem;
          background-size: contain;
        }
      }
      // 制作者个人介绍
      .marker_introduce {
        text-align: center;
        .name {
          @include font-dpr(18px);
          color: #333333;
          margin-bottom: 0.373333rem;
          font-weight: bold;
        }
        .born {
          @include font-dpr(11px);
          color: #999999;
          margin-bottom: 0.426667rem;
        }
        .born :nth-child(1) {
          margin-right: 0.293333rem;
        }
        .design_style {
          height: 100%;
          width: 100%;
          .design_style_title {
            position: relative;
            height: 100%;
            width: 100%;
            margin-bottom: 0.266667rem;
            // 左边线
            .left_line {
              box-sizing: border-box;
              height: 0.013333rem;
              width: 0.8rem;
              background-color: #24dca0;
              line-height: 0.013333rem;
              border: 0.013333rem solid #24dca0;
            }
            // 右边线
            .right_line {
              box-sizing: border-box;
              height: 0.013333rem;
              width: 0.8rem;
              background-color: #24dca0;
              line-height: 0.013333rem;
              border: 0.013333rem solid #24dca0;
            }
            span {
              // position: absolute;
              vertical-align: middle;
              display: inline-block;
            }
          }
          // 线之间=》设计风格
          .design_style_title :nth-child(2) {
            @include font-dpr(11px);
            color: #24dca0;
            margin: 0 0.186667rem;
          }
          // 制作者标签
          .design_signed_list {
            height: 100%;
            width: 100%;
            .design_signed_item {
              text-align: center;
              vertical-align: middle;
              display: inline-block;
              // width: 1.733333rem;
              height: 0.586667rem;
              border-radius: 0.4rem;
              line-height: 0.586667rem;
              background: linear-gradient(0deg, #24dca0, #16b26e);
              font-size: 0.293333rem;
              color: #ffffff;
              margin-right: 0.13rem;
              padding: 0.1rem;
            }
          }
        }
      }
    }
    .maker_midd {
      background-color: #ffffff;
      //   设计师简介
      .designer_introduction {
        // 设计师简介标题
        padding: 0.426667rem 0.32rem 0.613333rem;
        .designer_introduction_title {
          @include font-dpr(13px);
          color: #333333;
          padding-bottom: 0.56rem;
          font-weight: bold;
        }
        .designer_introduction_content {
          @include font-dpr(11px);
          color: #999999;
        }
      }
      //   作品
      .designer_works {
        padding: 0 0.32rem 0.533333rem;
        .designer_works_title {
          @include font-dpr(13px);
          color: #333333;
          padding-bottom: 0.4rem;
          font-weight: bold;
        }
        .designer_works_content {
          position: relative;
          .designer_works_content_audio {
            video {
              text-align: center;
              background-size: contain;
              //   max-width: 100%;
              height: 5.333333rem;
              width: 100%;
              margin-bottom: 0.24rem;
            }
          }
          .designer_works_content_img {
            overflow: hidden;
          }
          .designer_works_content_text {
            @include font-dpr(11px);
            color: #999999;
          }
          //   播放
          //   .video_play {
          //     width: 0.666667rem;
          //     height: 0.666667rem;
          //     background: url("../../../../common/assets/images/play.png")
          //       no-repeat;
          //     background-size: contain;
          //     position: absolute;
          //     top: 0;
          //     bottom: 0;
          //     right: 0;
          //     left: 0;
          //     margin: auto;
          //     z-index: 9999;
          //   }
          //   // 暂停
          //   .video_pause {
          //     width: 0.666667rem;
          //     height: 0.666667rem;
          //     background: url("../../../../common/assets/images/suspended.png")
          //       no-repeat;
          //     background-size: contain;
          //     position: absolute;
          //     top: 0;
          //     bottom: 0;
          //     right: 0;
          //     left: 0;
          //     margin: auto;
          //     z-index: 9999;
          //   }
        }
      }
    }
  }
  //   承运人信息
  .person {
    .ProcessingLand_list {
      margin-top: 0.32rem;
      .ProcessingLand_item {
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
              .item {
                height: 1.066667rem;
                padding: 0 0.4rem;
                line-height: 1.066667rem;
                border-bottom: 0.013333rem solid #e1e1e1;
                font-family: "PingFangSC-Medium";
                @include font-dpr(14px);
                .row .lb {
                  color: #777777;
                }
                .row .cnt {
                  color: #333333;
                }
              }
              .first_nfc_img {
                img {
                  background-size: contain;
                  max-width: 100%;
                  height: 5.333333rem;
                }
              }
              //   承运人成就
              .driver_item {
                padding: 0 0.4rem;
                height: 100%；;
              }
            }
          }
          .person_content {
            display: flex;
            // 承运人头像
            .person_tou {
              padding: 0.64rem 0.533333rem 0rem 0.373333rem;
              img {
                width: 1.986667rem;
                height: 2.76rem;
                background-size: contain;
              }
            }
            .person_content_list {
              flex: 1;
              .item {
                height: 1.066667rem;
                padding: 0 0.4rem;
                line-height: 1.066667rem;
                border-bottom: 0.013333rem solid #e1e1e1;
                font-family: "PingFangSC-Medium";
                @include font-dpr(14px);
                .row .lb {
                  color: #777777;
                }
                .row .cnt {
                  color: #333333;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>