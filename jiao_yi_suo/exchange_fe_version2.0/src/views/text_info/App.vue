<template>
	<div id="app" class="f-pr">
		<div class="header-outer f-pr">
			<com-header class="com-header" :currentPage="'text_info'" styleClass="light" :isLogin="isLogin"></com-header>
		</div>

		<div class="text-info" ref="router">
			<router-view></router-view>
		</div>

		<com-footer></com-footer>
	</div>
</template>

<script>
import header from "@components/header/header";
import footer from "@components/footer/footer";
import eventBus from '@common/eventBus/eventBus';


export default {
  data() {
    return {
      isLogin: localStorage.getItem("YJS_isLogin") === "true" ? true : false
    };
  },
  created() {
      
  },
  mounted() {
    this.$nextTick(() => {
      if (this.globalFun.mobileCheck()) {
        let h = document.documentElement.clientHeight - 78 - 344;
        this.$refs.router.setAttribute("style", `min-height:${h}px;`);
      }
    });
  },
  methods: {},
  components: {
    "com-header": header,
    "com-footer": footer
  }
};
</script>

<style lang="scss"  scoped="scoped">
.header-outer {
    top: 0px;
}
.text-info {
    background-color: #f6f6fb;
    padding: 100px 0px 250px 0px;
}
</style>
<style>

</style>
