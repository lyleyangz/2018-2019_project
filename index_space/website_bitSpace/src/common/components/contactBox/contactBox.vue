<template>
    <div class="contact-box default f-pr">
        <ul class="list">
            <li class="t-member wechat f-pr" @click='wechatBarcodeVisible = !wechatBarcodeVisible'><span class="icon f-db f-pa"></span></li>
            <a href="https://weibo.com/u/3920850381?refer_flag=1001030101_&is_hot=1">
                <li class="t-member sina f-pr"><span class="icon f-db f-pa"></span></li>
            </a>
            <a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=2bc05fbd634e1008361e02a5840f556e9059ff2d88a3cabe">
                <li class="t-member qq f-pr"><span class="icon f-db f-pa"></span></li>
            </a>
            
        </ul>
        <div class="wechat-barcode f-pa" v-if="wechatBarcodeVisible">
            <span class="icon f-db"></span>
            <p class="text">调出微信扫一扫</p>
        </div>
        <div class="lsh">
            <a href="./others.html#/missive">
                <span class="f-db icon"></span>
                <p class="text">律师函</p>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentPage: {
                type: String,
                default() {
                    return 'index';
                }
            }
        },
        data() {return {
            wechatBarcodeVisible: false
        }},
        created(){},
        methods: {}
    }
</script>

<style lang="scss" scoped="scoped">
    .contact-box {
        width: 60px;
        // height: 122px;
        position: fixed;
        right: 0;
        top: 65%;
        margin-top: -61px;
        z-index: 999;
        .list {
            width: 100%;
            height: 100%;
            .t-member {
            width: 60px;
            height: 60px;
            background-color: rgba(0,0,0,0.6);            
            margin-top: 1px;
            cursor: pointer;
            &.wechat {
                margin: 0;
                .icon {
                    width: 40px;
                    height: 40px;
                    left: 10px;
                    top: 10px;
                    background-position: center center;
                    background-size: 100% 100%;
                    background-image: url('../../assets/images/wechat.png');
                }
            }
            &.sina {
                .icon {
                    width: 40px;
                    height: 40px;
                    left: 10px;
                    top: 10px;
                    background-position: center center;
                    background-size: 100% 100%;
                    background-image: url('../../assets/images/weibo.png');
                }
            }
            &.qq {
                .icon {
                    width: 40px;
                    height: 40px;
                    left: 10px;
                    top: 10px;
                    background-position: center center;
                    background-size: 100% 100%;
                    background-image: url('../../assets/images/qq.png');
                }
            }
        }
        }
        .wechat-barcode {
            width: 100px;
            height: 124px;
            left: -110px;
            top: 6px;
            background-color: #fefefe;
            border-radius: 5px;
            overflow: hidden;
            .icon {
                width: 100px;
                height: 100px;
                background-position: center center;
                background-size: 100% 100%;
                background-image: url('../../assets/images/wechat_barcode.jpg');
            }
            .text {
                line-height: 24px;
                text-align: center;
                color: #333;
            }
        }
        .lsh {
            width: 60px;
            color: #ffffff;
            background-color: rgba(0,0,0,0.6);
            margin-top: 1px;
            .icon {
                width: 60px;
                height: 60px;
                background-size: 40px 40px;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url('../../assets/images/lshicon.png');
            }
            .text {
                color: #ffffff;
                font-size: 18px;
                line-height: 18px;
                text-align: center;
                padding-bottom: 10px;
            }
        }
    }
</style>
