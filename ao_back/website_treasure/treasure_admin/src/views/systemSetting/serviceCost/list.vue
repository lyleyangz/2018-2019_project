<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        手续费设置
                    </p>
                    <Row class="search">
                        <span class="lb">费用名称：</span>                   
                        <span>
                            <Select style="width:200px" v-model="searchParams.poundageName" placeholder="请选择">
                                <Option :value="``" >请选择</Option>
                                <Option v-for="(value,key) of classifyName" :value="key" :key="key">{{ value }}</Option>
                            </Select>
                        </span>  
                        <span class="lb">类型：</span>                
                        <Select style="width:200px" v-model="searchParams.poundageType" placeholder="请选择">
                            <Option :value="``" >请选择</Option>
                            <Option v-for="(value,key) of classifyType" :value="key" :key="key">{{ value }}</Option>
                        </Select>
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <!-- <div >
                        <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                    </div> -->
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>

        <Modal :width="600" class="modal" v-model="modal.is" :title="params.id?'编辑参数':'添加参数'">
            <Row>
                <Col>
                    <span class="lb"><em>*</em>费用名称：</span>
                    <Select style="width:300px" v-model="modal.params.poundageName" placeholder="请选择" :disabled="modal.params.id? true:false">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(value,key) of classifyName" :value="key" :key="key">{{ value }}</Option>
                    </Select>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>费用类型：</span>
                    <Select style="width:300px" v-model="modal.params.poundageType" placeholder="请选择" :disabled="modal.params.id? true:false">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(value,key) of classifyType" :value="key" :key="key">{{ value }}</Option>
                    </Select>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>编码：</span>
                    <Select style="width:300px" v-model="modal.params.poundageCode" placeholder="请选择" :disabled="modal.params.id? true:false">
                        <Option :value="``" >请选择</Option>
                        <Option v-for="(value,key) of classifyCode" :value="key" :key="key">{{ value }}</Option>
                    </Select>
                </Col>
                <Col>
                    <span class="lb"><em>*</em>手续费(%)：</span>
                    <span>
                        <InputNumber type="number" :max="100 " :min="0" v-model.number="modal.params.poundageValue" :placeholder="`只能填入数字`" style="width:300px"/>
                    </span>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="modal.is=false">取消</Button>
                <Button @click="submit()" type="primary">提交</Button>
            </div>
        </Modal>
        
    </div>
</template>

<script>
import { costList,addCost,updateCost } from '@/api/api_syetemParams.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                poundageName: "",
                poundageType: "",
                pageNo:1,
                pageSize:10
            },
            classifyName:{
                "1":"token手续费",
                "2":"通证手续费",
            },
            classifyType:{
                "1": "购物",
                "2": "兑换通证",
                "3": "转账"
            },
            classifyCode:{
                "T_TRADE": "T_TRADE",
                "T_CIRCULATE": "T_CIRCULATE",
                "I_SHOP": "I_SHOP",
                "I_TACCOUNTS": "I_TACCOUNTS"
            },
            params:{
                poundageValue: null
            },
            modal:{
                is: false,
                params:{}
            },
            auth: ""
        };
    },
    methods: {
        init () {
            this.getList();
            this.setColumns();
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
                key: 'poundageName',
                title: '费用名称',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.classifyName[params.row.poundageName] || '')
                    ]);
                }
            },{
                key: 'poundageType',
                title: '类型',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.classifyType[params.row.poundageType] || '')
                    ]);
                }
            },{
                key: 'poundageCode',
                title: '编码'
            },{
                key: 'poundageValue',
                title: '手续费(%)'
            },{
                key: 'status',
                title: '操作',
                width: 250,
                render: (h, params) => {
                    let buttonList = [];
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
            costList(this.searchParams).then(res => {
                if (res.code == '200') {
                    this.$Spin.hide();
                    this.list = res.data.entities
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
            if (!this.modal.params.poundageName) {
                this.$Message.error("请选择费用名称");
                return false;
            }
            if (!this.modal.params.poundageType) {
                this.$Message.error("请选择费用类型");
                return false;
            }
            if (!this.modal.params.poundageCode) {
                this.$Message.error("请选择编码类型");
                return false;
            }
            if (this.modal.params.poundageValue<0) {
                this.$Message.error("请输入手续费");
                return false;
            }
            if(this.modal.params.id){
                updateCost(this.modal.params).then(res=>{
                    if(res.code == 200){
                        this.modal.is = false;
                        this.$Message.success('修改成功');
                        this.search();
                    }
                })
            }else{
                addCost(this.modal.params).then((res)=>{
                    if(res.code == 200){
                        this.modal.is = false;
                        this.$Message.success('添加成功');
                        this.search();
                    }
                })  
            }
        },
        edit(item){
            this.modal.is = true;
            this.modal.params = JSON.parse(JSON.stringify(item));
            this.modal.params.poundageName = this.modal.params.poundageName + "";
            this.modal.params.poundageType = this.modal.params.poundageType + "";
            this.modal.params.poundageCode = this.modal.params.poundageCode + "";      
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