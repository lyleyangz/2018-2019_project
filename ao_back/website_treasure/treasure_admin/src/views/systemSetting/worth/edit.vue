<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";

</style>

<template>
    <div class="edit">
        <Card>
            <p slot="title" v-show="type">
               编辑token价值
            </p>
            <p slot="title" v-show="!type">
               新增token价值
            </p>
            <div class="cnt">
                <div class="item" v-show="type">
                    <span class="lb"><em>*</em>token价格(元)：</span>                   
                    <span>
                        <input v-limitNum="6" class="ivu-input" v-model.trim="params.price" style="width:350px"/>
                        <!-- <InputNumber v-limitNum="6" v-model="params.price" :min="0.001" :max="1" style="width:350px"></InputNumber> -->
                    </span>
                    <span class="tip">请输入0.001到1之间</span>
                </div>
                <div class="item" v-show="type">
                    <span class="lb"><em>*</em>矿池预警值：</span>                   
                    <span>
                        <input v-limitNum="6" class="ivu-input" v-model.trim="params.warning" style="width:350px"/>
                        <!-- <InputNumber :precision="6" v-model="params.warning" style="width:350px" :min="1000" :max="50000"></InputNumber> -->
                    </span>   
                    <span class="tip">请输入1000到50000之间</span>
                </div>
                <div class="item" v-show="!type">
                    <span class="lb"><em>*</em>矿池总量：</span>                   
                    <span>
                        <input v-limitNum="6" class="ivu-input" v-model.trim="params.number" style="width:350px"/>
                        <!-- <InputNumber v-limitNum="6" v-model="params.number" style="width:350px"></InputNumber> -->
                    </span>   
                </div>
				<div class="item btn">
					<span class="lb"></span>       
					<span>
						<Button size="large" @click="cancel()">取消</Button>
						<Button type="info" size="large" @click="confirm()" :loading="loading" v-if="type">确定</Button>
                        <Button type="info" size="large" @click="confirm()" :loading="loading" v-if="!type">提交</Button>
					</span>	
				</div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import {updateTokenWorth,searchIdToken,addToken} from "@/api/api_syetemParams.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import md5 from "@/common/libs/md5.js";
export default {
	data() {
		return {
			loading: false,
			params: {
                price: null,
                number: null,
                warning: null
            },
            type:true,
		};
	},
	created() {},
  	mounted() {
          if(this.$route.name == 'worth_add'){
              this.type = false;
          }
      },
	methods: {
		confirm() {
            
            if(this.type){
                if(!this.params.price){
                    this.$Message.error('请填写token价格');
                    return false
                }
                if(Number(this.params.price)>1){
                    this.$Message.error('token价格需介于0.001到1之间');
                    return false
                }
                if(Number(this.params.price)<0.001){
                    this.$Message.error('token价格需介于0.001到1之间');
                    return false
                }
                if(!this.params.warning){
                    this.$Message.error('请填写矿池预警值');
                    return false
                }
                if(this.params.warning<1000){
                    this.$Message.error('请填写正确的矿池预警值');
                    return false
                }
                if(this.params.warning>50000){
                    this.$Message.error('请填写正确的矿池预警值');
                    return false
                }
                updateTokenWorth(this.params).then((res)=>{
                    if(res.code == "200"&&res.msg == 'success'){
                        this.cancel()
                    }
                })
            }else{
                if(!this.params.number){
                    this.$Message.error('请填写矿池总量');
                    return false
                }
                addToken(this.params).then((res)=>{
                    if(res.code == "200" && res.msg == "success"){
                        this.$Message.success('新增成功!');
                        this.cancel()
                    }
                })
            }
        },
		cancel(){
            if(this.id){
                eventBus.$emit('closeTag', 'worth_edit');
                 history.go(-1);
            }else{
                eventBus.$emit('closeTag', 'worth_add');
                 history.go(-1);
            }
               
        },
  	},
  	computed: {}
};
</script>