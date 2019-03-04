<template>
 <div class='noviceGuide '>
    <div class="bg">
        <div class="text-step1"><i class="f-ib"></i><span>使用手机注册，确认验证码即注册成功。</span></div>
        <div class="text-step2"><i class="f-ib"></i><span>完成实名验证需要真实姓名和身份证信息，将有利于保障您的账户安全</span></div>
        <div class="text-step3"><i class="f-ib"></i>
            <span>登录成功之后点击资金管理》充值管理，</span></br>
            <span style="margin-left:24px;">以BTC充值为例，可以查看到您专属的BTC的充值地址，直接将币冲到这个地址即可</span>
            <div>
                <p>温馨提示</p>
                <p>请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</p>
                <p>您充值至上述地址后，需要整个网络节点的确认，为快速到账，您可以向网络支付少量手续费。到账时间一般为10分钟-60分钟。</p>
                <p>最小充值金额：0.0001 ，小于最小金额的充值将不会上账。</p>
            </div>
        </div>
        <div class="text-step4"><i class="f-ib"></i><span>以BTC换VAAC为例，点击交易中心，选择VAAC，根据需要输入价格和数量，市场价格波动到设定的价格便可成交。若使用默认价格（市价）交易，成交速度较快（视具体情况而定）</span></div>
        <div class="text-step5"><i class="f-ib"></i><span>当前未成交的委托会出现在“当前委托”区域，您可以随时撤回。</span></div>
        <div class="text-step6"><i class="f-ib"></i><span>资金密码为操作账户数字币时需要输入的密码，为您的账户安全再加一层保障</span></div>   
    </div>
 </div>
</template>
 
<script>
import {} from "@api/api_group";

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
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
    background: url("../../../common/assets/images/new.png") no-repeat;
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
 