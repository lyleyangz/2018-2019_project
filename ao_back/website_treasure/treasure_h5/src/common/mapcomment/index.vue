<template>
<div class="map">
	<div id="allmap" class="allmap" :style="{height:sign.height}"></div>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
// import BMap from "Bmap";
export default {
  props:['sign'],
  data() {
    return {
      type: "tab",
      map: null,
    };
  },
  mounted() {
    this.map = new BMap.Map("allmap");
    this.map.centerAndZoom(
      new BMap.Point(Number(this.sign.center.lng),Number(this.sign.center.lat)),
      12
    );
    this.map.enableScrollWheelZoom(true);
    this.ready();
  },
  created() {},
  methods: {
    ready() {
      // 用经纬度设置地图中心点
      if (this.sign.center.lng && this.sign.center.lat) {
        this.map.clearOverlays();
        var new_point = new BMap.Point(this.sign.center.lng, this.sign.center.lat);
        this.map.centerAndZoom(new_point, 12);
        var marker = new BMap.Marker(new_point); // 创建标注
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        this.map.addOverlay(marker); // 将标注添加到地图中
        this.map.panTo(new_point);
      }
      var stCtrl = new BMap.PanoramaControl(); //构造全景控件
      stCtrl.setOffset(new BMap.Size(20, 20));
      this.map.addControl(stCtrl); //添加全景控件
    }
  }
};
</script>

<style lang="scss"  scoped="scoped">
// @import "../../../../common/styles/mixin.scss";
#allmap {
  width: 100%;
  // height: 12rem;
}
</style>