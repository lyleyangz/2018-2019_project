<template>
	<div class="TestProof">
		<div class="TestProof_header">
			<v-header head="检测证明"></v-header>
		</div>
    <div class="TestProof_content">
      <div class="first_nfc">
            <div class="border_content">
                <div class="first_nfc_leftTitle">
                    <span class="bg_gradual_change">质检机构溯源信息</span>
                </div>
                <!-- 第二层国家检测 -->
                    <div class="first_nfc_content" v-if="chainProvesTrace">
                    <!-- 循环Item -->
                        <div class="item">
                            <div class="row">
                              <span class="cnt">{{chainProvesTrace}}</span> 
                            </div>
                        </div>
                    </div>
            </div>
        </div>
      <div v-html="testProofData"></div>
    </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import header from "@common/header/index.vue";
import { getQualityCertificate } from "@api/api_group";

export default {
  components: {
    "v-header": header
  },
  data() {
    return {
      testProofID: Number,
      testProofData: "",
      testProofName: "",
      chainProvesTrace: ""
    };
  },
  created() {},
  mounted() {
    if (this.$route.params) {
      if (this.$route.params.data.chainProvesTrace) {
        this.chainProvesTrace = this.$route.params.data.chainProvesTrace.trim();
      }
      getQualityCertificate({
        goodsId: this.$route.params.data.id
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          this.testProofID = res.data.goodsId;
          this.testProofData = res.data.qualityCertificate;
        }
      });
    }
  },
  methods: {}
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.TestProof {
  .TestProof_content {
    padding: 1.386666rem 0.213333rem 0;
    .first_nfc {
      padding: 0 0.32rem;
      margin-bottom: 0.32rem;
      position: relative;
      .border_content {
        box-shadow: 0.053333rem 0.053333rem 0.4rem rgba(22, 45, 35, 0.4);
        border-radius: 0.08rem;
        background-color: #ffffff;
        .first_nfc_leftTitle {
          height: 1.066667rem;
          line-height: 1.066667rem;
        }
        .first_nfc_leftTitle span {
          width: 1.92rem;
          height: 0.64rem;
          padding: 0.133333rem 0.266667rem;
          @include font-dpr(13px);
          font-family: "PingFangSC-Bold";
          color: #ffffff;
          border-top-right-radius: 0.666667rem;
          border-bottom-right-radius: 0.666667rem;
        }
        .first_nfc_content {
          position: relative;
          .item {
            padding: 0.4rem;
            align-items: center;
            border-bottom: 0.013333rem solid #e1e1e1;
            font-family: "PingFangSC-Medium";
            @include font-dpr(14px);
            .row {
              align-items: center;
            }
            .row .lb {
              color: #777777;
            }
            .row .cnt {
              color: #333333;
              word-break: break-word;
            }
          }
        }
      }
    }
  }
}
</style>