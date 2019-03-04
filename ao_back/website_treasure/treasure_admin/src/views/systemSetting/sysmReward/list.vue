<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        系统token奖励设置
                    </p>
                    <Row class="search">
                         <span class="lb">类型：</span>                
                        <Select style="width:200px" v-model="searchParams.type" placeholder="请选择">
                            <Option :value="``" >全部</Option>
                            <Option v-for="(value,key) of classifyType" :value="key" :key="key">{{ value }}</Option>
                        </Select>
                        
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <!-- <div v-if="auth && globalFun.userAuth.checkAuth(auth,'6063')">
                        <Button type="primary"  @click="edit()">编辑</Button>
                    </div> -->
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        <!-- 转入 -->
        <div v-if="intoModel.is">
            <Modal :width="500" class="modal" v-model="intoModel.is" title="转入">
                <Row>
                    <Col>
                        <span class="lb">矿池总量：</span>
                        <span>{{intoModel.totalNum}}</span>
                    </Col>
                </Row>
                 <Row>
                    <Col>
                        <span class="lb">转入数量：</span>
                        <span>
                            <input v-limitNum="6" class="ivu-input"  v-model="params.number" style="width:200px"/>
                        </span>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="intoModel.is=false">取消</Button>
                    <Button @click="sureInto()" type="primary">确定</Button>
                </div>
            </Modal>
        </div>
        <!-- 批量编辑 -->
        <div v-if="editModel.is">
            <Modal :width="600" class="modal" v-model="editModel.is" title="编辑">
                <Row>
                    <Col>
                        <span class="lb">类型：</span>
                        <input disabled class="ivu-input" type="text" :value="editName" style="width:300px"/>
                    </Col>
                    <Col>
                        <span class="lb">详解：</span>
                        <input class="ivu-input" type="text" v-model="editDataList[0].details" style="width:300px"/>
                    </Col>
                    <Col>
                        <span class="lb">矿池预警值：</span>
                        <input v-limitNum="6" class="ivu-input" v-model="editDataList[0].warning" placeholder="矿池预警值大于1000，小于10000" style="width:200px"/>
                    </Col>
                    <Col>
                        
                        <span class="lb">
                            <Checkbox v-model="editDataList[0].isAuto"></Checkbox>
                            预警自动转入：</span>
                        <input class="ivu-input" v-limitNum="6" v-model="editDataList[0].autoPadding" style="width:200px"/>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="editModel.is=false">取消</Button>
                    <Button @click="sureEdit()" type="primary">确定</Button>
                </div>
            </Modal>
        </div>
      
        
    </div>
</template>

<script>
import { sysmTokenList,intoToken,editToken } from '@/api/api_syetemParams.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                type: null,
                pageNo: 1,
                pageSize: 10
            },
            params:{
            },
            intoModel:{
                is:false,
                totalNum:null,
                id:null
            },
            editModel:{
                is:false
            },
            editDataList:[
                {
                    id:null,
                    details:null,
                    warning:null,
                    autoPadding:null,
                    isAuto:false
                }
            ],
            editName:null,
            auth: "",
            classifyType:{
                "2":"购买",
                "3":"临时",
                "4":"永久",
            },
        };
    },
    methods: {
        init () {
            this.setColumns();
            this.getList();
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
                key: 'name',
                title: '类型'
            },{
                key: 'details',
                title: '详解'
            },{
                key: 'totalNum',
                title: 'token总量'
            },{
                key: 'warning',
                title: '矿池预警值',
                width: 140,
            },{
                key: 'createTime',
                title: '最近编辑时间',
                width: 140,
                render:(h,params) => {
                    if(params.row.createTime){
                        params.row.createTime = ((params.row.createTime).split('.0'))[0]
                    }
                    return h('div', [
                        h('span', {}, params.row.createTime || '')
                    ]);
                }
            },{
                key: 'status',
                title: '操作',
                width: 200,
                render: (h, params) => {
                    let buttonList = [];
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6063")){
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
                                    console.log(params.row)
                                    this.edit(params.row)
                                }
                            }
                        }, '编辑'))
                   }
                   if(this.globalFun.userAuth.checkAuth(this.auth,"6061")){
                       buttonList.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.intoTokenFun(params.row);
                                }
                            }
                        }, '转入'))
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
            sysmTokenList(this.searchParams).then(res=>{
                this.$Spin.hide();
                if (res.code == '200') {
                    this.list = res.data.entities;
                    this.pageTotal = res.data.count;
                    this.$Spin.hide();
                    if(callback){
                        callback();
                    }
                }
            })
        },
        intoTokenFun(item){
            this.params.number = "";
            this.intoModel.is = true;
            this.intoModel.totalNum = item.totalNum;
            this.intoModel.id = item.id;
            this.params.id = item.id;
        },
        edit(item){
            this.editName = item.name
            this.editDataList[0] = {
                id:item.id,
                warning:item.warning,
                details:item.details,
                autoPadding:item.autoPadding,
                isAuto:item.isAuto == 2 ? true:false
            }
            this.editModel.is = true;
        },
        // 转入
        sureInto(){
            if(!this.params.number){
                this.$Message.error('请填写转入数量');
                return false
            }
            intoToken(this.params).then((res)=>{
                if(res.code == "200"&& res.msg == "success"){
                    this.intoModel.is = false;
                    this.$Message.success('转入成功');
                    this.init()
                }
            })
        },
        // 编辑
        sureEdit(){
            if(this.editDataList[0].warning > 10000){
                this.$Message.error('请填写小于10000矿池预警值');
                    return false
            }
            if(this.editDataList[0].warning < 1000){
                this.$Message.error('请填写大于1000矿池预警值');
                    return false
            }
            if(this.checkEdit()){
                this.editDataList[0].isAuto = this.editDataList[0].isAuto == true?2:1
                editToken(this.editDataList).then((res)=>{
                    if(res.code == "200"&& res.msg == "success"){
                    this.editModel.is = false;
                    this.$Message.success('编辑成功');
                    this.init()
                }
                })
            }
        },
        // 批量验证
        checkEdit(){
            for(let i in this.editDataList){
                if(!this.editDataList[i].details){
                    this.$Message.error(`详情不能为空`);
                    return false
                }
                if(!this.editDataList[i].warning){
                    this.$Message.error(`预警值不能为空`);
                    return false
                }
                if(!this.editDataList[i].autoPadding && this.editDataList[i].isAuto){
                    this.$Message.error(`预警自动转入不能为空`);
                    return false
                }
                if(this.editDataList[i].autoPadding > 10000) {
                     this.$Message.error(`预警自动转入大于10000`);
                    return false
                }
            }
            return true
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
    },
    mounted () {
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './list.less';
</style>