<template>
 <div class='AboutUs'>
     <div class="AboutUs-top">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">關于我們</span>
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
                        Bit One特壹交易平台是香港新思路科技有限公司服務于全球專業交易者數字資産交易平台，
                        致力于發現優質的數字資産投資機會和打造世界級的區塊鏈資産交易平台，
                        爲交易者提供業界標准及專業圖標和WebSocket以及FIX API服務，
                        讓用戶體驗到更加安全、便捷的區塊鏈資産兌換服務。總部位于香港，由Bit One全球業務團隊負責運營。
                    </p>
                 </div>
                 <div class="content-list">
                     <ul>
                         <li>
                            <span></span><span>7*24小時數字資産交易</span><span></span><span>成立投資者保障基金</span>
                         </li>
                         <li>
                             <span></span><span>優質數字資産評估與挖掘</span><span></span><span>全網公布上幣審核機制</span>
                         </li>
                         <li>
                             <span></span><span>全天候風控運作體系</span><span></span><span>全球多節點交易</span>
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
                <span style="margin:0px 10px;">我們的團隊</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-center-content">
             <ul class="f-cb">
                 <li class="f-fl">
                     <p><span>micheal</span><span>ceo</span></p>
                     <p><span></span></p>
                     <p>擁有銀行，投資和上市公司豐富的運營經驗。旗下擁有多家互聯網金融公司。區塊鏈及數字貨幣方面的領軍人物</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cco</span></p>
                     <p><span></span></p>
                     <p>從事法律及銀行審查12年，5年大型金融公司反洗錢組織代表，擁有豐富的法律咨詢及合同審查等經驗</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cto</span></p>
                     <p><span></span></p>
                     <p>北大計算機科學碩士，18年互聯網公司經驗。擅長海量高並發架構及安全風控體系的搭建。擁有豐富的研發管理經驗</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cfo</span></p>
                     <p><span></span></p>
                     <p>畢業于中央財經大學，擁有英國赫爾大學數學金融碩士學位，持有注冊會計師資質。擁有二十年財務管理經驗</p>
                 </li>
             </ul>
         </div>
     </div>
     <div class="AboutUs-bottom">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">我們的優勢</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-bottom-content">
			<ul class="f-cb">
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_ball.png" alt="" class="reveal-left">
					<p>全球跨域互通</p>
					<p>部署全球的能力及完備的跨區域交易中心 </p>
					<p>線上線下全覆蓋的金融交易對接</p>
					<!-- <p>完备的金融交易体系，管理资产规模超过10亿美金</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_molecular.png" alt="" class="reveal-left">
					<p>行業前沿技術</p>
					<p>完整的交易體系和數字加密功能 </p>
					<p>獨立分布式節點進行網絡數據的存儲、驗證與傳遞</p>
					<!-- <p>每日实时更新，所有流通中的数据在平台进行专业储备容器化物理资源及高性能管理</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_platform.png" alt="" class="reveal-left">
					<p>多元化投資平台</p>
					<p>綜合性數字資産交易平台 </p>
					<p>服務全球的領先加密數字貨幣投資交易品牌</p>
					<!-- <p>为全球投资者提供高价值的数字资产服务</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../../common/assets/images/about_security.png" alt="" class="reveal-left">
					<p>穩定安全可靠</p>
					<p>采用成熟的區塊鏈技術及雲存儲計算確保環節安全 </p>
					<p>運用密碼學算法技術保證隱私安全</p>
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
        width: 529px;
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
              height: 42px;
              line-height: 42px;
              span:nth-of-type(2n-2) {
                display: inline-block;
                width: 220px;
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
            line-height: 50px;
            padding-top: 36px;
          }
        }
      }
    }
  }
}
</style>
 