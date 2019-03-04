<template>
<div class="bigdatanews_outermost">
    <div class="bigdatanews_inside_top_img">
    </div>
    <div class="bigdatanews_inside_bottom page-board">
        <!-- 面包屑 -->
        <div class="bigdatanews_inside_breadcrumb">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>
                    <span>国家政策</span>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- 内容 -->
        <div class="bigdatanews_inside_content" :class="{'loading':timelineData.length == 0}">
            <Timeline>
                <div class="timeline_items">
                    <TimelineItem v-for="(item, index) in timelineData" :key="index">
                        <p class="title" @click="detailsArticle(item)">{{item.title}}</p>
                        <span class="time">{{item.year}}</span>
                        <div v-html="item.content" class="content"></div>
                        <p class="date">{{item.createDate}}</p>
                    </TimelineItem>
                </div>
            </Timeline>
            <!-- 加载更多按钮 -->
            <div class="bigdatanews_inside_btn" v-if="timelineData.length !== 0">
                <Button type="default" ghost @click="loadMoreData()" v-if="isDisabled"  :loading="loading">加载更多</Button>
                <Button type="default" ghost @click="loadMoreData()" v-if="!isDisabled" :loading="loading">无更多数据</Button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import utils from "@common/utils";
import { getThreeTypesOfNews, getNewsDetails } from "@api/api_bigdatanews";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      // 渲染数据
      timelineData: [],
      // 正文数据
      TextData: {},
      // 加载更多数据
      loadData: [],
      // 数据
      params: {
        // 新闻类型
        type: 2,
        // 页码
        offset: 1,
        // 数量/页
        count: 10
      },
      // 数据限制
      isDisabled: true,
      loading: false,
      // 数据总条数
      totalDataNum: 0
    };
  },
  created() {
    document.title = "国家政策 - 国家大数据专业委员会官网";
    this.getBigDataNewsApi();
  },
  mounted() {},
  methods: {
    // 获取国家政策数据
    getBigDataNewsApi() {
      // 获取国家政策
      // 获取国家政策接口
      getThreeTypesOfNews(this.params).then(res => {
        if (res && res.code === "200" && res.msg === "success") {
          // 获取数据总条数
          this.totalDataNum = res.data.count;
          // 时间戳处理
          for (let i in res.data.entities) {
            // 处理时间段新闻
            if (res.data.entities[i].createDate) {
              res.data.entities[i].createDate = utils.dateFormat(
                res.data.entities[i].createDate,
                "yyyy-MM-dd"
              );
              // 增加年份字段
              res.data.entities[i].year = res.data.entities[i].createDate.split(
                "-"
              )[0];
            }
			// 过滤掉img标签
			var content = res.data.entities[i].content;
			content = content.replace(/&nbsp;/ig, "");
            if (content) {
              res.data.entities[i].content = utils.filterImgSign(content);
            }
          }
          // 延时加载状态
          setTimeout(() => {
            this.timelineData = res.data.entities;
          }, 500);
        }
      });
    },
    //   文章详情
    detailsArticle(data) {
      this.TextData = data;
      this.$router.push({
        name: `other_details`,
        params: {
          type: 'nationalpolicy',
          id: data.id,
          data: data
        }
      });
    },
    //   加载更多
    loadMoreData() {
      this.loading = true;
      if (this.totalDataNum <= this.params.offset * this.params.count) {
        this.loading = false;
        this.isDisabled = false;
        return;
      }
      this.params.offset += 1;
      getThreeTypesOfNews(this.params).then(res => {
        if (res && res.code === "200" && res.msg === "success") {
          // 获取数据总条数
          this.totalDataNum = res.data.count;
          for (let i in res.data.entities) {
            // 处理时间段新闻
            if (res.data.entities[i].createDate) {
              res.data.entities[i].createDate = utils.dateFormat(
                res.data.entities[i].createDate,
                "yyyy-MM-dd"
              );
              // 增加年份字段
              res.data.entities[i].year = res.data.entities[i].createDate.split(
                "-"
              )[0];
            }
            // 过滤掉img标签
            if (res.data.entities[i].content) {
              res.data.entities[i].content = utils.filterImgSign(
                res.data.entities[i].content
              );
            }
          }
          setTimeout(() => {
            this.loading = false;
            this.timelineData = this.timelineData.concat(res.data.entities);
          }, 500);
        }
      });
      // }
    }
  }
};
</script>
<style>
/*小圆点样式*/
.bigdatanews_outermost li .ivu-timeline-item-head {
  width: 7px;
  height: 7px;
  background-color: #cfcfcf;
  border: none;
}
.ivu-timeline-item-tail {
  left: 3px;
}
.ivu-timeline-item-content {
  top: -12px;
  padding-left: 18px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>

<style lang="scss" scoped="scoped">
.loading::before{
  top:50%;
}
.bigdatanews_outermost {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  //   国家政策顶部图片
  .bigdatanews_inside_top_img {
    position: relative;
    height: 582px;
    background: url("../../../../common/assets/images/national-polcy.jpg")
      no-repeat;
  }
  // 大数据新闻底部填充内容
  .bigdatanews_inside_bottom {
    padding: 22px 0 284px 0;
    //   面包屑
    .bigdatanews_inside_breadcrumb {
      color: #666666;
      font-size: 22px;
      font-family: "MicrosoftYaHei";
    }
    // 填充内容
    .bigdatanews_inside_content {
      margin-top: 44px;
      min-height: 200px;
      .timeline_items {
        margin: 0 0 34px 80px;
        position: relative;
        .ivu-timeline-item {
          // height: 127px;
          // animation:1s heightTransition;
          .time {
            position: absolute;
            left: -80px;
            top: -2px;
            font-size: 22px;
            color: #333333;
            font-family: "MicrosoftYaHei";
          }
          // items的标题
          .title {
            font-size: 18px;
            font-family: "MicrosoftYaHei";
            color: #333333;
            padding: 0 0 14px 10px;
            display: inline-block;
          }
          // items标题hover样式
          .title:hover {
            cursor: pointer;
            color: #fa3737;
          }
          // items内容
          .content {
             height: 66px;
            line-height: 22px;
            text-overflow: ellipsis;
            word-break: break-all;
            word-wrap: break-word;
            font-size: 14px;
            font-family: "MicrosoftYaHei";
            color: #999999;
            white-space: normal;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
          }
          .date {
            font-size: 14px;
            font-family: "MicrosoftYaHei";
            color: #999999;
          }
        }
        // 花哨不要
        // @keyframes heightTransition {
        //     0% {
        //         height: 70px;
        //     }
        //     100%{
        //         height: 128px;
        //     }
        // }
      }
    }
    // 加载更多按钮
    .bigdatanews_inside_btn {
      text-align: center;
      margin-top: 128px;
      button {
        font-size: 16px;
        color: #999999;
        font-family: "MicrosoftYaHei";
        border: 1px solid #cfcfcf;
        width: 920px;
        height: 40px;
      }
    }
    // 正文部分
    .bigdatanews_textcontent {
      // position: relative;
      .bigdatanews_content_title {
        margin: 44px 0 50px 0;
        h1 {
          text-align: center;
          font-size: 22px;
          font-family: "MicrosoftYaHei";
          color: #333333;
        }
        .bigdatanews_content_title_sub {
          text-align: center;
          font-size: 14px;
          font-family: "MicrosoftYaHei";
          color: #bebebe;
          padding-top: 16px;
        }
        .bigdatanews_content_title_sub :nth-child(2) {
          margin-left: 30px;
        }
      }
      .bigdatanews_content_article {
        // text-align: justify;
        text-indent: 4px;
        font-size: 16px;
        font-family: "MicrosoftYaHei";
        color: #999999;
      }
      //   正文两端对齐
      //   .bigdatanews_content_article:after {
      //     display: inline-block;
      //     content: "";
      //     padding-left: 100%;
      //   }
    }
  }
}
</style>

