<template>
    <div class="footer">
        <section class="footerNav">
            <div class="footer-left">
                <!-- 特壹交易中心 -->
                <div class="logo"><i></i><label>{{$t('footer.tradingCenter')}}</label></div>
                <ul class="share">
                    <li><a class="icon facebook"></a></li>
                    <li><a class="icon twitter"></a></li>
                    <li><a class="icon telegram"></a></li>
                    <li><a class="icon wechat"></a></li>
                    <li><a class="icon microblog"></a></li>
                </ul>
            </div>
            <div class="footer-right">
                <ul>
                    <li>
                        <!-- 服务与支持 -->
                        <div class="tip">{{$t('footer.serveAndSupport')}}</div>
                        <!-- 关于我们 -->
                        <div><a href="text_info.html#/AboutUs" target="_blank">{{$t('footer.AboutUs')}}</a></div>
                        <!-- 联系我们 -->
                        <div><a href="text_info.html#/contactUs" target="_blank">{{$t('footer.contactUs')}}</a></div>
                    </li>
                    <li>
                        <div class="tip">{{$t('footer.announcement')}}</div>
                        <!-- 官方公告 -->
                        <div><a>{{$t('footer.OfficialAnnouncement')}}</a></div>
                        <!-- 产品更新 -->
                        <div><a>{{$t('footer.modelChange')}}</a></div>
                    </li>
                    <li>
                        <!-- 声明 -->
                        <div class="tip">{{$t('footer.declare')}}</div>
                        <!-- 用户协议 -->
                        <div><a href="text_info.html#/agreement" target="_blank">{{$t('footer.userAgreement')}}</a></div>
                        <!-- 法律声明 -->
                        <div><a href="text_info.html#/lawDeclare" target="_blank">{{$t('footer.LegalDeclaration')}}</a></div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="putOnRecords">
              <!-- 备案号：2016-2017版权所有，违者必究 -->
              {{$t('footer.record')}}&copy;{{$t('footer.recordText')}}
        </section>
    </div>
</template>

<script>
    export default {
        props: {
           
        },
        data() {
           return {
               
           }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import '../../../common/settings/colorOptions.scss';
    .footer {
        width: 100%;
        background-color: #000;
        color:#999;
        // 底部导航
        .footerNav{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            padding: 44px 0 70px 0;
            .footer-left{
                .logo{
                    margin: 0 0 50px 0;
                    i{
                        width: 108px;
                        height: 50px;
                        display: inline-flex;
                        background:url('../../../common/assets/images/bottom-logo.png') no-repeat;
                        margin: 0 14px 0 0;
                        filter: grayscale(100%);
                        -webkit-filter: grayscale(100%);
                    }
                    label{
                        font-size: 16px;
                        display: inline-flex;
                        vertical-align: top;
                        line-height: 50px;
                    }
                }
                .share{
                    li{
                        display: inline-flex;
                        vertical-align: top;
                        .icon{
                            width: 15px;
                            height: 12px;
                            margin:2px 30px 0 0;
                        }
                        .facebook{
                            width: 7px;
                            height: 15px;
                            margin-top:0;
                            background:url('../../../common/assets/images/facebook.png') no-repeat;
                            background-size: 100%;
                        }
                        .twitter{
                            background:url('../../../common/assets/images/twitter.png') no-repeat;
                        }
                        .telegram{
                            background:url('../../../common/assets/images/telegram.png') no-repeat;
                        }
                        .wechat{
                            background:url('../../../common/assets/images/WeChat.png') no-repeat;
                        }
                        .microblog{
                            width: 16px;
                            height: 14px;
                            background:url('../../../common/assets/images/microblog.png') no-repeat;
                        }
                    }
                    
                }
            }
            .footer-right{
                flex: 1;
                text-align: right;
                li{
                    display: inline-block;
                    text-align: left;
                    padding-left: 86px;
                    a{
                        color: #999;
                        margin: 0 0 18px 0;
                        display: block;
                        line-height:12px;
                        font-size: 12px;
                        transition: all 0.6s ease 0s;
                    }
                    a:hover{
                        color: #fff;
                    }
                    .tip{
                        color: #fff;
                        margin: 0 0 24px 0;
                        line-height:14px;
                        font-size: 14px;
                    }
                }
            }
        }
        .putOnRecords{
            background-color: #1b1b1b;
            font-size:14px;
            text-align: center;
            height: 26px;
            line-height: 26px;
            color: #999;
        }
    }
</style>
