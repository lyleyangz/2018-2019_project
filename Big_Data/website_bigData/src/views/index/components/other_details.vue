<template>
<div class="bigdatanews_outermost">
    <div class="bigdatanews_inside_bottom page-board">
        <!-- 面包屑 -->
        <div class="bigdatanews_inside_breadcrumb">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>
                    <span @click="reloadpage(routerCurrent)" class="click_span">{{actions}}</span>
                </BreadcrumbItem>
                <BreadcrumbItem>正文</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!-- 正文 -->
        <div class="bigdatanews_textcontent" :class="{'loading':Object.keys(this.TextData).length == 0}">
            <div class="bigdatanews_content_title" v-if="Object.keys(this.TextData).length !== 0"  >
                <h1>{{TextData.title}}</h1>
                <div class="bigdatanews_content_title_sub">
                    <span>来源： {{TextData.source}}</span>
                    <span v-if="TextData.author">作者： {{TextData.author}}</span>
                    <span>时间： {{TextData.createDate}}</span>
                </div>
            </div>
            <p class="bigdatanews_content_article" v-html="TextData.content"></p>
        </div>
    </div>
</div>
</template>

<script>
import utils from "@common/utils";
import { getThreeTypesOfNews, getNewsDetails } from "@api/api_bigdatanews";
import eventBus from "@common/eventBus/eventBus";
export default {
  data() {
    return {
      actions: "",
      // 正文数据
      TextData: {},
      // 英文模块过渡
      EnglishTypeData: {
        bigdatanews: "大数据新闻",
        nationalpolicy: "国家政策",
        companyannouncement: "行业公告"
      },
      // 数字模块过滤
      NumbertypeData: {
        "1": "bigdatanews",
        "2": "nationalpolicy",
        "3": "companyannouncement"
      },
      // 当前路由模块
      routerCurrent: ""
    };
  },
  created() {},
  mounted() {
    // 设置当前路由模块
    this.routerCurrent = this.$route.params.type;
    // 设置模块的中文格式
    this.actions = this.EnglishTypeData[
      this.$route.params.type
    ];
    // 获取详情
	this.getArticleDetails();
	 eventBus.$emit('header', false);
  },
  methods: {
    // 获取文章详情
    getArticleDetails() {
      if (this.$route.params && this.$route.params.id) {
        var params = {
          id: this.$route.params.id
        };
        getNewsDetails(params).then(res => {
          if (res && res.code === "200" && res.msg === "success") {
            // 时间戳处理
            // 处理时间段新闻
            if (res.data[0].createDate) {
              res.data[0].createDate = utils.dateFormat(
                res.data[0].createDate,
                "yyyy-MM-dd"
              );
              // 增加年份字段
              res.data[0].year = res.data[0].createDate.split("-")[0];
            }
            // 延时加载状态
            setTimeout(() => {
              this.TextData = res.data[0];
            }, 500);
          }
        });
      }
    },
    reloadpage(type) {
      // this.typeData
      this.$router.push({
        path: "/" + type
      });
    }
  }
};
</script>
<style>
img {
  margin: auto;
  display: inherit;
}
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
  padding-left: 14px;
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
  //   大数据顶部图片
  .bigdatanews_inside_top {
    position: relative;
    height: 582px;
    .bigdatanews_inside_top_img {
      position: absolute;
      height: 100%;
    }
  }
  // 大数据新闻底部填充内容
  .bigdatanews_inside_bottom {
    padding: 102px 0 284px 0;
    //   面包屑
    .bigdatanews_inside_breadcrumb {
      color: #666666;
      font-size: 22px;
      font-family: "MicrosoftYaHei";
      .click_span {
        cursor: pointer;
      }
      .click_span:hover {
        color: red;
      }
    }
    // 正文部分
    .bigdatanews_textcontent {
      // position: relative;
      min-height: 200px;
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
            margin: 0 30px;
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

