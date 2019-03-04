<template>
 <div class='noviceGuide '>
    <div class="bg">
        <div class="text-step1"><i class="f-ib"></i><span>使用手機注冊，確認驗證碼即注冊成功。</span></div>
        <div class="text-step2"><i class="f-ib"></i><span>完成實名驗證需要真實姓名和身份證信息，將有利于保障您的賬戶安全</span></div>
        <div class="text-step3"><i class="f-ib"></i>
            <span>登錄成功之後點擊資金管理》充值管理，</span></br>
            <span style="margin-left:24px;">以BTC充值爲例，可以查看到您專屬的BTC的充值地址，直接將幣衝到這個地址即可</span>
            <div>
                <p>溫馨提示</p>
                <p>請勿向上述地址充值任何非BTC資産，否則資産將不可找回。</p>
                <p>您充值至上述地址後，需要整個網絡節點的確認，爲快速到賬，您可以向網絡支付少量手續費。到賬時間一般爲10分鍾-60分鍾。</p>
                <p>最小充值金額：0.0001 ，小于最小金額的充值將不會上賬。</p>
            </div>
        </div>
        <div class="text-step4"><i class="f-ib"></i><span>以BTC換VAAC爲例，點擊交易中心，選擇VAAC，根據需要輸入價格和數量，市場價格波動到設定的價格便可成交。若使用默認價格（市價）交易，成交速度較快（視具體情況而定）</span></div>
        <div class="text-step5"><i class="f-ib"></i><span>當前未成交的委托會出現在“當前委托”區域，您可以隨時撤回。</span></div>
        <div class="text-step6"><i class="f-ib"></i><span>資金密碼爲操作賬戶數字幣時需要輸入的密碼，爲您的賬戶安全再加一層保障</span></div>   
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
    background: url("../../../../common/assets/images/ZHT/Novice-Guide.png") no-repeat;
    background-size: 100%;
    position: relative;
    div {
      position: absolute;
      color: #333;
      font-size: 16px;
      width: 450px;
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
 