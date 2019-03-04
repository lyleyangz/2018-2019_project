<template>
	<div class="share_model">
        <div class="share_model_content" >
			<div class="share_model_close">
				<span @click="off()"></span>
			</div>
			<div class="text">
				<div class="share_model_body">
					<div class="top">
						<img :src="shareData.cover" alt="">
					</div>
					<div class="content">
						
						<div class="title">{{shareData.proName}}：￥{{shareData.price}}</div>
						<div class="introduce" v-if="shareData.type==1">
							<p>你的好友{{shareData.name}}</p>
							<p>送给您一份神秘珠宝大礼包！</p>                                
						</div>
						<div class="introduce" v-if="shareData.type==2">
							<p>说明</p>
							<p>劳动获得的TOKEN可用于购买此商品！只需每日登录，观看商品查看商品溯源信息等，就可以获得TOKEN！完成劳动后，商品会有惊喜价格哟！</p>                                
						</div>
						<div class="QRcode">
							<div class="up" v-if="shareData.type==2">登录转发分享出去，邀请好友注册成功，您将获得TOKEN奖励！好友首次购买成功，您将再次获得TOKEN奖励</div>
							<div class="mid">
								<div class="mid_text">—长按识别二维码—</div>
								<div class="mid_code" v-if="share_QRcode">
									<img :src="share_QRcode" alt="">
								</div>
								<div class="mid_foot">
									<p>将图片保存发送给好友或分享到朋友圈</p>
									<p>澳绿宝区块链珠宝溯源商城</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>

    </div>
</template>

<script>
import { Toast } from "mint-ui";
import eventBus from "@/common/eventBus/eventBus.js";
import QRCode from "qrcode";
export default {
	components: {},
	props: {
		shareData:{
            type: Object,
            default: function(){
                return {}
            }
        }
	},
	data() {
		return {
			share_QRcode: null
		};
	},
	created() {
		
	},
	mounted() {
		this.bindQRCode(this.shareData.shareUrl);
	},
	methods: {
		off() {
			//shareOff
			eventBus.$emit("shareOff");
		},
		// 生成二维码
		bindQRCode(url) {
			var _this = this;
			var opts = {
				width: 128,
				height: 128
			};
			QRCode.toDataURL(url, opts).then(url => {
				_this.share_QRcode = url;
			}).catch(err => {
				console.error(err);
			});
		}
	}
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.share_model {
  position: relative;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  background-color: rgba(153, 153, 153, 0.75);
  display: flex;
  animation: model_animation 0.5s;
  .share_model_content {
    .share_model_close {
      position: absolute;
      width: 100%;
      span {
        display: inline-block;
        width: 0.706667rem;
        height: 0.706667rem;
        background-image: url("../../../../../common/assets/images/shopping/share_close.png");
        background-size: contain;
      }
    }
    width: 100%;
    padding: 0.5rem 0.4rem 0.72rem;
    display: inherit;
    .text {
	  margin-top: 0.7rem;
	  width: 100%;
      .share_model_body {
        border-radius: 0.133333rem;
        overflow: hidden;
        background-color: #ffffff;
        .top {
          // width: 8.666667rem;
          height: 4.12rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          padding: 0 0.24rem 0.573333rem;
          .title {
            margin: 0.266667rem auto;
            text-align: center;
          }
          .introduce {
            margin-bottom: 0.666667rem;
            p {
              @include font-dpr(11px);
              font-family: "FZLTXHK--GBK1-0";
              color: #333333;
              line-height: 0.466667rem;
              &:nth-child(2) {
                margin-top: 0.186667rem;
              }
            }
          }
          //   二维码
          .QRcode {
            .up {
              @include font-dpr(11px);
              color: #ff0000;
              font-family: "FZLTXHK--GBK1-0";
              margin-bottom: 0.706667rem;
            }
            .mid {
              .mid_text {
                @include font-dpr(13px);
                text-align: center;
                line-height: 0.4rem;
                font-family: "PingFangSC-Regular";
                color: #000000;
              }
              .mid_code {
                width: 3.213333rem;
                height: 3.213333rem;
                overflow: hidden;
                margin: 0.066667rem auto 0.2rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .mid_foot {
                @include font-dpr(14px);
                text-align: center;
                font-family: "PingFangSC-Regular";
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.4rem;
                letter-spacing: 0.013333rem;
                color: #000000;
                p {
                  &:nth-child(2) {
                    margin-top: 0.426667rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/*增加动画animation*/
@keyframes model_animation {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>