<template>
	<div class="FieldMonitoring">
		<div class="FieldMonitoring_header">
			<v-header head="现场监控"></v-header>
		</div>
		<div class="video">
			<div class="audio_list">
				<div class="audio_item" v-for="(item,index) in audioData">
					<span>{{item.monitorName}}</span>
					<video :id="`video`+index" controls :src="item.monitorUrl"></video>
          <!--  -->
          <div class="play_model">
            <span></span>
          </div>
          <div class="pause">
            <span></span>
          </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import header from "@common/header/index.vue";
import { fieldMonitoring } from "@api/api_group";
import { setTimeout } from 'timers';
export default {
  components: {
    "v-header": header
  },
  data() {
    return {
			audioData:[]
		};
  },
	created() {},
	mounted(){
    this.get();
	},
  methods: {
    getVideoInfo(){
      var videoList = document.getElementsByTagName("video");
      for(let item of videoList){
        item.addEventListener('play',function(){  
            // console.log("video"+i)    
          sessionStorage.setItem("VIDEO",JSON.stringify(true));
        })
      }
      // for(let i in this.audioData){
      //     var myVideo = document.getElementById("video"+i);
      //     myVideo.addEventListener('play',function(){  
      //       // console.log("video"+i)    
      //       sessionStorage.setItem("VIDEO",JSON.stringify(true));
      //     })
      //     myVideo.addEventListener('pause',function(){  
      //         // console.log("video"+i)    
      //     })
      //   }
    },
    // 获取监控视频
    get() {
      fieldMonitoring().then(res => {
        if (res.code === "200" && res.msg === "success") {
          this.audioData = res.data;
          var _this = this;
          setTimeout(function(){
            _this.getVideoInfo()
          },500)
        }
      });
    }
  }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.FieldMonitoring {
  .video {
    padding: 1.413333rem 0.32rem 0;
    .audio_list {
      .audio_item {
        margin-bottom: 0.24rem;
        video {
          width: 9.36rem;
          height: 3.6rem;
        }
      }
    }
  }
}
</style>