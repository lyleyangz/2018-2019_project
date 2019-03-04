<template>
	<div class="prove">
		<v-header head="物料存放位置"></v-header>
        <!-- content -->
        <div class="prove_content">
            <div class="prove_list">
                <div class="prove_item">
                    <div class="title">
                    </div>
                    <div v-html="saveLocPicDate"></div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import header from "@common/header/index.vue";
import {} from "@api/api_group";
export default {
  components: {
    "v-header": header
  },
  data() {
    return {
      saveLocPicDate: null
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.data) {
      this.saveLocPicDate = this.$route.params.data;
    }
  },
  activated(){
    if (this.$route.params.data) {
      this.saveLocPicDate = this.$route.params.data;
    }
  },
  methods: {}
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.prove {
  .prove_content {
    padding: 1.386666rem 0.213333rem 0;
  }
}
</style>