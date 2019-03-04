<template>
    <div>
        <p class="title">
            <span><i></i>{{$t('userCenter.identity.idVerNotice.title')}}</span>
            <span class="tip"><em></em>{{$t('userCenter.identity.idVerNotice.desc')}}</span>
        </P>
        <identity></identity>
    </div>
</template>

<script>
    import identity from './../guide/identity';
    
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
            identity
        },
    }
</script>

<style lang="scss" scoped="scoped">
.title{
    display: flex;
    font-size: 22px;
    line-height: 22px;
    font-weight: 550;
    color: #333333;
    padding: 50px 50px 48px 50px;
    background: #fff;
    i{
        width: 10px;
        height: 10px;
        background-color: #ff8a00;
        border-radius: 50%;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        vertical-align: top;
        margin: 8px 8px 0 0;
    }
    .tip{
        font-size: 12px;
        color: #b4b4d8;
        flex: 1;
        text-align: right;
        em{
            background: url('../../../common/assets/images/prompt.png') no-repeat;
            width: 14px;
            height: 14px;
            display: inline-block;
            vertical-align: top;
            margin: 4px 8px 0 0;
        }
    }
}
</style>

