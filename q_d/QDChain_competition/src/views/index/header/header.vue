<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%',background : '#1c2e67',zIndex: '999999',height:'88px'}">
                <Menu mode="horizontal" theme="dark" active-name = "2" @on-select="selectCurrentMenu">
                    <div class="header-left">
                        <div class="layout-logo" @click="toHomePage"></div>
                        <div class="layout-title">
                            <span  @click="toHomePage">权盾链</span>
                            <span>|</span>
                            <span>原创守护者</span>
                        </div>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            我的版权
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '124px 400px 0', background: '#fff', minHeight: '780px',width: '1200px'}">
                <router-view>
                    <copyright-module v-if="currentRouterShow === 'myCopyright'"></copyright-module>
                    <addoriginal-module v-if="currentRouterShow === 'addOriginal'"></addoriginal-module>
                    <register-module v-if="currentRouterShow === 'register'"></register-module>
                    <articleDetails-module v-if="currentRouterShow === 'articleDetails'"></articleDetails-module>
                </router-view>
            </Content>
            <footer-module></footer-module>
        </Layout>
    </div>
</template>

<script>
import registerModule from "../register/register.vue";
import footer from "../footer/footer.vue";
import copyright from "../myCopyright/myCopyright.vue";
import addOriginal from "../addOriginal/addOriginal.vue";
import articleDetails from "../articleDetails/articleDetails.vue";
// import eBus from "../../../common/eventBus/eventBus.js"

export default {
  components: {
    "register-module": registerModule,
    "footer-module": footer,
    "copyright-module": copyright,
    "addoriginal-module": addOriginal,
    "articleDetails-module": articleDetails
  },
  props: ["currentRouter"],
  data() {
    return {
      currentRouterShow: ""
    };
  },
  created() {},
  mounted() {
    this.dealRouterPath(this.currentRouter);
  },
  updated() {},
  methods: {
    //   跳转homepage
    toHomePage(){
        this.$router.push({path:"/homepage"})
    },
    //   点击menuItem
      selectCurrentMenu(name){
          if(name == 1){
              this.$router.push({path:"/homepage"})
          }else{
              this.$router.push({path:"/header/myCopyright"})
          }
      },
    dealRouterPath(router) {
      let spiltPath = router.split("/")[router.split("/").length - 1];
      this.currentRouterShow = spiltPath;
    }
  }
};
</script>

<style lang="scss" scpoed>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .ivu-menu-horizontal {
    height: 88px;
    line-height: 88px;
  }
  .header-left {
    display: inline-block;
    .layout-logo {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: url("../../../common/assets/images/loginlogo.png") center
        center no-repeat;
      background-size: contain;
      vertical-align: middle;
      margin-left: 400px;
      margin: 0px 10px 0px 400px;
      cursor: pointer;
    }
    .layout-title {
      display: inline-block;
    }
    .layout-title :nth-child(1) {
      color: #ffffff;
      font-size: 26px;
      font-family: "MicrosoftYahei";
      cursor: pointer;
    }
    .layout-title :nth-child(2) {
      color: #ffffff;
      display: inline-block;
      height: 14px;
      margin: 0px 16px;
    }
    .layout-title :nth-child(3) {
      color: #ffffff;
      font-size: 14px;
      font-family: "MicrosoftYahei";
    }
  }
  .layout-nav {
    // width: 250px;
    float: right;
    margin-right: 750px;
    .ivu-menu-item{
        width: 150px;
        text-align: center;
    }
    li {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .ivu-menu-dark {
    background: #1c2e67;
  }
  .layout-footer-center {
    text-align: center;
  }
}
</style>
