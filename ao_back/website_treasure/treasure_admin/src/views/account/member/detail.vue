
<template>
    <Row :gutter="10">
        <Col span="24">
            <Row type="flex" class="info">
                <Col>
                    <Avatar shape="square" icon="person" size="large"/>
                </Col>
                <Col span="6">
                    <div>用户账号：{{info.phone}}</div>
                    <div>昵称：{{info.nickname || '-'}}</div>
                    <div>性别：{{info.sex==1?'男':'女'}}</div>
                    <div>联系电话：{{info.phone}}</div>
                </Col>
                <Col >
                    <div>token：{{info.balance}}</div>
                    <div>通证：{{info.vaacBanlance}}</div>
                    <div>注册时间：{{globalFun.dateFormat(info.createTime, 'yyyy-MM-dd hh:mm:ss')}}</div>
                </Col>
            </Row>
            <div class="title-block">收货地址</div>
            <Row type="flex" class="address">
                <Col v-for="(item,index) of info.addresss" :key="index">
                    <Card style="width:320px">
                        <div>收货人：{{item.uName}}</div>
                        <div>联系方式：{{item.phone}}</div>
                        <div>详细地址：{{item.address}}</div>
                    </Card>
                </Col>
            </Row>
           
        </Col>
    </Row>
</template>

<script>
import { userDetail } from "@/api/api_member.js";

export default {
    data () {
        return {
            info: {
                addresss: []
            }
        };
    },
    methods: {
        userDetail(){
            userDetail({
                uid: this.$route.params.id
            }).then(res=>{
                if(res.code == 200){
                    this.info = res.data;
                }
            })
        }
    },
    mounted () {
        
        this.userDetail();
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './detail.less';
</style>