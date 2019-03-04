<template>
    <div class="bill">
        <ul class="type-select">
            <li class="u-member f-fl" :class="{active: type === 'EXC'}" @click="convertType('EXC')">{{$t('fund.bill.EXC')}}</li>
            <li class="u-member f-fl" :class="{active: type === 'OTC'}" @click="convertType('OTC')">{{$t('fund.bill.OTC')}}</li>
        </ul>
        <keep-Alive>
            <router-view></router-view>
        </keep-Alive>
    </div>
</template>

<script>
    import { Message} from 'iview';
    export default {
        data() {
            return {
                isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
                type: 'EXC'
            }
        },
        mounted () {
            if (this.isLogin == false) {
                Message.warning({
                    content: this.$t('common.notLogin'),
                    duration: 2
                });
                let goIndex = setTimeout(() => {
                    window.location.href = "./index.html";
                }, 2000);
                return;
            }
        },
        created() {
            var path = this.$route.path;
            switch(path){
                case '/OTCBill':
                    this.type = 'OTC';
                    break;
                case '/EXCBill':
                    this.type = 'EXC';
                    break;
            }
        },
        methods: {
            convertType(type) {
                this.type = type;
                this.$router.replace({
                    path: `/${type}Bill`
                });
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .bill {
        width: 100%;
        background-color: #ffffff;
        padding: 0 48px 88px;
        .type-select {
            width: 100%;
            height: 73px;
            .u-member {
                height: 73px;
                line-height: 73px;
                color: #666666;
                font-size: 16px;
                padding: 0 29px;
                border-top: 2px solid transparent;
                transition: border 0.2s;
                cursor: pointer;
                &.active {
                    color: #ff8a00;
                    border-color: #ff8a00;
                }
            }
        }
    }
</style>

