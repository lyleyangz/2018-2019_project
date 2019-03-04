<template>
 <div class='AboutUs'>
     <div class="AboutUs-top">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">About us</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-top-content f-cb">
             <div class="content-left f-fl">
                 <img src="../../../../common/assets/images/about_us.png" alt="">
             </div>
             <div class="content-right f-fr">
                 <div class="content-title">
                     <p>
                        Bit One Special Trading Platform is Hong Kong New Idea Technology Co., Ltd. serving the global professional trader digital asset trading platform, dedicated to discovering high-quality digital asset investment opportunities and creating a world-class blockchain asset trading platform to provide traders with industry standard and professional icons and WebSocket and FIX API services allow users to experience a safer and more convenient blockchain asset exchange service. Headquartered in Hong Kong, it is operated by Bit One's global business team.
                    </p>
                 </div>
                 <div class="content-list">
                     <ul>
                         <li>
                            <span></span><span>7*24-hour Digital Asset Trading</span><span></span><span>Established Investor Protection Fund</span>
                         </li>
                         <li>
                             <span></span><span>Quality Digital Assets Evaluation and Mining</span><span></span><span>Announces the Credit Review Mechanism</span>
                         </li>
                         <li>
                             <span></span><span>All-Weather Air Control Operation System</span><span></span><span>Global Multi-Node Transaction</span>
                         </li>
                     </ul>
                 </div>
             </div>
         </div>
     </div>
     <div class="AboutUs-center">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">Our team</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-center-content">
             <ul class="f-cb">
                 <li class="f-fl">
                     <p><span>micheal</span><span>CEO</span></p>
                     <p><span></span></p>
                     <p>Has extensive operational experience in banking, investment and public companies. He has several internet finance companies. Leader in blockchain and digital currency</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>CCO</span></p>
                     <p><span></span></p>
                     <p>Engaged in law and bank review for 12 years, 5 years as a representative of large financial company anti-money laundering organization, with rich experience in legal consulting and contract review</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>CTO</span></p>
                     <p><span></span></p>
                     <p>Master of Computer Science at Peking University, 18 years’ experience in Internet companies. Specializes in the construction of massive high-concurrency architecture and security risk control system. Has extensive R&D management experience</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>CFO</span></p>
                     <p><span></span></p>
                     <p>He graduated from the Central University of Finance and Economics and holds a master's degree in mathematics finance from the University of Hull in the United Kingdom. He holds a Certified Public Accountant qualification. 20 years of financial management experience</p>
                 </li>
             </ul>
         </div>
     </div>
     <div class="AboutUs-bottom">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">Our advantages</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-bottom-content">
			<ul class="f-cb">
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_ball.png" alt="" class="reveal-left">
					<p>Global inter-domain interoperability</p>
					<p>Deploy global capabilities and a comprehensive cross-regional trading centre </p>
					<p>Online and offline full coverage of financial transactions</p>
					<!-- <p>完备的金融交易体系，管理资产规模超过10亿美金</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_molecular.png" alt="" class="reveal-left">
					<p>Industry cutting-edge technology</p>
					<p>Complete trading system and digital encryption </p>
					<p>Independent distributed nodes for network data storage, verification and delivery</p>
					<!-- <p>每日实时更新，所有流通中的数据在平台进行专业储备容器化物理资源及高性能管理</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_platform.png" alt="" class="reveal-left">
					<p>Diversified investment platform</p>
					<p>Integrated digital asset trading platform </p>
					<p>Serving the world's leading encrypted digital currency investment trading brand</p>
					<!-- <p>为全球投资者提供高价值的数字资产服务</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_security.png" alt="" class="reveal-left">
					<p>Stable and secure</p>
					<p>Adopt mature blockchain technology and cloud storage computing to ensure link security </p>
					<p>Use cryptographic algorithm technology to ensure privacy</p>
					<!-- <p>完备的金融交易体系，管理资产规模超过10亿美金</p> -->
                </li>
            </ul>
		</div>
     </div>
 </div>
</template>
 
<script>
import {} from "@api/api_group";
import eventBus from "@common/eventBus/eventBus";

export default {
  data() {
    return {};
  },
  created() {
    document.title = this.$t("text_info.AboutUs");
    eventBus.$on("convertFont", () => {
      this.$router.go(0);
      // document.title = this.$t('text_info.AboutUs');
    });
  },
  mounted() {},
  watch: {},
  methods: {},
  beforeDestroy() {
    eventBus.$off("convertFont");
  }
};
</script>
<style lang='scss' scoped>
.AboutUs {
  .AboutUs-top {
    width: 1200px;
    margin: 0 auto;
    height: 620px;
    .title {
      text-align: center;
      padding: 76px 0px 114px 0px;
      font-size: 24px;
      font-weight: 600;
      color: #333;
      p {
        .span-left,
        .span-right {
          display: inline-block;
          width: 20px;
          height: 2px;
          //   background: linear-gradient(left, #ffffff, #333);
          background-color: #333;
          margin-bottom: 6px;
        }
        .span-right {
          //   background: linear-gradient(right, #ffffff, #333);
          background-color: #333;
        }
      }
    }
    .AboutUs-top-content {
      .content-right {
        width: 713px;
        .content-title {
          p {
            font-size: 14px;
            color: #666666;
            word-wrap: break-word;
            word-break: normal;
          }
        }
        .content-list {
          padding-top: 54px;
          ul {
            li {
            //   height: 42px;
            //   line-height: 42px;
				padding: 10px 0 0 0;
              span:nth-of-type(2n-2) {
                display: inline-block;
                width: 340px;
                font-size: 16px;
                color: #333;
              }
              span:nth-of-type(2n-1) {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: #fc923f;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
  .AboutUs-center {
    height: 620px;
    background-color: #fff;
    .title {
      text-align: center;
      padding: 76px 0px 168px 0px;
      font-size: 24px;
      font-weight: 600;
      color: #333;
      p {
        .span-left,
        .span-right {
          display: inline-block;
          width: 20px;
          height: 2px;
          //   background: linear-gradient(left, #ffffff, #333);
          background-color: #333;
          margin-bottom: 6px;
        }
        .span-right {
          //   background: linear-gradient(right, #ffffff, #333);
          background-color: #333;
        }
      }
    }
    .AboutUs-center-content {
      width: 1200px;
      margin: 0 auto;
      ul {
        li {
          width: 18%;
          margin-right: 7%;
          &:last-of-type {
            margin-right: 0;
          }
          p:nth-of-type(1) {
            span:nth-of-type(1) {
              font-size: 20px;
              color: #333;
              font-weight: 600;
              margin-right: 14px;
            }
            span:nth-of-type(2) {
              font-size: 14px;
              color: #333;
              //   font-weight: 600;
            }
          }
          p:nth-of-type(2) {
            padding-bottom: 20px;
            span {
              display: inline-block;
              width: 55px;
              height: 2px;
              background-color: #333;
            }
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #999999;
            word-wrap: break-word;
            word-break: normal;
          }
        }
      }
    }
  }
  .AboutUs-bottom {
    width: 1200px;
    margin: 0 auto;
    height: 620px;
    .title {
      text-align: center;
      padding: 76px 0px 152px 0px;
      font-size: 24px;
      font-weight: 600;
      color: #333;
      p {
        .span-left,
        .span-right {
          display: inline-block;
          width: 20px;
          height: 2px;
          //   background: linear-gradient(left, #ffffff, #333);
          background-color: #333;
          margin-bottom: 6px;
        }
        .span-right {
          //   background: linear-gradient(right, #ffffff, #333);
          background-color: #333;
        }
      }
    }
    .AboutUs-bottom-content {
      width: 1200px;
      ul {
        li {
          width: 22%;
          margin-right: 3%;
          text-align: center;
          &:last-of-type {
            margin-right: 0;
          }
          p {
            font-size: 12px;
            color: #999999;
          }
          p:nth-of-type(1) {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            // line-height: 50px;
			height: 100px;
            padding-top: 36px;

          }
        }
      }
    }
  }
}
</style>
 