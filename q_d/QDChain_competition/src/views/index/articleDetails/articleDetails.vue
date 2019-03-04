<template>
     <div class="articleDetails">
        <div class="title">
            <h2>{{articleDetailsData.title}}</h2> 
        </div>
        <div class="title_info">
            <p>
                <span style="margin-right:8px;">版权所有者：{{articleDetailsData.realName ? articleDetailsData.realName:articleDetailsData.companyName}}</span>
                <span><i><img src="../../../common/assets/images/time.png" alt=""></i>上链时间：{{globalFun.dateFormat( articleDetailsData.createTime, 'yyyy-MM-dd hh:mm:ss')}}</span>
                <!-- <span><i><img src="../../../common/assets/images/block.png" alt=""></i>打包区块：{{articleDetailsData.block}}</span>                 -->
            </p>
            <p>
                <span>文章地址：{{articleDetailsData.chainAddress}}</span>
                <span class="" style="margin:0 8px">/</span>
                <span>txid:{{articleDetailsData.txid}} </span>                
            </p>
        </div>
        <div class="connet">
            <p v-html="articleDetailsData.content"></p>
        </div>
    </div>
</template>
 
<script>
import {articleDetails} from "../../../api/api_group.js";

export default {
  data() {
    return {
        showDataID:this.$route.query.id,
        articleDetailsData:{}
    };
  },
  created() {
  },
  mounted() {
      if(this.showDataID){
          let params = {
              id:this.showDataID
          }
          articleDetails(params).then((res)=> {
            if(res && res.success){
                this.articleDetailsData = res.data; 
            }
          })
      }
  },
  watch: {
      
  },
  methods: {}
};
</script>
<style lang='less' scoped>
// 文章详情样式
.articleDetails {
    background-color: #f9f9f9;
    width: 1200px;
    margin: 0 auto;
    .title {
        padding: 110px 0px 68px 0px;
        h2 {
            text-align: center;
            font-size: 30px;
            color: #333;
        }
    }
    .title_info{
        padding-bottom: 22px;
        p {
            text-align: center;
            font-size: 14px;
            color: #999999;
            line-height: 28px;
            i {
                margin: 0 4px;
            }
        }
    }
    .connet {
        background-color: #fff;
        padding: 52px 70px;
    }
}

</style>
 