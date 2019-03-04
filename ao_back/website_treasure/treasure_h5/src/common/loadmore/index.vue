<template>
<!--  <div class="load_more_content" ref="wrapper"> -->
  <div class="load_more_content" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="bottomAllLoaded" ref="loadmore" :auto-fill="false" bottomDropText="↓" :bottomPullText="loadmore_signed" v-if="data.length>0">
         <div class="item"  v-for="(item,index) of data">
            <div class="row" :class="{'activeRow':index%2===0 ? false:true}">
                <span class="lb col">第{{data.length-index}}次</span>
                <span class="cnt">{{item.createTime}}</span>
            </div>
        </div>
    </mt-loadmore>
 </div>
</template>
<script>
import { listNfcHistory } from "@api/api_group";
import { setTimeout } from "timers";
export default {
  props: ["id"],
  data() {
    return {
      // 暂时不用
      bottomAllLoaded: false,
      // 计算高度
      wrapperHeight: Number,
      // 当前页
      currentPage: 1,
      // 总数据条数
      totalDataNumber: Number,
      // 总页数
      totalPage: Number,
      // 每页显示条数
      everyPageData: 15,
      data: [],
      loadmore_signed: "加载更多"
      // bottomLoadingText加载中标识
    };
  },
  methods: {
    // handleBottomChange(status) {
    //   this.bottomStatus = status;
    // },
    loadBottom() {
      var _this = this;
      setTimeout(() => {
        if (_this.currentPage == _this.totalPage) {
          _this.loadmore_signed = "全部加载完毕";
          setTimeout(() => {
            _this.$refs.loadmore.onBottomLoaded();
            // _this.bottomAllLoaded = true;
          }, 800);
          return;
        } else {
          ++_this.currentPage;
          _this.getHistroy(_this.id, res => {
            if (res === "success") {
              _this.$refs.loadmore.onBottomLoaded();
            }
          });
        }
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top +
          1;
      }, 500);
    },
    // 获取元素位置
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
    // 获取素原纪录数据
    getHistroy(id, callback) {
      //   溯源记录
      listNfcHistory({
        pageNo: this.currentPage,
        pageSize: this.everyPageData,
        gid: id
      }).then(res => {
        if (res.code === "200" && res.msg === "success") {
          // 总数据量
          this.totalDataNumber = res.data.count;
          // 总页数
          this.totalPage = parseInt(res.data.count / this.everyPageData) + 1;
          // 当前页数
          this.currentPage = res.data.pageNo;
          // 数据
          for (let i in res.data.entities) {
            if(res.data.entities[i].createTime){
              res.data.entities[i].createTime = (res.data.entities[i].createTime).split(".")[0];
            }
            this.data.push(res.data.entities[i]);
          }
          callback("success");
        }
      });
    }
  },
  mounted() {
    if (this.id) {
      this.getHistroy(this.id, res => {
        // console.log(res);
      });
    }
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top +
      1;
  },
  updated() {
    // this.wrapperHeight =  document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top+1;
  }
};
</script>

<style lang="scss"  scoped="scoped">
.load_more_content {
  overflow: scroll;
  // touch-action: none;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .item {
    font-family: "PingFangSC-Bold";
    font-size: 0.293333rem;
    color: #333333;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    .cnt {
      width: 50%;
    }
    .activeRow {
      background: #e8fff5;
    }
    .col {
      width: 50%;
    }
  }
}
.page-loadmore-wrapper {
  overflow: scroll;
  //   height: 1.864373rem
}
</style>
