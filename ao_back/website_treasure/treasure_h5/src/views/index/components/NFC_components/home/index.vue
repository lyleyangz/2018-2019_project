<template>
	<div class="home_all">
		<img :src="style.bg" alt="">
		<!-- <img src="../../../../common/assets/images/Horizontal_bg.png" alt="" v-if="V_or_H"> -->
		<div class="home" @click="jump()">
			<div class="home_title" :style="`margin:`+style.margin+`;padding:`+style.padding">
				<div class="home_title_content">澳绿宝区块链</div>
			</div>
			<div class="home_chainID" :style="`margin:`+style.chainIDmargin">
				<div class="home_chainID_content">
					<span class="home_chainID_span1">区块ID：</span>
					<span class="home_chainID_span2">{{publicKey}}</span>
				</div>
			</div>
			<div class="home_chainHigh" v-if="hight">
				<div class="home_chainHigh_title" :style="`text-align:`+style.chainHighText">区块高度</div>
				<div :class="`home_chainHigh_content_${chainHeight[hight.length]}`" :style="`margin:`+style.chainHigh">
					<div class="for_str_high">
						<span v-for="(item,index) in hight">{{item}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { getHeight } from "@api/api_group";

export default {
  data() {
    return {
      chainHeight:{
        "6":"six",
        "7":"seven",
        "8":"eight",
      },
      hight: null,
      publicKey: "",
      V_or_H: false,
      fullHeight: Number,
      fullWidth: Number,
      timer: null,
      h: {
        padding: "1.09333rem 0px 0 0",
        margin: "0px 0px 0.64rem 0;",
        bg: require("../../../../../common/assets/images/Horizontal_bg.png"),
        chainIDmargin: "0 0 0.6rem 1.06rem",
        chainHigh: "0 0 0 1.06rem",
        chainHighText: "inherit;margin-left:1.06rem"
      },
      v: {
        padding: "4.16rem 0 0",
        margin: "0 auto 2rem;",
        bg: require("../../../../../common/assets/images/Vertical_bg.png"),
        chainIDmargin: "0 auto 1.466667rem;text-align:center;",
        chainHigh: "auto;",
        chainHighText: "center"
      },
      style: {},
      id: this.$route.query.id
    };
  },
  created() {
    getHeight({
      address: this.id,
    //   token:sessionStorage.getItem("token")
    }).then(res => {
      if (res.code == "200" && res.msg == "success") {
        this.hight = Number(res.data.ledgerIndex).toFixed(0) || "";
        this.publicKey = res.data.publicKey || "";
      }
    });
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    fullWidth(val) {
      if (!this.timer) {
        this.fullWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.fullHeight = window.fullHeight;
        that.fullWidth = window.fullWidth;
        if (that.fullHeight > that.fullWidth) {
          this.isH_or_V("V");
        } else {
          this.isH_or_V("H");
        }
      })();
    };
    if (document.body.clientWidth && document.body.clientHeight) {
      if (document.body.clientWidth > document.body.clientHeight) {
        this.isH_or_V("H");
      } else {
        this.isH_or_V("V");
      }
    }
  },
  //   activated() {
  //     if (document.body.clientWidth && document.body.clientHeight) {
  //       document.body.clientWidth > document.body.clientHeight
  //         ? (this.V_or_H = true)
  // 		: (this.V_or_H = false);
  // 		if(this.V_or_H){
  // 			this.isH_or_V('V')
  // 		}else{
  // 			this.isH_or_V('H')
  // 		}
  //         console.log(this.V_or_H)
  //     }
  //   },
  methods: {
    jump() {
      if (this.publicKey && this.hight) {
        this.$router.push({
          path: `/NFC?id=` + this.id
        });
      }
    },
    isH_or_V(signed) {
      if (signed === "H") {
        this.style = this.h;
      }
      if (signed === "V") {
        this.style = this.v;
      }
    }
  }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.home_all {
  img {
    // background-size: 100% 100%;
    width: 100%;
    z-index: -1;
    position: absolute;
  }
  .home {
    // background: url("../../../../common/assets/images/Horizontal_bg.png") no-repeat;
    .home_title {
      @include font-dpr(18px);
      //   padding:1.093333rem 0 0.7106667rem;
      //   padding: 4.16rem 0 1.626667rem;
      color: rgba(233, 200, 133, 0.9);
      line-height: 0.6rem;
      text-align: center;
      font-family: "PingFang-SC-Bold";
      font-weight: bold;
    }
    // 区块IDcss
    .home_chainID {
      // width: 8.213333rem;
      //   margin: 0 auto 1.466667rem;
      // margin: 0 0 1.04rem 1.06rem;
      .home_chainID_content {
        // width: 100%;
        background-color: #ffc958;
        padding: 0.093333rem 0.133333rem;
        // display: flex;
        display: inline-block;
        .home_chainID_span1 {
          //   width: 1.5rem;
          color: #000300;
          font-weight: bold;
        }
        .home_chainID_span2 {
          // width: 6.6rem;
          color: #f8bc35;
          background-color: #000100;
          text-align: center;
          padding: 0 0.2rem;
          //   letter-spacing: 0.0513333rem;
        }
        span {
          @include font-dpr(13px);
          display: inline-block;
          font-family: "PingFang-SC-Bold";
          line-height: 0.6rem;
        }
      }
    }
    // 区块高度
    .home_chainHigh {
      //   margin-left: 1.06rem;
      .home_chainHigh_title {
        @include font-dpr(18px);
        color: rgba(233, 200, 133, 0.9);
        // text-align: center;
        margin: 0 auto 0.773333rem;
        font-family: "PingFang-SC-Bold";
        font-weight: bold;
      }
      // 区块高度6个span
      .home_chainHigh_content_six {
        width: 8.666667rem;
        height: 2.213333rem;
        // margin: auto;
        background-image: url("../../../../../common/assets/images/fill_6.png");
        background-size: 100% 100%;
        .for_str_high {
          height: 1.066667rem;
          line-height: 1.066667rem;
          margin: 0 0.16rem 0 0.107rem;
          span {
            @include font-dpr(30px);
            width: 0.816667rem;
            height: 1.06rem;
            display: inline-block;
            text-align: center;
            line-height: 1.07rem;
            margin-left: 0.698rem;
            // background: #fff;
            color: #ffbb32;
            font-weight: bold;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
      }
      // 区块高度7个span
      .home_chainHigh_content_seven {
        width: 8.666667rem;
        height: 2.213333rem;
        // margin: auto;
        background-image: url("../../../../../common/assets/images/fill_7.png");
        background-size: 100% 100%;
        .for_str_high {
          height: 1.066667rem;
          line-height: 1.066667rem;
          span {
            @include font-dpr(30px);
            width: 0.816667rem;
            height: 1.06rem;
            display: inline-block;
            text-align: center;
            line-height: 1.07rem;
            margin-left: 0.48rem;
            // background: #fff;
            color: #ffbb32;
            font-weight: bold;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
      }
      // 区块高度8个span
      .home_chainHigh_content_eight {
        width: 8.666667rem;
        height: 2.213333rem;
        // margin: auto;
        background-image: url("../../../../../common/assets/images/fill_8.png");
        background-size: 100% 100%;
        .for_str_high {
          height: 1.066667rem;
          line-height: 1.066667rem;
          span {
            @include font-dpr(30px);
            width: 0.816667rem;
            height: 1.06rem;
            display: inline-block;
            text-align: center;
            line-height: 1.07rem;
            margin-left: 0.305rem;
            color: #ffbb32;
            font-weight: bold;
            &:nth-child(1) {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>