<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">法律声明</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p>
                <span>
                    香港新思路科技有限公司科技有限公司位于香港，注册地址为香港九龙旺角道33号    。本声明适用于香港新思路科技有限公司科技提供或运行（包括网站和移动应用程序）服务的操作。香港新思路科技有限公司科技科技有限公司以下称为“Bit One特壹交易中心”。</span>
            </p>
            <p>
                <span>请确保您在使用Bit One特壹交易中心服务前阅读并理解以下声明。</span>
            </p>
            <p>
                <strong><span>无信托责任、无投资提议、无投资招揽</span></strong>
            </p>
            <p>
                <span>Bit One特壹交易中心对使用其服务的客户没有信托责任。此外，Bit One特壹交易中心明确保留一切在任何时间改变其服务的价格或产品构成的权力。</span>
            </p>
            <p>
                <span>Bit One特壹交易中心的服务提供的信息并不构成购买或处置金融资产的投资提议或投资招揽。投资者不可依赖于这些信息做出投资决策。</span>
            </p>
            <p>
                <strong><span>无保证、无责任</span></strong>
            </p>
            <p>
                <span>Bit One特壹交易中心努力在其网站提供精确并及时的信息的同时，并不代表Bit One特壹交易中心为其所提供的任何材料作担保。</span>
            </p>
            <p>
                <span>不影响以上段落所述，Bit One特壹交易中心不保证以下内容：</span>
            </p>
            <p>
                <span> Bit One特壹交易中心服务所提供的信息将持续或永久有效。</span>
            </p>
            <p>
                <span>Bit One特壹交易中心服务所提供的信息是完整、真实、准确、最新或没有误导的。</span>
            </p>
            <p>
                <span>您不应该由于Bit One特壹交易中心服务所提供的信息，延迟寻求法律建议、漠视法律建议、开始或停止任何法律行动。</span>
            </p>
            <p>
                <strong><span>责任</span></strong>
            </p>
            <p>
                <span>本法律声明不会以任何形式限制Bit One特壹交易中心在适用法律外的任何责任，或排除可能不在适用法律外的Bit One特壹交易中心任何的责任。</span>
            </p>
            <p>
                <strong><span>链接</span></strong>
            </p>
            <p>
                <span>提供第三方网站链接只是为了提供便利。Bit One特壹交易中心不对任何第三方网站的内容发表任何意见，并明确表示不承担所有的第三方信息的任何责任或义务。如果您使用Bit One特壹交易中心服务中提供的链接到任何其他网站，您将完全自行承担相关风险。</span>
            </p>
            <p>
                <strong><span>商标</span></strong>
            </p>
            <p>
                <span>所有提到的商标均属于或受Bit One特壹交易中心许可。</span>
            </p>
            <p>
                <strong><span>版权</span></strong>
            </p>
            <p>
                <span> Bit One特壹交易中心服务和其包含及引用的信息仅供参考。任何复制、转发或其他使用是严格禁止的。应在http://www.BitOne.cc 页面寻求业务拓展联络方式并提供相关请求。</span>
            </p>
        </div>
    </div>
</template>
<script>
import eventBus from '@common/eventBus/eventBus';
export default {
  data() {
    return {};
  },
  created() {
    document.title = this.$t("text_info.lawDeclare");
    eventBus.$on("convertFont", () => {
      document.title = this.$t("text_info.lawDeclare");
    });
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
