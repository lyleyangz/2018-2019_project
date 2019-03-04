<template>
<div class="my-copyright">
    <!-- <div class="copyright-title"> -->
      <!-- <Button type="primary" :loading="addArticleBol" icon="checkmark-round">
                <span v-if="!addArticleBol">首页</span>
                <span v-else>跳转中...</span>
      </Button>
      <Button type="primary" :loading="addArticleBol" icon="checkmark-round">
                <span v-if="!addArticleBol">我的版权</span>
                <span v-else>跳转中...</span>
      </Button> -->
    <!-- </div> -->
    
    <div class="copyright-up">
        <div class="copyright-up-left">
          <div class="copyright-text">
              <span>
                共有 <span class="copyright-text-number">{{pageDataNumber}}</span> 篇文章处于原创守护中
              </span>
          </div>
        </div>
        <div class="copyright-up-right">
          <div class="cppyright-input">
              <Input v-model="searchUserInputValue" icon="search" placeholder="请输入文章标题" size ='large' @on-click = "searchUserInput(searchUserInputValue)"></Input>
          </div>
          <div class="copyright-btu" v-if="userStatus == 1">
              <Button type="primary" :loading="addArticleBol" @click="addArticle()">
                  <span v-if="!addArticleBol">添加原创保护</span>
                  <span v-else>跳转中...</span>
              </Button>
          </div>
        </div>
    </div>
    <div class="clear-fix"></div>
    <div class="copyright-table itemsActiveTable">
        <Table border :columns="tableColumns" :data="searchResultData"></Table>
        <Page :total="pageDataNumber" @on-change="pageChange" :page-size ="pageSize" show-total></Page>
    </div>
</div>
</template>

<script>
import {getMyCopyright,articleDetails} from "../../../api/api_group.js";
export default {
  components: {},
  data() {
    return {
      // 数据总条数
      pageDataNumber: 0,
      // 每页条数
      pageSize: 10,
      // 添加原创保护按钮特效
      addArticleBol: false,
      // 数据的总页数
      PageCount:0,
      //   搜索框
      searchUserInputValue: "",
      tableColumns: [
        {
          title: "序号",
          key: "sortID"
        },
        {
          title: "文章标题",
          key: "title"
        },
        {
          title: "上链时间",
          key: "createTime",
          render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.globalFun.dateFormat(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
                    ]);
                }
        },
        {
          title: "链上地址",
          key: "chainAddress"
        },
        {
          title: "txid",
          key: "txid",
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:"/header/articleDetails",query: {id:params.row.id}})
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      // 填充table的数据
      searchResultData: [],
      // 后台接口数据
      ajaxHistoryData: [],
      timer:null,
      sortPageParams : {
        title:"",
        currentPage:1,
        count:10
      },
      // 0 未审核 1 审核通过 2审核不通过
      userStatus:0
    };
  },
  created() {},
  mounted() {
    this.$Notice.config({
      top: 100
    });
    this.$set(this._data, "userStatus", sessionStorage.getItem('USER_STATUS'));
    if(this.userStatus != 1){
      this.$Notice.warning({
        title:"对不起, 您提交的信息暂时未能通过审核!"
      })
    }
    this.getData(this.sortPageParams);
  },
  watch:{
    // 实时监听
    // searchUserInputValue:function(newQuestion,oldQuestion){
    //   if(!newQuestion){
    //     this.searchUserInput(newQuestion);
    //   }
    // }
  },
  methods: {
    // 本地搜索我的版权列表
    searchUserInput(value) {
      if (!this.value) {
        let params = {
          title:value
        }
        getMyCopyright(params).then((res)=> {
            if(res && res.success){
              let sortNum = 1;
              this.searchResultData = []
              for(let i in res.data){
                  res.data[i]['sortID'] = sortNum ++;
                }
              this.pageDataNumber = res.recordTotal;
              this.searchResultData=(res.data);
            }else{
              this.searchResultData = []
            }
        })
      }
      // if(this.ajaxHistoryData.length != 0 && !!value){
      //   for(let i in this.ajaxHistoryData){
      //     if((this.ajaxHistoryData[i].txid).includes(value) || (this.ajaxHistoryData[i].chainAddress).includes(value)){
      //       this.searchResultData = [];
      //       this.searchResultData.push(this.ajaxHistoryData[i])
      //     }
      //   }
      // }else{
      //   this.searchResultData=[];
      //   this.searchResultData = this.ajaxHistoryData
      // }
    },
    // 分页功能
    pageChange(index) {
      this.sortPageParams.currentPage = index;
        this.getData(this.sortPageParams);
    },
    // 模拟获取数据
    getData(params) {
      getMyCopyright(params).then((res)=> {
        if(res && res.success){
          // sortID
          let length = res.data.length;
          // let sortID = res.recordTotal;
          this.PageCount = parseInt(res.recordTotal/10)+ (res.recordTotal%10 == 0 ? 0:1);
          let sortNumber = 1;
          if(this.sortPageParams.currentPage <= 1){
            for(let i in res.data){
              res.data[i]['sortID'] = sortNumber ++;
            }
          }else{
            // 注释掉的是降序
            // if(this.PageCount > 2){
              // if(this.sortPageParams.currentPage != this.PageCount){
                let midSortData = (this.sortPageParams.currentPage-1)*this.sortPageParams.count;
                let midSortID = sortNumber + midSortData;
                for(let i in res.data){
                  res.data[i]['sortID'] = midSortID ++;
                }
              // }else{
              //   for(let i in res.data){
              //     res.data[i]['sortID'] = length --;
              //   }
              // }
            // }
          }
          this.ajaxHistoryData = res.data;
          this.pageDataNumber = res.recordTotal;
          this.searchResultData = this.ajaxHistoryData;
        }
      })
    },
    // 添加版权保护
    addArticle() {
      this.addArticleBol = true;
      this.timer = setTimeout(()=> {
        this.$router.push({path:'/header/addOriginal'})
      },500)
    }
  }
};
</script>

<style lang="scss" scpoed>
.my-copyright {
  // .copyright-title {
  //   display: inline-block;
  //   float: right;
  //   margin-bottom: 100px;
  // }
  .copyright-up {
    // float: right;
    display: inline;
    .copyright-up-left{
      margin: 13px 0px 0px 18px;
      display: inline-block;
      .copyright-text {
        display: inline-block;
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
        font-family: 'MicrosoftYahei';
        color: #333333;
        font-weight: bold;
        .copyright-text-number{
          color: #ff845f;
        }
      }
    }
    .copyright-up-right{
      float: right;
      display: inline-block;
      .cppyright-input {
        display: inline-block;
        width: 366px;
        height: 34px;
        .ivu-input-wrapper-large .ivu-input-icon{
          cursor: pointer;
        }
        input{
          border: none;
          border-bottom:1px solid #dddddd;
          outline: none;
        }
      }
      .copyright-btu {
        display: inline-block;
        float: right;
        .ivu-btn-primary{
          color: #fefefe;
          font-family: 'MicrosoftYahei';
          font-size: 14px;
          background-color: #1c2e67;
          border-color: #1c2e67;
          margin-left: 8px;
        }
      }
    }
  }
  .copyright-table {
    margin: 12px 58px 0px;
    th .ivu-table-cell{
      color: #666666;
      font-size: 12px;
      font-family: 'MicrosoftYahei';
    }
    .ivu-table-tip table tbody tr td{
      width: 100%!important;
    }
    .ivu-page{
      margin-bottom: 20px;
    }
    .ivu-table-border td, .ivu-table-border th{
      text-align: center;
    }
  }
}
.itemsActiveTable {
  animation: bounceTable 1.5s linear;
}
@keyframes bounceTable {
  0% {
    transform: scale3d(0,0,1);
  }
  50% {
    transform: scale3d(0.5,1,0);
  }
  100% {
    transform: scale3d(1,1,1);
  }
}
</style>
