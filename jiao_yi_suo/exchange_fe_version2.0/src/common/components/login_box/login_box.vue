<template>
    <div class="login-box">
        <div class="inner">
            <div class="title">{{$t('login.title')}}</div>
            <div class="tel-wraper f-pr">
                <!-- <Select v-model="countryCode" class='qh' v-if="!convertingFont">
                    <Option :value="'86'">{{$t('login.option1')}}</Option>
                    <Option :value="'852'">{{$t('login.option2')}}</Option>
                    <Option :value="'853'">{{$t('login.option3')}}</Option>
                    <Option :value="'886'">{{$t('login.option4')}}</Option>
                </Select> -->
                <span class="f-db f-pa icon"></span>
                <input type="number"  class="tel" v-model.trim="tel" :placeholder="$t('login.phoneTip')" @blur="refreshPIN">
            </div>
            <div class="password-wraper f-pr">
                <span class="f-db f-pa icon"></span>
                <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                <input type="password" style="display:none;width:0;height:0;" autocomplete="new-password">
                <input type="password" class="password" :placeholder="$t('login.pwdTip')" v-model.trim="password" :maxlength="20">
            </div>
            <div class="PIN-wraper f-pr">
                <span class="f-db f-pa icon"></span>
                <input type="text" class="PIN" :placeholder="$t('login.vcode')" v-model="PIN">
                <div class="PIN-image" @click='refreshPIN'>
                    <img  alt="" ref="PINimg" src="">
                </div>
            </div>
            <div class="submit">
                <Button type="primary" :loading="loginning" @click="submitToLogin">
                    <span v-if="!loginning">{{$t('login.btn')}}</span>
                    <span v-else>{{$t('login.logIn')}}</span>
                </Button>
            </div>
            <div class="resandforget">
                <a href="./others.html#/register" class="register f-fl">{{$t('login.register')}}</a>
                <a href="./others.html#/forgetLoginPassword" class="forget f-fr">{{$t('login.forget')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPINimg, toLogin, getValidateCode } from '@api/api_group'; 
    import md5 from '@common/assets/js/md5.js';
    import eventBus from '@common/eventBus/eventBus';
    import {Select,Option,Button,Spin,Message,Notice} from 'iview';
    export default {
        data() {
            return {
                tel: '',
                password: '',
                PIN: '',
                PINsrc: '',
                loginning: false,
                countryCode: '86',
                convertingFont: false
            }
        },
        created() {
            eventBus.$on('convertFont', () => {
                this.convertingFont = true;
                setTimeout(() => {
                    this.convertingFont = false;
                }, 200);
            });
        },
        mounted() {
            this.$nextTick(() => {
                this.refreshPIN();
            });
        },
        methods: {
            refreshPIN() {
                getValidateCode({
                    countryCode: this.countryCode,
                    phone: this.tel,
                }).then((res) => {
                    this.PINsrc = `data:image/jpeg;base64,${res.data}`;
                    this.$refs.PINimg.setAttribute('src', this.PINsrc);
                });
            },
            submitToLogin() {
                if (this.globalFun.isStrEmpty(this.tel)) {
                    Notice.error({
                        title: this.$t('login.alertMes.error'),
                        desc: this.$t('login.alertMes.mes1')
                    });
                } else if (this.globalFun.isStrEmpty(this.password)) {
                    Notice.error({
                        title: this.$t('login.alertMes.error'),
                        desc: this.$t('login.alertMes.mes2')
                    });
                } else if (this.password.length < 6) {
                    Notice.error({
                        title: this.$t('login.alertMes.error'),
                        desc: this.$t('login.alertMes.mes3')
                    });
                } else if (this.globalFun.isStrEmpty(this.PIN)) {
                    Notice.error({
                        title: this.$t('login.alertMes.error'),
                        desc: this.$t('login.alertMes.mes4')
                    });
                } else {
                    this.loginning = true;
                    toLogin({
                        phone: this.tel,
                        password: md5(this.password).toLowerCase(),
                        imgCode: this.PIN,
                        countryCode: this.countryCode
                    }).then((res) => {
                        this.loginning = false;
                        if (res && res.success) {
                            localStorage.setItem('YJS_loginName', this.tel);
                            localStorage.setItem('YJS_isLogin', 'true');
                            // localStorage.setItem('YJS_systemLoginKey', res.data.systemLoginKey);
                            history.go(-1);
                        } else {
                            this.refreshPIN();
                        }
                    });
                }
            }
        },
        components: {
            Select,Option,Button
        },
    }
</script>

<style lang="scss" scoped="scoped">
    .login-box {
        width: 376px;
        height: 386px;
        background-color: transparent;
        border: 4px solid rgba(255, 255, 255, 0.4);
        .inner {
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            .title {
                height: 74px;
                line-height: 74px;
                font-size: 16px;
                color: #333333;
                text-align: center;
            }
            .icon {
                width: 46px;
                height: 38px;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 30px 30px;
            }
            input {
                width: 364px;
                height: 38px;
                font-size: 16px;
                border: 1px solid #e5e5e5;
                text-indent: 4px;
                padding: 0 46px;
                box-sizing: border-box;
                margin-bottom: 14px;
                &::-webkit-input-placeholder { 
                    color:#666;
                    font-size: 16px;
                }
                &:-moz-placeholder { 
                    color:#666;
                    font-size: 16px;
                }
                &::-moz-placeholder { 
                    color:#666;
                    font-size: 16px;
                }
                &:-ms-input-placeholder { 
                    color:#666;
                    font-size: 16px;
                }
            }
            .tel-wraper {
                width: 364px;
                height: 38px;
                margin-bottom: 14px;
                display: flex;
                justify-content: space-between;
                .icon {
                    background-image: url('../../../common/assets/images/loginBox_phone.png');
                }
                input {
                    width: 364px;
                    height: 100%;
                    margin-bottom: 0;
                }
            }
            .password-wraper {
                .icon {
                    background-image: url('../../../common/assets/images/loginBox_password.png');
                }
            }
            .PIN-wraper {
                width: 364px;
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                .icon {
                    background-image: url('../../../common/assets/images/loginBox_Verification.png');
                }
                .PIN {
                    width: 253px;
                    margin-bottom: 0;
                }
                .PIN-image {
                    width: 102px;
                    height: 38px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                
            } 
            .resandforget {
                height: 52px;
                line-height: 52px;
                .register {
                    font-size: 16px;
                    color: #333333;
                }
                .forget {
                    font-size: 16px;
                    color: #333333;
                }
            }
        }
    }
</style>
<style>
    /* 修改组件的样式 */
     .login-box .ivu-btn{
        width: 364px;
        height: 40px;
        font-size: 19px;
        color: #ffffff;
        background-color: #ff8a00;
        border: none;
        border-radius: 0 !important;
    }
    .login-box .ivu-select-item-selected, .login-box .ivu-select-item-selected:hover {
        background-color: #ff8a00;
    }
    .login-box .tel-wraper .qh {
        width: 110px;
    }
    .login-box .tel-wraper .ivu-select-selection {
            background-color: transparent !important;
            height: 38px !important;
            line-height: 38px !important;
            border-radius: 4px !important;
    }
    .login-box .tel-wraper .ivu-select-selected-value {
        color: #666;
        font-size: 14px !important;
        height: 38px !important;
        line-height: 38px !important;
        padding-left: 13px !important;
        padding-right: 22px !important;
        text-align: center !important;
    }
    .login-box .tel-wraper .ivu-icon-arrow-down-b {
        color: #000;
    }
    .login-box .tel-wraper .ivu-select-item-selected, .langEx .ivu-select-item-selected:hover {
        background-color: #ff8a00;
    }
</style>
