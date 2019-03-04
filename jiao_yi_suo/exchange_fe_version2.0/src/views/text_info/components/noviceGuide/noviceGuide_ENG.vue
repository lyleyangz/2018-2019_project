<template>
 <div class='noviceGuide '>
    <div class="bg">
        <div class="text-step1"><i class="f-ib"></i><span>Use your mobile phone to register and confirm the verification code and the registration is successful.</span></div>
        <div class="text-step2"><i class="f-ib"></i><span>Real-name verification requires real name and ID information, which will help protect your account.</span></div>
        <div class="text-step3"><i class="f-ib"></i>
            <span>After successful login, click on Money Management" recharge management.</span></br>
            <span style="margin-left:24px;">Take the BTC recharge example as an example, you can check the recharge address of your exclusive BTC and directly transfer the currency to this address.</span>
            <div>
                <p>Reminder</p>
                <p>Do not recharge any non-BTC assets to the above address, otherwise the assets will not be recovered.</p>
                <p>After you recharge to the above address, you need confirmation from the entire network node. For fast arrival, you can pay a small fee to the network. The arrival time is usually 10 minutes - 60 minutes.</p>
                <p>Minimum recharge amount: 0.0001, the recharge value less than the minimum amount will not be credited.</p>
            </div>
        </div>
        <div class="text-step4"><i class="f-ib"></i><span>Take BTC for VAC as an example. Click on the trading centre, select VAC, enter the price and quantity as needed, and the market price will fluctuate to the set price. If you use the default price (market price) to trade, the transaction speed is faster (depending on the situation)</span></div>
        <div class="text-step5"><i class="f-ib"></i><span>The currently uncommitted delegate will appear in the "Current Entrustment" area and you can withdraw it at any time.</span></div>
        <div class="text-step6"><i class="f-ib"></i><span>The fund password is the password you need to enter when operating the account digital currency, adding a layer of protection for your account security.</span></div>   
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
    document.title = this.$t("text_info.NoviceGuide");
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
.noviceGuide {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0px 100px 0px;
  .bg {
    width: 1067px;
    height: 2106px;
    background: url("../../../../common/assets/images/ENG/Novice-Guide.png") no-repeat;
    background-size: 100%;
    position: relative;
    div {
      position: absolute;
      color: #333;
      font-size: 16px;
      width: 625px;
      word-wrap: break-word;
      word-break: normal;
      i {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #fc923f;
        margin-right: 14px;
      }
    }
    div.text-step1 {
      top: 260px;
      left: 50px;
    }
    div.text-step2 {
      top: 640px;
      left: 420px;
    }
    div.text-step3 {
      top: 950px;
      left: 50px;
      span {
        color: #333;
      }
      div {
        padding: 18px 0px 0px 24px;
        p {
          font-size: 12px;
          color: #999999;
        }
      }
    }
    div.text-step4 {
      top: 1360px;
      left: 420px;
    }
    div.text-step5 {
      top: 1600px;
      left: 50px;
    }
    div.text-step6 {
      top: 1960px;
      left: 420px;
    }
  }
}
</style>
 