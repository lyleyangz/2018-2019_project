<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        消息管理
                    </p>
                    <Row class="search">
                        <span class="lb">消息类型：</span>                   
                        <span>
                            <Select style="width:200px" v-model="searchParams.type" placeholder="请选择">
                                <Option :value="``" >全部</Option>
                                <Option v-for="(value,key) of classifyName" :value="key" :key="key">{{ value }}</Option>
                            </Select>
                        </span>  
                        <span class="lb">模板名称：</span>                   
                        <span>
                            <input class="ivu-input" type="text" v-model.trim="searchParams.name"  style="width:150px"/>
                        </span>  
                        <span class="lb">发送方式：</span>                
                        <Select style="width:200px" v-model="searchParams.sendType" placeholder="请选择">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(value,key) of sendTypeSign" :value="key" :key="key">{{ value }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <div >
                        <!-- <Button type="primary" @click="add()" v-if="this.globalFun.userAuth.checkAuth(this.auth,"6054")">群发消息</Button> -->
                        <Button type="primary" @click="sendAllMsgFun()">群发消息</Button>
                    </div>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        <!-- 查看 -->
        <Modal :width="700" class="modal" v-model="lookModal.is" :title="lookModal.showType? '编辑':'查看'">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>消息类型：</span>
                    <span>
                        <Input disabled type="text" :value="classifyName[lookModelData.type]" style="width:300px"/>
                    </span>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>模板名称：</span>
                    <span>
                        <Input :disabled="!lookModal.showType" type="text" :maxlength="20" v-model="lookModelData.name" :placeholder="`内容限制20字之内`" style="width:300px"/>
                    </span>
                </Col>
                <Col>
                    <span class="lb">详情：</span>
                    <span>
                        <Input :disabled="!lookModal.showType" type="text" :maxlength="30" v-model="lookModelData.details" :placeholder="`内容限制30字之内`" style="width:300px"/>
                    </span>
                </Col>
                <Col>
                    <CheckboxGroup v-model="sendType">
                    <span class="lb"><em>*</em>发送方式：</span>
                        <Checkbox  :disabled="!lookModal.showType || lookModelData.type ==6" label="SMS"></Checkbox>
                        <Checkbox  :disabled="!lookModal.showType || lookModelData.type ==6" label="站内信"></Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>模板编码：</span>
                    <span>
                        <Input disabled type="text" :value="lookModelData.code" style="width:300px"/>
                    </span>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>内容：</span>
                    <span>
                        <Input :disabled="!lookModal.showType" type="textarea" :rows="5" :maxlength="300" v-model="lookModelData.content" :placeholder="`内容限制300字之内`" style="width:300px"/>
                    </span>
                </Col>
            </Row>

            <!-- 只针对预警值显示 -->
            <Row v-if="warningSign">
                    <div class="item align-items">
                        <Col v-show="lookModal.showType">
                            <span class="lb">接收人：</span>                   
                            <span>
                                <Input v-model.trim="callInfo.obj.name" :maxlength="20" style="width:350px"/>
                            </span>
                        </Col>
                        <Col v-show="lookModal.showType">
                            <span class="lb">手机号码：</span>                   
                            <span>
                                <input type="number" class="ivu-input" v-model.number="callInfo.obj.phone" maxlength="11" style="width: 350px"  @input="maxlengthFn(callInfo.obj.phone)"/>
                            </span>
                            <span @click="attributeAdd('callInfo')"><Icon class="add" type="plus-circled"></Icon></span>
                        </Col>
                    </div>
                    <Col>
                        <div class="sku-table">
                            <div class="th">
                                <div style="max-width:30%">姓名</div>
                                <div style="max-width:60%">手机号码</div>
                                <div v-show="lookModal.showType" style="max-width:10%">操作</div>
                            </div>
                            <div class="td" :class="callInfo.index == index?'active':''" v-for="(item,index) of callTabInfo" :key="index">
                                <div style="max-width:30%">{{item.name}}</div>
                                <div style="max-width:60%">{{item.phone}}</div>
                                <div v-show="lookModal.showType" style="max-width:10%"><span @click="attributeDel('callInfo',index)"><Icon class="del" type="minus-circled"></Icon></span></div>
                            </div>
                        </div>
                    </Col>
            </Row>
            <div slot="footer">
                <Button @click="lookModal.is=false;">取消</Button>
                <Button  :disabled="!lookModal.showType" @click="submit()" type="primary">提交</Button>
            </div>
        </Modal>
        <!-- 群发消息 -->
        <Modal :width="700" class="modal" v-model="sendAllModel.is" title="群发">
            <Row>
                <Col>
                    <RadioGroup v-model="sendAllGroup">
                        <Radio label="指定发送人"></Radio>
                        <Radio label="所有用户"></Radio>
                    </RadioGroup>
                </Col>
                <Col v-if="sendAllGroup == '指定发送人'">
                    <span class="lb"><em>*</em>发送对象：</span>
                    <span>
                        <Input type="text" v-model.trim="sendAllParams.phones" placeholder="多个号码用英文“;”隔开" style="width:400px"/>
                    </span>
                </Col>
                <Col>
                    <CheckboxGroup v-model="sendType">
                    <span class="lb"><em>*</em>发送方式：</span>
                        <Checkbox label="SMS"></Checkbox>
                        <Checkbox label="站内信"></Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>标题：</span>
                    <span>
                        <Input type="text" :maxlength="30" v-model="sendAllParams.title" :placeholder="`内容限制30字之内`" style="width:400px"/>
                    </span>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>内容：</span>
                    <span>
                        <Input type="textarea" :rows="5" :maxlength="300" v-model="sendAllParams.content" :placeholder="`内容限制300字之内`" style="width:400px"/>
                    </span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="sendAllModel.is=false">取消</Button>
                <Button @click="submitSendAll()" type="primary">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { msgList,msgDetail,editMsg,sendAllMsg,updateStatus} from '@/api/api_message.js'
import { get } from 'http';
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                name: null,
                type: null,
                sendType:null,
                pageNo:1,
                pageSize:10
            },
            classifyName:{
                "1":"购物",
                "2":"注册",
                "3":"密码",
                "4":"评价",
                "5":"售后",
                "6":"预警",
                "7":"退款",
            },
            sendTypeSign:{
                "1": "SMS",
                "2": "站内信",
                "3": "SMS/站内信",
            },
            params:{},
            modal:{
                is: false
            },
            auth: "",
            lookModal:{
                is:false,
                showType:false
            },
            // 查看编辑的数据
            lookModelData:{},
            // 群发的数据
            sendAllParams:{
                userType:null,
                sendType:null,
            },
            // 
            // 预警值
            warningSign:false,
            // 发送方式
            sendType: [],
            callInfo:{
                obj:{},
                index: -1
            },
            callTabInfo:[],
            // 群发消息
            sendAllModel:{
                is:false
            },
            sendAllGroup:"指定发送人"
        };
    },
    watch:{
        sendAllGroup(newval,oldval){
            this.sendAllParams = {
                userType:null,
                sendType:null,
            }
        }
    },
    methods: {
        init () {
            this.getList();
            this.setColumns();
        },
        change(){
            this.sendAllParams = {
                userType:null,
                sendType:null,
            }
        },
        maxlengthFn(val){
          if(String(val).length >= 11) {
              this.callInfo.obj.phone = String(val).slice(0, 11);
          }
        },
        setColumns(){
            this.columns = [{
                key: 'seq',
                title: '序号',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },{
                key: 'type',
                title: '消息类型',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.classifyName[params.row.type] || '')
                    ]);
                }
            },{
                key: 'name',
                title: '模板名称'
            },{
                key: 'details',
                title: '详情'
            },{
                key: 'code',
                title: '模板编码'
            },{
                key: 'sendType',
                title: '发送方式',
                render: (h, params) => {
                    var sendTypeSinged = {
                        "1": "SMS",
                        "2": "站内信",
                        "3":"SMS/站内信"
                    }
                    return h('div', [
                        h('span', {}, sendTypeSinged[params.row.sendType] || '')
                    ]);
                }
            },{
                key: 'receive',
                title: '接收人',
                render: (h, params) => {
                    if(!params.row.receive){
                        return
                    }
                    let strArr = String(params.row.receive).split(";");
                    let renderArr = [];
                    for(let i in strArr){
                        renderArr.push(h('div', {}, strArr[i]));
                    }
                    return h('div', renderArr);
                }
            },{
                key: 'updateTime',
                title: '编辑时间',
                render:(h,params) => {
                    if(params.row.updateTime){
                        params.row.updateTime = ((params.row.updateTime).split('.0'))[0]
                    }
                    return h('div', [
                        h('span', {}, params.row.updateTime || '')
                    ]);
                }
            },{
                key: 'status',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
                    // 6051
                    if(this.globalFun.userAuth.checkAuth(this.auth,"6042")){
                        buttonList.push(
                           h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.look(params.row);
                                }
                            }
                        }, '查看'))
                   }
                //    6052
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6042")){
                        buttonList.push(
                           h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.edit(params.row);
                                }
                            }
                        }, '编辑'))
                   }
                //    6053
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6042")){
                       var type = params.row.status == 1? 'error':'primary'
                        buttonList.push(h('Button', {
                            props: {
                                type: type,
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.updateStatus(params.row);
                                }
                            }
                        }, params.row.status==1?'关闭':'开启'))
                   }
                   
                    return h('div', {
                        style: {
                            width: '100%',
                            textAlign: 'center'
                        }
                    }, buttonList);
                }
            }];
        },
        getList(callback){
            this.$Spin.show();
            msgList(this.searchParams).then(res => {
                if (res.code == '200') {
                    this.$Spin.hide();
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    if(callback){
                        callback();
                    }
                }
            });
        },
        add(){
            this.modal.is = true;
            this.params = {
                poundageValue: null
            }
        },
        submit() {
            if (!this.lookModelData.name) {
                this.$Message.error("请输入模板名称");
                return false;
            }
            if (this.sendType.length<=0) {
                this.$Message.error("请选择发送方式");
                return false;
            }
            // if (!this.lookModelData.details) {
            //     this.$Message.error("请输入详情");
            //     return false;
            // }
            if (!this.lookModelData.content) {
                this.$Message.error("请输入内容");
                return false;
            }
            var params = {
                id:this.lookModelData.id,
                name:this.lookModelData.name,
                // 
                sendType:this.sendType.length,
                receive:null,
                details:this.lookModelData.details,
                content:this.lookModelData.content

            }
            if(this.lookModelData.type == 6){
                params.receive = this.lookModelData.receive;
            }
            if(this.sendType.length>0){
                if(this.sendType.length>1){
                    params.sendType = 3;
                }else{
                    for(let i in this.sendType){
                        if(this.sendType[i] == "SMS"){
                            params.sendType = 1;
                        }else{
                            params.sendType = 2;
                        }
                    }
                }
            }
            editMsg(params).then((res)=>{
                if(res.code == "200"){
                    this.lookModal.is = false;
                    this.$Message.success("编辑成功");
                    this.init()
                }
            })
        },
         look(item){
            this.sendType = [];
            this.lookModal.is = true;
            this.lookModal.showType = false;
            this.warningSign = false;
            msgDetail({id:item.id}).then((res)=>{
                if(res.code == "200" && res.msg == "success"){
                    this.lookModelData = res.data;
                    if(res.data.sendType == 3){
                        this.sendType.push("SMS","站内信")
                    }else{
                    this.sendType.push(this.sendTypeSign[res.data.sendType])
                    }
                    if(item.type == 6){
                        this.warningSign = true;
                        this.callTabInfo = this.dealReceive(res.data.receive);
                    }
                }
            })
        },
        edit(item){
            this.callInfo.obj={}
            this.sendType = [];
            this.lookModelData = item;
            if(item.sendType == 3){
                this.sendType.push("SMS","站内信")
            }else{
                this.sendType.push(this.sendTypeSign[item.sendType])
            }
            this.lookModal.is = true;
            this.lookModal.showType = true;
            this.warningSign = false;
            // 预警值特殊处理
            if(item.type == 6){
                this.warningSign = true;
                this.callTabInfo = this.dealReceive(item.receive);
            }
        },
        // 处理接收人数据格式
        dealReceive(str){
            let receiveArr = str.split(";");
            let receiveObj = {}
            let returnData = []
            for(let i in receiveArr){
                if(!receiveArr[i].split(":")[0] || !receiveArr[i].split(":")[1]){
                    continue; 
                }
                receiveObj["name"] = receiveArr[i].split(":")[0];
                receiveObj["phone"] = receiveArr[i].split(":")[1];
                returnData.push(receiveObj);
                receiveObj = {}
            }
            return returnData
        },
        // 反向处理接收人数据
        reDealReceive(arr){
            var strReceive = ""
            for(let i in arr){
                strReceive += arr[i].name+":"+arr[i].phone+";"
            }
            return strReceive;
        },
       // 属性添加
        attributeAdd(name){
            switch(name){
                case 'callInfo':
                    if(!this.callInfo.obj.name){
                        this.$Message.error('请输入接收人');
                        return false;
                    }
                    if(!this.callInfo.obj.phone){
                        this.$Message.error('请输入手机号');
                        return false;
                    }
                    break;
            }
            if(this.callInfo.obj.phone.length != 11){
                this.$Message.error('手机号格式不正确');
                return false
            }
            if(this.callTabInfo.length >= 20){
                this.$Message.error('已达到发送消息上限');
                return false
            }
            this.callTabInfo.push(this.callInfo.obj)
            this.lookModelData.receive = this.reDealReceive(this.callTabInfo);
            this.callInfo.obj = {};
        },
        // 属性值删除
        attributeDel(name,index){
            if(this.lookModal.showType){
                this.callTabInfo.splice(index,1);
                this.lookModelData.receive = this.reDealReceive(this.callTabInfo);
            }else{
                return
            }
        },
        // 群发消息
        sendAllMsgFun(){
            this.sendAllParams = {
                userType:null,
                sendType:[],
            }
            this.sendType = [];
            this.sendAllGroup = "指定发送人";
            this.sendAllModel.is = true;
        },
        submitSendAll(){
            this.sendAllParams.userType = this.sendAllGroup == "指定发送人" ? 1:2;
            if (this.sendType.length<=0) {
                this.$Message.error("请选择发送方式");
                return false;
            }
            if (!this.sendAllParams.title) {
                this.$Message.error("请输入标题");
                return false;
            }
            if (!this.sendAllParams.content) {
                this.$Message.error("请输入内容");
                return false;
            }
            if(this.sendType.length>0){
                if(this.sendType.length>1){
                    this.sendAllParams.sendType = 3;
                }else{
                    for(let i in this.sendType){
                        if(this.sendType[i] == "SMS"){
                            this.sendAllParams.sendType = 1;
                        }else{
                            this.sendAllParams.sendType = 2;
                        }
                    }
                }
            }
            if(this.sendAllParams.userType == 1){
                if(!this.sendAllParams.phones){
                    this.$Message.error('请填入发送对象');
                    return false
                }
            }
            sendAllMsg(this.sendAllParams).then((res)=>{
                if(res.code == "200"){
                    this.sendAllModel.is = false;
                    this.$Message.success("群发消息成功");
                    this.init()
                }
            })
        },
        // 搜索
        search(){
            this.searchParams.pageNo = 1;
            this.getList(() => {
                this.page = 1;
            });
        },
     
        // 选择页数
        convertPage(index){ 
            this.searchParams.pageNo = index;
            this.getList(() => {
                this.page = index;
            });
        },
        convertPageSize(size){
            this.searchParams.pageSize = size;
            this.getList();
        },
        updateStatus(item){
            var status = item.status == 1?2:1;
            this.$Modal.confirm({
                content: '是否要'+(status==1?'开启':'关闭')+'当前推送消息?',
                onOk: () => {
                  updateStatus({
                        id: item.id,
                        status: status
                    }).then(res=>{
                        if(res.code == 200){
                            this.$Message.success('提交成功');
                            this.init();
                        }
                    })
                }
            });
            
        },
    },
    mounted () {
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    },
    updated(){
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './list.less';
</style>