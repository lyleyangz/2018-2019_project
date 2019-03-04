<style lang="less">
@import "../../../common/styles/common.less";
@import "./edit.less";

</style>

<template>
    <div class="edit">
        <Card>
            <p slot="title">
               {{isEdit?'修改':'添加'}}token奖励值
            </p>
            <div class="cnt">
                <div class="item">
                                 
                    <span>
                        <RadioGroup v-model="params.pointType" @on-change="changePoint">
                            <Radio label="3" :disabled="isEdit">
                                <span>永久类型</span>
                            </Radio>
                            <Radio label="1" :disabled="isEdit">
                                <span>固定类型</span>
                            </Radio>
                            <Radio label="2" :disabled="isEdit">
                                <span>指向类型</span>
                            </Radio>
                        </RadioGroup>
                    </span>   
                </div>
                <div class="item" v-if="params.pointType==3">
                    <span class="lb"><em>*</em>类型：</span>                   
                    <span>
                        <Select style="width:350px" v-model="params.code" placeholder="请选择" @on-change="changeUrlType" :disabled="isEdit">
                            <Option :value="``" >请选择</Option>
                            <Option v-for="(val,key) of foreverType" :value="key" :key="key" :disabled="haveCode.search(key)>=0">{{ val }}</Option>
                        </Select>
                    </span>   
                </div>
                <div class="item" v-if="params.pointType==1">
                    <span class="lb"><em>*</em>类型：</span>                   
                    <span>
                        <Select style="width:350px" v-model="params.code" placeholder="请选择" @on-change="changeUrlType" :disabled="isEdit">
                            <Option :value="``" >请选择</Option>
                            <Option v-for="(val,key) of fixedType" :value="key" :key="key" :disabled="haveCode.search(key)>=0">{{ val }}</Option>
                        </Select>
                    </span>   
                </div>
                <div v-if="params.pointType==2">
                    <div class="item">
                        <span class="lb"><em>*</em>类型：</span>                   
                        <span>
                            <Select style="width:350px" v-model="params.code" placeholder="请选择" @on-change="changeUrlType" :disabled="isEdit">
                                <Option :value="``" >请选择</Option>
                                <Option v-for="(val,key) of pointType" :value="key" :key="key" >{{ val }}</Option>
                            </Select>
                        </span>   
                    </div>
                    <div class="item">
                        <span class="lb"><em>*</em>路径：</span>                   
                        <span>
                            <Select style="width:350px" v-model="params.pathType" placeholder="请选择">
                                <Option v-for="(val,key) of urlType" :value="key" :disabled="key!='p_11' && key!='v_3' && havePath.search(key)>=0" :key="key">{{ val }}</Option>
                            </Select>
                        </span>   
                    </div>
                    <div class="item" v-if="params.pathType=='p_11' || params.pathType=='v_3'">
                        <span class="lb" v-if="params.pathType=='p_11'"><em>*</em>页面路径：</span>                   
                        <span class="lb" v-if="params.pathType=='v_3'"><em>*</em>视频路径：</span>
                        <span>
                            <Input v-model.trim="params.path" style="width:350px" :maxlength="100" />                            
                        </span>   
                    </div>
                </div>
                <div class="title-block"></div>
                <div class="item">
                    <span class="lb"><em>*</em>名称：</span>                   
                    <span>
                        <Input v-model.trim="params.name" style="width:350px" :maxlength="15" />
                    </span>   
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>详解：</span>                   
                    <span>
                        <Input v-model.trim="params.detail" style="width:350px" :maxlength="30" />
                    </span>   
                </div>
                <div class="item">
                    <span class="lb">排序：</span>                   
                    <span>
                        <InputNumber type="number" :max="30 " :min="1" v-model.trim="params.sort" style="width:350px"/>
                    </span>   
                </div>
                <div>
                    <div class="item">
                        <span class="lb"><em>*</em>token奖励：</span>                   
                        <span>
                            <input v-limitNum="6" class="ivu-input" v-model="params.score" style="width:350px;"/>
                        </span>   
                    </div>
                </div>
                <div class="item">
                    <span class="lb"><em>*</em>token规则：</span>                   
                    <span>
                        <RadioGroup v-model="params.type">
                            <Radio label="1" :disabled="params.pointType==3">
                                <span>临时token</span>
                            </Radio>
                            <Radio label="2" :disabled="params.pointType==2 || params.code == 'st_8'">
                                <span>永久token</span>
                            </Radio>
                        </RadioGroup>
                    </span>   
                </div>
                <div class="item" v-if="params.type == 2">
                    <span class="lb"></span>                   
                    <span>
                        <RadioGroup v-model="params.limitType" @on-change="changeLimitType">
                            <Radio label="1">
                                <span>每个账号限领</span>
                                <InputNumber type="number" :max="99" :min="1" v-model.trim="params.limitFixedTimes" style="width:80px"/> 次
                            </Radio>
                            <Radio label="2">
                                <span>每个账号每天限领</span>
                                <InputNumber type="number" :max="99" :min="1" v-model.trim="params.limitTimes" style="width:80px"/> 次
                            </Radio>
                        </RadioGroup>
                    </span>   
                </div>
                
				<div class="item btn">
					<span class="lb"></span>       
					<span>
						<Button size="large" @click="cancel()">取消</Button>
						<Button type="info" size="large" @click="confirm()" :loading="loading">提交</Button>
					</span>	
				</div>
            </div>
			
        </Card>
    </div>
</template>

<script>
import { scoreDetail,updateScore,addScore,scoreList} from "@/api/api_syetemParams.js";
import eventBus from "@/common/evnetBus/eventBus.js";
import md5 from "@/common/libs/md5.js";
export default {
	data() {
		return {
            loading: false,
            haveCode: "",
            havePath: "",
			params: {
                id: this.$route.params.id || null,
                pointType: "3",
                type: "2",
                sort: 1,
                limitFixedTimes: null,
                limitTimes: null
            },
            isEdit: this.$route.params.id?true:false,
            roleList:{},
            foreverType: {
                "st_1":"创建钱包",
                "st_2":"签到",
                "st_5":"好友注册",
                "st_6":"好友购买",
                "st_8":"购物返token",//
            },
            fixedType:{
                "st_4":"邀请好友",
                "st_9":"分享商品",//
            },
            pointType:{
                "st_7":"进入页面",
                "st_3":"观看视频"
            },
            urlType1:{
                // "p_12": "珠宝商城首页",
                "p_2": "商品详情页",
                "p_3": "token奖励说明",
                "p_4": "商品溯源首页",
                // "p_5": "商品货运记录",
                // "p_6": "商品检测证明",
                "p_7": "现场监控页面",
                "p_8": "钱包页面",
                "p_9": "订单页面",
                "p_10": "邀请好友页面",
                "p_11": "外部页面"
            },
            urlType2:{
                "v_1": "商品监控视频",
                // "v_2": "珠宝大师视频",
                "v_3": "外部视频"
            },
            urlType:{},
            scoreList: [],
            oldUrl:""
		};
	},
	created() {
        if(this.params.id){
            this.getDetail();
        }
        this.getList();  
    },
  	mounted() {},
	methods: {
        changePoint(){
            if(this.params.pointType == 3){
                this.params.type = "2";
            }else{
                this.params.type = "1";
            }
        },
        getList(){
            var haveCode = [];
            var havePath = [];
            scoreList({
                pageNo: 1,
                pageSize: 100
            }).then(res=>{
                if(res.code == 200){
                    this.scoreList = res.data.entities;
                    for(var item of this.scoreList){
                        haveCode.push(item.code)
                        if(item.pathType){
                            havePath.push(item.pathType);
                        }
                    }
                }
                this.haveCode = haveCode.join(",");
                this.havePath = havePath.join(",")
            })
        },
        getDetail(){
            scoreDetail({
                id: this.params.id
            }).then(res=>{
                if(res.code == 200){
                    this.params = res.data || {};
                    this.params.type = this.params.type + "";
                    this.params.limitType = this.params.limitType + "";
                    this.oldUrl = this.params.path;
                    if(this.params.limitType == 1){
                        this.params.limitTimes = null;
                    }else{
                        this.params.limitFixedTimes = null;
                    }
                    this.changeUrlType()
                }
            })
        },
        checkUrl(){
            var flag = false;
            if(this.params.path==this.oldUrl){
                 return flag;
            }
            for(var item of this.scoreList){
                if(item.pathType == this.params.pathType && item.path == this.params.path){
                   flag = true;
                   break;
               }
            }
            return flag;
        },
		confirm() {
           
            if (!this.params.code) {
                this.$Message.error("请选择类型");
                return false;
            }
            
            if(this.params.pointType == 2){
                if (!this.params.pathType) {
                    this.$Message.error("请选择路径");
                    return false;
                }
                if(this.params.pathType=='p_11'){
                    if(!this.params.path){
                        this.$Message.error("请输入页面路径");
                        return false;
                    }
                    if(this.checkUrl()){
                        this.$Message.error("页面路径不能重复");
                        return false;
                    }
                }
                if(this.params.pathType=='v_3'){
                    if(!this.params.path){
                        this.$Message.error("请输入视频路径");
                        return false;
                    }
                    if(this.checkUrl()){
                        this.$Message.error("视频路径不能重复");
                        return false;
                    }
                }
                
            }
            if (!this.params.name) {
                this.$Message.error("请输入名称");
                return false;
            }
            if (!this.params.detail) {
                this.$Message.error("请输入详解");
                return false;
            }
            if (!this.params.score) {
                this.$Message.error("token奖励");
                return false;
            }
            this.params.score = this.params.score + "";
            var re =new RegExp("^\\d*(\\.?\\d{0,6})","g");
            this.params.score = this.params.score.match(re)[0] || null;  
            if (this.params.score>1000) {
                this.$Message.error("token奖励数量不能超过1000");
                return false;
            }
            if(this.params.type==2){
                if(!this.params.limitType){
                    this.$Message.error("请选择限领方式");
                    return false;
                }
                if(this.params.limitType==1 && !this.params.limitFixedTimes){
                    this.$Message.error("请输入每个账号限领次数");
                    return false;
                }
                if(this.params.limitType==2 && !this.params.limitTimes){
                    this.$Message.error("请输入每个账号每天限领次数");
                    return false;
                }
                
            }
           
			if(!this.loading){
                this.loading = true;
				var params = JSON.parse(JSON.stringify(this.params));
                var _this = this;
                if(this.params.id){
                    updateScore(this.params).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            setTimeout(() => {
                                _this.cancel();
                            }, 1000);
                        }
                        this.loading = false;
                    })
                }else{
                    if(this.params.pointType==3){
                        this.params.typeName = this.foreverType[this.params.code];
                        this.params.pathTypeName = "";
                    }else if(this.params.pointType==1){
                        this.params.typeName = this.fixedType[this.params.code];
                        this.params.pathTypeName = "";
                    }else if(this.params.pointType==2){
                        this.params.typeName = this.pointType[this.params.code];
                        this.params.pathTypeName = this.urlType[this.params.pathType];
                    }
                    addScore(this.params).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            setTimeout(() => {
                                _this.cancel();
                            }, 1000);
                        }
                        this.loading = false;
                    });
                }
			}
        },
     
		cancel(){
            if(this.params.id){
                eventBus.$emit('closeTag', 'reward_edit');
            }else{
                eventBus.$emit('closeTag', 'reward_add');
            }
			history.go(-1);
        },
        changeUrlType(){
            var code = this.params.code;
            var urlType = {};
            switch (code) {
                case "st_7":
                    urlType = this.urlType1;
                    break;
                case "st_3":
                    urlType = this.urlType2;
                    break;
                case "st_8":
                    this.params.type = "";
                    break;
                default:
                    break;
            }
            this.urlType = urlType;
        },
        changeLimitType(){
            this.params.limitFixedTimes = null;
            this.params.limitTimes = null;
        }
  	},
  	computed: {}
};
</script>