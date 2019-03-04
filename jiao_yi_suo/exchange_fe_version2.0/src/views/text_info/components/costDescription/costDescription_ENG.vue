<template>
 <div class='costDescription'>
    <div class="title">
        <p>
            <span class="span-left"></span>
            <span style="margin:0px 36px;">Bit one Expense description</span>
            <span class="span-right"></span>
        </p>
    </div>
    <div class="costDescription-content">
        <div class="costDescription-title">
            <i class="icon f-ib"></i>
            <span class="f-ib">Transaction Fees</span>
        </div>
        <div class="content-top">
            <p><i class="f-ib"></i>All transaction rates are 0.2% and are only charged after the transaction is successful. There is no handling fee for the withdrawal of the order.</p>
            <p>Example: Sell ETH/BTC at a price of 0.07, and the number of orders placed is 200. When the transaction is 100, the transaction amount is 7ETH. According to the handling fee = turnover * handling rate, the actual charge is 7 * 0.2% = 0.014ETH. If the unsold part of the withdrawal at this time is no longer charged a handling fee.
            </p>
        </div>
        <div class="costDescription-title">
            <i class="icon f-ib"></i>
            <span class="f-ib">Coin fee</span>
        </div>
        <div class="content-bottpm">
             <ul class="title-list">
                        <li class="t-member">Currency</li>
                        <li class="t-member" style="border-left:0px;">Single Handling Fee</li>
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
import eventBus from "@common/eventBus/eventBus";

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
        LTC: "0.01"
        // VAAC: "",
      }
    };
  },
  created() {
    document.title = this.$t("text_info.costDescription");
    eventBus.$on("convertFont", () => {
      this.$router.go(0);
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
        background: url("../../../../common/assets/images/bottom.png") no-repeat;
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
 