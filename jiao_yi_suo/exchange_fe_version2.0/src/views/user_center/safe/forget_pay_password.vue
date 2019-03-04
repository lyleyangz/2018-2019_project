<template>
    <section class="user-center" :class="$i18n.locale">
       <!-- 修改手机号 -->
        <div class="safe-setting">
            <p class="safe-title">{{$t('userCenter.forgetPayPassword.fppNotice.title')}}</P>
            <div class="safe-setting-list">
                <div class="setp-nav">
                    <span :class="step_this>=1?'active':''"> 
                        <i>1</i><span>{{$t('userCenter.forgetPayPassword.fppNotice.stepTitle1')}}</span><span class="line"></span>
                    </span>
                    <span :class="step_this>=2?'active':''">
                        <i>2</i><span>{{$t('userCenter.forgetPayPassword.fppNotice.stepTitle2')}}</span><span class="line"></span>
                    </span>
                    <span :class="step_this>=3?'active':''">
                        <i>3</i><span>{{$t('userCenter.forgetPayPassword.fppNotice.stepTitle3')}}</span>
                    </span>
                </div>
                <!-- 第一步 -->
                <div v-show="step_this == '1'">
                    <p class="li">
                        <span class="lb ls-4">{{$t('userCenter.forgetPayPassword.step1.label1')}}</span>
                        <span>
                            <Select class="common-width" size="large" v-model="verityType" disabled>
                                <Option value="1">{{$t('userCenter.forgetPayPassword.step1.option1')}}</Option>
                                <Option value="2">{{$t('userCenter.forgetPayPassword.step1.option2')}}</Option>
                            </Select>
                        </span>
                    </p>  
                    <p class="li" v-show="verityType=='1'">
                        <span class="lb ls-3">{{$t('userCenter.forgetPayPassword.step1.label2')}}</span>
                        <span><label>{{phone}}</label></span>
                    </p>
                    <p class="li" v-show="verityType=='2'">
                        <span class="lb ls-3">{{$t('userCenter.forgetPayPassword.step1.label3')}}</span>
                        <span><label>{{email}}</label></span>
                    </p>
                    <p class="li">
                        <span class="lb">{{verityTypeCode}}</span>
                        <input class="ivu-input" v-model="code" :placeholder="$t('userCenter.forgetPayPassword.step1.placeholder')" style="width: 280px;" autocomplete="new-password">
                        <a class="sendCode"  @click="sendCode()">{{send_text}}</a>
                    </p>
                    <p class="li">
                        <span class="lb"></span>
                        <Button class="common-width" type="success" @click="submit('1')" >{{$t('userCenter.forgetPayPassword.step1.button')}}</Button>
                    </p>
                </div>
                <!-- 第二步 -->
                <div v-show="step_this == '2'">
                    <p class="li">
                        <span class="lb ls">{{$t('userCenter.forgetPayPassword.step2.label1')}}</span>
                        <span>
                            <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                            <input type="password" style="display:none;width:0;height:0;">
                            <input class="ivu-input common-width" v-model="newPassword" type="password" :placeholder="$t('userCenter.forgetPayPassword.step2.placeholder')" autocomplete="new-password">
                        </span>
                    </p>
                    <p class="li">
                        <span class="lb">{{$t('userCenter.forgetPayPassword.step2.label2')}}</span>
                        <span>
                            <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                            <input type="password" style="display:none;width:0;height:0;">
                            <input class="ivu-input common-width" v-model="againNewPassword" type="password" :placeholder="$t('userCenter.forgetPayPassword.step2.placeholder')"  autocomplete="new-password">
                        </span>
                    </p>
                    <p class="li">
                        <span class="lb"></span>
                        <Button class="common-width" type="success" @click="submit('2')">{{$t('userCenter.forgetPayPassword.step2.button')}}</Button>
                    </p>
                </div>
                <!-- 第三步 -->
                <div v-show="step_this == '3'">
                    <p class="success">
                        <i class="success-icon"></i>
                    </p>
                    <p class="success">
                        {{$t('userCenter.forgetPayPassword.step3.success')}}
                    </p>
                </div>
            </div>
            <div class="setPayRemark" v-show="step_this!=3">
                <p>{{$t('userCenter.forgetPayPassword.remark.title')}}</p>
                <div v-show="step_this==1">
                    <p>{{$t('userCenter.forgetPayPassword.remark.getCode')}}</p>
                    <p>{{$t('userCenter.forgetPayPassword.remark.next')}}</p>
                </div>
                <div v-show="step_this==2">
                    <p>{{$t('userCenter.forgetPayPassword.remark.newPassword')}}</p>
                    <p>{{$t('userCenter.forgetPayPassword.remark.modify')}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { getCode,forgetPassword} from '@api/api_group'; 
    import md5 from '@common/assets/js/md5.js';
    import eventBus from '@common/eventBus/eventBus';
    import {Button, Input, Select, Option, Spin, Message, Notice} from 'iview';

    const PAYPASSWORD = /^[0-9]*$/;
    export default {
        data() {
            return {
                step_this : "1",
                verityType: "1",
                isSend : true,
                verityTypeCode: this.$t('userCenter.forgetPayPassword.cnt.verityTypeCode1'),
                phone:"",
                email:"",
                send_text: "",
                time:120,
                code:"",
                newPassword:"",
                againNewPassword:"",
                countryCode:``
            }
        },
        updated(){
            let _this = this;
            if(_this.verityType=='1'){
                _this.verityTypeCode = this.$t('userCenter.forgetPayPassword.cnt.verityTypeCode1');
            }else{
                _this.verityTypeCode = this.$t('userCenter.forgetPayPassword.cnt.verityTypeCode2');
            }
        },
        created() {
            let _this = this;
            _this.phone = this.$route.query.phone;
            _this.email = this.$route.query.isEmail;
            _this.countryCode = this.$route.query.countryCode;
            this.send_text = this.$t('userCenter.forgetPayPassword.cnt.sendText');
            eventBus.$on('convertFont', () => {
                this.send_text = this.$t('userCenter.forgetPayPassword.cnt.sendText');
            });  
        },
        methods: {
            sendCode:function(val){
                let _this = this;
                if(_this.isSend == true){
                    let params = {
                        phone:_this.phone,
                        type:4,
                        countryCode:_this.countryCode
                    }
                    Spin.show();
                    getCode(params).then((res) => {
                        Spin.hide();
                        if (res.success) {
                            Message.success(this.$t('userCenter.forgetPayPassword.remark.senCodeSuccess'))
                            _this.isSend = false;
                            document.getElementsByClassName("sendCode")[0].disabled = 'disabled';
                            let interval = setInterval(()=> {
                                _this.time--;
                                _this.send_text = _this.time + this.$t('userCenter.forgetPayPassword.remark.timeAfterReset');
                                if (_this.time <= 0) {
                                    document.getElementsByClassName("sendCode")[0].disabled = '';
                                    _this.send_text = this.$t('userCenter.forgetPayPassword.cnt.sendText');
                                    _this.isSend = true;
                                    _this.time = 120;
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    });  
                }
            },
            //重置资金密码
            setPayPassword:function(){
                let _this = this;
                let params = {
                    password: md5(_this.againNewPassword),
                    type:4,
                    countryCode:_this.countryCode,
                    captcha:_this.code,
                    phone:_this.phone
                }
                Spin.show();
                forgetPassword(params).then((res) => {
                    Spin.hide();
                    if (res.success) {
                        _this.step_this = '3';
                        setTimeout(()=>{
                            window.location.href="./user_center.html#/safe"
                        },3000) 
                    }                    
                }); 
            },
            submit:function(val){
                let _this = this;
                if(val == '1'){ //第一步
                    if(_this.code.trim() == ''){
                        let config = {
                            title:this.$t('userCenter.forgetPayPassword.alertMes.mes1')
                        }
                        Notice.error(config)
                    }else{
                        _this.step_this = '2';
                    }
                }else{//第二步
                    if(_this.newPassword==''){
                        let config = {
                            title:this.$t('userCenter.forgetPayPassword.alertMes.mes2')
                        }
                        Notice.error(config)
                    }else if(_this.newPassword.length!=6||!PAYPASSWORD.test(_this.newPassword)){
                        let config = {
                            title:this.$t('userCenter.forgetPayPassword.alertMes.mes3')
                        }
                        Notice.error(config)
                    }else if(_this.againNewPassword== ''){
                        let config = {
                            title:this.$t('userCenter.forgetPayPassword.alertMes.mes4')
                        }
                        Notice.error(config)
                    }else if(_this.againNewPassword!=_this.newPassword){
                        let config = {
                            title:this.$t('userCenter.forgetPayPassword.alertMes.mes5')
                        }
                        Notice.error(config)
                    }else{
                        _this.setPayPassword();
                    }
                }
            }
        },
        components: {
            Button,
            Input,
            Select,
            Option
        }
    }
</script>

<style lang="scss" scoped="scoped">
.user-center{
    background-color: #ffffff;
    width:1200px;
    margin-bottom: 250px;
    .safe-setting{
        //标题
        .safe-title{
            font-size: 16px;
            line-height: 16px;
            color: #333333;
            padding: 50px 50px 48px 50px;
        }
    // 设置列表
        .safe-setting-list{
            padding: 0 50px;
            .setp-nav{
                margin-bottom: 80px;
                font-size: 14px;
                color: #999;
                i{
                    display: inline-block;
                    text-align: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    color: #fff;
                    background-color: #ddd;
                    line-height: 30px;
                    margin-right: 12px;
                    font-size: 16px;
                }
                .line{
                    width: 55px;
                    height: 1px;
                    border-top: 1px dashed #ddd;
                    display: inline-block;
                    vertical-align: top;
                    margin: 16px 12px 0 12px;
                }
                .active{
                    color: #b4b4d8;
                    i{
                        background-color: #b4b4d8;
                    }
                    .line{
                        border-top: 1px dashed #b4b4d8;
                    }
                }
            }
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
                .ls-4{
                    letter-spacing: 5px;
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
                .common-width{
					width: 410px;
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
            .success{
                    padding-top:60px;
                    text-align: center;
                    font-size:16px;
                    .success-icon{
                        position: relative;
                        top:8px;
                        margin-right:10px;
                        display: inline-block;
                        width:59px;
                        height: 68px;
                        background: url('./../../../common/assets/images/update_success.png') no-repeat center;
                        background-size: 59px 68px;
                    }
                }
            .success:nth-child(2){
                padding:20px 0 228px 0;
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


