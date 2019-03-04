<template>
  <div class="main">
      <div class="outer">
          <div class="sidebar">
              <Collapse active-key="1">
                    <Panel key="1">
                        <span class="head-t">系统公告</span>
                        <div slot="content" class="coll-con">
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                        </div>
                    </Panel>
                    <Panel key="2">
                        <span class="head-t">媒体报道</span>
                        <div slot="content" class="coll-con">
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                        </div>
                    </Panel>
                    <Panel key="3">
                        <span class="head-t">网页动态</span>
                        <div slot="content" class="coll-con">
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                        </div>
                    </Panel>
                    <Panel key="4">
                        <span class="head-t">产品更新</span>
                        <div slot="content" class="coll-con">
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                            <h3>分类1</h3>
                        </div>
                    </Panel>
              </Collapse>
          </div>
          <div class="content">

          </div>
      </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>
<style lang="scss"  scoped="scoped">
    .main {
        width: 100%;
        background-color: #f5f8ff;
        padding: 40px 0 130px;
        .outer {
            width: 1200px;
            min-height: 1018px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .sidebar {
                width: 180px;
                background-color: #ffffff;
            }
            .content {
                width: 996px;
                background-color: #ffffff;
            }
        }
    }
</style>
<style>
   .sidebar .ivu-collapse {
       background-color: #ffffff;
       border: none;
       padding-top: 19px;
   }
   .sidebar .ivu-collapse .ivu-collapse-item {
       border: none;
   }
   .sidebar .ivu-collapse .ivu-collapse-header {
       height: 58px;
       line-height: 58px;
       font-size: 19px;
       padding-left: 16px;
   }
   .sidebar .ivu-collapse .ivu-collapse-header .head-t {
       padding-left: 16px;
   }
   .sidebar .ivu-collapse .ivu-collapse-content-box {
       padding: 9px 0 11px;
   }
   .sidebar .ivu-collapse .ivu-collapse-content-box h3 {
       width: 100%;
       height: 40px;
       line-height: 40px;
       color: #666666;
       font-size: 15px;
       text-align: center;
       cursor: pointer;
   }
</style>
