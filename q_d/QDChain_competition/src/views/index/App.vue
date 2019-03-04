<template>


	<div id="app" class="f-pr" ref="contentOuter">
		<router-view :currentRouter = 'currentRouter'></router-view>
	</div>
</template>

<script>
export default {
  data() {
    return {
      currentRouter: ""
    };
  },
  created() {},
  mounted() {
    this.initHeight();
  },
  methods: {
    initHeight() {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.contentOuter.setAttribute("style", `min-height: ${h - 88}px`);
    },
    sendRouter(path) {
      this.currentRouter = path;
    }
  },
  watch: {
    $route(to, from) {
      this.sendRouter(to.path);
    }
  },

  components: {}
};
</script>

<style lang="scss"  scoped="scoped">
#app {
  background-color: #f9f9f9;
}
</style>

