<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">常見問題</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p><strong><span>1.賬戶安全</span></strong></p>
            <p><strong><span>手機注冊</span></strong></p>
            <p>
                <span>輸入手機號碼和登錄密碼，輸入該手機號碼收到的短信驗證碼即可注冊成功。此手機號碼將在您找回密碼的時候作爲憑證。</span>
            </p>
            <p><strong><span>實名認證</span></strong></p>
            <p>
                <span>提交真實姓名和身份證號碼，將有利于保障您的賬戶安全。</span>
            </p>
            <p>
                <strong><span>更改/忘記登錄密碼</span></strong>
            </p>
            <p>
                <span>若您忘記密碼或需要更改密碼時，需要驗證注冊手機，輸入收到的短信驗證碼即可設置新密碼。</span>
            </p>
            <p>
                <strong><span>資金密碼</span></strong>
            </p>
            <p>
               <span>爲保障賬戶安全，資金密碼是資金變動時需要輸入的資金密碼，在操作交易或提現時驗證身份。</span>
            </p>
            <p>
                <strong><span>2.充值提現</span></strong>
            </p>
            <p>
                <strong><span>充值</span></strong>
            </p>
            <p>
                <span>登錄成功之後點擊資金管理 》充值管理，選擇需要充值的幣種，可以查看到您專屬的充值地址，直接將幣充到這個地址即可。</span>
            </p>
            <p>
                <span>請勿向上述地址充值任何非所選幣種資産，否則資産將不可找回。</span>
            </p>
            <p>
                <span>最小充值金額依幣種而定 ，具體見于充值頁面的”充值須知”，小于最小金額的充值將不會上賬。</span>
            </p>
            <p>
                <strong><span>提現</span></strong>
            </p>
            <p>
                <span>登錄成功之後點擊資金管理 》提現管理，選擇需要提現的幣種，輸入短信驗證碼/資金密碼後，可生成新的提現地址。輸入需要提現的數量即可。</span>
            </p>
            <p>
                <span>實際到賬數量=提幣數量 – 提幣手續費</span>
            </p>
            <p>
                <span>不同幣種提幣限額和手續費不同，以提現管理頁面公布爲主。</span>
            </p>
            <p>
                <span>用戶提幣到已審核的地址時，根據評估的風險分值，可能無需人工審核即可提幣；若系統檢測發現賬戶異常，則轉移至人工審核。</span>
            </p>
            <p>
                <span>請不要透露密碼、短信驗證碼等給任何人。</span>
            </p>
            <p>
                <strong><span>Ripple充值標簽</span></strong>
            </p>
            <p>
                <span>大部分主流交易所提特殊幣種（XRP）時必須添加標簽，即每個人的XRP資産是通過標簽來區分的。所以在充幣時，需要添加標簽才可以證明是誰的資産，否則將導致資金無法上賬。</span>
            </p>
            <p>
                <strong><span>3.幣幣交易</span></strong>
            </p>
            <p>
                <strong><span>幣幣交易</span></strong>
            </p>
            <p>
                <span>登錄成功後點擊菜單”交易中心”，在左側選擇想要買入或賣出的幣種，在行情看板下方的買入/賣出版塊中，根據需要輸入價格和數量，市場價格波動到設定的價格便可成交。若使用默認價格（市價）交易，成交速度較快（視具體情況而定)</span>
            </p>
            <p>
                <span>當前未成交的委托會出現在“當前委托”區域，可以隨時撤回。</span>
            </p>
            <p>
                <strong><span>交易限額</span></strong>
            </p>
            <p>
                <strong><span>BTC交易區</span></strong>
            </p>
            <p>
               <ul class="title-list">
                        <li class="t-member">交易對</li>
                        <li class="t-member" style="border-left:0px;">最小交易量</li>
                </ul>
                <ul class="data-list">
                    <li class="t-member" v-for="(item , index) in BTCtransactionPairList" :key="index">
                        <span class="f-db">{{index}}</span>
                        <span class="f-db" style="border-left: 0px;">{{item}}</span>
                    </li>
                </ul>
            </p>
            <p>
                <strong><span>RETH交易區</span></strong>
            </p>
            <p>
                <ul class="title-list">
                        <li class="t-member">交易對</li>
                        <li class="t-member" style="border-left:0px;">最小交易量</li>
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
