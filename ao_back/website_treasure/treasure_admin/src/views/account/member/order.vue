
<template>
    <Row :gutter="10">
        <Col span="24">
            <Row class="search statistics" type="flex">
                <Col span="4">
                    <div>全部订单：{{info.allCount || 0}}</div>
                    <div>已收货：{{info.expressCount || 0}}</div>
                </Col>
                <Col span="4">
                    <div>已取消：{{info.cancelCount || 0}}</div>
                    <div>申请退款：0</div>
                </Col>
                <Col span="4">
                    <div>已评价：{{info.commentCount || 0}}</div>
                    <div>退款失败：0</div>
                </Col>
                <Col span="4">
                    <div>评价未通过：{{info.unPassCount}}</div>
                    <div>已退款：0</div>
                </Col>
                <Col span="4">
                    <div>评价通过：{{info.passedCount}}</div>
                </Col>
            </Row>
            <Row class="search">
                <span class="lb">订单号</span>
                <Input v-model.trim="searchParams.oNum" placeholder="请输入订单号搜索..." style="width: 200px" />

                <span class="lb">商品名称</span>
                <Input v-model.trim="searchParams.proName" placeholder="请输入商品名称搜索..." style="width: 200px" />

                <span class="lb">订单状态</span>
                <Select style="width:200px" v-model="searchParams.status" placeholder="全部">
                    <Option :value="`0`" >全部</Option>
                    <Option v-for="(val,key) of searchStatusList" :value="key" :key="key">{{ val }}</Option>
                </Select>
<!--                 
            </Row>
            <Row class="search"> -->
                <span class="lb">时间</span>
                <span><DatePicker type="daterange" format="yyyy-MM-dd HH:mm" :value="dateValue" confirm placement="bottom-end" placeholder="开始时间 - 结束时间" style="width: 200px" @on-change="deteChange"></DatePicker></span>
                <!-- <span><DatePicker v-model="searchParams.startTime" type="date" placeholder="请选择开始日期" style="width: 200px"></DatePicker></span>
                <span>至</span>
                <span><DatePicker v-model='searchParams.endTime'  type="date" placeholder="请选择结束日期" style="width: 200px"></DatePicker></span> -->
                
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
import { orderCount,userOrder } from "@/api/api_member.js";

export default {
    data () {
        return {
            dateValue:[],
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            info:{},
            searchParams:{
                userId: this.$route.params.id,
                oNum:"",
                proName: "",
                status: "0",
                startTime: "", //起始时间,
                endTime: "", //结束时间,
                pageNo: 1,
                pageSize: 10
            },
            searchStatusList:{
                "-1": "已取消",//
                1:'未支付',
                2:'已支付',
                6:'待发货',//
                3:'已发货',
                4:'已收货',
            },
            orderStatusList: {
                "-2": "已取消",//
                "-1": "已取消",//
                1:'未支付',
                2:'已支付',//
                3:'已发货',
                4:'已收货',
                5:'已评价',
                7:"评价未通过",
                8:"评价通过",
            },
            giftStatusList:{
                "-2": "已取消",//
                "-1": "已取消",//
                1:'未支付',
                6:'已支付',
                2:'待发货',//
                3:'已发货',
                4:'已收货',
                5:'已评价',
                7:"评价未通过",
                8:"评价通过",
            },
        };
    },
    methods: {
        init () {
            this.getCount();
            this.getList();
            this.setColumns();
            
        },
        getCount(){
            orderCount({
                userId: this.$route.params.id
            }).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.info = res.data;
                }
            })
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
                key: 'oNum',
                title: '订单号',
            },
            {
                key: 'proName',
                title: '商品'
            },
            {
                key: 'sku',
                title: '规格'
            },
            {
                key: 'proCount',
                title: '数量'
            },
            {
                key: 'oStatus',
                title: '订单状态',
                render: (h,params) => {
                    var type = params.row.oType;
                    var status = params.row.oStatus;
                    var isComment = params.row.isComment;// 评价状态 0 为
                    var statusStr = "";
                    if(status == 4 || status == 5){
                        if(isComment == 3){
                            status = 8;
                        }else if(isComment == 4){
                            status = 7;
                        }
                    }
                    if(type == 1){
                        statusStr = this.orderStatusList[status]
                    }else{
                        statusStr = this.giftStatusList[status]
                    }
                    return h('div',[
                        h('span',{},statusStr)
                    ])
                }
            },
            {
                key: 'createTime',
                title: '时间'
            },
            {
                key: 'singlePrice',
                title: '现金总价(元)'
            },
            {
                key: 'realPrice',
                title: '实付金额(元)'
            },
            {
                key: 'vaacAccount',
                title: '消费通证'
            },
            {
                key: 'absenteeismGold',
                title: '旷工费'
            },
            {
                key: 'consumeGold',
                title: '消费token'
            },
            {
                key: 'tokenCut',
                title: '手续费'
            }];
        },
        getList(callback){
            this.$Spin.show()
            userOrder(this.searchParams).then(res => {
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
        deteChange(data){
            this.searchParams.startTime = data[0]
            this.searchParams.endTime = data[1]
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
    @import './order.less';
</style>