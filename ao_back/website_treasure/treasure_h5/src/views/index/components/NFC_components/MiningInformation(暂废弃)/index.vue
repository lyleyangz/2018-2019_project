<template>
	<div class="MiningInformation">
		<div class="MiningInformation_header">
            <v-header :head="landData.locName"></v-header>
		</div>
		<div class="MiningInformation_nav">
            <div class="nav_bar">
                <span :class="{ 'active':selectedOne}" @click="tabNav('one')">矿场信息</span>
                <span :class="{ 'active':selectedTwo}" @click="tabNav('two')">承运人信息</span>
            </div>
            <div v-if="selectedOne" class="Field">
                <div class="Field_swipe" v-if="landData.locPicUrl">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item>
                            <img :src="landData.locPicUrl" alt="">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="MiningInformation_list">
                    <div class="MiningInformation_item">
                        <div class="first_nfc">
                            <!-- 右上角别针 -->
                            <div class="image_top_right">
                            </div>
                            <div class="border_content">
                                <div class="first_nfc_leftTitle" v-if="landData.locInfo">
                                    <span class="bg_gradual_change">{{landData.locName}}</span>
                                </div>
                                <!-- 第一层 -->
                                <div class="first_nfc_content">
                                    <div class="item" v-for="(item,index) in landData.locInfo" v-if="landData.locInfo">
                                        <div class="row">
                                            <span class="lb col">{{item.attrName}}</span>
                                            <span class="cnt">{{item.attrVal}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 第二层数据 -->
                                <div class="first_nfc_leftTitle"  v-if="landData.locAptitudeInfo">
                                    <span class="bg_gradual_change">{{landData.locName}}相关资质</span>
                                </div>
                                <!-- 第er层 -->
                                <div class="first_nfc_content" @click="jumpTo('Prove',landData.locAptitudeInfo)" v-if="landData.locAptitudeInfo">
                                    <div class="item" v-for="(item,index) in landData.locAptitude" v-if="landData.locAptitude">
                                        <div class="row">
                                            <!-- <span class="lb col">荣获国家认证安全仓库模范</span> -->
                                            <span class="cnt">{{item.aptitudeName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 第三层数据 -->
                                <div class="first_nfc_leftTitle" v-if="landData.monitorProof">
                                    <span class="bg_gradual_change">矿场相关数据监测</span>
                                </div>
                                <!-- 第三层 -->
                                <div class="first_nfc_content" style="padding:0 0.4rem" @click="jumpTo('watchProve',landData.monitorProof)" v-if="landData.monitorProof">
                                    <!-- <div class="item"> -->
                                        <div v-html="landData.monitorData"></div>
                                        <!-- <div class="row"> -->
                                            <!-- <span class="lb col">荣获国家认证安全仓库模范</span> -->
                                            <!-- <span class="cnt">矿场相关数据监测</span> -->
                                        <!-- </div> -->
                                    <!-- </div> -->
                                </div>
                                <!-- 第四层数据 -->
                                <div class="first_nfc_leftTitle" v-if="landData.saveLoc">
                                    <span class="bg_gradual_change">存放位置</span>
                                </div>
                                <!-- 第四层 -->
                                <div class="first_nfc_content" v-if="landData.saveLoc">
                                    <div class="item">
                                        <div class="row">
                                            <!-- <span class="lb col">荣获国家认证安全仓库模范</span> -->
                                            <span class="cnt">{{landData.saveLoc}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 第五层数据 -->
                                <div class="first_nfc_leftTitle"  v-if="landData.chargePerson">
                                    <span class="bg_gradual_change">加工地相关负责人</span>
                                </div>
                                <!-- 第五层 -->
                                <div class="first_nfc_content" v-if="landData.chargePerson">
                                    <div class="item" >
                                        <div class="row">
                                            <!-- <span class="lb col">荣获国家认证安全仓库模范</span> -->
                                            <span class="cnt">{{landData.chargePerson}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 第六层数据 -->
                                <div class="first_nfc_leftTitle">
                                    <span class="bg_gradual_change">加工地理位置</span>
                                </div>
                                <!-- 第六层 -->
                                <div class="first_nfc_content">
                                    <div class="first_nfc_img">
                                        <!-- <img src="../../../../common/assets/images/banner.png" alt=""> -->
                                        <bdMap :sign='sign' v-if="sign.center.lng"></bdMap>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedTwo" class="person"> 
               <div class="MiningInformation_list">
                    <div class="MiningInformation_item">
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
                                <div class="first_nfc_leftTitle">
                                    <span class="bg_gradual_change">承运人所获成就</span>
                                </div>
                                <!-- 第er层 -->
                                <div class="first_nfc_content">
                                    <div class="driver_item">
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
      //   tabNav
      selectedOne: true,
      selectedTwo: false,
      //   矿场详情
      landData: {},
      // 司机信息
      driverMsg: {},
      // 各种ID暂存
      idSave: {}
    };
  },
  created() {},
  mounted() {
    if (this.$route.params && this.$route.params.data) {
      this.idSave = this.$route.params.data;
      this.getLandData(this.$route.params.data.send);
      //   附上地理位置
      this.sign.center = this.$route.params.data.sign;
    }
  },
  methods: {
    // 获取加工地详情
    getLandData(landID) {
      processingLand({
        id: landID
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          // response数据格式处理
          res.data.locInfo = JSON.parse(res.data.locInfo);
          res.data.locAptitude = JSON.parse(res.data.locAptitude);
          this.landData = res.data;
        }
      });
    },
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
    // tabNav切换
    tabNav(signed) {
      if (signed === "one") {
        this.selectedOne = true;
        this.selectedTwo = false;
      } else {
        this.getDriverMsg(this.idSave.driverId);
        this.selectedOne = false;
        this.selectedTwo = true;
      }
    },
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
.MiningInformation {
  .MiningInformation_nav {
    padding-top: 1.173333rem;
    // tab nav
    .nav_bar {
      display: flex;
      height: 1.333333rem;
      width: 100%;
      background-color: #ffffff;
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

    //   内容
    // .Field {
    .Field_swipe {
      height: 3.333333rem;
      img {
        height: 3.333333rem;
        width: 100%;
        background-size: contain;
      }
    }
    .MiningInformation_list {
      margin-top: 0.32rem;
      .MiningInformation_item {
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
                cursor: pointer;
                text-align: center;
                background-size: contain;
                max-width: 100%;
                height: 5.333333rem;
                margin-bottom: 0.32rem;
                overflow: hidden;
                img {
                  background-size: contain;
                  max-width: 100%;
                  height: 5.333333rem;
                }
              }
              //   承运人信息
              .driver_item {
                padding: 0 0.4rem;
                height: 100%;
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
  //   }
}
</style>