<template>
    <section class="user-center" :class="$i18n.locale">
        <div class="safe-setting">
            <p class="safe-title">{{$t('userCenter.safe.button6')}}</P>
            <div class="safe-setting-list">
                <p class="li">
                    <span class="lb">{{$t('userCenter.forgetPayPassword.step1.label3')}}</span>
                    <span><input class="ivu-input common-width" v-model.trim="email" :placeholder="$t('userCenter.forgetPayPassword.alertMes.mes6')"  autocomplete="new-password"></span>
                </p>
                <p class="li">
                    <span class="lb">{{$t('userCenter.forgetPayPassword.step1.option2')}}</span>
                    <span>
                        <input class="ivu-input" v-model.trim="code" :placeholder="$t('userCenter.setPayPassword.placeholder1')" style="width: 290px;" autocomplete="new-password" :maxlength="6">
                    </span>
                    
                    <a class="sendCode" v-if="emailTime>0">{{emailTime+'s'}}</a>
                    <a class="sendCode" v-if="emailTime<=0" @click="sendEmailCode">{{emailTime_text}}</a>
                </p>
                <!-- <p class="li">
                    <span class="lb ls-4">{{$t('userCenter.setPayPassword.label1')}}</span>
                    <span>{{phone}}</span>
                </p> -->
                <p class="li">
                    <span class="lb">{{$t('userCenter.forgetPayPassword.step1.option1')}}</span>
                    <span>
                        <input class="ivu-input" v-model.trim="phoneCaptcha" :placeholder="$t('userCenter.setPayPassword.placeholder1')" style="width: 290px;" autocomplete="new-password" :maxlength="6">
                    </span>
                    <a class="sendCode" v-if="phoneTime>0">{{phoneTime+'s'}}</a>
                    <a class="sendCode" v-if="phoneTime<=0" @click="sendPhoneCode">{{phoneTime_text}}</a>
                </p>
                <p class="li">
                    <span class="lb"></span>
                    <Button class="common-width" type="success" @click="submit()">{{$t('userCenter.setPayPassword.button')}}</Button>
                </p>
            </div>
            <div class="setPayRemark">
                <span class="remark-title"></span>
                <p>{{$t('userCenter.setEmail.tipTitle')}}</p>
                <p>{{$t('userCenter.setEmail.tip1')}}</p>
                <p>{{$t('userCenter.setEmail.tip2')}}</p>
            </div>
        </div>
    </section>    
</template>

<script>
    import { sendEmailByBind,bindEmailNew,userVerify,getCodeByPhone } from '@api/api_group'; 
    import eventBus from '@common/eventBus/eventBus';
    import {Button, Spin, Message, Notice} from 'iview';
    export default {
        data() {
            return {
                email : "",
                code:"",
                phoneCaptcha: "",
                phone: localStorage.getItem("YJS_loginName") || '',
                isSend : true,
                phoneTime_text: "",
                emailTime_text: "",
                isSendPhone: true,
                isSendEmail: true,
                time: 120,
                phoneTime: -1,
                emailTime: -1
            }
        },
        created() {
            this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
            this.emailTime_text = this.$t('userCenter.safe.modal.senText');
            eventBus.$on('convertFont', () => {
                this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
                this.emailTime_text = this.$t('userCenter.safe.modal.senText');
            });  
        },
        components: {
            Button
        },
        methods: {
            
            // 倒计时
            countdown(time){
                let _this = this;
                var interval = setInterval(function(){
                    _this[time+"_text"] = _this.$t('userCenter.safe.modal.senText');
                    if(_this[time]<=0){
                        clearInterval(interval)
                    }else{
                        _this[time] -= 1; 
                    }
                },1000);    
            },
            //发送邮箱验证码
            sendEmailCode(){ 
                let _this = this;
                if(!_this.email){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes4')
                    })
                    return false;
                }
                if(!_this.globalFun.check.email(_this.email)){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes5')
                    });
                    return false;
                }
            
                let params = {
                    email:_this.email
                }
                if(this.isSendEmail){
                    this.isSendEmail = false;
                    this.emailTime_text = this.$t('userCenter.safe.modal.sendIn');
                    sendEmailByBind(params).then((res) => {
                        this.isSendEmail = true;
                        if (res.success) {
                            this.emailTime = this.time;
                            this.countdown("emailTime");
                            Message.success(this.$t('userCenter.safe.modal.sendSuccess'));  
                        
                        }else{
                            this.emailTime_text = this.$t('userCenter.safe.modal.senText');
                        }
                    });
                }
                
            },
            sendPhoneCode(){
                if(this.isSendPhone){
                    this.isSendPhone = false;
                    this.phoneTime_text = this.$t('userCenter.safe.modal.sendIn');
                    getCodeByPhone().then(res =>{
                        this.isSendPhone = true;
                        if(res && res.success){
                            this.phoneTime = this.time;
                            this.countdown("phoneTime");
                            Message.success(this.$t('userCenter.safe.modal.sendSuccess'));  
                        }else{
                            this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
                        }
                       
                    })
                }
            },
            submit:function(){ //立即绑定
                let _this = this;
                if(!_this.email){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes3')
                    })
                    return false;
                }
                 if(!_this.globalFun.check.email(_this.email)){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes4')
                    });
                    return false;
                }
                if(!_this.code){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes2')
                    })
                    return false;
                }
                let params = {
                    email:_this.email,
                    code:_this.code
                }
                if(!_this.phoneCaptcha){
                    Notice.error({
                        title: this.$t('userCenter.safe.modal.mes1')
                    })
                    return false;
                }
                params.phoneCaptcha = _this.phoneCaptcha;
               
                Spin.show();
                bindEmailNew(params).then((res) => {
                    Spin.hide();
                    if (res.success) {
                        Message.success(this.$t('userCenter.safe.modal.bindSuccess'));
                        setTimeout(()=>{
                            window.location.href="./user_center.html#/safe"
                        },3000)
                    }
                });
                
            }
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
                .ls-4{
					letter-spacing: 8px;
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
                width: 418px;
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
        width: 505px !important;
    }
}
</style>

