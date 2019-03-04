<template>
    <section class="home">
        <div class="banner-outer">
            <div class="swiper-container f-pr" id="banner_threed">
                <three-d></three-d>
				<ul class="jewel">
					<li class="left"><img src="../../../common/assets/images/banner_left.png" alt=""></li>
					<li class="right"><img src="../../../common/assets/images/banner_right.png" alt=""></li>
				</ul>
			    <div class="swiper-wrapper" :class="bannerList.length>0?'':'loading'">
			    	<div class="swiper-slide f-pr"  v-for="(item,index) of bannerList" :key="index">
			    		<img class="image" :src="item.src" alt="">
			    	</div>
			    </div> 
                <!-- 如果需要分页器 -->
			    <div class="swiper-pagination"></div>
			    <!-- 如果需要导航按钮 -->
			    <!-- <div class="swiper-button-prev swiper-button-white f-pa"></div>
			    <div class="swiper-button-next swiper-button-white f-pa"></div> -->
				
		    </div>
        </div>
        <!-- 大数据中心 -->
        <section class="bigData-container">
             <div class="page-board">
                <div class="big-data">
                    <div class="bigData-title">
                        <div>BIG  DATA  NEWS</div>
                        <div class="f-pr Eng">大数据新闻</div>
                    </div>
                    <div class="bigData-content">
                        <div class="btn" >
                           <span class="f-ib" v-if="bigDataLists.length>0" @click="$router.push({name:'bigdatanews'})">更多动态<img src='../../../common/assets/images/next.png' alt=""></span>
                        </div>
                        <ul class="list" :class="bigDataLists.length>0?'':'loading'">
                            <li class="li" v-for="(item, index) in bigDataLists" :key="index" >
                                <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
                                <img v-else src="../../../common/assets/images/placeholder.png" alt="">
                                <h5>{{item.title}}</h5>
                                <div class="f-ib content-info">{{item.secContent}}</div>
                                <div class="checkDetails-btn">
                                    <a class="checkDetails f-dib" @click="$router.push({name:'other_details',params:{id:item.id,type:'bigdatanews'}})">查看详情</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>     
        </section>
         <!-- 国家政策 -->
        <section class="nationalPolicy-container">
            <div class="page-board">
                <div class="nationalPolicy">
                    <div class="nationalPolicy-title">
                        <div>NATIONAL  POLICY</div>
                        <div class="f-pr Eng">国家政策</div>
                    </div>
                    <div class="nationalPolicy-content" :class="JSON.stringify(nationalPolicyLista)!='{}'?'':'loading'">
                        <div class="img">
                            <img v-if="nationalPolicyLista.imgUrl" :src="nationalPolicyLista.imgUrl" alt="">
                            <img v-else src="../../../common/assets/images/placeholder.png" alt="">
                        </div>
                        <div class="info">
                            <div class="btn" >
                                <span class="f-ib" v-if="JSON.stringify(nationalPolicyLista)!='{}'" @click="$router.push({name:'nationalpolicy'})">更多政策<img src='../../../common/assets/images/next.png' alt=""></span>
                            </div>
                            <div>
                                <h5>{{nationalPolicyLista.title}}</h5>
                                <div class="f-ib content-info">{{nationalPolicyLista.secContent}}</div>
                                <div class="check-details">
                                    <span v-if="nationalPolicyLista.createDate">{{globalFun.dateFormat(nationalPolicyLista.createDate, 'yyyy-MM-dd hh:mm:ss')}}</span>
                                    <span v-if="JSON.stringify(nationalPolicyLista)!='{}'" @click="$router.push({name:'other_details',params:{id:nationalPolicyLista.id,type:'nationalpolicy'}})">【查看详情】</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 行业公告 -->
        <section class="companyDynamics-container">
            <div class="page-board">
                <div class="companyDynamics">
                     <div class="companyDynamics-title">
                        <div>INDUSTRY  ANNOUNCEMENT</div>
                        <div class="f-pr Eng">行业公告</div>
                    </div>
                    <div class="companyDynamics-content">
                        <div class="btn">
                            <span class="f-ib" v-if="companyDynamicsLista.length>0" @click="$router.push({name:'companyannouncement'})">更多动态<img src='../../../common/assets/images/next.png' alt=""></span>
                        </div>
                        <ul class="list" :class="companyDynamicsLista.length>0?'':'loading'"> 
                            <div class="companyDynamics-left" v-for="(item,index) in companyDynamicsLista" :key="index">
                                <div class="left-top" @click="$router.push({name:'other_details',params:{id:item.id,type:'companyannouncement'}})">
                                    <div class="img">
                                         <img v-if="item.imgUrl" :src="item.imgUrl" alt="">
                                         <img v-else src="../../../common/assets/images/placeholder.png" alt="">
                                    </div>
                                    <div class="info">
                                        <h5>{{item.title}}</h5>
                                        <div class="f-ib content-info">{{item.secContent}}</div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                        <ul class="companyDynamics-list">
                            <div class="left-bottom">
                                <li class="li f-fl f-pr"  v-for="(item,index) in list" :key="index" @click="$router.push({name:'other_details',params:{id:item.id,type:'companyannouncement'}})">
                                    <span >{{item.title}}</span>
                                    <span v-if="item.createDate">{{globalFun.dateFormat(item.createDate, 'yyyy-MM-dd hh:mm:ss')}}</span>
                                </li>
                            </div> 
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { getData, getCompanyDynamicsData } from "@api/api_home";
import Swiper from "@common/assets/js/swiper.js";
import "@common/assets/styles/swiper.min.css";
import three_d from "@components/three_bc/three_bc";
export default {
  components: {
    "three-d": three_d
  },
  data() {
    return {
      bigDataLists: [],
      nationalPolicyLista: {},
      companyDynamicsLista: [],
      list: [],
      bannerList: [
        {
          src: require("../../../common/assets/images/background_2.png")
        },
        {
          src: require("../../../common/assets/images/background_2.png")
        },
        {
          src: require("../../../common/assets/images/background_2.png")
        }
      ]
    };
  },
  created() {
    document.title = "首页 - 国家大数据专业委员会官网";
    this.getDatas(1)
      .then(this.getDatas(2))
      .then(this.getDatas(3), this.getCompanyDynamicsData());
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.initSwiper();
      });
    }, 200);
  },
  methods: {
    getDatas(num) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        getData({
          type: num
        }).then(res => {
          if (res.code == 200) {
            switch (num) {
              case 1:
                _this.bigDataLists = res.data.splice(0, 3) || [];
                break;
              case 2:
                _this.nationalPolicyLista = res.data[0] || {};
                break;
              default:
                _this.companyDynamicsLista = res.data.splice(0, 2) || [];
            }
          }
        });
        resolve();
      });
    },
    getCompanyDynamicsData() {
      getCompanyDynamicsData({
        type: 3,
        offset: 1,
        count: 4
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data.entities || [];
        }
      });
    },
    initSwiper() {
      this.bannerSwiper = new Swiper(".swiper-container", {
        effect: "fade",
        autoplay: {
          disableOnInteraction: false,
          delay: 3000
        },
        loop: true,
        speed: 2000,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        // 如果需要滚动条
        scrollbar: ".swiper-scrollbar"
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.home {
  background: #fff;
  .banner-outer {
    position: relative;
    width: 100%;
    .banner {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .bigData-container {
    background-color: #f1f7ff;
    min-height: 810px;
    padding-top: 100px;
    .page-board {
      .big-data {
        .bigData-title {
          div {
            text-align: center;
            color: #333;
          }
          div:first-of-type {
            font-size: 36px;
            line-height: 38px;
            padding-bottom: 14px;
          }
          div:last-of-type {
            font-size: 30px;
            line-height: 33px;
            padding-top: 14px;
            font-weight: 600;
          }
          .Eng:after {
            content: "";
            width: 80px;
            height: 1px;
            background-color: #333;
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-40px);
          }
        }
        .bigData-content {
          .btn {
            padding: 62px 0px 20px 0px;
          }
          .list {
            display: flex;
            justify-content: space-between;
            .li {
              padding: 16px;
              width: 31%;
              min-height: 463px;
              background-color: #fff;
              img {
                width: 100%;
                height: 190px;
              }
              h5 {
                font-size: 20px;
                line-height: 22px;
                height: 22px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 28px 0px 20px 0px;
              }
              .content-info {
                height: 62px;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 3;
              }
              .checkDetails-btn {
                text-align: center;
                padding-top: 54px;
                .checkDetails {
                  width: 140px;
                  height: 36px;
                  line-height: 36px;
                  margin: 0;
                  padding: 0;
                  border: 1px solid #fa3737;
                  border-radius: 36px;
                  color: #fa3737;
                  font-size: 16px;
                  &::after {
                    content: "";
                    height: 36px;
                    width: 0px;
                    background-color: #fa3737;
                    border-radius: 36px;
                    display: block;
                    margin-top: -37px;
                    margin-left: 0px;
                  }
                }
              }
            }
            .li:hover {
              box-shadow: 8px 8px 8px rgba(13, 58, 120, 0.05),
                8px -8px 8px rgba(13, 58, 120, 0.05),
                -8px 8px 8px rgba(13, 58, 120, 0.05),
                -8px -8px 8px rgba(13, 58, 120, 0.05);
              transition: all 0.5s ease 0s;
              div {
                .checkDetails {
                  color: #fff;
                  overflow: hidden;
                  &::after {
                    width: 140px;
                    background-color: #fa3737;
                    transition: all 0.5s ease 0s;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .nationalPolicy-container {
    width: 100%;
    min-height: 810px;
    background: url("../../../common/assets/images/ackground.jpg") no-repeat;
    .page-board {
      .nationalPolicy {
        .nationalPolicy-title {
          padding-top: 100px;
          div {
            text-align: center;
            color: #333;
          }
          div:first-of-type {
            font-size: 36px;
            line-height: 38px;
            padding-bottom: 14px;
          }
          div:last-of-type {
            font-size: 30px;
            line-height: 32px;
            padding-top: 14px;
            font-weight: 600;
          }
          .Eng:after {
            content: "";
            width: 80px;
            height: 1px;
            background-color: #333;
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-40px);
          }
        }
        .nationalPolicy-content {
          padding-top: 100px;
          display: flex;
          justify-content: space-between;
          .img {
            width: 55%;
            margin-right: 190px;
            img {
              width: 100%;
              height: 376px;
            }
          }
          .info {
            width: 45%;
            h5 {
              font-size: 22px;
              line-height: 26px;
              height: 26px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 38px 0px 24px 0px;
            }
            .content-info {
              height: 82px;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 4;
            }
            .check-details {
              padding-top: 52px;
              text-align: right;
              font-size: 14px;
              span:first-of-type {
                color: #999999;
              }
              span:last-of-type {
                color: #333;
                cursor: pointer;
                &:hover {
                  color: #fa3737;
                  transition: all 0.5s ease 0s;
                }
              }
            }
          }
        }
      }
    }
  }
  .companyDynamics-container {
    background-color: #fff;
    padding-top: 100px;
    min-height: 810px;
    .page-board {
      .companyDynamics {
        .companyDynamics-title {
          div {
            text-align: center;
            color: #333;
          }
          div:first-of-type {
            font-size: 36px;
            line-height: 38px;
            padding-bottom: 14px;
          }
          div:last-of-type {
            font-size: 30px;
            line-height: 32px;
            padding-top: 14px;
            font-weight: 600;
          }
          .Eng:after {
            content: "";
            width: 80px;
            height: 1px;
            background-color: #333;
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-40px);
          }
        }
        .companyDynamics-content {
          .btn {
            padding: 62px 0px 66px 0px;
          }
          .list {
            display: flex;
            justify-content: space-between;
            .companyDynamics-left {
              width: 46%;
              .left-top {
                display: flex;
                margin-right: 94px;
                width: 100%;
                padding-bottom: 22px;
                border-bottom: 1px solid #dddddd;
                cursor: pointer;
                .img {
                  width: 40%;
                  margin-right: 16px;
                  img {
                    width: 100%;
                    height: 190px;
                  }
                }
                .info {
                  width: 60%;
                  h5 {
                    font-size: 22px;
                    height: 24px;
                    line-height: 24px;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .content-info {
                    height: 105px;
                    padding-top: 22px;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    -webkit-line-clamp: 5;
                  }
                }
              }
            }
          }
          .companyDynamics-list {
            .left-bottom {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              .li {
                display: flex;
                padding-top: 16px;
                width: 46%;
                cursor: pointer;
                &:hover {
                  span:first-of-type {
                    transition: all 0.5s ease 0s;
                    color: #fa3737;
                  }
                }
                span:first-of-type {
                  flex: 6;
                  font-size: 18px;
                  color: #333;
                  overflow: hidden;
                  margin-left: 16px;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                span:last-of-type {
                  flex: 3;
                  text-align: right;
                  color: #999999;
                  font-size: 14px;
                }
              }
              .li:before {
                content: "";
                width: 6px;
                height: 6px;
                background-color: #fa3737;
                border-radius: 3px;
                position: absolute;
                left: 0px;
                top: 26px;
              }
            }
            .left-top:hover,
            .left-bottom:hover {
              .info {
                h5 {
                  color: #fa3737;
                  transition: all 0.5s ease 0s;
                }
              }
            }
          }
        }
      }
    }
  }
}
.btn {
  text-align: right;
  span {
    text-align: center;
    cursor: pointer;
    color: #fa3737;
    font-size: 16px;
    line-height: 18px;
    img {
      width: 8px;
      margin-left: 6px;
    }
  }
}
@keyframes container1 {
  40% {
    transform: translate3d(0, -50px, 0);
  }

  90% {
    transform: translate3d(0, 0px, 0);
  }
}
@keyframes container2 {
  50% {
    transform: translate3d(0, 50px, 0);
  }

  100% {
    transform: translate3d(0, 0px, 0);
  }
}
.jewel {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 99;
  li {
    flex: 1;
    position: relative;
    img {
      position: absolute;
      height: 40%;
    }
    &.right {
      img {
        right: 0;
        top: 80px;

        animation-name: container2; /*动画的名称*/
        transform-origin: center bottom; /*设置动画旋转元素的基点为：居中靠下*/
        animation-duration: 10s; /*动画时间*/
        animation-fill-mode: both; /*播放后的状态*/
        animation-iteration-count: infinite;
      }
    }
    &.left {
      img {
        bottom: 40px;
        animation-name: container1; /*动画的名称*/
        transform-origin: center bottom; /*设置动画旋转元素的基点为：居中靠下*/
        animation-duration: 10s; /*动画时间*/
        animation-fill-mode: both; /*播放后的状态*/
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>

<style lang="scss">
.swiper-pagination {
  z-index: 999;
}
.banner-outer .swiper-pagination-bullet {
  width: 30px;
  height: 4px;
  border: 1px solid #ffffff;
  background-color: #ffffff !important;
  opacity: 0.3;
  border-radius: 0px;
}
.banner-outer .swiper-pagination-bullet-active {
  border: 1px solid #ffffff !important;
  background-color: #ffffff !important;
  opacity: 1;
  transition: all 0.5s ease 0s;
}
.banner-outer .swiper-pagination-bullets {
  bottom: 38px !important;
}
.banner-outer .swiper-slide .image {
  width: 100%;
}
</style>

