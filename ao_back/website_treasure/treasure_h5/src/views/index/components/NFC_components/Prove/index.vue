<template>
	<div class="prove">
		<v-header head="资质证明"></v-header>
        <!-- content -->
        <div class="prove_content">
            <div class="prove_list">
                <div class="prove_item">
                    <div class="title">
                    </div>
                    <div v-html="proveData"></div>
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
      proveData: null
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.data) {
      this.proveData = this.$route.params.data;
    }
  },
  activated(){
    if (this.$route.params.data) {
      this.proveData = this.$route.params.data;
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