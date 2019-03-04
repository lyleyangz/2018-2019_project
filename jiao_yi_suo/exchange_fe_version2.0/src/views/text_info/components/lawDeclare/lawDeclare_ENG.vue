<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">Legal statement</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p>
                <span>
                    Hong Kong New Idea Technology Co., Ltd. is located in Hong Kong with registered address at 33 MongKok Road, Kowloon, Hong Kong. This statement applies to the operation of Hong Kong New Idea Technology Co., Ltd. technology to provide or operate (including website and mobile applications) services. Hong Kong New Idea Technology Co., Ltd. Technology Technology Co., Ltd. is hereinafter referred to as "Bit One Special Trading Center".</span>
            </p>
            <p>
                <span>Please ensure that you read and understand the following statement before using the Bit One Special Trading Center service.</span>
            </p>
            <p>
                <strong><span>No fiduciary duty, no investment proposal, no investment solicitation</span></strong>
            </p>
            <p>
                <span>Bit One Special Trading Center has no fiduciary responsibility for customers who use its services. In addition, Bit One Special Trading Center expressly reserves the right to change the price or composition of its services at any time.</span>
            </p>
            <p>
                <span>The information provided by the services of the Bit One Special Trading Center does not constitute investment proposals or investment solicitations for the purchase or disposal of financial assets. Investors cannot rely on this information to make investment decisions.</span>
            </p>
            <p>
                <strong><span>No guarantee, no responsibility</span></strong>
            </p>
            <p>
                <span>Bit One Special Trading Center strives to provide accurate and timely information on its website and does not represent BitOne's special trading center as a guarantee for any material it provides.</span>
            </p>
            <p>
                <span>Without affecting the above paragraphs, the Bit One Special Trading Center does not guarantee the following:</span>
            </p>
            <p>
                <span>The information provided by Bit One Special Trading Center Services will continue or be permanently valid.</span>
            </p>
            <p>
                <span>The information provided by the Bit One Special Trading Center Service is complete, true, accurate, current or not misleading.</span>
            </p>
            <p>
                <span>You should not delay seeking legal advice, disregard legal advice, or start or stop any legal action due to information provided by the Bit One Special Trading Center service.</span>
            </p>
            <p>
                <strong><span>Responsibility</span></strong>
            </p>
            <p>
                <span>This Legal Notice does not in any way limit any liability of the Bit One Special Trading Center outside of applicable law or exclude any liability of the Bit One Special Trading Center that may not be outside the applicable law.</span>
            </p>
            <p>
                <strong><span>Link</span></strong>
            </p>
            <p>
                <span>Links to third party websites are provided for convenience only. Bit One Special Trading Center does not express any opinion on the content of any third party website and expressly disclaims any responsibility or liability for all third party information. If you use the link provided in the Bit One Special Trading Center service to any other website, you do so at your own risk.</span>
            </p>
            <p>
                <strong><span>Trademark</span></strong>
            </p>
            <p>
                <span>All trademarks mentioned are subject to or licensed by the Bit One Special Trading Center.</span>
            </p>
            <p>
                <strong><span>Copyright</span></strong>
            </p>
            <p>
                <span>The Bit One Special Trading Center service and the information it contains and references are for reference only. Any copying, forwarding or other use is strictly prohibited. You should seek business development contact information and provide relevant requests on the http://www.BitOne.cc page.</span>
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
  mounted() {},
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
