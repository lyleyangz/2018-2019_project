<template>
<section class="membership">
    <div class='banner-outer'></div>
    <div class="page-board">
        <div class="readcrumb">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="">会员名录</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="navigation-bar">
            <div class="bar">
                <ul>
                    <li v-for="(item,index) in barLists" :key="index" :class="currTab == index?'active':''" @click="changeTab(index)">{{item}}</li>
                </ul>
            </div>
            <!-- <div class="search">
                <span class="search-span f-ib f-pr">
                    <input type="text" name="" id="" placeholder="搜索" v-model="searchVal">
                    <span class="search-btn f-pa" @click="getData()"></span>
                </span>
            </div> -->
        </div>
        <div class="membership-lists">
            <ul class="ul">
                <li class="li" v-if="currTab == item.type || currTab == 0" v-for="(item,index) in membershipLists" :key="index" @click="$router.push({name:'membershipDetails',params:{id:item.id}})">
                    <div class="img-box"><img :src="item.image" alt=""></div>
                    <div class="info">
                        <h6 class="name f-pr">{{item.name}}</h6>
                        <span class="introduce">{{item.details}}</span>
                    </div>
                </li>
            </ul>
            <!-- <div class="page">
                    <Page :total="total" size="small" :current="pageNum" :page-size="count" @on-change="convertPage" show-total></Page>
            </div> -->
        </div>
    </div>
        
</section>
</template>
 
<script>
import membershipLists from "./data.js";
export default {
  data() {
    return {
      pageNum: 1,
      calPage: 1,
      count: 10,
      total: 99,
      searchVal: "",
      barLists: {
        0: "全部",
        1: "研究员",
        2: "高级会员",
        3: "会员",
        4: "学生会员",
        5: "会员单位"
      },
      currTab: 0,
      membershipLists: membershipLists.membershipLists
    };
  },
  created() {
    document.title = "会员名录 - 国家大数据专业委员会官网";
  },
  mounted() {},
  watch: {},
  methods: {
    // 分页
    convertPage(index) {
      this.pageNum = index;
      this.announcementData(() => {
        this.calPage = index;
      });
    },
    changeTab(index) {
      this.currTab = index;
    },
    // getData() {
    //   for (var index in this.membershipLists) {
    //     this.membershipLists = this.membershipLists[index].name;
    //   }
    // }
  }
};
</script>
<style lang='scss' scoped>
.membership {
  .banner-outer {
    background: url("../../../../common/assets/images/member-directories.jpg");
    width: 100%;
    height: 582px;
  }
  .page-board {
    .readcrumb {
      padding: 22px 0px 60px 0px;
    }
    .navigation-bar {
      display: flex;
      justify-content: space-between;
      .bar {
        ul {
          li {
            display: inline-block;
            width: 108px;
            height: 32px;
            color: #999999;
            font-size: 16px;
            border: 1px solid #cfcfcf;
            border-radius: 32px;
            text-align: center;
            line-height: 32px;
            margin-right: 6px;
            cursor: pointer;
            transition: all 0.5s ease 0s;
          }
          li:hover,
          li.active {
            background: #fa3737;
            border: 1px solid #fa3737;
            color: #fff;
            transition: all 0.5s ease 0s;
          }
        }
      }
      .search {
        .search-span {
          width: 300px;
          height: 32px;
          background-color: #f4f4f4;
          border-radius: 32px;
          padding-left: 26px;
          line-height: 32px;
          input {
            outline: none;
            border: 0px;
            background-color: #f4f4f4;
            width: 90%;
            &:focus {
              outline: none;
            }
          }
          .search-btn {
            width: 20px;
            height: 20px;
            background: url("../../../../common/assets/images/search.png")
              no-repeat;
            right: 14px;
            top: 50%;
            margin-top: -10px;
            cursor: pointer;
          }
        }
      }
    }
    .membership-lists {
      .ul {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 100px;
        min-height: 400px;
        .li {
          padding-top: 98px;
          width: 21%;
          text-align: center;
          cursor: pointer;
          &:nth-of-type(3n + 2) {
            margin: 0 220px;
          }
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
              font-size: 18px;
              line-height: 18px;
              color: #333;
              padding: 12px 0px 44px 0px;
            }
            .name:before {
              content: "";
              width: 26px;
              height: 4px;
              background-color: #fa3737;
              position: absolute;
              left: 50%;
              margin-left: -13px;
              bottom: 18px;
            }
            .introduce {
              font-size: 14px;
              height: 40px;
              line-height: 20px;
              color: #999999;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>

 