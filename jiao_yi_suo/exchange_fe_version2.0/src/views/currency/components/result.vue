<template>
    <div class="result">
       <div class="tip">
           <i></i>
           <div class="cnt">
               <div class="lb">{{$t('currency.result.cnt')}}</div>
               <a @click="goOrder">{{$t('currency.pay.order.lb6')}}</a>
           </div>
       </div>
       <div class="btn">
           <Button type="success" @click="continueBuy">{{$t('currency.result.btn')}}</Button>
       </div>
    </div>
</template>

<script>
    import {Button,Message} from 'iview';
    export default {
        data() {
            return {
                isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
            }
        },
        created() {
           
        },
        mounted () {
            if(!this.isLogin){
                Message.warning({
                    content: this.$t('common.notLogin'),
                    duration: 2
                });
                let goIndex = setTimeout(() => {
                    window.location.href="./index.html"
                }, 2000);
                return;
            }
        },
        methods: {
            continueBuy(){
                this.$router.push({
                    name:'buy'
                })
            },
            // 跳转到法币订单页面
            goOrder(){
                location.href = "/fund.html#/OTCBill?status=2";
            },
        },
        components: {
           Button
        }
    }
</script>
<style lang="scss"  scoped="scoped">
    .result{
        height: 660px;
        background-color: #fff;
        text-align: center;
        border-top: 2px solid #ff8a00;
        .tip{
            padding-top: 126px;
            i{
                width: 56px;
                height: 56px;
                display: inline-block;
                vertical-align: top;
                background: url('./../../../common/assets/images/wait.png') no-repeat;
                margin-right: 20px;
            }
            .cnt{
                text-align: left;
                display: inline-block;
                vertical-align: top;
                .lb{
                    font-size: 20px;
                    color: #333;
                    margin-bottom: 16px;    
                    line-height: 20px;
                }
                a{
                    font-size: 14px;
                    color: #b4b4d8
                }
            }
        }
        .btn{
            padding: 140px 0 300px 0;
            text-align: center;
            button{
                width: 298px;
                height: 40px;
                font-size: 16px;
                border: 1px solid #ff8a00;
                background-color: #ff8a00;
                color: #fff;
            }
        }
    }
</style>