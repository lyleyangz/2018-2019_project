<template>
    <div class="header-wraper" :class=" {deepDark: setStyleClass === 'deepDark', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}">
        <div class="header default typepage" :class="isOther?'other-header':''">
        <div class="letfpart">
            <div class="logo">
                <a class="f-db f-pr" href="./index.html">
                    <h1 class="logotxt">
                        bitOne 
                    </h1>
                    <span class="icon f-db f-pa" :class="{'dark-icon': setStyleClass === 'dark', 'other-icon': setStyleClass === 'light', 'deepDark-icon': setStyleClass === 'deepDark'}"></span>
                </a>
            </div>
            <span v-if="isOther" class="tip">{{tip}}</span>
        </div>
        <div class="rightpart"  :class="$i18n.locale">
            <nav class="topnav" v-if="!isOther">
                <ul class="list">
                    <li class="member f-fl"  :class="{active: currentPage === 'index', dark: setStyleClass === 'dark', deepDark: setStyleClass === 'deepDark' , light: setStyleClass === 'light'}">
                        <a href="javascript:;"  @click="navGo('1')">{{$t('header.index')}}</a>
                    </li>
                     <li class="member f-fl"  :class="{active: currentPage === 'currency', dark: setStyleClass === 'dark', deepDark: setStyleClass === 'deepDark', light: setStyleClass === 'light'}">
                        <a href="javascript:;" @click="navGo('6')">{{$t('header.currency')}}</a>
                    </li>
                    <li class="member f-fl"  :class="{active: currentPage === 'exchange', dark: setStyleClass === 'dark', deepDark: setStyleClass === 'deepDark', light: setStyleClass === 'light'}">
                        <a href="javascript:;" @click="navGo('2')">{{$t('header.businessCenter')}}</a>
                    </li>
                    <li class="member f-fl f-pr" :class="{active: currentPage === 'fund', dark: setStyleClass === 'dark', deepDark: setStyleClass === 'deepDark', light: setStyleClass === 'light'}">
                        <a href="javascript:;">{{$t('header.fundManage')}}</a>
                        <div class="router-list-wraper f-pa">
                            <span class="triangle f-pa"></span>
                            <div class="router-list-box">
                                <ul class="router-list">
                                    <li class="router-member">
                                        <a href="javascript:;" @click="navGo('3-1')">{{$t('header.balance')}}</a>
                                    </li>
                                    <li class="router-member">
                                        <a href="javascript:;" @click="navGo('3-2')">{{$t('header.bill')}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <!-- <li class="member f-fl"  :class="{active: currentPage === 'notice', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}">
                        <a href="javascript:;"  @click="navGo('4')">公告中心</a>
                    </li> -->
                    <li class="member f-fl f-pr"  :class="{active: currentPage === 'userCenter', dark: setStyleClass === 'dark', deepDark: setStyleClass === 'deepDark', light: setStyleClass === 'light'}" @mouseover="branchVisible.personalCenter = true;" @mouseout="branchVisible.personalCenter = false">
                        <a href="javascript:;">{{$t('header.personalCenter')}}</a>
                        <div class="router-list-wraper f-pa">
                            <span class="triangle f-pa"></span>
                            <div class="router-list-box">
                                <ul class="router-list">
                                    <li class="router-member">
                                        <a href="javascript:;" @click="navGo('5-1')">{{$t('header.shareAndSafe')}}</a>
                                    </li>
                                    <li class="router-member">
                                        <a href="javascript:;" @click="navGo('5-2')">{{$t('header.identity')}}</a>
                                    </li>
                                    <li class="router-member">
                                        <a href="javascript:;" @click="navGo('5-3')">{{$t('header.rebate')}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="tel f-fr" v-if="isLogin && !isOther" :class="{deepDark: setStyleClass === 'deepDark', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}">{{userTel}}<span class="logout" v-if="isLogin" @click='logout'> {{$t('header.logout')}}</span></div>
            <div v-if="!isOther" class="logbtn f-fr">
                <button class="register member" :class="{deepDark: setStyleClass === 'deepDark', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}" v-if="!isLogin" @click="navGo('register')">{{$t('header.register')}}</button>
                <button class="login member" :class="{deepDark: setStyleClass === 'deepDark', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}" v-if="!isLogin" @click="toLogin">{{$t('header.login')}}</button>
            </div>
            <div class="langEx-wraper f-pr">
                 <img src="../../assets/images/Chinese.png" class="f-pa valueImg" alt="" v-show="lang === 'ZHS'"> 
                 <img src="../../assets/images/hongkong.png" class="f-pa valueImg" alt="" v-show="lang === 'ZHT'"> 
                 <img src="../../assets/images/English.png" class="f-pa valueImg" alt="" v-show="lang === 'ENG'"> 
                 <Select v-model="lang" class='langEx f-fr' :class="{deepDark: setStyleClass === 'deepDark', dark: setStyleClass === 'dark', light: setStyleClass === 'light'}" @on-change="convertFonts">
                    <Option :value="'ZHS'">
                        <a href ="javascript:;" title="简体" onclick='javacript: ;'>
                            <img src="../../assets/images/Chinese.png" alt="简体">
                        </a>
                    </Option>
                    <Option :value="'ZHT'">
                        <a href ="javascript:;" title="繁體" onclick='javacript: ;'>
                            <img src="../../assets/images/hongkong.png" alt="繁體">
                        </a>
                    </Option>
                    <Option :value="'ENG'">
                        <a href ="javascript:;" title="English" onclick='javacript: ;'>
                            <img src="../../assets/images/English.png" alt="English">
                        </a>
                    </Option>
                 </Select>
            </div>
            <div class="style-convert-icon f-fl f-pr" v-if="currentPage === 'exchange'">
                <span class="icon-light f-pa icon" @click="convertStyleClass('light')" v-if="setStyleClass === 'deepDark'"></span>
                <span class="icon-deepDark f-pa icon" @click="convertStyleClass('deepDark')" v-if="setStyleClass === 'light'"></span>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { logout } from '@api/api_group';
    import eventBus from '@common/eventBus/eventBus';
    import translateFont from '@common/assets/js/translateFont';
    import { locale, Select, Option, Notice, Modal } from 'iview';
    import lang_ZHS from 'iview/dist/locale/zh-CN';
    import lang_ZHT from 'iview/dist/locale/zh-TW';
    import lang_ENG from 'iview/dist/locale/en-US'

    export default {
        props: {
            currentPage: {
                type: String,
                default() {
                    return 'index';
                }
            },
            styleClass: {
                type: String,
                default() {
                    return 'dark';
                }
            },
            isLogin: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isOther: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            tip: {
                type: String,
                default() {
                    return "aaa";
                }
            }
        },
        data() {
            return {
                lang: localStorage.getItem('JYS_lang') || 'ZHS',
                userTel: localStorage.getItem('YJS_loginName'),
                setStyleClass: this.styleClass,
                branchVisible: {
                    fund: false,
                    personalCenter: true
                }
            }
        },
        created(){
            switch(this.lang) {
                case 'ZHS':
                    locale(lang_ZHS);
                    break;
                case 'ZHT':
                    locale(lang_ZHT);
                    break;   
                case 'ENG':
                    locale(lang_ENG);
                    break; 
                default:
                    break;     
            }
        },
        mounted () {
            this.$nextTick(() => {
                // setTimeout(() => {
                    this.convertFonts();
                // }, 2000);
            });
        },
        methods: {
            navGo:function(val){//导航栏跳转
                switch(val){
                    case "1":
                        window.location.href="./index.html";
                        break;
                    case "2":
                        window.location.href="./exchange.html";
                        break;
                    case "3-1":
                        if(this.isLogin == false){
                            this.alertAndJumpToLogin();
                            return;
                        } else {
                            window.location.href="./fund.html#/balance";
                        }
                        break;
                    case "3-2":
                        if(this.isLogin == false){
                            this.alertAndJumpToLogin();
                            return;
                        } else {
                            window.location.href="./fund.html#/EXCBill";
                        }
                        break;    
                    case "4":
                        window.location.href="./notice.html";
                        break;
                    // case "5":
                    //     if(this.isLogin == false){
                    //         let config = {
                    //             title:this.$t('header.isLoginMarkedWords')
                    //         }
                    //         Notice.warning(config)
                    //         return;
                    //     }
                    //     window.location.href="./user_center.html"
                    //     break;
                    case "5-1":
                        if(this.isLogin == false){
                            this.alertAndJumpToLogin();
                            return;
                        } else {
                            window.location.href="./user_center.html#/safe";
                        }
                        break;
                    case "5-2":
                        if(this.isLogin == false){
                            this.alertAndJumpToLogin();
                        } else {
                            window.location.href="./user_center.html#/identity";
                        }
                        break;
                    case "5-3":
                        if(this.isLogin == false){
                            this.alertAndJumpToLogin();
                        } else {
                            window.location.href="./user_center.html#/rebate";
                        }
                        break;
                    case "6":
                        window.location.href="./currency.html#/buy";
                        break;
                    case 'register':
                        location.href = './others.html#/register';
                        break;        
                }
            },
            bindIsLogin(){
                 this.userTel = localStorage.getItem('YJS_loginName');
                 this.isLogin = localStorage.getItem('YJS_isLogin') === 'true'? true: false;
            },
            // 转换字体
            convertFonts() {
                this.$i18n.locale = this.lang;
                switch(this.lang) {
                    case 'ZHS':
                        locale(lang_ZHS);
                        break;
                    case 'ZHT':
                        locale(lang_ZHT);
                        break; 
                    case 'ENG':
                        locale(lang_ENG);
                        break;     
                    default:
                        break;     
                }
                eventBus.$emit('convertFont');
                localStorage.setItem('JYS_lang', this.lang);
                this.globalFun.setCookie('JYS_lang', this.lang, 7);
            },
            // 切换风格
            convertStyleClass(style) {
                this.setStyleClass = style;
                eventBus.$emit('convertStyleClass', style);
            },
            // 登出
            logout() {
                logout().then((res) => {
                    if (res.success) {
                        localStorage.setItem('YJS_loginName', '');
                        localStorage.setItem('YJS_isLogin', 'false');
                        localStorage.setItem('YJS_systemLoginKey', '');
                        location.reload();
                    }
                });
            },
            toLogin() {
               location.href = './others.html#/login';
            },
            alertAndJumpToLogin() {
                Modal.confirm({
                    content: this.$t('header.isLoginMarkedWords'),
                    loading: false,
                    onOk: () => {
                        location.href = './others.html#/login'
                    }
                });
            }
        },
        components: {
            Select,
            Option
        },
        watch: {
            styleClass(newval, oldval) {
                this.setStyleClass = newval;
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import '../../../common/settings/colorOptions.scss';
    
    .header-wraper {
        width: 100%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s;
        &.deepDark {
            background-color: #1a1e28;
        }
        &.dark {
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) , rgba(255, 255, 255, 0.05));
        }
        &.light {
            background-color: #ffffff;
        }
        transition: background-color 0.5s;
        .header {
            width: 100%;
            height: 78px;
            z-index: 999;
            background-color: transparent;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            .letfpart {
                height: 100%;
                display: flex;
                align-items: center;
                .logo {
                    width: 90px;
                    height: 42px;
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
                            transition: background-image 0.5s;
                        }
                        .dark-icon {
                            background-image: url("../../assets/images/logo-a.png");
                        }
                        .deepDark-icon {
                            background-image: url("../../assets/images/logo-a.png");
                        }
                        .other-icon {
                            background-image: url("../../assets/images/logo-b.png");
                        }
                    }
                }
                .tip{
                    margin-left: 22px;
                    font-size: 18px;
                    color: #666;
                }
            }
            .rightpart {
                height: 100%;
                display: flex;
                align-items: center;
                background-color: transparent;
                display: flex;
                .topnav {
                    height: 100%;
                    margin-right: 35px;
                    .list {
                        height: 100%;
                        .member {
                            height: 100%;
                            padding: 0 25px;
                            font-size: 16px;
                            display: flex;
                            align-items: center;
                            border-bottom: 2px solid transparent;
                            box-sizing: border-box;
                            transition: color 0.5s;
                            &.deepDark {
                                a {
                                    height: 18px;
                                    color: #747474;
                                    transition: all 0.6s ease 0s;
                                }
                            }
                            &.dark {
                                a {
                                    height: 18px;
                                    color: #ffddd2;
                                    transition: all 0.6s ease 0s;
                                }
                            }
                            &.light {
                                a {
                                    height: 18px;
                                    color: #333333;
                                    transition: all 0.6s ease 0s;
                                }
                            }
                            &.deepDark:hover {
                                a {
                                    color: #ffffff;
                                }
                            }
                            &.deepDark.active {
                                border-bottom: 2px solid #ffffff;
                                a {
                                    color: #ffffff;
                                }
                            }
                            &.dark:hover {
                                a {
                                    color: #ffffff;
                                }
                            }
                            &.dark.active {
                                border-bottom: 2px solid #fff;
                                a {
                                    color: #ffffff;
                                }
                            }
                            &.light:hover {
                                a {
                                    color: #ff8a00;
                                }
                            }
                            &.light.active {
                                border-bottom: 2px solid #ff8a00;
                                a {
                                    color: #ff8a00;
                                }
                            }
                            .router-list-wraper {
                                width: 106px;
                                left: 50%;
                                top: 78px;
                                margin-left: -53px; 
                                min-width: 106px;
                                opacity: 0;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                display: none;
                                .triangle {
                                    left: 50%;
                                    margin-left: -9px;
                                    top: 5px;
                                    width: 0; 
                                    height: 0; 
                                    border-left: 10px solid transparent; 
                                    border-right: 10px solid transparent; 
                                    border-bottom: 9px solid #ffffff;
                                }
                                .router-list-box {
                                    width: 100%;
                                    padding-top: 14px;
                                    .router-list {
                                        width: 100%;
                                        box-shadow: 0px 0px 10px #f0f0f0;
                                        background-color: #ffffff;
                                        padding: 11px    0;
                                        .router-member {
                                            width: 100%;
                                            height: 34px;
                                            line-height: 34px;
                                            padding: 0 17px;
                                            a {
                                                color: #333333;
                                                font-size: 14px;
                                                display: block;
                                                height: 100%;
                                                &:hover{
                                                    color: #ff8a00
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                            }
                            &:hover {
                                .router-list-wraper {
                                    display: block;
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
                .langEx-wraper {
                    width: 64px;
                    height: 28px;
                    background-color: transparent;
                    .langEx {
                        width: 100%;
                        height: 100%;
                    }
                    .valueImg {
                        left: 16px;
                        top: 8px;
                    }
                }
                .logbtn {
                    .member {
                        width: 104px; 
                        height: 28px;
                        line-height: 26px;
                        border-radius: 8px;
                        text-align: center;
                        font-size: 14px;
                        color: #ffffff;
                        margin-right: 26px;
                    }
                    .register {
                        transition: color,background-color 0.2s;
                        &.deepDark {
                            background-color: #31353e;
                            border: none;
                        }
                        &.light {
                            background-color: #ff8a00;
                            border: 1px solid #ff8a00;
                        }
                        &.dark {
                            background-color: #ff8a00;
                            border: 1px solid #ff8a00;
                        }
                    }
                    .login {             
                        background-color: transparent;
                        transition: color 0.5s;
                        &.deepDark {
                            color: #ffffff;
                            border: 1px solid #ffffff;
                        }
                        &.dark {
                            color: #b4b4d8;
                            border: 1px solid #b4b4d8;
                        }
                        &.light {
                            color: #ff8a00;
                            border: 1px solid #ff8a00;
                        }
                    }
                    .logout {
                        width: 66px;
                        border: 1px solid #ffffff;
                        background-color: transparent;
                    }
                }
                .tel {
                    font-size: 14px;
                    height: 100%;
                    line-height: 82px;
                    margin-right: 26px;
                    transition: color 0.5s;
                    &.deepDark {
                        color: #ffffff;
                    }
                    &.dark {
                        color: #ffffff;
                    }
                    &.light {
                        color: #ff8a00;
                    }
                    .logout {
                        color: #ff8a00;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
                .style-convert-icon {
                    width: 34px;
                    height: 78px;
                    .icon {
                        width: 18px;
                        height: 18px;
                        top: 30px;
                        right: 0;
                        cursor: pointer;
                    }
                    .icon-light {
                        background-image: url('../../../common/assets/images/Handover-a.png');
                    }
                    .icon-deepDark {
                        background-image: url('../../../common/assets/images/Handover-b.png');
                    }
                }
            }
        }
        .other-header{
            width: 1200px !important;
        }
    }
    .ENG{
        .router-list-wraper{
            width: 160px !important;
            margin-left: -80px !important; 
        }
    }
</style>

<style>
   
    /* 修改组件的样式 */
    .langEx .ivu-select-selection {
        background-color: transparent !important;
        height: 28px !important;
        line-height: 28px !important;
        border: none !important;
    }
    .langEx .ivu-select-selected-value {
        display: none !important;
    }
    .light.langEx .ivu-icon-arrow-down-b {
        color: #ff8a00 !important;
    }
    .deepDark.langEx .ivu-icon-arrow-down-b {
        color: #ffffff !important;
    }
    .deepDark.langEx .ivu-icon-arrow-down-b {
        color: #ffffff !important;
    }
    .langEx .ivu-select-item-selected, .langEx .ivu-select-item-selected:hover, .langEx .ivu-select-item:hover {
        background-color: transparent !important;
    }
    .langEx .ivu-select-dropdown {
        background-color: transparent !important;
    }
    .langEx .ivu-select:focus, .langEx .ivu-select-selection {
        border: none !important;
        box-shadow: 0 0 0 transparent !important;
    }
</style>
