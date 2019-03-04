<template>
 <div class='videoPlay'>
     <div class="video">
         <video id="video" :src="videoSrc" poster preload controls width="100%">
            <!-- <source src="http://albups.xsl.one/upload/video/1540777719679_gc845B5GBg55Ag6.mp4" type="video/mp4"> -->
        </video>
     </div>
 </div>
</template>
 
<script>
 import {  } from '@api/api_group';
 
 export default {
 data() {
 return { 
     videoSrc:this.$route.query.src || null,
     sourceID:this.$route.query.id || null
 }
 },
 created() { 
     document.title = "视频播放";
 },
 mounted() {
     if(this.videoSrc){
         this.getVideoInfo()
     }
 },
 watch: { },
 methods: {
     getVideoInfo(){
         var _this = this;
          var myVideo = document.getElementById("video");
          myVideo.addEventListener('play',function(){  
            // console.log("video")
            let data = {
                id:_this.sourceID
            }
            sessionStorage.setItem("OUT_VIDEO",JSON.stringify(data));
          })
          myVideo.addEventListener('pause',function(){  
              // console.log("video")    
          })
    },
 },
 } 
</script>
<style lang='scss' scoped>
 .videoPlay {
     background-color: #f4f4f4;
     min-height: 100vh;
     padding: .266667rem;
     .video {
         background-color: #fff;
     }
 }
</style>
 