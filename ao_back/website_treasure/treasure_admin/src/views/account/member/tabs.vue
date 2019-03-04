
<template>
    <Row :gutter="10">
        <Col span="24">
            <Card>
                <p slot="title">
                    用户详情
                </p>
                <Tabs type="card" :value="currIndex" v-model="currIndex">
                    <TabPane label="用户信息" name="index-1">
                        <detail v-if="currIndex=='index-1'"></detail>
                    </TabPane>
                    <TabPane label="token明细" name="index-2">
                        <token-detail v-if="currIndex=='index-2'"></token-detail>
                    </TabPane>
                    <TabPane label="通证明细" name="index-3">
                        <tong-detail v-if="currIndex=='index-3'"></tong-detail>
                    </TabPane>
                    <TabPane label="订单记录" name="index-4">
                        <order v-if="currIndex=='index-4'"></order>
                    </TabPane>
                </Tabs>
            </Card> 
        </Col>
    </Row>
</template>

<script>
import { getList,forbidden } from "@/api/api_member.js";
import detail from "./detail";
import tokenDetail from "./tokenDetail";
import tongDetail from "./tongDetail";
import order from "./order";
export default {
    data () {
        return {
           currIndex: "index-1"
        };
    },
    components: {
        detail,
        "token-detail": tokenDetail,
        "tong-detail": tongDetail,
        order
    },
    methods: {
       
    },
    mounted () {
        
       
    }
};
</script>
<style lang="less">
    @import '../../../common/styles/common.less';
    @import './tabs.less';
</style>