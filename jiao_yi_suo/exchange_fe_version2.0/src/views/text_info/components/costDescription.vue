<template>
 <div class='costDescription'>
    <div class="title">
        <p>
            <span class="span-left"></span>
            <span style="margin:0px 36px;">Bit one 费用说明</span>
            <span class="span-right"></span>
        </p>
    </div>
    <div class="costDescription-content">
        <div class="costDescription-title">
            <i class="icon f-ib"></i>
            <span class="f-ib">交易手续费</span>
        </div>
        <div class="content-top">
            <p><i class="f-ib"></i>所有交易对费率为0.2%,仅在交易成功后收取。撤单部分不收取手续费。</p>
            <p>例：以0.07的价格卖出ETH/BTC，下单数量为200个。成交100个时交易额为7ETH，
                根据手续费 = 成交额 * 手续费率，实际收取 7 * 0.2% = 0.014ETH。
                如果此时撤单未成交部分不再收取手续费。
            </p>
        </div>
        <div class="costDescription-title">
            <i class="icon f-ib"></i>
            <span class="f-ib">提币费用</span>
        </div>
        <div class="content-bottpm">
             <ul class="title-list">
                        <li class="t-member">币种</li>
                        <li class="t-member" style="border-left:0px;">单笔手续费</li>
                </ul>
                <ul class="data-list">
                    <li class="t-member" v-for="(item , index) in currency" :key="index">
                        <span class="f-db">{{index}}</span>
                        <span class="f-db" style="border-left: 0px;">{{item}}</span>
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
    return {
      // 币种
      currency: {
        BTC: "0.001",
        ETH: "0.01",
        XRP: "0.1",
        SWT: "10",
        DOGE: "10",
        FTCT: "1",
        CSC: "1",
        CFC: "1",
        NLC: "0.1",
        LTC: "0.01",
        // VAAC: "",
      }
    };
  },
  created() { 
      document.title = this.$t('text_info.costDescription');      
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.costDescription {
  width: 1000px;
  margin: 0 auto;
  padding: 60px 0px 250px 0px;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    p {
      .span-left,
      .span-right {
        display: inline-block;
        width: 170px;
        height: 2px;
        background: linear-gradient(left, #ffffff, #333);
        margin-bottom: 6px;
      }
      .span-right {
        background: linear-gradient(right, #ffffff, #333);
      }
    }
  }
  .costDescription-content {
    padding-top: 52px;
    .costDescription-title {
      position: relative;
      span {
        font-size: 18px;
        width: 126px;
        height: 48px;
        text-align: center;
        color: #ffffff;
        vertical-align: middle;
        position: absolute;
        left: 0px;
        top: 6px;
      }
      i {
        vertical-align: middle;
        width: 126px;
        height: 48px;
        background: url("../../../common/assets/images/bottom.png") no-repeat;
        background-size: 100%;
      }
    }
    .content-top {
      padding: 52px 0px 108px 42px;
      p:nth-of-type(1) {
        font-size: 16px;
        color: #333;
        i {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: #fc923f;
          margin-right: 14px;
        }
      }
      p:nth-of-type(2) {
        padding: 50px 0px 0px 20px;
        font-size: 14px;
        color: #666666;
      }
    }
    .content-bottpm {
      .title-list {
        padding-top: 48px;
        width: 100%;
        color: #333;
        font-size: 12px;
        display: flex;
        line-height: 50px;
        .t-member {
          flex: 2;
          text-align: center;
        }
      }
      .data-list {
        width: 100%;
        font-size: 12px;
        background-color: #f0f0f7;
        .t-member {
          width: 100%;
          display: flex;
          border-bottom: 1px dashed #dddddd;
          height: 40px;
          line-height: 40px;
          > span {
            flex: 2;
            color: #495060;
            text-align: center;
            border-top: 0px;
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
 