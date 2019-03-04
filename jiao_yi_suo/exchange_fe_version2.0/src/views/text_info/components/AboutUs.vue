<template>
 <div class='AboutUs'>
     <div class="AboutUs-top">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">关于我们</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-top-content f-cb">
             <div class="content-left f-fl">
                 <img src="../../../common/assets/images/about_us.png" alt="">
             </div>
             <div class="content-right f-fr">
                 <div class="content-title">
                     <p>
                        Bit One特壹交易平台是香港新思路科技有限公司服务于全球专业交易者数字资产交易平台，
                        致力于发现优质的数字资产投资机会和打造世界级的区块链资产交易平台，
                        为交易者提供业界标准及专业图标和WebSocket以及FIX API服务，
                        让用户体验到更加安全、便捷的区块链资产兑换服务。总部位于香港，由Bit One全球业务团队负责运营。
                    </p>
                 </div>
                 <div class="content-list">
                     <ul>
                         <li>
                            <span></span><span>7*24小时数字资产交易</span><span></span><span>成立投资者保障基金</span>
                         </li>
                         <li>
                             <span></span><span>优质数字资产评估与挖掘</span><span></span><span>全网公布上币审核机制</span>
                         </li>
                         <li>
                             <span></span><span>全天候风控运作体系</span><span></span><span>全球多节点交易</span>
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
                <span style="margin:0px 10px;">我们的团队</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-center-content">
             <ul class="f-cb">
                 <li class="f-fl">
                     <p><span>micheal</span><span>ceo</span></p>
                     <p><span></span></p>
                     <p>拥有银行，投资和上市公司丰富的运营经验。旗下拥有多家互联网金融公司。区块链及数字货币方面的领军人物</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cco</span></p>
                     <p><span></span></p>
                     <p>从事法律及银行审查12年，5年大型金融公司反洗钱组织代表，拥有丰富的法律咨询及合同审查等经验</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cto</span></p>
                     <p><span></span></p>
                     <p>北大计算机科学硕士，18年互联网公司经验。擅长海量高并发架构及安全风控体系的搭建。拥有丰富的研发管理经验</p>
                 </li>
                 <li class="f-fl">
                     <p><span>micheal</span><span>cfo</span></p>
                     <p><span></span></p>
                     <p>毕业于中央财经大学，拥有英国赫尔大学数学金融硕士学位，持有注册会计师资质。拥有二十年财务管理经验</p>
                 </li>
             </ul>
         </div>
     </div>
     <div class="AboutUs-bottom">
         <div class="title">
             <p>
                <span class="span-left"></span>
                <span style="margin:0px 10px;">我们的优势</span>
                <span class="span-right"></span>
            </p>
         </div>
         <div class="AboutUs-bottom-content">
			<ul class="f-cb">
                <li class="f-fl">
                    <img src="../../../common/assets/images/about_ball.png" alt="" class="reveal-left">
					<p>全球跨域互通</p>
					<p>部署全球的能力及完备的跨区域交易中心 </p>
					<p>线上线下全覆盖的金融交易对接</p>
					<!-- <p>完备的金融交易体系，管理资产规模超过10亿美金</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../common/assets/images/about_molecular.png" alt="" class="reveal-left">
					<p>行业前沿技术</p>
					<p>完整的交易体系和数字加密功能 </p>
					<p>独立分布式节点进行网络数据的存储、验证与传递</p>
					<!-- <p>每日实时更新，所有流通中的数据在平台进行专业储备容器化物理资源及高性能管理</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../common/assets/images/about_platform.png" alt="" class="reveal-left">
					<p>多元化投资平台</p>
					<p>综合性数字资产交易平台 </p>
					<p>服务全球的领先加密数字货币投资交易品牌</p>
					<!-- <p>为全球投资者提供高价值的数字资产服务</p> -->
                </li>
                <li class="f-fl">
                    <img src="../../../common/assets/images/about_security.png" alt="" class="reveal-left">
					<p>稳定安全可靠</p>
					<p>采用成熟的区块链技术及云存储计算确保环节安全 </p>
					<p>运用密码学算法技术保证隐私安全</p>
					<!-- <p>完备的金融交易体系，管理资产规模超过10亿美金</p> -->
                </li>
            </ul>
		</div>
     </div>
 </div>
</template>
 
<script>
import {} from "@api/api_group";

export default {
  data() {
    return {};
  },
  created() {
      document.title = this.$t('text_info.AboutUs');
  },
  mounted() {},
  watch: {},
  methods: {}
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
 