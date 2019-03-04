<template>
	<div class="out-list">
        <div class="list-top" v-show="listTopShow">
          <div class="putBorder">
            <div class="put-border-inside">
                <div class="flex_all">
                  <div class="flex_top">
                      <div class="flex_top_left">
                          <div class="timer">
                              <span class="timer_img"></span>
                              <div class="timer_text">运行时间</div>
                              <div class="time" v-model="countUpOne">{{countUpOne}}H</div>
                          </div>
                      </div>
                      <div class="flex_top_right">
                          <div class="quantity">
                              <span class="quantity_img"></span>
                              <div class="quantity_text">有效账户数</div>
                              <div class="quantity_number" v-model="countUpTwo">{{countUpTwo}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="flex_bottom">
                      <div class="altitude">
                        <span class="altitude_img"></span>
                        <div class="altitude_text">区块高度</div>
                        <div class="altitude_number">
                            <span class="animation_outside" v-for="(value,index) in String(countUpThree)">
                              <span class="animation" :class="{scale: animationOpt.blockHeightDebounce}">
                                {{value}}
                              </span>
                            </span>
                        </div>
                      </div>
                  </div>
                </div>
                                          <!-- 区块ID -->
              <div class="list-top-div">
                <div class="chain_id">
                  <div class="left">区块ID：</div>
                  <div class="right">
                    <div class="right_text">{{blockId}}</div>
                  </div>
                </div>
              </div>         
            </div>
          </div>
        </div>
        <div class="list-mid itemsActive" v-show="listTopShow">
          <div class="putBorder">
            <div class="list-mid-title">Blocks</div>
            <div class="list-mid-items ">
                <div class="item" v-for="(value,index) in listMidItems" v-if="index <= 4">
                    <div class="item-left">
                        <div class="item-left-text">
                            <div>Blocks</div>
                            <div>{{value.blockId}}</div>
                        </div>
                    </div>
                    <div class="item-right">{{value.account}}</div>
                </div>                              
            </div>
          </div>
        </div>
        <div class="list-bottom itemsActive" v-show="listBottomShow">
          <div class="putBorder">
            <div class="list-bottom-title">Transactions</div>
            <div class="list-bottom-items">
                <div class="item" v-for="(value,index) in listBottomItems" v-if="index <= 4">
                    <div class="item-title">
                        <div class="item-title_left">TXID：</div>
                        <div class="item-title_right">{{value.hashId}}</div>
                    </div>
                    <div class="item-foot">
                        <div class="item-left">
                            <div class="item-left-top">
                                <div class="over1line">{{value.fromName}}</div>
                                <div>{{value.amount}}</div>
                            </div>
                            <div class="item-left-bottom">{{value.fromAddress}}</span>
                            </div>
                        </div>
                        <div class="item-mid-right" v-show="value.type == '1'">
                            <!-- 一张图 -->
                        </div>
                        <div class="item-mid-left" v-show="value.type == '2'">
                            <!-- 一张图 -->
                        </div>
                        <div class="item-right">
                            <div class="over1line">{{value.peerName}}</div>
                            <div>{{value.peerAddress}}</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
	</div>
</template>

<script>
import { getBlockMsg, getCirculationMsg } from "@api/api_group";
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      countUpOne: 0,
      countUpTwo: 0,
      countUpThree: 0,
      listTopShow: false,
      listBottomShow: false,
      blockId: "",
      listMidItems: Array,
      listBottomItems: Array,
      timer: null,
      runningTime: "",
      animationOpt: {
        blockHeightDebounce: false
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getBlockData();
    this.getCirculationData();
    this.timer = setInterval(() => {
      this.getBlockData(this.timer);
      this.getCirculationData(this.timer);
    }, 5000);
    // window.addEventListener('scroll', this.menu)
  },
  methods: {
    // 处理日期（小时制）
    handleDate(startDate, endDate) {
      let dateObj = {
        JAN: "01",
        FEB: "02",
        MAR: "03",
        APR: "04",
        MAY: "05",
        JUN: "06",
        JUL: "07",
        AUG: "08",
        SEP: "09",
        OCT: "10",
        NOV: "11",
        DEC: "12"
      };
      // 以空格截取
      let dateHour = endDate.split(" ");
      // dateHour[0]是日期；dateHour[1]是时间
      let fDate = dateHour[0].split("-");
      if (endDate.toUpperCase().includes(fDate[1].toUpperCase())) {
        endDate = endDate.replace(fDate[1], dateObj[fDate[1].toUpperCase()]);
      }
      dateHour = endDate.split(" ");
      // 获取时间的小时
      let timeHour = dateHour[1].split(":")[0];
      this.DateDiff(startDate, endDate);
    },
    DateDiff(d1, d2) {
      //fireFox兼容new Date
      this.runningTime = parseInt(
        (Date.parse(this.getDateForStringDate(d2)) -
          Date.parse(this.getDateForStringDate(d1))) /
          1000 /
          60 /
          60
      );
    },
    //fireFox兼容new Date
    getDateForStringDate(strDate) {
      //切割年月日与时分秒称为数组
      var s = strDate.split(" ");
      var s1 = s[0].split("-");
      var s2 = s[1].split(":");
      if (s2.length == 2) {
        s2.push("00");
      }
      return new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2]);
    },
    // 获取首页信息
    getBlockData(timer) {
      if (!timer) {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
      }
      getBlockMsg({}).then(res => {
        this.listTopShow = true;
        Indicator.close();
        if (res && res.success) {
          // 时间戳处理（小时制显示）
          this.handleDate(res.data.startTime, res.data.closeTime);
          // 暂存上一次的count数据
          let countUpOne = parseInt(this.runningTime);
          let countUpTwo = parseInt(res.data.size);
          let countUpThree = parseInt(res.data.ledgerIndex);
          // 数据递增效果传参
          let sendCountVar = {
            countUpOne: {
              last: this.countUpOne,
              current: countUpOne
            },
            countUpTwo: {
              last: this.countUpTwo,
              current: countUpTwo
            },
            countUpThree: {
              last: this.countUpThree,
              current: countUpThree
            }
          };
          this.countUpFunc(sendCountVar);
          //
          this.blockId = res.data.hash;
          this.listMidItems = res.data.list;
          this.animationOpt.blockHeightDebounce = true;
          setTimeout(() => {
            this.animationOpt.blockHeightDebounce = false;
          }, 300);
        } else {
          Toast("网络出错,刷新试试!");
          if (!timer) return;
        }
      });
    },
    // 获取流通记录信息
    getCirculationData(timer) {
      getCirculationMsg({}).then(res => {
        this.listBottomShow = true;
        if (res && res.success) {
          this.listBottomItems = res.data;
        } else {
          Toast("网络出错,刷新试试!");
          if (!timer) return;
        }
      });
    },
    // 数值递增效果
    countUpFunc(sendCountVarObj) {
      // this
      let _ = this;
      for (let i in sendCountVarObj) {
        // this.globalFun.countUp(旧值,当前,递增变量,this);
        this.globalFun.countUp(
          sendCountVarObj[i].last,
          sendCountVarObj[i].current,
          i,
          _
        );
      }
    },
    menu() {
      // 屏幕滚动距离
      this.scroll = window.scrollY;
      // 屏幕高
      let screenHeight = window.outerHeight;
    }
  },
  destroyed() {
    // window.removeEventListener("scroll")
  }
};
</script>

<style lang="scss"  scoped="scoped">
.out-list {
  width: 100%;
  height: 100%;
  background: url("../../../../common/assets/images/top_bg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.5rem;
  .list-top {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    background-clip: content-box;
    opacity: 1;
    transition: height 1s;
    box-sizing: border-box;
    padding: 0rem 0.32rem 0.24rem 0.32rem;
    .putBorder {
      width: 100%;
      box-sizing: border-box;
      .put-border-inside {
        .flex_all {
          display: flex;
          flex-direction: column;
          .flex_top {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            .flex_top_left {
              flex: 1;
              margin-right: 0.28rem;
              height: 4.586667rem;
              background-color: rgba(111, 228, 202, 0.4);
              .timer {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                .timer_img {
                  width: 0.666667rem;
                  height: 0.666667rem;
                  background: url("../../../../common/assets/images/time.png")
                    no-repeat;
                  background-size: contain;
                  display: inline-block;
                }
                .timer_text {
                  font-family: "FZLTXHK--GBK1-0";
                  font-size: 0.346667rem;
                  line-height: 0.4rem;
                  color: #000101;
                  margin: 0.56rem 0 0.68rem;
                }
                .time {
                  font-family: "FZLTTHK--GBK1-0";
                  font-size: 0.6rem;
                  font-weight: bold;
                  line-height: 0.4rem;
                  letter-spacing: 0.093333rem;
                  color: #000101;
                }
              }
            }
            .flex_top_right {
              flex: 1;
              background-color: rgba(111, 228, 202, 0.4);
              height: 4.586667rem;
              .quantity {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                .quantity_img {
                  width: 0.666667rem;
                  height: 0.666667rem;
                  background: url("../../../../common/assets/images/quantity.png")
                    no-repeat;
                  background-size: contain;
                  display: inline-block;
                }
                .quantity_text {
                  font-family: "FZLTXHK--GBK1-0";
                  font-size: 0.346667rem;
                  line-height: 0.4rem;
                  color: #000101;
                  margin: 0.56rem 0 0.68rem;
                }
                .quantity_number {
                  font-family: "FZLTTHK--GBK1-0";
                  font-size: 0.6rem;
                  font-weight: bold;
                  line-height: 0.4rem;
                  letter-spacing: 0.093333rem;
                  color: #000101;
                }
              }
            }
          }
          //   .
          .flex_bottom {
            margin-top: 0.16rem;
            background-color: rgba(111, 228, 202, 0.4);
            height: 4.586667rem;
            .altitude {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              .altitude_img {
                width: 0.666667rem;
                height: 0.666667rem;
                background: url("../../../../common/assets/images/altitude.png")no-repeat;
                background-size: contain;
                display: inline-block;
              }
              .altitude_text {
                font-family: "FZLTXHK--GBK1-0";
                font-size: 0.346667rem;
                line-height: 0.4rem;
                color: #000101;
                margin: 0.56rem 0 0.68rem;
              }
              .altitude_number {
                color: #00ffc6;
                transition: color, transform 0.5s ease;

                .animation_outside {
                  background-image: linear-gradient(80deg,#01494a 50%,#01484a 100%);
                  display: inline-block;
                  width: 0.92rem;
                  height: 0.92rem;
					  margin-left: 0.186667rem;
					  text-align: center;
					  line-height: 0.92rem;
                  .animation {
                    font-family: "FZLTTHK--GBK1-0";
                    font-size: 0.6rem;
					font-weight: bold;
					display: inline-block;
					&.scale {
						color: #ff8205;
						transform: scale(1.2);
					}
                  }
					&:nth-child(1) {
					margin-left: 0;
					}
                }
              }
            }
          }
        }

        .list-top-div {
			margin-top: 0.12rem;
			background-color: rgba(111, 228, 202, 0.4);
			padding: .346667rem .253333rem;
		  .chain_id{
			display: flex;
			flex-direction: row;
			align-items: center;
			.left{
				text-align: center;
				font-family: "FZLTZHK--GBK1-0";
				font-size: .346667rem;
				color: #000000;
			}
			.right{
				flex: 1;
				background-color: #01494a;
				padding: .293333rem .186667rem;
				.right_text{
					white-space: pre-wrap;
					word-break: break-all;
					font-family: "FZLTXHK--GBK1-0";
					font-size: .293333rem;
					color: #00ffc6;
				}
			}
		  }
        }
      }
    }
  }
  .list-mid {
    width: 100%;
    // 撑的高
    // height: 4.28rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0rem 0.32rem 0.24rem 0.32rem;
    background-clip: content-box;
    overflow: hidden;
    opacity: 1;
    box-sizing: border-box;
    .putBorder {
      overflow: hidden;
      .list-mid-title {
        width: 100%;
        height: .92rem;
		background: url("../../../../common/assets/images/title_bg.png")no-repeat;
		text-align: center;
		background-size: 100% 100%;
		font-family:"FZLTZHK--GBK1-0";
		font-size: .373333rem;
		line-height: .92rem;
		font-weight: bold;
		color: #000000;
      }
      .list-mid-items {
        .item {
          transition: height 1s;
          display: flex;
          align-content: center;
		  align-items: center;
		  background-color: rgba(111,228,202, 0.4);
		  margin-top: .146667rem;
		  padding: .333333rem 1.413333rem .333333rem .28rem;
          .item-left {
			display: flex;
			justify-content: center;
			align-items: center;
            border-radius: 50%;
            background-color: #01494a;
            text-align: center;
			margin-right: 0.4rem;
			font-size: .266667rem;
            .item-left-text {
              display: flex;
              justify-content: center;
			  flex-direction: column;
			  margin: .52rem .253333rem .506667rem;
			  width: 1.093333rem;
			  height: .573333rem;
              div {
				font-family: "FZLTZHK--GBK1-0";
				
				color: #00ffc6;
              }
            }
          }
          .item-right {
            flex: 1;
			white-space: normal;
			word-wrap: break-word;
			word-break: normal;
			overflow: hidden;
			font-family: "FZLTXHK--GBK1-0";
			font-size: .293333rem;
			color: #000000;
		  }
			&:nth-child(1) {
				margin-top: 0;
			}
        }
      }
      // 去掉最后一个item的border-bottom
      .list-mid-items :last-child {
        border: none;
      }
    }
  }
  .list-bottom {
    width: 100%;
    // 撑的高
    // height: 4.28rem;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0rem 0.32rem 0.24rem 0.32rem;
    background-clip: content-box;
    overflow: hidden;
    opacity: 1;
    box-sizing: border-box;
    padding-bottom: 5.333333rem;
    .putBorder {
      overflow: hidden;
      .list-bottom-title {
        width: 100%;
        height: .92rem;
        background: url("../../../../common/assets/images/title_bg.png")no-repeat;
        text-align: center;
        background-size: 100% 100%;
        font-family:"FZLTZHK--GBK1-0";
        font-size: .373333rem;
        line-height: .92rem;
        font-weight: bold;
        color: #000000;
      }
      .list-bottom-items {
        .item {
          // height: 3.133333rem;
          transition: height 1s;
          padding: .4rem 0.533333rem;
          margin-top: 0.133333rem;
          background-color: rgba(111,228,202, 0.4);
          .item-title {
            font-family: "FZLTZHK--GBK1-0";
            font-size: .293333rem;
            color: #6de2c8;
            display: flex;
            justify-content: space-around;
            flex-direction: row;
            align-items: center;
            .item-title_left{}
            .item-title_right{
              white-space: normal;
              word-break: break-all;
            }
          }
          .item-foot {
            display: flex;
            justify-content: space-between;
			margin-top: 0.426667rem;
			align-items: center;
            .item-left {
              margin-right: 0.266667rem;
              .item-left-top {
                display: flex;
				font-size: 0.346667rem;
				margin-bottom: 0.16rem;
				flex-direction: row;
				justify-content: space-between;
              }
              .item-left-top :nth-child(1) {
                flex: 1;
                font-family: "FZLTXHK--GBK1-0";
                font-size: .32rem;
                color: #000000;
              }
              .item-left-top :nth-child(2) {
                margin-left: 0.133333rem;
                justify-content: flex-end;
                font-family: "FZLTXHK--GBK1-0";
                font-size: .32rem;
                color: #ffcc00;
              }
              .item-left-bottom {
                  white-space: pre-wrap;
                  word-break: break-all;
                  font-family: "FZLTXHK--GBK1-0";
                  font-size: .213333rem;
                  color: #7cd5c4;
              }
            }
            .item-mid-right {
              width: 0.666667rem;
              height: 0.666667rem;
              background: url("../../../../common/assets/images/right_arrow.png")
                no-repeat center center;
              background-size: contain;
              margin-right: 0.266667rem;
            }
            .item-mid-left {
				width: .533333rem;
				height: .346667rem;
              background: url("../../../../common/assets/images/left_arrow.png")
                no-repeat center center;
              background-size: contain;
              margin-right: 0.266667rem;
            }
            .item-right {
              font-size: 0.346667rem;
            }
            .item-right :nth-child(1) {
              font-family: "FZLTXHK--GBK1-0";
              font-size: .32rem;
              color: #000000;
			  margin-bottom: 0.16rem;
			  text-align: right;
            }
            .item-right :nth-child(2) {
              white-space: normal;
              word-break: break-all;
              font-family: "FZLTXHK--GBK1-0";
              font-size: .213333rem;
              color: #7cd5c4;
            }
		  }
		  &:nth-child(1) {
				margin-top: 0;
			}
        }
      }
      // 最后一个item不需要borderBottom
      .list-bottom-items :last-child {
        border: none;
      }
    }
  }
}
.itemsActive {
  animation: bounce 1.5s linear;
}
@keyframes bounce {
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>


