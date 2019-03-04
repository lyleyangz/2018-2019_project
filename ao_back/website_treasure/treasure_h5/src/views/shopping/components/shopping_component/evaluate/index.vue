<template>
	<div class="evaluate">
        <!-- <div class="evaluate_total">用户评论(200+)</div> -->
        <div class="evaluate_list">
            <div class="evaluate_item" v-for="(item,index) in says">
                <!-- 评价上部分  头像-昵称-星星-时间 -->
                <div class="evaluate_item_top">
                    <div class="evaluate_item_top_headimg" v-if="item.headImage">
                        <!-- <img src="../../../../../common/assets/images/shopping/head_img.png" alt=""> -->
                        <img :src="item.headImage" alt="">
                    </div>
                    <div class="evaluate_item_top_text">
                        <!-- 昵称 -->
                        <div class="evaluate_item_top_text_name">
                            <span class="name">{{item.userName}}</span>
                            <!-- 星星 -->
                            <span class="star" v-for="i in item.star"></span>
                        </div>
                        <!-- 时间 -->
                        <div class="evaluate_item_top_time">
                            <span class="time">{{item.createTime}}</span>
                        </div>
                    </div>
                </div>
                <!-- 评价中间部分  用户评价和用户上传的商品图片 -->
                <div class="evaluate_item_mid">
                    <div class="evaluate_item_mid_text">{{item.content}}</div>
                    <div class="evaluate_item_mid_img">
                        <img v-for="(value,inx) in item.picUrl" :src="value" alt="">
                    </div>
                </div>
                <!-- 下层 商家回复 -->
                <div class="evaluate_item_foot" v-if="item.reason">
                    <div class="evaluate_item_foot_text">商家回复：{{item.reason}}</div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import {userSayList,addSay,replySay} from "@api/api_shopping";
export default {
  props: ["navbar_3_detail","ID"],
  components:{
    
  },
  data() {
    return {
      params:{
        proId:this.ID,
        auditStatus:2
      },
      // 
      says:[]
    };
  },
  created() {},
  mounted() {
    if(this.ID){
      this.getSaysList()
    }
  },
  methods: {
    getSaysList(){
      userSayList(this.params).then((res)=>{
        if(res.code == "200"){
          for(let i in res.data){
            if(res.data[i]&&res.data[i].picUrl){
              res.data[i].picUrl = (res.data[i].picUrl).split(",")
            }
          }
          this.says = res.data;
        }
      })
    }
  }
};
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../../common/styles/mixin.scss";
.evaluate {
  background-color: #ffffff;
  // 用户评论累加条数
  .evaluate_total {
    @include font-dpr(13px);
    color: #333333;
    vertical-align: middle;
    border-bottom: 0.013333rem solid #cccccc;
    padding: .346667rem 0 .133333rem .16rem;
  }
  //
  .evaluate_list {
    .evaluate_item {
      display: flex;
      flex-direction: column;
      padding-bottom: 0.32rem;
      // &:nth-child(1) {
      //   margin-bottom: 0;
      // }
      // 上部分
      .evaluate_item_top {
        display: flex;
        align-items: center;
        margin: .253333rem 0 .226667rem;
        // 头像
        .evaluate_item_top_headimg {
          display: inline-block;
          padding-left: .173333rem;
          
          overflow: hidden;
          img {
            width: .8rem;
            height: .8rem;
            background-size: contain;
            border-radius: 50%;
            display: flex;
          }
        }
        // 头像旁边的文本
        .evaluate_item_top_text {
          display: inline-block;
          flex: 1;
          margin-left:.173333rem;
          // 头像旁边的名字
          .evaluate_item_top_text_name {
            display: flex;
            // justify-content: flex-start;
            align-items: center;
            line-height: 0.5rem;
            margin-bottom: .133333rem;
            .name {
              display: inline-block;
              @include font-dpr(12px);
              color: #333333;
            }
            // 星星
            .star {
              display: inline-block;
              background: url("../../../../../common/assets/images/shopping/star.png")
                no-repeat;
              width: 0.4rem;
              height: 0.4rem;
              background-size: contain;
              margin-left: .12rem;
              &:nth-child(1) {
                margin-left: .093333rem;
              }
            }
          }
          // 时间
          .evaluate_item_top_time {
            @include font-dpr(10px);
            color: #666666;
            letter-spacing: 0.013333rem;
          }
        }
      }
      //   中间层用户评论
      .evaluate_item_mid {
        padding: 0 .266667rem;
        margin-bottom:.066667rem;
        // 文字
        .evaluate_item_mid_text {
          @include font-dpr(11px);
          margin-bottom: 0.266667rem;
          color: #333333;
        }
        // 图片
        .evaluate_item_mid_img {
          img {
            width: 1.533333rem;
            height: 1.533333rem;
            background-size: contain;
            margin-right:.186667rem;
          }
          //   &:nth-child(1) {
          //     margin-left: 0;
          //   }
        }
      }
      //   底层商家回复
      .evaluate_item_foot {
        padding: 0 .266667rem;
        .evaluate_item_foot_text {
          border: 0.013333rem solid #f4f4f4;
          padding: 0.12rem;
          border-radius: 0.066667rem;
          background-color: #f4f4f4;
          @include font-dpr(11px);
          color: #999999;
        }
      }
    }
  }
}
</style>