<template>
    <div>
        <p class="safe-title">{{$t('userCenter.setPayPassword.title')}}</P>
        <setPayPwd></setPayPwd>
    </div>
</template>

<script>
    import setPayPwd from './../guide/set_pay_password';
    export default {
        data() {
            return {
               
            }
        },
        created() {
          
        },
        methods: {
           
        },
        components: {
            setPayPwd
        }
    }
</script>

<style lang="scss" scoped="scoped">

.safe-title{
    font-size: 16px;
    line-height: 16px;
    color: #333333;
    padding: 50px 50px 48px 50px;
    background: #fff;
}
</style>


