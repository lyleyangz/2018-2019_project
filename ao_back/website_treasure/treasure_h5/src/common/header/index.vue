<template>
	<div class="header">
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a href="javascript:void(0)" class="active">
          <button class="mint-button mint-button--default mint-button--normal" @click="linkActive()">
            <span class="mint-button-icon">
              <i class="mintui mintui-back"></i>
            </span>
            <label class="mint-button-text"></label>
          </button>
        </a>
      </div>
      <h1 class="mint-header-title">{{head}}</h1>
      <div class="mint-header-button is-right"></div>
    </header>
        <!-- <mt-header fixed :title="head">
            <router-link :to="linkTo" slot="left">
                <mt-button icon="back"  @click.native="linkActive()"></mt-button>
            </router-link>
        </mt-header> -->
	</div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  props: ["head"],
  data() {
    return {};
  },
  created() {},
  methods: {
    linkActive(){
      this.$router.go(-1)
    }
  }
};
</script>
<style>
</style>

<style lang="scss"  scoped="scoped">
@import "../../common/styles/mixin.scss";
  .mint-header {
    @include font-dpr(18px);
    font-family: "PingFangSC-Medium";
    text-align: center;
    height: 1.1735rem;
    background: url('../../common/assets/images/header-bg.png') no-repeat;
    background-size: 100% 100%;
    width: 100%;
    color: #ffffff;
    position: fixed;
    width: 100%;
    z-index: 99999;
}
</style>