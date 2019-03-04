<template>
	<div id="app" class="f-pr">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // document.title = ""
  },
  mounted() {},
  methods: {}
};
</script>
<style>
</style>

<style lang="scss"  scoped="scoped">
</style>

