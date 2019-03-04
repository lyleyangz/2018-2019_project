
<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        商品订单管理
                    </p>
                    <Row class="search">
                        <span class="lb">订单号</span>
                        <Input v-model.trim="searchParams.oNum" placeholder="请输入订单号搜索..." style="width: 200px" />
                        <span class="lb">商品名称</span>
                        <Input v-model.trim="searchParams.proName" placeholder="请输入商品名称搜索..." style="width: 200px" />
                        <span class="lb">订单状态</span>
                        <Select style="width:200px" v-model="searchParams.oStatus" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of searchStatusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">评价状态</span>
                        <Select style="width:200px" v-model="searchParams.isComment" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of commentList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        
                    </Row>                   
                    <Row class="search">
                       
                        <span class="lb">消费类型</span>
                        <Select style="width:200px" v-model="searchParams.consumeType" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of feeStatusList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                        <span class="lb">下单时间</span>
                        <DatePicker type="daterange" format="yyyy-MM-dd HH:mm" :value="dateValue" confirm placement="bottom-end" placeholder="开始时间 - 结束时间" style="width: 200px" @on-change="deteChange"></DatePicker>
                        <span class="lb">订单类型</span>
                        <Select style="width:200px" v-model="searchParams.oType" placeholder="全部">
                            <Option :value="0" >全部</Option>
                            <Option v-for="(val,key) of typeList" :value="key" :key="key">{{ val }}</Option>
                        </Select>

                        <span class="btn"><Button type="primary" icon="search" @click="search">搜索</Button></span>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :columns="columns" :data="list"></Table>
                    </Row>
                    <Page v-if="pageTotal>0" :current.sync="page"  :total="pageTotal" :page-size="searchParams.pageSize"  @on-change="convertPage" @on-page-size-change="convertPageSize" show-sizer :page-size-opts="[10,20,50]" placement="top" show-elevator show-total></Page>
                </Card>
            </Col>
        </Row>
        <Modal :width="600" class="modal" v-model="sendGoodsModal.is" title="发货">
            <Row >
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递名称：</span>
                    <span><Input v-model.trim="sendGoodsParams.expressName" :maxlength="30" placeholder="请输入快递名称" style="width: 300px" /></span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递单号：</span>  
                    <span><Input v-model.trim="sendGoodsParams.expressNum" :maxlength="100" placeholder="请输入快递单号" style="width: 300px" /></span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="sendGoodsModal.is=false,sendGoodsParams = {}">取消</Button>
                <Button @click="sendGoodsSubmit()" type="primary">确定</Button>
            </div>
        </Modal>

    

        <Modal :width="600" class="modal" v-model="ExpressInfoModal.is" title="修改收货地址">
            <Row >
                <!-- <Col class="col_item">
                    <span class="lb"><em>*</em>快递名称：</span>
                    <span><Input v-model.trim="expressInfoList.expressName" :maxlength="20" placeholder="请输入快递名称" style="width: 300px" /></span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>快递单号：</span>  
                    <span><Input v-model.trim="expressInfoList.expressNum" :maxlength="100" placeholder="请输入快递单号" style="width: 300px" /></span>
                </Col> -->
                <Col class="col_item">
                    <span class="lb"><em>*</em>收货人：</span>  
                    <span><Input v-model.trim="expressInfoList.uName" :maxlength="10" placeholder="请输入收货人" style="width: 300px" /></span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>联系电话：</span>  
                    <span><Input v-model.trim="expressInfoList.phone" :maxlength="11" placeholder="请输入联系电话" style="width: 300px" /></span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>收货地址：</span>  
                    <span>
                         <Input v-model="expressInfoList.address" type="textarea" :rows="4" :maxlength="100" style="width: 300px" />
                    </span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="ExpressInfoModal.is=false">取消</Button>
                <Button @click="updateExpressInfo" type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getList,sendGoods,expressInfo,updateExpressInfo } from '@/api/api_goodsOrder.js'
export default {
    data () {
        return {
            columns:[],
            list: [],
            page:1,
            pageTotal:0,
            dateValue:[],
            searchParams:{
                oNum:"",
                proName:"",
                oStatus:0,
                consumeType:0,
                oType: 0,
                startTime:"",
                endTime:"",
                pageNo: 1,
                pageSize: 10
            },
            deliveryParams: {
                delivery:"",
                fee:"",
                num:""
            },
            feeStatusList:{
                1:'纯现金订单',
                2:'通证订单',
                3:'token订单', 
                4:'现金+通证订单',
                5:'token+现金订单',
                6:'token+通证订单',                
                7:'token+通证+现金订单',
            },
            searchStatusList:{
                "-1": "已取消",//
                1:'未支付',
                2:'已支付',
                6:'待发货',//
                3:'已发货',
                // 5:'已评价',
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
            commentList:{
                // 1: "未评价",
                2: "已评价",
                3: "评价通过",
                4: "评价未通过"
            },
            typeList: {
                1:"商品订单",
                2:"礼品订单"
            },
            auth:"",
            id:"",
            sendGoodsModal: {
                is:false
            },
            sendGoodsParams:{
                oStatus:3
            },
            ExpressInfoModal:{
                is:false
            },
            expressInfoList:{},
            timeMap: {},
            intervalMap: {}
        };
    },
    destroyed:function(){    
        this.clearAll();
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
            },{
                key: 'oNum',
                title: '订单号'
            },{
                key: 'proName',
                title: '商品',
                render: (h,params) => {
                    return [
                        h('div',{
                            class:'f-dib img',
                            style:"backgroundImage: url('"+params.row.proUrl+"')"
                        }),
                        h('div',{class:'f-dib'},[
                            h('p',{},params.row.proName),
                            h('p',{},'数量: '+params.row.proCount),
                            h('p',{},'单价(元): '+params.row.singlePrice)    
                        ])
                    ]
                }
            },{
                key: 'totalPrice',
                title: '订单总价',
                render: (h,params) => {
                    return h('div',[
                        // h('p',{},'总价: '+params.row.totalPrice),
                        h('p',{},'token: '+ (Number(params.row.consumeGold)+Number(params.row.discountGold)).toFixed(6)),
                        h('p',{},'通证: '+params.row.vaacAccount)                        
                    ])
                }
            },{
                key: 'createTime',
                title: '下单时间',
            },{
                key:'traceno',
                title:'防伪溯源码'
            },
            {
                key: 'oType',
                title: '订单类型',
                render: (h,params) => {
                    return h('div',[
                        h('span',{},this.typeList[params.row.oType] + "")
                    ])
                }
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
            },{
                key: 'status',
                title: '操作',
                width: 220,
                render: (h, params) => {
                    let buttonList = [];
                    if(this.globalFun.userAuth.checkAuth(this.auth,"6011")){
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
                                    this.$router.push({
                                        name:'goodsOrder_detail',query:{
                                            id:params.row.id
                                        }
                                    })
                                }
                            }
                        }, '查看详情'))
                    }
                    if(params.row.oStatus == 1) {
                        var time = this.timeMap[params.row.id] || '';
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
                                    
                                }
                            }
                        }, '付款'+ time))
                    }
                    if(this.globalFun.userAuth.checkAuth(this.auth,"6011")){
                        if(params.row.oStatus == 2) {
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
                                        this.btn(params.row.id,1)
                                    }
                                }
                            }, '发货'))
                        }
                        if( params.row.oStatus == 2 || params.row.oStatus == 6) {
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
                                        this.btn(params.row.id,2)
                                    }
                                }
                            }, '修改收货地址'))
                        }
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
        submit(){
            this.modal.is=false
        },
        deteChange(data){
            this.searchParams.startTime = data[0]
            this.searchParams.endTime = data[1]
        },
        getList(callback){
            this.$Spin.show()
            getList(this.searchParams).then(res => {
                if(res.code == 200) {
                    this.$Spin.hide()
                    this.list = res.data.entities || [];

                    this.clearAll();
                    this.list.forEach(item => {
                        if(item.oStatus == 1){
                            this.countdown(item);
                        }
                    });
                    this.pageTotal = res.data.count
                    if(callback){
                        callback();
                    }
                }else {
                    this.$Spin.hide()
                }
            })
        },
        clearAll(){
            for(var key in this.intervalMap){
                clearInterval(this.intervalMap[key])
            }
        },
        countdown(item){
            var _this = this;
            var interval = setInterval(function(){
                var flag =  _this.jisuan(item,_this);
                if(!flag){
                    // _this.countdown(item);
                    clearInterval(_this.intervalMap[item.id])
                }
                _this.$set(_this.intervalMap,item.id,interval);
            },1000);
            _this.$set(_this.intervalMap,item.id,interval);
        },

        jisuan(item,_this){
            var totalTime = 1000*60*60;// 1小时
            var dateDiff = (totalTime - (new Date().getTime() - new Date(item.createTime).getTime()));
            if(dateDiff<=0){
                _this.$set(_this.timeMap,item.id,"");
                return false;
            }
            // var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            // var hours=Math.floor(leave1/(3600*1000))//计算出小时数
            //计算相差分钟数
            var leave2=dateDiff%(24*3600*1000)%(3600*1000);    //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
            //计算相差秒数
            var leave3=dateDiff%(24*3600*1000)%(3600*1000)%(60*1000); //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000);
            // console.log(minutes+" 分钟"+seconds+" 秒")
            _this.$set(_this.timeMap,item.id,minutes +" : " + seconds);
            return true;
        },
        btn(id,index){
            this.id = id;
            switch(index) {
                case 1:
                this.sendGoodsModal.is = true;
                break;
                case 2:
                this.ExpressInfoModal.is = true;
                this.expressInfo()
                break;
            }
        },
        sendGoodsSubmit(){
            if(!this.sendGoodsParams.expressName) {
                this.$Message.error('请输入快递名称')
                return false
            }
            if(!this.sendGoodsParams.expressNum) {
                this.$Message.error('请输入快递单号')
                return false
            }
            this.sendGoodsParams.id = this.id
            sendGoods(this.sendGoodsParams).then(res => {
                if(res.code == 200) {
                    this.$Message.success('发货成功');
                    this.sendGoodsModal.is = false;
                    this.getList();
                    this.sendGoodsParams = {}
                }
            })
        },
        expressInfo(){
            expressInfo({
                id:this.id
            }).then(res => {
                if(res.code == 200){
                    this.expressInfoList = res.data;
                    this.expressInfoList.id = this.id;
                }
            })
        },
        updateExpressInfo(){
            // if(!this.expressInfoList.expressName) {
            //     this.$Message.error('请输入快递名称')
            //     return false
            // }
            // if(!this.expressInfoList.expressNum) {
            //     this.$Message.error('请输入快递单号')
            //     return false
            // }
            if(!this.expressInfoList.uName) {
                this.$Message.error('请输入收货人')
                return false
            }
            if(!this.expressInfoList.phone) {
                this.$Message.error('请输入联系电话')
                return false
            }
            if(!this.expressInfoList.address) {
                this.$Message.error('请输入收货地址')
                return false
            }
            updateExpressInfo(this.expressInfoList).then(res=>{
                if(res.code == 200){
                    this.$Message.success('修改成功');
                    this.ExpressInfoModal.is = false;
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