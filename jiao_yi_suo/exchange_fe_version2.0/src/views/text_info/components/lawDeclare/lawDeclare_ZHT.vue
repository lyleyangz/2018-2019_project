<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">法律聲明</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p>
                <span>
                    香港新思路科技有限公司科技有限公司位于香港，注冊地址爲香港九龍旺角道33號。本聲明適用于香港新思路科技有限公司科技提供或運行（包括網站和移動應用程序）服務的操作。香港新思路科技有限公司科技科技有限公司以下稱爲“Bit One特壹交易中心”。</span>
            </p>
            <p>
                <span>請確保您在使用Bit One特壹交易中心服務前閱讀並理解以下聲明。</span>
            </p>
            <p>
                <strong><span>無信托責任、無投資提議、無投資招攬</span></strong>
            </p>
            <p>
                <span>Bit One特壹交易中心對使用其服務的客戶沒有信托責任。此外，Bit One特壹交易中心明確保留一切在任何時間改變其服務的價格或産品構成的權力。</span>
            </p>
            <p>
                <span>Bit One特壹交易中心的服務提供的信息並不構成購買或處置金融資産的投資提議或投資招攬。投資者不可依賴于這些信息做出投資決策。</span>
            </p>
            <p>
                <strong><span>無保證、無責任</span></strong>
            </p>
            <p>
                <span>Bit One特壹交易中心努力在其網站提供精確並及時的信息的同時，並不代表Bit One特壹交易中心爲其所提供的任何材料作擔保。</span>
            </p>
            <p>
                <span>不影響以上段落所述，Bit One特壹交易中心不保證以下內容：</span>
            </p>
            <p>
                <span>Bit One特壹交易中心服務所提供的信息將持續或永久有效。</span>
            </p>
            <p>
                <span>Bit One特壹交易中心服務所提供的信息是完整、真實、准確、最新或沒有誤導的。</span>
            </p>
            <p>
                <span>您不應該由于Bit One特壹交易中心服務所提供的信息，延遲尋求法律建議、漠視法律建議、開始或停止任何法律行動。</span>
            </p>
            <p>
                <strong><span>責任</span></strong>
            </p>
            <p>
                <span>本法律聲明不會以任何形式限制Bit One特壹交易中心在適用法律外的任何責任，或排除可能不在適用法律外的Bit One特壹交易中心任何的責任。</span>
            </p>
            <p>
                <strong><span>鏈接</span></strong>
            </p>
            <p>
                <span>提供第三方網站鏈接只是爲了提供便利。Bit One特壹交易中心不對任何第三方網站的內容發表任何意見，並明確表示不承擔所有的第三方信息的任何責任或義務。如果您使用Bit One特壹交易中心服務中提供的鏈接到任何其他網站，您將完全自行承擔相關風險。</span>
            </p>
            <p>
                <strong><span>商標</span></strong>
            </p>
            <p>
                <span>所有提到的商標均屬于或受Bit One特壹交易中心許可。</span>
            </p>
            <p>
                <strong><span>版權</span></strong>
            </p>
            <p>
                <span>Bit One特壹交易中心服務和其包含及引用的信息僅供參考。任何複制、轉發或其他使用是嚴格禁止的。應在http://www.BitOne.cc 頁面尋求業務拓展聯絡方式並提供相關請求。</span>
            </p>
        </div>
    </div>
</template>
<script>
import eventBus from "@common/eventBus/eventBus";
export default {
  data() {
    return {};
  },
  created() {
    document.title = this.$t("text_info.lawDeclare");
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
  }
}
</style>
