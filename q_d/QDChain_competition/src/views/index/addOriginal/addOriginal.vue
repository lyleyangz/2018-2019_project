<template>
<!-- 版权 -->
 <div class='addOriginal'>
        <Row class="margin-top-10 searchable-table-con1 item">
            <span class="lb f-fl">请输入文章标题：</span>
            <span class="s-member"><i-input placeholder="不超过30字" style="width: 800px;" :maxlength='30' v-model="titleInput"></i-input></span>
        </Row>
        <Row class="margin-top-10 searchable-table-con1 item">
            <span class="lb f-fl ">请输入文章详情：</span>
            <span class="s-member"> 
                <span id="editorElem" class="bus-area"></span>
            </span>
        </Row>
        <Row class="margin-top-10 searchable-table-con1 item text">
            <span>字数不超过1万字，所有图片总大小不超过20M，其他格式内容支持敬请期待</span>  
        </Row>
        <Row class="margin-top-10 searchable-table-con1 item">
            <Button type="primary" @click="submit()">确认提交</Button>    
        </Row>
 </div>
</template>
 
<script>
import { addArticle } from "../../../api/api_group.js";
import E from "wangeditor";
export default {
  data() {
    return {
      titleInput: "",
      editorContent: ""
    };
  },
  created() {},
  mounted() {
    this.$Notice.config({
      top: 100
    });
    this.editor = new E("#editorElem");
    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.customConfig.uploadImgMaxLength = 20; //限制图片上传数量：1张
    this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; //限制每张图片上传大小：1M
    this.editor.customConfig.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify",
      "quote",
      "emoticon",
      "table",
      "code",
      "undo",
      "redo"
    ];
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };

    this.editor.create();
  },
  watch: {},
  methods: {
    submit() {
      if(!this.titleInput){
        this.$Notice.warning({
              title: `文章标题不能为空`
            });
          return 
      }
      if (!!this.editorContent && this.editorContent !== '<p><br></p>') {
        let params = {
          title: this.titleInput,
          content: this.editorContent
        };
        addArticle(params).then(res => {
          if (res && res.success) {
            this.$Notice.success({
              title: `文章添加成功`
            });
            this.$router.push({ path: "/header/myCopyright" });
          }
        });
      } else {
        this.$Notice.warning({
          title: `文章内容不能为空！`
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
// 添加版权样式
.addOriginal {
  background-color: #fff;
  padding: 54px 0px 0px 52px;
  width: 1200px;
  margin: 0 auto;
  .item {
    display: flex;
    font-size: 14px;
    display: flex;
    padding: 20px 0px;
    .lb {
      min-width: 120px;
      text-align: right;
      vertical-align: middle;
      font-size: 14px;
      color: #999999;
      line-height: 1;
      padding: 10px 12px 10px 0;
      box-sizing: border-box;
    }
    .s-member {
      margin-left: 15px;
      .bus-area {
        display: inline-block;
        width: 800px;
      }
    }
    button {
      margin: 42px 0px 114px 130px;
      width: 410px;
      height: 40px;
      background-color: #1b2e68;
      border-color: #1b2e68;
    }
  }
  .text {
    padding: 0px 0px 0px 130px;
    color: #ff8560;
  }
}
</style>
 