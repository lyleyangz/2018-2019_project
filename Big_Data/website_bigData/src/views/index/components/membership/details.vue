<template>
 <div class='membershipDetails'>
     <div class="membership-title">
         <div class="page-board">
            <div class="readcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/membership">会员名录</BreadcrumbItem>
                    <BreadcrumbItem to="">详情</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="membershipLitle-info">
                <ul class="ul">
                    <li class="li" >
                        <div class="img-box"><img :src="membershipLists.image" alt=""></div>
                        <div class="info">
                            <h6 class="name f-pr">{{membershipLists.name}}</h6>
                            <span class="introduce">{{membershipLists.details}}</span>
                        </div>
                    </li>
                </ul>
            </div>
         </div>
     </div>
     <div class="membership-content">
         <div class="page-board">
            <div class="title f-pr"><h6>人物简介</h6></div>
            <div class="content" v-html="membershipLists.content"></div>
         </div>
     </div>
 </div>
</template>
 
<script>
import membershipLists from "./data.js";
import eventBus from "@common/eventBus/eventBus";
export default {
  data() {
    return {
      Lists: membershipLists.membershipLists,
      membershipLists:[],
      id:this.$route.params.id
    };
  },
  created() {
      this.getData();
      this.id = this.$route.params.id
      eventBus.$emit('header', false);
  },
  mounted() {},
  watch: {},
  methods: {
    getData() {
      for (var index in this.Lists) {
          if(this.Lists[index].id == this.id) {
              this.membershipLists = this.Lists[index]
          }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.membershipDetails {
  padding-top: 80px;
  .membership-title {
    background-color: #f6f6f6;
    height: 330px;
    padding-top: 18px;
    .membershipLitle-info {
      .ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 100px;
        .li {
          padding-top: 28px;
          text-align: center;
          width: 33.333%;
          .img-box {
            width: 100%;
            overflow: hidden;
            text-align: center;
            img {
              border-radius: 50%;
              width: 100px;
              height: 100px;
            }
          }
          .info {
            .name {
              font-size: 22px;
              line-height: 22px;
              color: #333;
              padding: 10px 0px 14px 0px;
            }
            .introduce {
              font-size: 14px;
              color: #999999;
              text-align: left;
            //   display: -webkit-box;
            //   -webkit-box-orient: vertical;
            //   -webkit-line-clamp: 2;
            //   overflow: hidden;
            }
          }
        }
      }
    }
  }
  .membership-content {
    background-color: #fff;
    padding: 36px 0px 186px 0px;
    .title {
      padding-bottom: 28px;
      h6 {
        font-size: 18px;
        line-height: 18px;
        color: #333;
        padding-left: 14px;
      }
      h6:before {
        content: "";
        width: 4px;
        height: 18px;
        background-color: #fa3737;
        position: absolute;
        left: 0px;
        top: 0px;
      }
    }
  }
}
</style>
<style>
.ivu-breadcrumb-item-link {
  font-size: 18px !important;
  color: #666666 !important;
}
.ivu-breadcrumb-item-separator {
  color: #666666 !important;
  font-size: 18px !important;
  font-weight: normal !important;
}
</style>
 