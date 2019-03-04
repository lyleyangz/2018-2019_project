<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        token价值
                    </p>
                    <Row class="search">           
                        <span class="lb">类型：</span>    
                        <span>
                            <Select style="width:200px" v-model="searchParams.type" placeholder="请选择">
                                <Option :value="``" >请选择</Option>
                                <Option v-for="(value,key) of tyleList" :value="key" :key="key">{{ value }}</Option>
                            </Select>
                        </span>  
                        <span class="btn">
                            <Button type="primary" icon="search" @click="search">搜索</Button>
                        </span>
                    </Row>
                    <Row class="search">
                        <span class="lb">当前矿池总量：</span>
                        <span>{{Number(Totaltoken).toFixed(6)}}</span>    
                        <span class="lb">矿池预警值：</span>
                        <span>{{Number(warning).toFixed(6)}}</span>                   
                    </Row>
                   
                    <Row class="search">
                        <span v-if="auth && globalFun.userAuth.checkAuth(auth,'6033')">
                            <Button type="primary" icon="plus-round" @click="add()">添加</Button>
                        </span>
                        <span  v-if="auth && globalFun.userAuth.checkAuth(auth,'6032')&&pageTotal>0">
                            <Button type="primary"  @click="edit()">编辑</Button>
                        </span>                     
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list" ></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="searchParams.pageNo"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>

      
        
    </div>
</template>

<script>
import { tokenList,searchIdToken,searchCodeToken,getTokentotalNumber} from '@/api/api_syetemParams.js'
export default {
    data () {
        return {
            is_have:false,
            Totaltoken:0,
            warning:0,
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                pageNo: 1,
                pageSize: 10
            },
            params:{
                paramName:"",
                paramUrl:"",
                id:"",
            },
            tyleList: {
                "1": "添加token",
                "2": "编辑token",
            },
            auth: ""
        };
    },
    methods: {
        init () {
            this.setColumns();
            this.getList();
            this.getTotaltoken()
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
                title: '名称'
            },{
                key: 'price',
                title: '价值(元)',
            },{
                key: 'proportion',
                title: '类型',
                render:(h,params) => {
                    return h('div', [
                        h('span', {}, params.row.type==1 ? "添加":"编辑")
                    ]);
                }
            },{
                key: 'totalNum',
                title: '矿池量',
            },{
                key: 'warning',
                title: '矿池预警值',
            },{
                key: 'createTime',
                title: '创建时间',
                render:(h,params) => {
                    if(params.row.createTime){
                        params.row.createTime = ((params.row.createTime).split('.0'))[0]
                    }
                    return h('div', [
                        h('span', {}, params.row.createTime || '')
                    ]);
                }
            }];
        },
        getList(callback){
            this.$Spin.show();
            tokenList(this.searchParams).then((res)=>{
                if(res.code === '200' && res.msg == 'success'){
                    this.pageTotal = res.data.count
                    this.list =  res.data.entities;
                    this.$Spin.hide();
                    if(callback){
                        callback()
                    }
                }
            })
        },
        getTotaltoken(){
            getTokentotalNumber().then((res)=>{
                if(res.code == '200'&&res.msg == 'success'){
                    this.Totaltoken = res.data.totalNum;
                    this.warning = res.data.warning;
                    this.is_have = res.data.ifag;
                }
            })
        },
        add(){
            this.$router.push({
                name: 'worth_add',
            });
        },
        edit(){
            this.$router.push({
                name: 'worth_edit',
            });
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