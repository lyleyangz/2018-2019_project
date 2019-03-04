<template>
    <div class="header default">
        <div class="inner">
            <div class="letfpart">
                <div class="logo f-fl">
                    <a class="f-db f-pr" href="./index.html">
                        <h1 class="logotxt">
                            比特空间
                        </h1>
                        <span class="icon f-db f-pa"></span>
                    </a>
                </div>
                <nav class="topnav f-fl">
                    <ul class="list">
                        <li class="member f-fl">
                            <a href="./index.html"  :class="{active: currentPage === 'index'}" class="f-db">首页</a>
                        </li>
                        <li class="member f-fl">
                            <a href="./notice.html?page=affairs"  :class="{active: currentPage === 'affairs'}" class="f-db">时政要闻</a>
                        </li>
                        <li class="member f-fl">
                            <a href="./notice.html?page=policy"  :class="{active: currentPage === 'policy'}" class="f-db">国家政策</a>
                        </li>
                        <!-- <li class="member f-fl">
                            <a href="#"  :class="{active: currentPage === 'blockChain'}" class="f-db">区块链+</a>
                        </li>
                        <li class="member f-fl">
                            <a href="#"  :class="{active: currentPage === 'products'}" class="f-db">产品展示</a>
                        </li>
                        <li class="member f-fl">
                            <a href="#"  :class="{active: currentPage === 'programme'}" class="f-db">解决方案</a>
                        </li> -->
                        <li class="member f-fl">
                            <a href="./business.html" :class="{active: currentPage === 'business'}" class="f-db">业务体系</a>
                        </li>
                        <!-- <li class="member f-fl">
                            <a href="./team.html" :class="{active: currentPage === 'team'}" class="f-db">团队介绍</a>
                        </li> -->
                         <li class="member f-fl">
                            <a href="./partners.html" :class="{active: currentPage === 'partners'}" class="f-db">合作伙伴</a>
                        </li>
                        <li class="member f-fl">
                            <a href="./aboutUs.html" :class="{active: currentPage === 'aboutUs'}" class="f-db">关于我们</a>
                        </li>
                        <li class="member f-fl">
                            <a href="./contactUs.html" :class="{active: currentPage === 'contactUs'}" class="f-db">联系我们</a>
                        </li>
                    </ul>
                </nav>
            </div>
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
        data() {return {}},
        created(){},
        methods: {}
    }
</script>

<style lang="scss" scoped="scoped">
    @import '../../../common/settings/colorOptions.scss';
    .header {
        width: 100%;
        height: 100%;
        background-color: #fafafa;
        .inner {
            width: 100%;
            height: 58px;
            margin: 0 auto;
            .letfpart {
                height: 100%;
                overflow: hidden;
                .logo {
                    width: 221px;
                    height: 34px;
                    margin-top: 12px;
                    margin-left: 60px;
                    a {
                        width: 100%;
                        height: 100%;
                        .logotxt {
                            text-indent: -9999em;
                        }
                        .icon {
                            width: 100%;
                            height: 100%;
                            left: 0;
                            top: 0;
                            background-image: url("../../assets/images/logo.png");
                        }
                    }
                }
                .topnav {
                    height: 100%;
                    margin-left: 60px;
                    .list {
                        height: 100%;
                        .member {
                            height: 58px;
                            line-height: 58px;
                            margin-left: 15px;
                            font-size: 16px;
                            a {
                                height: 56px;
                                line-height: 56px;
                                color: #999999;
                                &.active {
                                    font-weight: 400;
                                    color: #22374c;
                                }
                                &:hover {
                                    font-weight: 400;
                                    color: #22374c;
                                    border-bottom: 2px solid #22374c;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
