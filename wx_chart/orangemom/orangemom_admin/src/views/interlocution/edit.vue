<template>
  <div class="eidt"> 
        <Card>
            <p slot="title"><label v-if="params.id">编辑</label><label v-else>添加</label>问答</p>
            <div class="cnt">
                <div class="item">
                    <span class="lb">分类：</span>                   
                    <span>
                        <Input v-model.trim="params.questionType" placeholder="请输入分类" style="width: 300px" :maxlength="20"/>
                    </span>   
                    <span class="tip">限制20字以内</span>
                </div>
                <div class="item">
                    <span class="lb">分类排序：</span>  
                    <span>
                        <input v-limitNum class="ivu-input" v-model.trim="params.questionNumber" style="width:300px;" maxlength="9"/>
                    </span>
                    <span class="tip">数值越小，排序越前，从1开始的正整数</span>
                </div>
                <div class="item">
                    <span class="lb">标题：</span>  
                    <span>
                        <Input v-model.trim="params.title" placeholder="请输入标题" style="width: 750px" :maxlength="50"/>
                    </span>
                    <span class="tip">限制50字以内</span>
                </div>
                <div class="item noticeCount">
                    <span class="lb">回答：</span>
                    <div  style="width:90%">
                        <div id="editorElem" ref="editorElem" style="width:100%"></div>
                    </div>
                </div>
                <div class="item">
                    <span class="lb"></span>  
                    <span>
                        <Button type="info" size="large" @click="confirm()">确定</Button>
                        <Button type="info" size="large" @click="cancel()">取消</Button>
                    </span>
                </div>
            </div>
        </Card>
           
	</div>
</template>
<script>
    import eventBus from '../../common/evnetBus/eventBus.js';
    import { add,update,queryList } from '../../api/api_interlocution.js';
    import E from 'wangeditor';
    export default {
        name: 'editor',
        data (){
             return {
                editor:null,
                editorContent:'',
                params: {
                    questionType: "",
                    questionNumber: 1,
                    title: '',
                    answer: ''
                },
                editorMax: 1000
             }
        },
        created(){},
        methods : {
            confirm(){
                if(!this.params.questionType){
                    this.$Message.error('请输入分类');
                    return false;
                }
                if(!this.params.questionNumber){
                    this.$Message.error('请输入分类排序');
                    return false;
                }
                if(!this.params.title){
                    this.$Message.error('请输入标题');
                    return false;
                }
                if(this.editorContent ==''){
                    this.$Message.error('请填写回答');
                    return false;
                }
                // var editorElem = this.$refs.editorElem;
                // var html = editorElem.innerText;
                // html = html.replace(/(^\s*)|(\s*$)/g, ""); 
                // if(html.length>1000){
                //     this.$Message.error('回答限制1000字以内');
                //     return false;
                // }
                
                this.params.answer = this.editorContent;
                if(this.params.id){
                    update(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('提交成功');
                            history.go(-1);
                            eventBus.$emit('closeTag', 'interlocutionEdit');
                        } else {
                            this.$message.error(res.errCode);
                        }
                    })
                }else{
                    add(this.params).then((res) => {
                        if (res.code == 200) {
                            this.$Message.success('提交成功');
                            eventBus.$emit('closeTag', 'interlocutionAdd');
                            history.go(-1);
                        } else {
                            this.$message.error(res.errCode);
                        }
                    })
                }   
            },
            getDetail(id){
                queryList({
                    id: id
                }).then(res=>{
                    if (res.code == 200) {
                        this.params = res.data.entities[0];
                        this.editor.txt.html(this.params.answer);
                        this.editorContent = this.params.answer;
                    }
                })
            },
            cancel(){
                if(this.params.id){
                    eventBus.$emit('closeTag', 'interlocutionEdit');
                }else{  
                    eventBus.$emit('closeTag', 'interlocutionAdd');
                }
                history.go(-1);
            }
        },
        mounted() {
            var id = this.$route.query.id;
            
            this.editor = new E('#editorElem');
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'undo',  // 撤销
                'redo'  // 重复
            ]
            this.editor.config = {
                pasteText : true
            }
            this.editor.customConfig.pasteFilterStyle = false;
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            }
            this.editor.create();
            if(id){
                this.getDetail(id);
            }
        },
       
    }
</script>
<style lang="less">
    @import '../../common/styles/common.less';
    @import './edit.less';
</style>

