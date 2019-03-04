<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">Common problems</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p><strong><span>1.Account security</span></strong></p>
            <p><strong><span>Register your phone</span></strong></p>
            <p>
                <span>Enter the mobile phone number and login password, and enter the SMS verification code received by the mobile phone number to register successfully. This mobile number will be used as a voucher when you retrieve your password.</span>
            </p>
            <p><strong><span> Verified</span></strong></p>
            <p>
                <span>Submitting your real name and ID number will help protect your account.</span>
            </p>
            <p>
                <strong><span>Change/forgot login password</span></strong>
            </p>
            <p>
                <span>If you forget your password or need to change your password, you need to verify your registered mobile phone and enter the received SMS verification code to set a new password.</span>
            </p>
            <p>
                <strong><span>Fund password</span></strong>
            </p>
            <p>
               <span>In order to protect the security of the account, the fund password is the password that needs to be input when the funds change, and the identity is verified in the operation transaction or cash withdrawal.</span>
            </p>
            <p>
                <strong><span>2.Recharge cash withdrawal</span></strong>
            </p>
            <p>
                <strong><span>Recharge</span></strong>
            </p>
            <p>
                <span>After successful login, click on the fund management 》 recharge management, select the currency that needs to be recharged, you can check your exclusive recharge address, and directly charge the coin to this address.</span>
            </p>
            <p>
                <span>Do not recharge any of the above-mentioned addresses for any non-selected currency assets, otherwise the assets will not be retrievable.</span>
            </p>
            <p>
                <span>The minimum recharge amount depends on the currency. For details, please refer to the “Recharge Instructions” on the recharge page. If the recharge is less than the minimum amount, the recharge will not be credited.</span>
            </p>
            <p>
                <strong><span>withdraw</span></strong>
            </p>
            <p>
                <span>After successful login, click “Fund Management” to withdraw the management, select the currency to be withdrawn, and enter the SMS verification code/funding password to generate a new withdrawal address. Enter the quantity you need to withdraw.</span>
            </p>
            <p>
                <span>Actual arrival amount = number of coins – coin handling fee</span>
            </p>
            <p>
                <span>The currency limit and handling fee are different in different currencies, mainly based on the release of the management page.</span>
            </p>
            <p>
                <span>When the user withdraws the money to the audited address, according to the assessed risk score, the coin may be raised without manual review; if the system detects that the account is abnormal, it is transferred to manual review.</span>
            </p>
            <p>
                <span>Please do not disclose your password, SMS verification code, etc. to anyone.</span>
            </p>
            <p>
                <strong><span>Ripple recharge tag</span></strong>
            </p>
            <p>
                <span>Most major exchanges must add a special currency (XRP) when they are tagged, that is, each person's XRP assets are distinguished by tags. Therefore, when filling the currency, you need to add a label to prove who the assets are, otherwise it will result in the funds not being able to be credited.</span>
            </p>
            <p>
                <strong><span>3.Currency trading</span></strong>
            </p>
            <p>
                <strong><span>Currency transaction</span></strong>
            </p>
            <p>
                <span>After logging in successfully, click on the menu "Trading Centre" and select the currency you want to buy or sell on the left. In the Buy/Sell publishing block below the market Kanban, enter the price and quantity as needed, and the market price will fluctuate. The price can be settled. If you use the default price (market price) to trade, the transaction speed is faster (depending on the situation)</span>
            </p>
            <p>
                <span>The currently uncommitted commission will appear in the "current commission" area and can be withdrawn at any time.</span>
            </p>
            <p>
                <strong><span>Transaction limit</span></strong>
            </p>
            <p>
                <strong><span>BTC trading area</span></strong>
            </p>
            <p>
               <ul class="title-list">
                        <li class="t-member">Transaction pair</li>
                        <li class="t-member" style="border-left:0px;">Minimum transaction volume</li>
                </ul>
                <ul class="data-list">
                    <li class="t-member" v-for="(item , index) in BTCtransactionPairList" :key="index">
                        <span class="f-db">{{index}}</span>
                        <span class="f-db" style="border-left: 0px;">{{item}}</span>
                    </li>
                </ul>
            </p>
            <p>
                <strong><span>ETH trading area</span></strong>
            </p>
            <p>
                <ul class="title-list">
                        <li class="t-member">Transaction pair</li>
                        <li class="t-member" style="border-left:0px;">Minimum transaction volume</li>
                </ul>
                <ul class="data-list">
                    <li class="t-member" v-for="(item , index) in RETHtransactionPairList" :key="index">
                        <span class="f-db">{{index}}</span>
                        <span class="f-db" style="border-left: 0px;">{{item}}</span>
                    </li>
                </ul>
            </p>
        </div>
    </div>
</template>
<script>
import eventBus from "@common/eventBus/eventBus";
export default {
  data() {
    return {
      // BTC交易对
      BTCtransactionPairList: {
        "ETH/BTC": "0.001",
        "XRP/BTC": "1",
        "SWT/BTC": "100",
        "DOGE/BTC": "100",
        "FTCT/BTC": "10",
        "CSC/BTC": "10",
        "CFC/BTC": "10",
        "NLC/BTC": "1",
        "LTC/BTTC": "0.001",
        "VAAC/BTTC": "1"
      },
      //   RETH 交易对
      RETHtransactionPairList: {
        "XRP/ETH": "1",
        "SWT/ETH": "100",
        "DOGE/ETH": "100",
        "FTCT/ETH": "10",
        "CSC/ETH": "10",
        "CFC/ETH": "10",
        "NLC/ETH": "1",
        "LTC/ETH": "0.001",
        "VAAC/ETH": "1"
      }
    };
  },
  created() {
    document.title = this.$t("text_info.commonQuestion");
    eventBus.$on("convertFont", () => {
      this.$router.go(0);
    });
  },
  beforeDestroy() {
    eventBus.$off("convertFont");
  }
};
</script>

<style lang="scss"  scoped="scoped">
.registerAgreement {
  padding-bottom: 250px;
  .title {
    text-align: center;
    padding: 80px 0px;
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
  .content {
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    background-color: #fff;
    padding: 40px;
    p {
      line-height: 30px;
      span {
        font-size: 12px;
        color: #666666;
      }
      strong {
        span {
          color: #333;
        }
      }
    }
    .title-list {
      width: 100%;
      color: #333;
      display: flex;
      .t-member {
        flex: 2;
        text-align: center;
        border: 1px solid #333;
      }
    }
    .data-list {
      width: 100%;
      padding-bottom: 40px;
      font-size: 12px;
      .t-member {
        width: 100%;
        display: flex;
        > span {
          flex: 2;
          color: #495060;
          text-align: center;
          border: 1px solid #333;
          border-top: 0px;
          .confirm {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .last {
          justify-content: space-between;
          button {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
