<template>
    <section class="user-center" :class="$i18n.locale">
        <!-- 设置资金密码 -->
        <div class="safe-setting">
            <!-- <p class="safe-title">{{$t('userCenter.setPayPassword.title')}}</P> -->
            <div class="safe-setting-list">
                <p class="li">
                    <span class="lb ls-3">{{$t('userCenter.setPayPassword.label1')}}</span>
                    <span><label>{{phone}}</label></span>
                </p>
                <p class="li">
                    <span class="lb">{{$t('userCenter.setPayPassword.label2')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input" v-model="code" :placeholder="$t('userCenter.setPayPassword.placeholder1')" style="width: 290px;" autocomplete="new-password">
                    </span>
                    <a class="sendCode"  @click="sendCode()">{{send_text}}</a>
                </p>
                <p class="li">
                    <span class="lb ls-3">{{$t('userCenter.setPayPassword.label3')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input common-width" v-model="password" type="password" :placeholder="$t('userCenter.setPayPassword.placeholder2')" autocomplete="new-password">
                    </span>
                </p>
                <p class="li">
                    <span class="lb">{{$t('userCenter.setPayPassword.label4')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input common-width" v-model="againPassword" type="password" :placeholder="$t('userCenter.setPayPassword.placeholder3')" autocomplete="new-password">
                    </span>
                </p>
                <p class="li">
                    <span class="lb"></span>
                    <Button class="common-width" type="success" @click="submit()">{{$t('userCenter.setPayPassword.button')}}</Button>
                </p>
            </div>
            <div class="setPayRemark">
                <span class="remark-title"></span>
                <p>{{$t('userCenter.setPayPassword.remark.title')}}</p>
                <p>{{$t('userCenter.setPayPassword.remark.para1')}}</p>
                <p>{{$t('userCenter.setPayPassword.remark.para2')}}</p>
                <p>{{$t('userCenter.setPayPassword.remark.para3')}}</p>
            </div>
        </div>
    </section>
</template>

<script>
    import { getCode,setPayPassword} from '@api/api_group'; 
    import md5 from '@common/assets/js/md5.js';
    import {Button,Message,Notice,Spin} from 'iview';

    const PAYPASSWORD = /^[0-9]*$/;
    export default {
        data() {
            return {
                isPayPassword : ``,
                isSend : true,
                send_text: '',
                phone:``,
                time:120,
                password:``,
                againPassword:``,
                code:``,
                countryCode:``
            }
        },
        created() {
            let _this = this;
            _this.isPayPassword = this.globalFun.getQueryString('isPayPassword');
            _this.phone = localStorage.getItem("YJS_loginName")
            _this.countryCode = this.globalFun.getQueryString('countryCode');
            _this.send_text = this.$t('userCenter.setPayPassword.cnt.sentText')
            console.log(this.isPayPassword, this.countryCode);
        },
        methods: {
            sendCode:function(){
                let _this = this;
                if(_this.isSend == true){
                    let params = {
                        phone:_this.phone,
                        type:2,
                        countryCode:_this.countryCode
                    }
                    Spin.show();
                    getCode(params).then((res) => {
                        Spin.hide();
                        if (res.success) {
                            Message.success(this.$t('userCenter.setPayPassword.alertMes.mes1'))
                            _this.isSend = false;
                            document.getElementsByClassName("sendCode")[0].disabled = 'disabled';
                            let interval = setInterval(()=>{
                                _this.time--;
                                _this.send_text = _this.time + this.$t('userCenter.setPayPassword.cnt.timeAfterReset');
                                if (_this.time <= 0) {
                                    document.getElementsByClassName("sendCode")[0].disabled = '';
                                    _this.send_text = _this.$t('userCenter.setPayPassword.cnt.sentText');
                                    _this.isSend = true;
                                    _this.time = 120;
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });
                }
            },
            submit:function(){
                let _this = this;
                if(_this.code==""){
                    let config = {
                        title:_this.$t('userCenter.setPayPassword.alertMes.mes2')
                    }
                    Notice.error(config)
                }else if(_this.password==""){
                    let config = {
                        title:_this.$t('userCenter.setPayPassword.alertMes.mes3')
                    }
                    Notice.error(config)
                }else if(_this.password.length!=6||!PAYPASSWORD.test(_this.password)){
                    let config = {
                        title:_this.$t('userCenter.setPayPassword.alertMes.mes4')
                    }
                    Notice.error(config)
                }else if(_this.againPassword == ''){
                    let config = {
                        title:_this.$t('userCenter.setPayPassword.alertMes.mes5')
                    }
                    Notice.error(config)
                }else if(_this.againPassword!=_this.password){
                    let config = {
                        title:_this.$t('userCenter.setPayPassword.alertMes.mes6')
                    }
                    Notice.error(config)
                }else{
                    _this.postSetPay();       
                }
            },
            postSetPay:function(){//设置资金密码
                let _this = this;
                let params = {
                    password:md5(_this.againPassword).toLowerCase(),
                    captcha:_this.code
                }
                Spin.show();
                setPayPassword(params).then((res) => {
                    Spin.hide();
                    if (res.success) {
                        Message.success(_this.$t('userCenter.setPayPassword.alertMes.success'))
                        setTimeout(()=>{
                            window.history.back()
                        },3000)
                    }
                });
            }
        },
        components: {
            Button
        }
    }
</script>

<style lang="scss" scoped="scoped">
.user-center{
    background-color: #ffffff;
    width:1200px;
    margin-bottom: 250px;
    .safe-setting{
        
        // 设置列表
        .safe-setting-list{
            padding: 0 50px;
            .li{
                font-size:16px;
                margin-bottom: 26px;
               .lb{
                    width: 80px;
                    display: inline-block;
                    margin-right: 18px;
                    color:#999999;
                    white-space: nowrap;
                }
                .ls-3{
					letter-spacing: 16px;
				}
                .sendCode{                    
                    color:#fc923f;
                    margin-left:12px;
                    border: 1px solid #fc923f;
                    text-align: center;
                    font-size: 16px;
                    padding: 7px 14px;
                    border-radius: 3px;
                    display: inline-flex;
                    vertical-align: top;

                }
            }
            .ivu-btn {
                border:1px solid #fc923f;
                background-color: #fc923f;
                height: 38px;
                margin-top:24px;
                font-size: 16px;
            }
            .ivu-input{
                height: 40px;
                line-height: 38px;
                padding: 0 7px;
                border: 1px solid #ddd;
                color:#333333;
            }
            .common-width{
                width: 410px;
            }
        }
        .setPayRemark{
            padding:50px;
            p{
                font-size:12px;
                color:#999;
                margin-top:5px;
            }
        }
    }
}
.ENG{
    .lb{
        min-width: 180px;
        text-align: right;
        letter-spacing: 0px !important;
    }
    .common-width{
        width: 496px !important;
    }
}
</style>
<style>
	.ivu-input-type .ivu-input:hover {
		border-color: #00b38a;
	}
	.ivu-input-type .ivu-input:focus {
		border-color: #00b38a;
	}
    .ivu-btn-success{
        font-size:16px;
        width:120px;
        padding:3px;
    }
</style>

