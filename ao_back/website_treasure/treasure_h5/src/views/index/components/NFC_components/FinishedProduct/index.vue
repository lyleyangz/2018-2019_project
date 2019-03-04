<template>
	<div class="FinishedProduct">
		<div class="FinishedProduct_header">
            <v-header head="加工成品地"></v-header>
		</div>
        <!--  -->
        <div class="FinishedProduct_midd" ref="FinishedProduct">
            <div class="FinishedProduct_header_swipe">
                <mt-swipe :auto="4000" v-if="bannerUrlData&&bannerUrlData.length>0">
                    <mt-swipe-item v-for="(item,index) in bannerUrlData" :key="index">
                        <img :src="item" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- 地图 -->
        <div class="map" v-if="sign.center.lng">
            <bdMap :sign='sign'></bdMap>
        </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import bdmap from "@common/mapcomment/index.vue";
import header from "@common/header/index.vue";
export default {
  components: {
    bdMap: bdmap,
    "v-header": header
  },
  data() {
    return {
      // 地图经纬度
      sign: {
        height: "11rem",
        center: {
          lng: null,
          lat: null
        }
      },
      bannerUrlData:[]
    };
  },
  mounted(){
    if(this.$route.params&&this.$route.params.data.position){
      this.sign.center.lng = this.$route.params.data.position.lng;
      this.sign.center.lat = this.$route.params.data.position.lat;
      this.bannerUrlData = (this.$route.params.data.bannerUrl).split(",");
    }
  },
  created() {},
  methods: {
    getRect(el) {
      var rect = el.getBoundingClientRect();
      var _left = document.documentElement.clientLeft;
      var _top = document.documentElement.clientTop;
      return {
        left: rect.left - _left,
        top: rect.top - _top,
        right: rect.right - _left,
        bottom: rect.bottom - _top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    },
  }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.FinishedProduct {
  .FinishedProduct_midd {
    padding: 1.386666rem 0.213333rem 0;
    .FinishedProduct_header_swipe {
      height: 5.093333rem;
      img {
        height: 5.093333rem;
        width: 100%;
        background-size: contain;
      }
    }
  }
  .map{
    margin: .026667rem .133333rem
  }
}
</style>