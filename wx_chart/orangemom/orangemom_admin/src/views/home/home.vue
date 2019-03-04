<style lang="less">
    @import '../../common/styles/common.less';
    @import "./home.less";
</style>
<template>
    <div class="home-main">
        <!-- <div class="ip f-fl">
            <infor-card
                id-name="visit_count"
                :end-val="2000"
                iconType="ios-eye"
                color="#64d572"
                :iconSize="50"
                intro-text="今日访问量"
            ></infor-card>
        </div>
        <div class="count f-fl">
            <div class="visitnum f-fl">
                <infor-card
                    id-name="user_created_count"
                    :end-val="49999"
                    iconType="android-person-add"
                    color="#2d8cf0"
                    intro-text="今日新增用户"
                ></infor-card>
            </div>
        </div> -->
        <div class="welcome">
            welcome!
        </div>
    </div>
</template>

<script>

export default {
    name: 'home',
    data () {
        return {
            
        };
    },
    components: {
        
    }
};
</script>
