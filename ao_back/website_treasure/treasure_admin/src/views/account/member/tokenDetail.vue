
<template>
    <Row :gutter="10">
        <Col span="24">
            <Row class="search">
                <span class="lb">事件</span>
                <Input v-model.trim="searchParams.memo" placeholder="请输入事件搜索..." style="width: 200px" />
              
                <span class="lb">类型</span>
                <Select style="width:200px" v-model="searchParams.type" placeholder="全部">
                    <Option :value="``" >全部</Option>
                    <Option v-for="(val,key) of typeList" :value="key" :key="key">{{ val }}</Option>
                </Select>
                <span class="lb">时间</span>
                <span><DatePicker v-model="searchParams.startTime" type="date" placeholder="请选择开始日期" style="width: 200px"></DatePicker></span>
                <span>至</span>
                <span><DatePicker v-model='searchParams.endTime'  type="date" placeholder="请选择结束日期" style="width: 200px"></DatePicker></span>

                <span class="btn">
                    <Button type="primary" icon="search" @click="search">搜索</Button>
                </span>
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns" :data="list"></Table>
            </Row>
            <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-elevator show-total show-sizer :page-size-opts="[10,20,50]" placement="top"></Page>
        </Col>
    </Row>
</template>

<script>
import { history } from "@/api/api_member.js";

export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            searchParams:{
                uid: this.$route.params.id,
                currency: 2,
                memo: "",
                type: "",
                startTime: "", //起始时间,
                endTime: "", //结束时间,
                pageNo: 1,
                pageSize: 10
            },
            typeList:{
                1: "收入",
                2: "支出"
            }
        };
    },
    methods: {
        init () {
            this.getList()
            this.setColumns();
            
        },
        setColumns(){
            this.columns = [
            {
                key: 'seq',
                title: '序号',
                width: 62,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, (this.page-1)*this.searchParams.pageSize + params.index+1)
                    ]);
                }
            },
            {
                key: 'memo',
                title: '事件',
            },
            {
                key: 'amount',
                title: '收入',
                render: (h, params) => {
                    return h('div', [
                        h('span', {},params.row.type == 1?params.row.amount:'0.00')
                    ]);
                }
            },
            {
                key: 'amount',
                title: '支出',
                render: (h, params) => {
                    return h('div', [
                        h('span', {},params.row.type == 2?params.row.amount:'0.00')
                    ]);
                }
            },
            {
                key: 'cost',
                title: '手续费'
            },
            {
                key: 'rate',
                title: '手续费率(%)'
            },
            {
                key: 'balance',
                title: '余额'
            },
            {
                key: 'createTime',
                title: '时间',
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, this.globalFun.dateFormat(params.row.createTime, 'yyyy-MM-dd hh:mm:ss'))
                    ]);
                }
            }];
        },
        getList(callback){
            this.$Spin.show()
            history(this.searchParams).then(res => {
                this.$Spin.hide()
                if(res.code == 200) {
                    this.list = res.data.entities
                    this.pageTotal = res.data.count
                    if(callback){
                        callback()
                    }
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
        }
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
    @import './tokenDetail.less';
</style>