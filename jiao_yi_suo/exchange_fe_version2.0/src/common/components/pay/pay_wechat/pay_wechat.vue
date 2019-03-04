<template>
    <div class="pay-wechat f-pa" ref="payWechat">
        <div class="pay-popups">

        </div>
    </div>
</template>

<script>
    export default {
        created() {
            document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:hidden;');
        },
        distroy() {
            document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:auto;');
        }
    }

</script>

<style lang="scss" scoped="scoped">
    .pay-wechat {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        .pay-popups {
            width: 602px;
            height: 542px;
            background-color: #ffffff;
            margin: 236px auto;
        }
    }
</style>
