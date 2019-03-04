<template>
    <div class="footer">
        <div class="inner">
            <div class="icons f-cb">
                <a class="f-db f-fl t-member"></a>
                <a class="f-db f-fl t-member"></a>
                <a class="f-db f-fl t-member"></a>
            </div>
            <ul class="linksgroup1 f-cb">
                <li class="t-member f-fl"><a href="">关于我们</a></li>
                <li class="line f-fl">|</li>
                <li class="t-member f-fl"><a href="">联系我们</a></li>
                <li class="line f-fl">|</li>
                <li class="t-member f-fl"><a href="">加入我们</a></li>
                <li class="line f-fl">|</li>
                <li class="t-member f-fl"><a href="">网站地图</a></li>
                <li class="line f-fl">|</li>
                <li class="t-member f-fl"><a href="">团队介绍</a></li>
            </ul>
            <!-- <ul class="linksgroup2 f-cb">
                <li class="t-member f-fl"><a href="">比特信息</a></li>
                <li class="t-member f-fl"><a href="">莱特信息</a></li>
                <li class="t-member f-fl"><a href="">瑞波信息</a></li>
                <li class="t-member f-fl"><a href="">以太坊</a></li>
                <li class="t-member f-fl"><a href="">比特币中国</a></li>
                <li class="t-member f-fl"><a href="">火币网</a></li>
                <li class="t-member f-fl"><a href="">金色财经</a></li>
            </ul> -->
            <p class="cpoyright">
                Copyright@ 2013-2018 深圳前海比特空间科技有限公司版权所有  粤ICP备18014895号  <span style='display: inline-block;' class="zztj" ref="tjIconElement"></span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var tjIcon = document.getElementById('cnzz_stat_icon_1272944028');
            if (tjIcon) {
                this.$refs.tjIconElement.appendChild(tjIcon);
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .footer {
        width: 100%;
        height: 200px;
        background-color: #22374c;
        .inner {
            width: 1200px;
            height: 200px;
            margin: 0 auto;
            overflow: hidden;
            .icons {
                width: 177px;
                margin: 44px auto 0;
                .t-member {
                    width: 39px;
                    height: 39px;
                    margin-left: 30px;
                    &:nth-child(1) {
                        background-image: url('../../assets/images/weibo-gray.png');
                        margin-left: 0;
                    }
                    &:nth-child(2) {
                        background-image: url('../../assets/images/wechat-gray.png');
                    }
                    &:nth-child(3) {
                        background-image: url('../../assets/images/top-line.png');
                    }
                }
            }
            .linksgroup1, .linksgroup2 {
                margin: 24px auto 0;
                display: flex;
                justify-content: center;
                .t-member {
                    color: #c0c0c0;
                    height: 12px;
                    padding: 0 10px;
                    a {
                        font-family: 'Simsun';
                        color: #c0c0c0;
                    }
                }
                .line {
                    font-size: 12px;
                    color: #c0c0c0;
                    transform: scaleY(0.8);
                }
            }
            .linksgroup2 {
                margin: 15px auto 0;
                .t-member {
                    color: #6d6d6d;
                    a {
                        color: #6d6d6d;
                    }
                }
            }
            .cpoyright {
                height: 44px;
                font-family: 'Simsun';
                font-size: 12px;
                color: #6d6d6d;
                line-height: 48px;
                text-align: center;
            }
        }
    }
</style>
