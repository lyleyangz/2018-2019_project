<template>
 <div class='contactUs'>
     <div class="map">
         <img src="../../../../common/assets/images/map.png" alt="">
     </div>
     <div class="message">
         <p><i class="email-icon"></i> 客服郵箱：official@xsl.one</p>
         <p><i class="phone-icon"></i>公司地址: 香港九龍旺角道33號 凱途發展大廈7樓四單元</p>
     </div>
 </div>
</template>
 
<script>
import eventBus from "@common/eventBus/eventBus";
 
export default {
    data() {
        return { }
    },
    created() { 
        document.title = this.$t('text_info.contactUs');
        eventBus.$on("convertFont", () => {
            this.$router.go(0);
        });
    }
} 
</script>
<style lang='scss' scoped>
 .contactUs {
     padding: 20px 0px 110px 350px;
     .message {
         p {
             height: 50px;
             line-height: 50px;
             vertical-align: middle;
             i {
                 display: inline-block;
                 width: 30px;
                 height: 30px;
                 vertical-align: middle;
             }
             i.email-icon {
                 background: url('../../../../common/assets/images/message.png') no-repeat;
                 background-size: 100%;
             }
             i.phone-icon {
                 background: url('../../../../common/assets/images/call.png') no-repeat;
                 background-size: 100%;
             }
         }
     }
 }
</style>
 