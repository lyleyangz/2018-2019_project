<template>
    <div class="homepage">
        <div class="homepage-btn" v-if="!sessionMessage">
            <div class="login-btn">
                <Button :loading="loginBtn" @click="toLogin()">
                    <span v-if="!loginBtn">登录</span>
                    <span v-else>跳转中...</span>
                </Button>
            </div>
            <div class="register-btn">
                <Button :loading="registerBtn" @click="toRegister()">
                <span v-if="!registerBtn">申请为原创者</span>
                <span v-else>跳转中...</span>
                </Button>
            </div>
        </div>
        <div class="homepage-btn" v-if="sessionMessage">
            <div class="login-btn">
                <Button :loading="loginBtn">
                    <span v-if="!loginBtn">首页</span>
                    <span v-else>跳转中...</span>
                </Button>
            </div>
            <div class="register-btn">
                <Button :loading="MyCopyrightBtn" @click="toMyCopyright()">
                <span v-if="!MyCopyrightBtn">我的版权</span>
                <span v-else>跳转中...</span>
                </Button>
            </div>
            <div class="exitLogin-btn">
                <Button :loading="loginBtn" @click="exitLogin()">
                    <span v-if="!loginBtn">退出</span>
                    <span v-else>退出中...</span>
                </Button>
            </div>
        </div>
        <div class="search-logo"></div>
        <search-version @searchResult='searchResult'></search-version>
        <div class="search-list" v-if="showSearchOnhomePage.length != 0 && !showSearchError">
            <div class="search-list-one itemsActive-one">
                <div class="search-list-top">
                    <div class="search-list-top-left">
                        <span>最新区块:</span>
                        <span>{{showSearchOnhomePage.block}}</span>
                    </div>
                    <div class="search-list-top-mid">
                        <span>出块时间:</span>
                        <span>{{globalFun.dateFormat(showSearchOnhomePage.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                    </div>
                </div>
                <div class="search-list-bottom">
                    <div class="search-list-bottom-bow">
                        <span class="">Txid:</span>
                        <p>{{showSearchOnhomePage.txid}}</p>
                    </div>
                </div>
            </div>
            <div class="search-list-two itemsActive-two">
                <div class="search-list-top">
                    <div class="search-list-top-title">
                        <span>标题:{{showSearchOnhomePage.title}}</span>
                        区块:<span>{{showSearchOnhomePage.block}}</span>
                    </div>
                </div>
                <div class="search-list-bottom">
                    <div class="search-list-bottom-bow">
                        <span class="search-list-bottom-bow-left">链上地址:&nbsp;&nbsp;{{showSearchOnhomePage.chainAddress}}</span>
                        <div class="search-list-bottom-bow-mid">
                            <!-- 一张图 -->
                        </div>
                        <span class="search-list-bottom-bow-bottom">TXID:&nbsp;&nbsp;{{showSearchOnhomePage.txid}}</span>
                    </div>
                </div>
            </div>
            <div class="search-list-three itemsActive-three">
                <div class="search-list-top">
                    <div class="search-list-top-title">
                        <h1>{{showSearchOnhomePage.title}}</h1>
                    </div>
                </div>
                <div class="search-list-bottom">
                    <p v-html="showSearchOnhomePage.content"></p>
                </div>
            </div>
        </div>
        <div class="search-list-none itemsActiveError" v-if="showSearchError">
            <img src="../../../common/assets/images/Query-Failed.png" alt="">
            <p>未搜索对应信息，请核实txid,文章地址是否正确!!!</p>
        </div>
        <div class="foot">
            Contact us: support@vac.news 
        </div>
    </div>
</template>

<script>
import searchV from "../search/search.vue";

export default {
  components: {
    "search-version": searchV
  },
  data() {
    return {
      loginBtn: false,
      registerBtn: false,
      MyCopyrightBtn: false,
      timer: null,
      sessionMessage: false,
      showSearchError: false,
      showSearchOnhomePage: [],
      isNull: null
    };
  },
  created() {
    if (sessionStorage.getItem("QDL_isLogin") == this.isNull) {
      this.$set(this._data, "sessionMessage", false);
    } else if (sessionStorage.getItem("QDL_isLogin") == "false") {
      this.$set(this._data, "sessionMessage", false);
    } else {
      this.$set(this._data, "sessionMessage", true);
    }
    //   this.$set(this._data,'sessionMessage',(sessionStorage.getItem('QDL_isLogin')== (this.isNull || 'false') ? false:true))
  },
  mounted() {
    // window.addEventListener('scroll', this.scrollMethod)
  },
  methods: {
    //   退出功能
    exitLogin() {
      this.sessionMessage = false;
      sessionStorage.clear();
    },
    //   首页搜索功能
    searchResult(data) {
      if (data.success) {
        this.showSearchError = false;
        this.showSearchOnhomePage = data.data;
      } else {
        this.showSearchError = true;
      }
    },
    //   去往登录页面
    toLogin() {
      this.loginBtn = true;
      this.timer = setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 500);
    },
    // 前往注册页面
    toRegister() {
      this.registerBtn = true;
      this.timer = setTimeout(() => {
        this.$router.push({ path: "/header/registerRouter" });
      }, 500);
    },
    // 有登录的信息，显示我的版权
    toMyCopyright() {
      this.MyCopyrightBtn = true;
      this.timer = setTimeout(() => {
        this.$router.push({ path: "/header/myCopyright" });
      }, 500);
    },
    //监听滚动回调
    scrollMethod(){
      // 屏幕滚动距离
      let scroll = window.scrollY;
      let scrollH = document.documentElement.scrollTop;
      // 屏幕高
      let screenHeight = window.outerHeight;
      console.log(scroll,screenHeight,scrollH)
    }
  }
};
</script>

<style lang="scss" scpoed>
.homepage {
  height: 100%;
  background: url("../../../common/assets/images/background.png") center -140px;
  overflow: hidden;
  //   padding-top: 140px;
  .homepage-btn {
    float: right;
    .login-btn {
      display: inline-block;
      span {
        color: #ffffff;
        font-size: 16px;
        font-family: "MicrosoftYahei";
      }
    }
    .register-btn {
      display: inline-block;
      margin: 0 10px;
      span {
        color: #ffffff;
        font-size: 16px;
        font-family: "MicrosoftYahei";
      }
    }
    .exitLogin-btn {
      display: inline-block;
      margin-right: 20px;
      span {
        color: #ffffff;
        font-size: 16px;
        font-family: "MicrosoftYahei";
      }
    }
    button {
      margin-top: 50px;
      border: 1px solid transparent;
      border-radius: 50px;
      width: 142px;
      height: 42px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .search-logo {
    margin: 140px auto 57px;
    width: 200px;
    height: 200px;
    background: url("../../../common/assets/images/logo.png") center center
      no-repeat;
    // margin-bottom: 57px;
  }
  .search-list {
    margin: 0 auto;
    width: 850px;
    height: 100%;
    .search-list-one {
      background: #ffffff;
      border: 1px solid white;
      overflow: hidden;
      border-radius: 5px;
      height: 100px;
      margin-bottom: 8px;
      .search-list-top {
        width: 100%;
        float: left;
        margin: 28px 0px 18px 24px;
        .search-list-top-left {
          display: inline-block;
        }
        .search-list-top-left :nth-child(1) {
          margin-right: 10px;
          color: #999999;
          font-size: 14px;
          font-family: "MicrosoftYahei";
        }
        .search-list-top-left :nth-child(2) {
          color: #333333;
          font-size: 14px;
          font-family: "MicrosoftYahei";
          font-weight: bold;
        }
        .search-list-top-mid {
          margin: 0px 40px;
          display: inline-block;
        }
        .search-list-top-mid :nth-child(1) {
          margin-right: 10px;
          color: #999999;
          font-size: 14px;
          font-family: "MicrosoftYahei";
        }
        .search-list-top-mid :nth-child(2) {
          color: #333333;
          font-size: 14px;
          font-family: "MicrosoftYahei";
          font-weight: bold;
        }
      }
      .search-list-bottom {
        height: 50px;
        margin-right: 24px;
        .search-list-bottom-bow {
          margin-left: 24px;
          p {
            display: inline-block;
            font-family: "MicrosoftYahei";
            font-size: 14px;
            color: #333333;
            margin-right: 12px;
          }
        }
      }
    }
    .search-list-two {
      background: #ffffff;
      border: 1px solid white;
      overflow: hidden;
      border-radius: 5px;
      //   height: 100px;
      .search-list-top {
        width: 100%;
        margin: 28px 0px 18px 24px;
        .search-list-top-title {
          display: inline-block;
        }
        .search-list-top-title :nth-child(1) {
          margin-right: 10px;
          color: #999999;
          font-size: 14px;
          font-family: "MicrosoftYahei";
        }
        .search-list-top-title :nth-child(2) {
          color: #ff845f;
          font-size: 14px;
          font-family: "MicrosoftYahei";
          font-weight: bold;
        }
      }
      .search-list-bottom {
        height: 50px;
        .search-list-bottom-bow {
          margin-left: 24px;
          .search-list-bottom-bow-left {
            color: #333333;
            font-size: 14px;
            font-family: "MicrosoftYahei";
          }
          .search-list-bottom-bow-mid {
            display: inline-block;
            background: url("../../../common/assets/images/arrows.png") center
              center no-repeat;
            background-size: contain;
            width: 30px;
            height: 20px;
            margin: 0px 30px;
            vertical-align: middle;
          }
          .search-list-bottom-bow-bottom {
            color: #333333;
            font-size: 14px;
            font-family: "MicrosoftYahei";
          }
        }
      }
    }
    .search-list-three {
      background-color: #fff;
      margin-top: 20px;
      // width: 850px;
      overflow: hidden;
      border-radius: 5px;
      .search-list-top {
        .search-list-top-title {
          margin-top: 20px;
          text-align: center;
        }
      }
      .search-list-bottom {
        //   background-color: #fff;
        padding: 52px 70px;
        p {
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
  }
  .search-list-none {
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    font-family: "MicrosoftYahei";
    img{
        margin-bottom: 20px;
    }
  }
  .foot {
    text-align: center;
    font-family: "MicrosoftYahei";
    color: #a8acbd;
    font-size: 12px;
    margin-bottom: 12px;
    margin-top: 100px;
  }
}
.itemsActiveList{
  // animation: bounceList 1.5s linear;
}
// 包裹层list动画效果，未用到，先留着
@keyframes bounceList {
  0% {
    // transform: scale(0.6);
    transform: skewX(85deg);
    width:0px;
  }
  20% {
    // transform: scale(1.1);
    transform: skewX(65deg);
    width:170px;
  }
  40% {
    // transform: scale(1.1);
    transform: skewX(45deg);
    width:340px;
  }
  60% {
    // transform: scale(1.1);
    transform: skewX(25deg);
    width:510px;
  }
  80% {
    // transform: scale(1.1);
    transform: skewX(85deg);
    width:680px;
  }
  100% {
    // transform: scale(1);
    transform: skewX(1, 1, 1);
    width: 850px;
  }
}
.itemsActive-one {
  animation: bounce 0.5s linear;
}
@keyframes bounce {
  0% {
      transform-origin: left bottom;
      transform: rotateY(90deg);
    // transform: skewX(85deg);

    width:0px;
  }
  20% {
    transform-origin: left bottom;
    transform: rotateY(75deg);
    // transform: skewX(55deg);
    width:170px;
  }
  40% {
    transform-origin: left bottom;
    transform: rotateY(60deg);
    // transform: skewX(25deg);
    width:340px;
  }
  60% {
    transform-origin: left bottom;
    transform: rotateY(45deg);
    // transform: skewX(-5deg);
    width:510px;
  }
  80% {
    transform-origin: left bottom;
    transform: rotateY(30deg);
    // transform: skewX(25deg);
    width:680px;
  }
  100% {
    transform-origin: left bottom;
    transform: rotateY(0deg);
    // transform: skewX(0deg);
    width: 850px;
  }
}
.itemsActive-two {
  animation: bounce 1.5s linear;
}
@keyframes bounce {
  0% {
      transform-origin: left bottom;
      transform: rotateY(90deg);
    // transform: skewX(85deg);

    width:0px;
  }
  20% {
    transform-origin: left bottom;
    transform: rotateY(75deg);
    // transform: skewX(55deg);
    width:170px;
  }
  40% {
    transform-origin: left bottom;
    transform: rotateY(60deg);
    // transform: skewX(25deg);
    width:340px;
  }
  60% {
    transform-origin: left bottom;
    transform: rotateY(45deg);
    // transform: skewX(-5deg);
    width:510px;
  }
  80% {
    transform-origin: left bottom;
    transform: rotateY(30deg);
    // transform: skewX(25deg);
    width:680px;
  }
  100% {
    transform-origin: left bottom;
    transform: rotateY(0deg);
    // transform: skewX(0deg);
    width: 850px;
  }
}
.itemsActive-three {
  animation: bounce 2.5s linear;
}
@keyframes bounce {
  0% {
      transform-origin: left bottom;
      transform: rotateY(90deg);
    // transform: skewX(85deg);

    width:0px;
  }
  20% {
    transform-origin: left bottom;
    transform: rotateY(75deg);
    // transform: skewX(55deg);
    width:170px;
  }
  40% {
    transform-origin: left bottom;
    transform: rotateY(60deg);
    // transform: skewX(25deg);
    width:340px;
  }
  60% {
    transform-origin: left bottom;
    transform: rotateY(45deg);
    // transform: skewX(-5deg);
    width:510px;
  }
  80% {
    transform-origin: left bottom;
    transform: rotateY(30deg);
    // transform: skewX(25deg);
    width:680px;
  }
  100% {
    transform-origin: left bottom;
    transform: rotateY(0deg);
    // transform: skewX(0deg);
    width: 850px;
  }
}
.itemsActiveError {
  animation: bounceError 1.5s linear;
}
@keyframes bounceError {
  0% {
    transform: skewX(0deg);
  }
  10% {
    transform: skewX(5deg);
  }
  20% {
    transform: skewX(0deg);
  }
  30% {
    transform: skewX(-5deg);
  }
  40% {
    transform: skewX(0deg);
  }
  50% {
    transform: skewX(5deg);
  }
  60% {
    transform: skewX(0deg);
  }
  70% {
    transform: skewX(-5deg);
  }
  80% {
    transform: skewX(0deg);
  }
  90% {
    transform: skewX(5deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
</style>
