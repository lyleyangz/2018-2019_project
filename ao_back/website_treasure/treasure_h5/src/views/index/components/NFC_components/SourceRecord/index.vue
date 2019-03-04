<template>
	<div class="source_record">
		<div class="source_record_header">
      <v-header head="货源记录"></v-header>
		</div>
		<div class="source_record_nav">
            <div class="nav_bar">
                <span :class="{ 'active':selectedOne}" @click="tabNav('one')">货源轨迹</span>
                <span :class="{ 'active':selectedTwo}" @click="tabNav('two')">加工轨迹</span>
            </div>
            <div v-if="selectedOne" class="source">
               <div class="source_list">
                   <!-- 1 -->
                   <div class="source_item item" v-for="(item,index) in sourceData">
                       <!-- 分割线 -->
                        <div class="row" @click="jumpTo('ProcessingLand',item)" v-if="item.receive">
                            <div class="lb col">
                                <div class="title">{{item.receiveName}}</div>
                                <div class="lb" v-if="item.mineralStatus&&item.mineralStatus != -1">{{status[item.mineralStatus]}}</div>
                            </div>
                            <!-- <div class="de_line"> </div> -->
                            <div class="cnt col">
                                <div class="title" v-if="item.driverName">承运人 {{item.driverName}}</div>
                                <div class="title" v-if="item.artistName">制作人 {{item.artistName}}</div>
                            </div>
                            <!-- 链接标识（判断） -->
                            <!-- <div class="three_dian">
                              <span class="mintui mintui-more" icon="more"></span>
                            </div> -->
                        </div>
                   </div>
               </div>
            </div>
            <div v-if="selectedTwo" class="machining"> 
                <!-- 现成拍照 -->
                <div class="carmer_current f-cb">
                    <span>现场拍照</span>
                </div>
                <div class="f-cb"></div>
                <div class="machining_outside">
                  <div class="machining_list" v-for="(item,index) in traceData" v-if="traceData.length>0">
                    <div class="machining_item">
                        <!-- flex左边时间线 -->
                          <div class="timer_line_left">
                              <span class="circle"></span>
                              <span class="line" v-if="index < traceData.length-1"></span>
                          </div>
                          <!-- flex右边图片+title -->
                          <div class="timer_line_right">
                              <div class="timer_line_right_title">{{item.traProName}}</div>
                              <div style="height:100%;width:100%" v-if="item.traUrl&&isArray">
                                <div class="timer_line_right_img" v-for="(traUrlitem,index) in item.traUrl">
                                    <img :src="traUrlitem" alt="">
                                </div>
                              </div>
                              <div class="timer_line_right_text">
                                {{item.traInfo}}
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
import header from "@common/header/index.vue";
import { processingLand, getTracInfo } from "@api/api_group";

export default {
  components: {
    "v-header": header
  },
  data() {
    return {
      // tabNav切换
      selectedOne: true,
      selectedTwo: false,
      sourceData: {},
      // NFC坐标
      // signPo:{},
      // 加工轨迹数据
      traceData: [],
      // 判断数组
      isArray: false,
      // 宝石中文状态
      status: {
        1: "原矿",
        2: "初加工",
        3: "进一步打磨",
        4: "精细加工",
        5: "产品成型"
      }
    };
  },
  created() {},
  mounted() {
    if (this.$route.params && this.$route.params.data) {
      // this.sourceData数据格式大概
      // artistId: 制作大师ID
      // artistName: 制作大师名称
      // driverId: 承运人ID
      // driverName: 承运人
      // location: 开采地
      // receive: 加工地ID
      // receiveName: "加工地"
      // send: 目的地ID
      // sendName:  目的地
      // sign: {lng:,lat:}坐标
      // traceId: 轨迹ID
      // traceName: 轨迹名称
      // 放置数据ID
      this.sourceData = this.$route.params.data.data;
      // 放置坐标
      if (
        this.$route.params.data.data &&
        this.$route.params.data.data.length > 0
      ) {
        for (let i in this.$route.params.data.data) {
          this.sourceData[i]["sign"] = this.$route.params.data.position;
        }
      }
      // this.signPo = this.$route.params.position;
    }
  },
  methods: {
    // tabNav切换
    tabNav(signed) {
      if (signed === "one") {
        this.selectedOne = true;
        this.selectedTwo = false;
      } else {
        if (this.$route.params && this.sourceData[0].traceId) {
          this.getMachiningRecord(this.sourceData[0].traceId);
        }
        this.selectedOne = false;
        this.selectedTwo = true;
      }
    },
    //获取加工轨迹
    getMachiningRecord(RecordID) {
      getTracInfo({
        id: RecordID
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          let jsonData = JSON.parse(res.data.traAll);
          for (let i in jsonData) {
            if (jsonData[i].traUrl) {
              jsonData[i].traUrl = jsonData[i].traUrl.split(",");
              this.isArray = true;
            }
          }
          this.traceData = jsonData;
        }
      });
    },
    //   跳转
    jumpTo(router, data) {
      data = data ? data : "";
      sessionStorage.setItem("QWE_ID", JSON.stringify(data));
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
.source_record {
  .source_record_header {
    @include font-dpr(18px);
  }
  .source_record_nav {
    .nav_bar {
      display: flex;
      height: 1.333333rem;
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
    .source {
      padding: 0.4rem 0.4rem;
      .source_list {
        padding: 0 0.4rem;
        background-color: #ffffff;
        .source_item {
          position: relative;

          border-top: 0.013333rem solid #e1e1e1;
          &:nth-child(1) {
            border-top: 0;
          }
          .row {
            padding: 0.4rem 0;
            align-items: center;
            .col {
              // display: flex;
              flex-direction: column;
              .title {
                @include font-dpr(15px);
                color: #23d89d;
                font-family: "PingFangSC-Bold";
                font-weight: bold;
              }
              .lb {
                @include font-dpr(16px);
                color: #999999;
                font-family: "PingFangSC-Medium";
              }
            }
            .col span {
              display: inline-block;
              height: 0.8rem;
              line-height: 0.8rem;
            }
            .cnt {
              // display: flex;
              text-align: right;
              flex-direction: column;
              justify-content: flex-end;
              border-left: 1px solid #eee;
              padding-left: 0.4rem;
              // margin-right: 0.266667rem;
              .title {
                @include font-dpr(14px);
                color: #333333;
                font-family: "PingFangSC-Medium";
                margin-top: 0.1rem;
              }
              .lb {
                @include font-dpr(12px);
                color: #999999;
                font-family: "PingFangSC-Medium";
              }
            }
            .cnt span {
              text-align: right;
              display: inline-block;
              height: 0.8rem;
              line-height: 0.8rem;
            }
            // 链接标识（三个点）
            // .three_dian {
            //   span {
            //     line-height: 1.6rem;
            //     vertical-align: middle;
            //   }
            // }
          }
          //   分割线
          .de_line {
            border: 0.013333rem solid #ededed;
            height: 0.8rem;
            width: 0;
            position: absolute;
            left: 50%;
            top: 0.4rem;
          }
        }
      }
    }
    .machining {
      position: relative;
      // 现场拍照
      .carmer_current {
        width: 2rem;
        height: 0.853333rem;
        margin-top: 0.373333rem;
        text-align: center;
        margin-right: 0.88rem;
        background: url("../../../../../common/assets/images/graphics.png")
          no-repeat;
        background-size: contain;
        float: right;
        span {
          @include font-dpr(8px);
          width: 2rem;
          display: inline-block;
          height: 0.666667rem;
          line-height: 0.666667rem;
          font-family: "MicrosoftYaHei";
          color: #ffffff;
        }
      }
      .machining_outside {
        .machining_list {
          height: 100%;
          .machining_item {
            display: flex;
            // 左边时间县
            .timer_line_left {
              position: relative;
              // width: .293333rem;
              margin: 0 0.293333rem 0 0.866667rem;
              text-align: center;
              .circle {
                width: 0.293333rem;
                height: 0.293333rem;
                border-radius: 50%;
                border: 0.026667rem solid #24db9f;
                float: left;
                z-index: 9999999;
                background-color: #f3f4f6;
                position: relative;
              }
              .line {
                position: absolute;
                // border:.026667rem solid #999999;
                height: 100%;
                width: 0.026667rem;
                // top: 13px;
                left: 50%;
                background-color: #999999;
              }
              span {
                display: inline-block;
              }
            }
            // 右边内容
            .timer_line_right {
              flex: 1;
              margin-right: 0.88rem;
              display: flex;
              flex-direction: column;
              height: 100%;
              width: 100%;
              padding-bottom: 0.373333rem;
              .timer_line_right_title {
                @include font-dpr(13px);
                font-family: "MicrosoftYaHei";
                color: #333333;
                margin-bottom: 0.44rem;
              }
              .timer_line_right_img {
                img {
                  // background-size: cover;
                  max-width: 7.546667rem;
                  height: 3.466667rem;
                  margin-bottom: 0.186667rem;
                }
              }
              .timer_line_right_text {
                @include font-dpr(7px);
                padding-top: 0.24rem;
                font-family: "MicrosoftYaHei";
                color: #999999;
              }
            }
          }
        }
      }
    }
  }
}
</style>