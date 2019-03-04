
<template>
    <div>
        <Row class="edit">
            <Col class="goods">
                <Card>
                    <p slot="title">订单详情</p>
                    <div class="cnt">
                        <div class="title-block">订单号：{{contentList.oNum}}</div>
                        <div class="title-block">商品详情</div>
                        <Row>
                            <Col>
                                <div class="sku-table">
                                    <div class="th">
                                        <div>商品</div>
                                        <div>商品名称</div>
                                        <div>规格</div>
                                        <div>数量</div>
                                        <div>单价(元)</div>
                                    </div>
                                    <div class="td">
                                        <div><img :src="contentList.proUrl" alt=""></div>
                                        <div>{{contentList.proName}}</div>
                                        <div>{{contentList.storeProperties}}</div>
                                        <div>{{contentList.proCount}}</div>
                                        <div>{{contentList.singlePrice}}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div class="title-block">订单详情</div>
                        <Row>
                            <Col span="8" class="item">
                                <span class="lb">买家账号：</span>                   
                                <span>{{contentList.buyer}}</span>  
                            </Col>
                           
                            <Col span="8" class="item">
                                <span class="lb">劳动token折扣：</span>                   
                                <span>{{contentList.temporarynumWorth || 0}}</span>  
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单token：</span>                   
                                <span>{{(Number(contentList.discountGold) + Number(contentList.consumeGold)).toFixed(6) || "0.000000"}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单通证：</span>                   
                                <span>{{contentList.vaacAccount}}</span>  
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单现金总价（元）：</span>                   
                                <span>{{contentList.totalPrice}}</span>  
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">配送费：</span>                   
                                <span>0.00</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单类型：</span>                   
                                <span>{{typeList[contentList.oType]}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">订单状态：</span>                   
                                <span>{{statusStr}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">下单时间：</span>                   
                                <span>{{contentList.createTime}}</span>
                            </Col>
                            <Col span="8" class="item">
                                <span class="lb">防伪溯源码：</span>                   
                                <span>{{contentList.traceno}}</span>
                            </Col>
                            <Col span="8" v-if="contentList.oStatus == 1">
                                <Button type="error">付款倒计时：{{timeMap[contentList.id]}}</Button>
                            </Col>
                             
                        </Row>
                        <div class="title-block">快递信息</div>
                        <Row>
                            <Col span="24" class="item">
                                <span class="lb">快递公司：</span>                   
                                <span>{{contentList.expressName}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">快递单号：</span>                   
                                <span>{{contentList.expressNum}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">收货人：</span>                   
                                <span>{{contentList.uName}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">联系电话：</span>                   
                                <span>{{contentList.phone}}</span>
                            </Col>
                            <Col span="24" class="item">
                                <span class="lb">收货地址：</span>                   
                                <span>{{contentList.address}}</span>
                            </Col>
                        </Row>
                        <div class="title-block" v-if="contentList.oType==2">礼包链条</div>
                        <Row v-if="contentList.oType==2">
                            <chain :orderId='id'></chain>
                        </Row>                            

                        <div v-if="evaluateList.length>0">
                            <div class="title-block">评价信息</div>
                            <Row>
                                <Col>
                                    <div class="sku-table">
                                        <div class="th">
                                            <div>商品名称</div>
                                            <div>评分</div>
                                            <div>评论内容</div>
                                            <div>评论时间</div>
                                            <div>操作</div>
                                        </div>
                                        <div class="tdList"  v-for="(item,index) of evaluateList" :key="index">
                                            <div class="td">
                                            
                                                <div>{{item.proName}}</div>
                                                <div>
                                                    <span class="f-ib star" v-for="(starItem,starIndex) of item.star" :key="starIndex"></span>
                                                </div>
                                                <div>
                                                    <div class="lb">{{item.content}}</div>
                                                </div>
                                                <div>{{item.createTime}}</div>
                                                <div>
                                                    <span class="btn" v-if="item.auditStatus == 0"><Button type="primary" @click.stop="audit(item)">审核</Button></span>
                                                    <Poptip placement="top" :content="`原因：`+item.reason" v-if="item.auditStatus == 2">
                                                        <Button type="ghost">审核未通过</Button>
                                                    </Poptip>
                                                    <span v-if="item.auditStatus == 1">审核通过</span>
                                                </div>
                                            </div>
                                            <div class="imgList" v-if="item.picUrl">
                                                <img v-for="(imgItem,imgIndex) of item.picUrl.split(',')" :key="imgIndex" :src="imgItem" @click="preview(item.picUrl.split(','),imgIndex)" alt="">
                                            </div>
                                            
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="title-block">退货信息</div>
                        <Row>
                            <Col>
                                <div class="sku-table">
                                    <div class="th">
                                        <div>申请原因</div>
                                        <div></div>
                                        <div>操作</div>
                                    </div>
                                    <div class="tdList">
                                        <div class="td">
                                            <div>{{contentList.proName}}</div>
                                            <div>
                                                <div class="imgList">
                                                    <img src="../../../common/images/commodity.png" alt="">
                                                    <img src="../../../common/images/commodity.png" alt="">
                                                    <img src="../../../common/images/commodity.png" alt="">
                                                </div>
                                            </div>
                                            <div>
                                                <Poptip placement="left" content="原因：啊啊的噶还赶得及啊哈就">
                                                    <Button type="ghost">审核未通过</Button>
                                                </Poptip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                           
                        <!-- <div class="title-block">订单与操作日志</div>
                        <Row class="margin-top-10 searchable-table-con1">
                            <Table :columns="columns" :data="list"></Table>
                        </Row> -->
                    </div>
                </Card>
            </Col>
        </Row>

        

        <Modal :width="600" class="modal" v-model="evaluateAudit.is" title="评价审核">
            <Row >
                <Col class="col_item">
                    <span class="lb">评价内容：</span>
                    <span>{{evaluateAudit.content}}</span>
                </Col>
                <Col class="col_item">
                   <div class="imgList">
                        <img v-for="(item,index) of evaluateAudit.imgList" :key="index" :src="item" alt="">
                    </div>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>审核：</span>
                    <span>
                        <Select style="width:200px" v-model="evaluateAudit.params.auditStatus" placeholder="请选择">
                            <Option v-for="(val,key) of auditList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                    </span>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em v-if="evaluateAudit.params.auditStatus==2">*</em>原因：</span>
                    <span>
                        <Input style="width:400px" :maxlength="200" v-model="evaluateAudit.params.reason" type="textarea" :rows="4" />
                    </span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="evaluateAudit.is=false,evaluateAudit.params = {}">取消</Button>
                <Button @click="evaluateSubmit()" type="primary">确定</Button>
            </div>
        </Modal>

        <Modal :width="600" class="modal" v-model="aftersaleAudit.is" title="售后审核">
            <Row >
                <Col class="col_item">
                    <span class="lb">申请原因：</span>
                    <span>商品受损了</span>
                </Col>
                <Col class="col_item">
                   <div class="imgList">
                        <img src="../../../common/images/commodity.png" alt="">
                        <img src="../../../common/images/commodity.png" alt="">
                        <img src="../../../common/images/commodity.png" alt="">
                    </div>
                </Col>
                <Col class="col_item">
                    <span class="lb"><em>*</em>审核：</span>
                    <span>
                        <Select style="width:200px" v-model="aftersaleAudit.params.type" placeholder="请选择">
                            <Option v-for="(val,key) of auditList" :value="key" :key="key">{{ val }}</Option>
                        </Select>
                    </span>
                </Col>
                <Col class="col_item">
                    <span class="lb">原因：</span>
                    <span>
                        <Input style="width:400px" v-model="aftersaleAudit.params.reason" type="textarea" :rows="4" />
                    </span>
                </Col>
            </Row>
             <div slot="footer">
                <Button @click="aftersaleAudit.is=false,aftersaleAudit.params = {}">取消</Button>
                <Button @click="sendGoodsSubmit()" type="primary">确定</Button>
            </div>
        </Modal>
        <my-preview v-if="previewModal.is" :obj="previewModal" ></my-preview>
    </div>
</template>

<script>
import { details,singlebyorder,evaluateSubmit } from '@/api/api_goodsOrder.js';
import chain from './chain.vue'
import myPreview from '@/views/my-components/my-preview/index';
export default {
    components: {
        chain,
        "my-preview": myPreview
    },
    data () {
        return {
            contentList:{},
            columns:[],
            id: this.$route.query.id,
            // list:[{
            //     name:"张三",
            //     time:"2018-12-18 10:00:00",
            //     depict:"哈哈哈"
            // }],
            evaluateList:[],
            skip: 1,
            orderStatusList: {
                "-2": "系统取消",//
                "-1": "用户取消",//
                1:'未支付',
                2:'已支付',//
                3:'已发货',
                4:'已收货',
                5:'已评价',
                7:"评价未通过",
                8:"评价通过",
            },
            giftStatusList:{
                "-2": "系统取消",//
                "-1": "用户取消",//
                1:'未支付',
                6:'已支付',
                2:'待发货',//
                3:'已发货',
                4:'已收货',
                5:'已评价',
                7:"评价未通过",
                8:"评价通过",
            },
            statusStr: "",
            typeList: {
                "1":"商品订单",
                "2":"礼品订单"
            },
            auditList: {
                "1": "通过",
                "2": "不通过"
            },
            evaluateAudit:{
                is: false,
                params:{}
            },
            aftersaleAudit:{
                is: false,
                params:{}
            },
            previewModal:{
                is: false,
                list: [],
                curr: 0
            },
            imgList:[
                require('../../../common/images/logo.jpg'),
                require('../../../common/images/Audit.png'),
                require('../../../common/images/background.png'),
            ],
            timeMap: {},
            intervalMap: {}
        };
    },
    mounted () { 
        this.globalFun.userAuth.getAuth(data=>{
            this.auth = data;
            this.init();
        });
    },
    methods: {
        init () {
            this.details()
            this.setColumns();
            this.singlebyorder();
        },
        setColumns(){
            this.columns = [
            {
                key: 'name',
                title: '操作人',
                width: 200
            },{
                key: 'time',
                title: '操作时间',
                width: 200
            },{
                key: 'depict',
                title: '操作描述',
            }];
        },
        details(){
            this.$Spin.show()
            details({
                id:this.id
            }).then(res => {
            this.$Spin.hide()                
                if(res.code == 200) {
                    let storeProperties = "";
                    if(res.data.storeProperties){
                        for(let i in res.data.storeProperties){
                            storeProperties += res.data.storeProperties[i].name + ":" +res.data.storeProperties[i].value +";"
                        }
                    }
                    res.data.storeProperties = storeProperties;
                    this.contentList = res.data || {};

                    this.setStatus(this.contentList);
                    this.clearAll();
                    this.countdown(this.contentList);
                }
            })
        },
        setStatus(info){
            var type = info.oType;
            var status = info.oStatus;
            var isComment = info.isComment;// 评价状态 0 为
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
            this.statusStr = statusStr;
        },  
        singlebyorder(){
            singlebyorder({
                orderId: this.$route.query.id
            }).then(res=>{
                if(res.code == 200){
                    this.evaluateList = res.data || [];
                }                
            })
        },
        audit(item){
            this.evaluateAudit.is = true;
            this.evaluateAudit.content = item.content;
            if(item.picUrl){
                this.evaluateAudit.imgList = item.picUrl.split(",") || [];
            }
            
            this.evaluateAudit.params = {
                id : item.id
            }
        },
        preview(list,index){
            this.previewModal = {
                is: true,
                list: list,
                curr: index
            }
        },
        // 评价审核提交
        evaluateSubmit(){
            if(!this.evaluateAudit.params.auditStatus){
                this.$Message.error('请选择审核类型');
                return false;
            }
            if(this.evaluateAudit.params.auditStatus == 2 && !this.evaluateAudit.params.reason){
                this.$Message.error('请输入审核原因');
                return false;
            }
            if(this.evaluateAudit.params.auditStatus == 1){
                this.evaluateAudit.params.reason = this.evaluateAudit.params.reason || "";
            }
            evaluateSubmit(this.evaluateAudit.params).then(res=>{
                if(res.code == 200){
                    this.$Message.success('审核成功');
                    this.evaluateAudit.is = false;
                    this.singlebyorder();
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
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './detail.less';
    .api{
        white-space: normal;
    }
</style>