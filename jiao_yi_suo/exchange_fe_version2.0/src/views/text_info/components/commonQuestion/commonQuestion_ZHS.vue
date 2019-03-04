<template>
    <div class="registerAgreement">
        <div class="title">
            <p>
                <span class="span-left"></span>
                <span style="margin:0px 36px;">常见问题</span>
                <span class="span-right"></span>
            </p>
        </div>
        <div class="content">
            <p><strong><span>1.账户安全</span></strong></p>
            <p><strong><span>手机注册</span></strong></p>
            <p>
                <span> 输入手机号码和登录密码，输入该手机号码收到的短信验证码即可注册成功。此手机号码将在您找回密码的时候作为凭证。</span>
            </p>
            <p><strong><span> 实名认证</span></strong></p>
            <p>
                <span>提交真实姓名和身份证号码，将有利于保障您的账户安全。</span>
            </p>
            <p>
                <strong><span>更改/忘记登录密码</span></strong>
            </p>
            <p>
                <span>若您忘记密码或需要更改密码时，需要验证注册手机，输入收到的短信验证码即可设置新密码。</span>
            </p>
            <p>
                <strong><span>资金密码</span></strong>
            </p>
            <p>
               <span>为保障账户安全，资金密码是资金变动时需要输入的资金密码，在操作交易或提现时验证身份。</span>
            </p>
            <p>
                <strong><span>2.充值提现</span></strong>
            </p>
            <p>
                <strong><span>充值</span></strong>
            </p>
            <p>
                <span>登录成功之后点击资金管理 》充值管理，选择需要充值的币种，可以查看到您专属的充值地址，直接将币充到这个地址即可。</span>
            </p>
            <p>
                <span> 请勿向上述地址充值任何非所选币种资产，否则资产将不可找回。</span>
            </p>
            <p>
                <span>最小充值金额依币种而定 ，具体见于充值页面的”充值须知”，小于最小金额的充值将不会上账。</span>
            </p>
            <p>
                <strong><span>提现</span></strong>
            </p>
            <p>
                <span>登录成功之后点击资金管理 》提现管理，选择需要提现的币种，输入短信验证码/资金密码后，可生成新的提现地址。输入需要提现的数量即可。</span>
            </p>
            <p>
                <span> 实际到账数量=提币数量 – 提币手续费</span>
            </p>
            <p>
                <span>不同币种提币限额和手续费不同，以提现管理页面公布为主。</span>
            </p>
            <p>
                <span>用户提币到已审核的地址时，根据评估的风险分值，可能无需人工审核即可提币；若系统检测发现账户异常，则转移至人工审核。</span>
            </p>
            <p>
                <span>请不要透露密码、短信验证码等给任何人。</span>
            </p>
            <p>
                <strong><span>Ripple充值标签</span></strong>
            </p>
            <p>
                <span>大部分主流交易所提特殊币种（XRP）时必须添加标签，即每个人的XRP资产是通过标签来区分的。所以在充币时，需要添加标签才可以证明是谁的资产，否则将导致资金无法上账。</span>
            </p>
            <p>
                <strong><span>3.币币交易</span></strong>
            </p>
            <p>
                <strong><span>币币交易</span></strong>
            </p>
            <p>
                <span>登录成功后点击菜单”交易中心”，在左侧选择想要买入或卖出的币种，在行情看板下方的买入/卖出版块中，根据需要输入价格和数量，市场价格波动到设定的价格便可成交。若使用默认价格（市价）交易，成交速度较快（视具体情况而定</span>
            </p>
            <p>
                <span>当前未成交的委托会出现在“当前委托”区域，可以随时撤回。</span>
            </p>
            <p>
                <strong><span>交易限额</span></strong>
            </p>
            <p>
                <strong><span>BTC交易区</span></strong>
            </p>
            <p>
               <ul class="title-list">
                        <li class="t-member">交易对</li>
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
                <strong><span>ETH交易区</span></strong>
            </p>
            <p>
                <ul class="title-list">
                        <li class="t-member">交易对</li>
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
