<template>
    <section class="user-center" :class="$i18n.locale">
        <!-- 设置中心 -->
        <div class="safe-setting" >
            <p class="safe-title"><i></i>{{$t('userCenter.safe.title1')}}</P>
            <div class="safe-setting-list">
              
                <p>
                    <span class="lb">{{$t('userCenter.safe.label3')}}</span>
                    <span class="cnt">{{phone}}</span>
                </p>
                <p>
                    <span class="lb">{{$t('userCenter.safe.label4')}}</span>
                    <span class="btn"><a @click="updateLoginPassword()">{{$t('userCenter.safe.button1')}}</a></span>
                </p>
                <p>
                    <span class="lb">{{$t('userCenter.safe.label5')}}</span>
                    <span class="cnt">{{isPayPassword ==true?$t('userCenter.safe.cnt1'):$t('userCenter.safe.cnt2')}}</span>
                    <span class="tip">{{$t('userCenter.safe.remark5')}}</span>
                    <span class="btn">
                        <a  @click="setUpdatePayPassword()">{{isPayPassword ==true?$t('userCenter.safe.button1'):$t('userCenter.safe.button2')}}</a>
                        <a  @click="forgetPayPassword()"  v-show="isPayPassword=='1'">{{$t('userCenter.safe.button3')}}</a>
                    </span>
                </p>
            </div>
            <p class="safe-title"><i></i>{{$t('userCenter.safe.title2')}}</P>
            <div class="safe-setting-list">
                <p>
                    <span class="lb">{{$t('userCenter.safe.label3')}}</span>
                    <span class="cnt"></span>
                    <span class="tip">{{$t('userCenter.safe.remark1')}}</span>
                    <span class="btn">
                        <a @click="phoneVerify">{{verify.phone?$t('userCenter.safe.button5'):$t('userCenter.safe.button4')}}</a>
                    </span>
                </p>
                <p>
                    <span class="lb mall">{{$t('userCenter.safe.label6')}}</span>
                    <span class="cnt">{{isEmail?email:$t('userCenter.safe.cnt2')}}</span>
                    <span class="tip">{{$t('userCenter.safe.remark2')}}</span>
                    <span class="btn">
                        <a v-if="!isEmail" @click="setUpdateEmail">{{$t('userCenter.safe.button6')}}</a>
                        <a v-if="isEmail" @click="emailVerify">{{verify.email?$t('userCenter.safe.button5'):$t('userCenter.safe.button4')}}</a>
                    </span>
                </p>
            </div>
            <div class="line"></div>
            <p class="safe-title"><i></i>{{$t('userCenter.safe.title3')}}</P>
            <div class="safe-setting-list login-list">
                <ul class="title-list">
                    <li>{{$t('userCenter.safe.log.lb1')}}</li>
                    <li>ip</li>
                    <li>{{$t('userCenter.safe.log.lb2')}}</li>
                </ul>
                <div class="data-list">
                    <ul class="data-item" v-for="(item,index) of loginList" :key="index">
                        <li>{{globalFun.dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss')}}</li>
                        <li>{{item.ip}}</li>
                        <li>{{item.status === 0?$t('userCenter.safe.log.lb3'):$t('userCenter.safe.log.lb4')}}</li>
                    </ul>
                </div>
                <div class="page">
                    <Button type="primary" v-if="this.logParams.pageNum>1" @click="prv">{{$t('userCenter.safe.log.btn1')}}</Button>
                    <Button type="primary" v-if="this.logParams.pageNum * this.logParams.count<this.recordTotal" @click="next">{{$t('userCenter.safe.log.btn2')}}</Button>
                    
                </div>
            </div>
       </div>
       <Modal :width="500" v-model="modal.show" class="safe-modal" :title="$t('userCenter.safe.modal.title')">
            <div class="cnt">
                <div class="item" v-if="verify.phone">
                    <!-- <div class="tip">{{phone}}</div> -->
                    <div class="ipt">
                        <input type="text" v-model.trim="modalParams.phoneCaptcha" :placeholder="$t('userCenter.safe.modal.mes1')" :maxlength="6"/>
                        <span class="send" v-if="modal.phoneTime>0">{{modal.phoneTime+'s'}}</span>
					    <span class="send" v-if="modal.phoneTime<=0" @click="sendPhone">{{phoneTime_text}}</span>
                    </div>
                </div>
                <div class="item" v-if="verify.email">
                    <!-- <div class="tip">{{email}}</div> -->
                    <div class="ipt">
                        <input type="text" v-model.trim="modalParams.emailCaptcha" :placeholder="$t('userCenter.safe.modal.mes2')" :maxlength="6"/>
                        <span class="send" v-if="modal.emailTime>0">{{modal.emailTime+'s'}}</span>
					    <span class="send" v-if="modal.emailTime<=0" @click="sendEmail">{{emailTime_text}}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="ipt">
                        <input type="password" v-model="modalParams.paymentPwd" :placeholder="$t('userCenter.safe.modal.mes3')" :maxlength="6"/>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="confirm">{{$t('userCenter.safe.modal.btn')}}</Button>
            </div>
        </Modal>
    </section>
</template>

<script>
import { 
    getUserDetail, getLoginList,
    openPhoneVerify,cancelPhoneVerify,
    openMailVerify,cancelMailVerify,getCodeByPhone,getCodeByEmail 
} from "@api/api_group";
import eventBus from '@common/eventBus/eventBus';
import utils from "@common/utils";
import md5 from '@common/assets/js/md5.js';
import { Spin, Message,Modal,Button } from 'iview';

export default {
    data() {
        return {
            isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
            isPayPassword: ``, //是否设置支付密码 false未设置   true已设置
            isEmail: ``, //是否设置电子邮箱 false未设置   true已设置
            email: ``, //邮箱账号
            phone: ``, //手机号
            loginList: [], //登录日志
            countryCode: ``, //国家区号
            isRealName: ``, //是否实名认证  1已认证   3未上传图片
            name:``,
            verify: {
                phone: false,
                email: false
            },
            phoneTime_text: "",
            emailTime_text: "",
            time: 120,
            modal:{
                type: 1,
                show: false,
                emailTime: -1,
                phoneTime: -1,
            },
            modalParams:{
                phoneCaptcha: "",
                emailCaptcha: "",
                paymentPwd: ""
            },
            recordTotal:0,
            logParams: {
                pageNum: 1,
                count: 5
            },
            isSendPhone: true,
            isSendEmail: true

        };
    },
    created: function() {
        if (this.isLogin == false) {
            Message.warning({
                content: this.$t('common.notLogin'),
                duration: 2
            });
            let goIndex = setTimeout(() => {
                window.location.href = "./index.html";
            }, 2000);
            return;
        }
        this.getUserDetail();
        this.getLoginList();      
        this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
        this.emailTime_text = this.$t('userCenter.safe.modal.senText');
        eventBus.$on('convertFont', () => {
            this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
            this.emailTime_text = this.$t('userCenter.safe.modal.senText');
        });   
    },
    mounted() {
        
    },
    methods: {
        getUserDetail: function() {
            //获取用户详情
            let _this = this;
            Spin.show();
            getUserDetail().then(res => {                
                if (res.success) {
                    Spin.hide();
                    res = res.data;
                    _this.isRealName = res.status; //是否实名认证  1已认证   3未上传图片
                    _this.isEmail = res.hasEmail;
                    if (_this.isEmail) {
                        _this.email = res.email;
                    }
                    _this.isPayPassword = res.paySet;
                    _this.phone = res.phone;
                    _this.name = res.name;
                    _this.countryCode = res.countryCode;

                    _this.verify = {
                        phone: res.phoneVer,
                        email: res.emailVer
                    }
                    
                }
                if (res.notLogin) {
                    Message.warning({
                        content: this.$t('common.notLogin'),
                        duration: 2
                    });
                    setTimeout(() => {
                        location.href = "./index.html";
                    }, 2000);
                }
            });
        },
        getLoginList: function() {
            //获取登录记录
            let _this = this;
            // Spin.show();
            getLoginList(this.logParams).then(res => {
                // Spin.hide();
                if (res.success) {
                    _this.loginList = res.data;
                    _this.recordTotal = res.recordTotal
                }
            });
        },
        prv(){
            
            this.logParams.pageNum = this.logParams.pageNum-1;
            this.getLoginList();
        },
        next(){
            this.logParams.pageNum = this.logParams.pageNum+1;
            this.getLoginList();
        },
        setUpdatePayPassword() {
            //修改or设置支付密码
            let _this = this;
            if (_this.isPayPassword == false) {
                //设置支付密码
                // if (_this.isRealName == "1") {
                    this.$router.push({
                        path: "/setPayPassword",
                        query: {
                            isPayPassword: _this.isPayPassword,
                            phone: _this.phone,
                            countryCode: _this.countryCode
                        }
                    });
                // } else {
                //     Modal.confirm({
                //         content: this.$t('userCenter.safe.remark3'),
                //         loading: false,
                //         onOk: () => {
                //              this.$router.push({
                //                 path: "/identity"
                //             });
                //         }
                //     });
                // }
            } else {
                //修改支付密码
                this.$router.push({
                    path: "/updatePayPassword"
                });
            }
        },
        forgetPayPassword() {
            //忘记支付密码
            let _this = this;
            this.$router.push({
                path: "/forgetPayPassword",
                query: {
                    phone: _this.phone,
                    email: _this.isEmail,
                    countryCode: _this.countryCode
                }
            });
        },
        updateLoginPassword() {
            //修改登录密码
            let _this = this;
            this.$router.push({
                path: "/updateLoginPassword",
                query: {
                    type: "updateLoginPassword"
                }
            });
        },
        setUpdateEmail() {
            // if(this.isRealName != "1"){
            //     Modal.confirm({
            //         content: this.$t('userCenter.safe.remark3'),
            //         loading: false,
            //         onOk: () => {
            //                 this.$router.push({
            //                 path: "/identity"
            //             });
            //         }
            //     });
            //     return false;
            // }
            // if(!this.isPayPassword){
            //      Modal.confirm({
            //         content: "您还未设置资金密码，是否前往设置？",
            //         loading: false,
            //         onOk: () => {
            //             this.$router.push({
            //                 path: "/setPayPassword"
            //             });
            //         }
            //     });
            //     return false;
            // }
            //设置or修改电子邮箱
            let _this = this;
            this.$router.push({
                path: "/setEmail",
                query: {
                    type: "setEmail"
                }
            });
            // if (_this.isEmail == false) {
            //     //设置电子邮箱
            //     this.$router.push({
            //         path: "/setEmail",
            //         query: {
            //             type: "setEmail"
            //         }
            //     });
            // } else {
            //     //修改电子邮箱
            //     this.$router.push({
            //         path: "/updateEmail",
            //         query: {
            //             email: _this.email
            //         }
            //     });
            // }
        },
        updatePhone() {
            //更换手机号
            let _this = this;
            this.$router.push({
                path: "/updatePhone",
                query: {
                    phone: _this.phone,
                    countryCode: _this.countryCode
                }
            });
        },
        // 手机验证 开启或关闭
        phoneVerify(){
            if(!this.verify.phone){
                // 开启
                openPhoneVerify().then(res =>{
                    if(res && res.success){
                        this.verify.phone = true;
                        Message.success(this.$t('userCenter.safe.modal.operSuccess'));
                    }
                });
            }else{
                // 关闭
                this.close(1);
            }
        },
        // 邮箱验证 开启或关闭
        emailVerify(){
            if(!this.verify.email){
                // 开启
                openMailVerify().then(res =>{
                    if(res && res.success){
                        this.verify.email = true;
                        Message.success(this.$t('userCenter.safe.modal.operSuccess'));
                    }
                });
            }else{
                // 关闭
               this.close(2);
            }
        },
        close(type){
            if(this.isRealName!=1){
                Modal.confirm({
                    title: this.$t('userCenter.safe.close.title'),
                    content: this.$t('userCenter.safe.close.content1'),
                    loading: true,
                    onOk: () => {
                        Modal.remove();
                        location.href="./user_center.html#/guide?name=identity";
                    }
                });
                return false;
            }
            if(!this.isPayPassword){
                Modal.confirm({
                    title: this.$t('userCenter.safe.close.title'),
                    content: this.$t('userCenter.safe.close.content2'),
                    loading: true,
                    onOk: () => {
                        Modal.remove();
                        location.href="./user_center.html#/guide?name=setPayPassword";
                    }
                });
                return false;
            }
            this.modal.show = true;
            this.modal.type = type;
            this.modalParams= {
                phoneCaptcha: "",
                emailCaptcha: "",
                paymentPwd: ""
            }
        },
        countdown(time){
            let _this = this;
            var interval = setInterval(function(){
                _this[time+"_text"] = _this.$t('userCenter.safe.modal.senText');
                if(_this.modal[time]<=0){
                    clearInterval(interval)
                }else{
                    _this.modal[time] -= 1; 
                }
            },1000);
        },
        confirm(){
            var params = {};
            if(this.verify.phone){
                if(!this.modalParams.phoneCaptcha){
                    Message.error(this.$t('userCenter.safe.modal.mes1'));
                    return false;
                }
                params.phoneCaptcha = this.modalParams.phoneCaptcha;
            }
            if(this.verify.email){
                if(!this.modalParams.emailCaptcha){
                    Message.error(this.$t('userCenter.safe.modal.mes2'));
                    return false;
                }
                params.emailCaptcha = this.modalParams.emailCaptcha;
            }
            if(!this.modalParams.paymentPwd){
                Message.error(this.$t('userCenter.safe.modal.mes3'));
                return false;
            }
            params.paymentPwd = md5(this.modalParams.paymentPwd);
            if(this.modal.type == 1){
                cancelPhoneVerify(params).then(res =>{
                    if(res && res.success){
                        this.modal.show = false;
                        Message.success(this.$t('userCenter.safe.modal.operSuccess'));
                        this.verify.phone = false;
                    }
                })
            }else if(this.modal.type == 2){
                cancelMailVerify(params).then(res =>{
                    if(res && res.success){
                        this.modal.show = false;
                        Message.success(this.$t('userCenter.safe.modal.operSuccess'));
                        this.verify.email = false;
                    }
                })
            }
           
        },
        sendPhone(){
            if(this.isSendPhone){
                this.isSendPhone = false;
                this.phoneTime_text = this.$t('userCenter.safe.modal.sendIn');
                getCodeByPhone().then(res =>{
                    this.isSendPhone = true;
                    if(res && res.success){
                        this.modal.phoneTime = this.time;
                        this.countdown("phoneTime");
                        Message.success(this.$t('userCenter.safe.modal.sendSuccess'));
                    }else{
                        this.phoneTime_text = this.$t('userCenter.safe.modal.senText');
                    }
                })
            }
        },
        sendEmail(){
            if(this.isSendEmail){
                this.isSendEmail = false;
                this.emailTime_text = this.$t('userCenter.safe.modal.sendIn');
                getCodeByEmail().then(res =>{
                    this.isSendEmail = true;
                    if(res && res.success){
                        this.modal.emailTime = this.time;
                        this.countdown("emailTime");
                        Message.success(this.$t('userCenter.safe.modal.sendSuccess'));
                    }else{
                        this.emailTime_text = this.$t('userCenter.safe.modal.senText');
                    }
                })
            }
            
        },
       
    },
    components: {
        Button,Modal
    },
};
</script>

<style lang="scss" scoped="scoped">
.user-center {
    background-color: #ffffff;
    width: 1200px;
    margin-bottom: 250px;
    .safe-setting {
        padding: 50px 0 0 0;
        .line{
            height: 1px;
            display: flex;
            border-top: 1px dashed #ddd;
            margin: 0 50px 50px 50px;
        }
        
        //标题  
        .safe-title {
            font-size: 16px;
            display: flex;
            align-items: center;
            font-weight: 550;
            color: #333333;
            padding: 0 50px 48px 50px;
            position: relative;
            i{
                position: absolute;
                width: 6px;
                height: 6px;
                background-color: #ff8a00;
                border-radius: 50%;
                top: 9px;
                left: 33px;
            }
        }
        // 设置列表
        .safe-setting-list {
            padding: 0 50px 0 50px;
            
            p {
                font-size: 16px;
                padding: 0 0 50px 0;
                display: flex;
                .lb {
                    font-size: 16px;
                    color: #999;
                    margin: 0 38px 0 0;
                    white-space: nowrap;
                }
                &.user_name{
                    .lb{
                        letter-spacing:9px;
                        margin: 0 28px 0 0;
                    }
                    .cnt{
                        width: inherit
                    }
                }
                .cnt {
                    
                    width: 240px;
                    margin: 0 38px 0 0;
                    color: #333;
                }
                .tip{
                    font-size: 14px;
                    color: #999;
                }
                .mall{
                    letter-spacing: 32px;
                    margin: 0 7px 0 0;
                }
                .btn{
                    flex: 1;
                    text-align: right;
                    a{
                        color: #fc923f;
                        margin-left: 30px;
                        &:nth-child(1){
                            margin-left: 0;
                        }
                    }
                }
                .url{
                    width: 700px;
                }
            }
            .code{
                .lb{
                    letter-spacing:4px;
                    margin: 0 34px 0 0; 
                }
                .cnt{
                    color: #b4b4d8;
                }
            }
        
        }
        #inviteUrl{
            opacity: 0;
            display: none;
        }
    }
    //登陆日志
    .login-list {
        font-size: 14px;
        
        .title-list{
            display: flex;
            text-align: center;    
            color: #333;
            li{
                flex: 1;
                line-height: 16px;
                margin-bottom: 26px;
            }
        }
        .data-list{
            border: 1px solid #ddd;
            .data-item{
                display: flex;
                border-top: 1px dashed #ddd;
                text-align: center;
                margin-top: -1px;
                color: #666;
                li{
                    flex: 1;
                    line-height: 77px;
                }
            }
        }
        .page{
            padding: 36px 0 162px 0; 
            text-align: right;
            a{
                padding: 0 30px;
                display: inline-flex;
                border: 1px solid #ff8a00;
                color: #ff8a00;
                border-radius: 3px;
                line-height: 26px;
                text-align: center;
                margin-left: 14px;
            }
        }
    }
}
.safe-modal{
    .cnt{
        font-size: 14px;
        .tip{
            line-height: 16px;
            margin-bottom: 10px;
            color: #333;
        }
        .item{
            line-height: 40px;
            margin-bottom: 20px;
            .ipt{
                display: flex;
                height: 34px;
                line-height: 34px;
                margin-bottom: 10px;
                input{
                    flex: 1;
                    border: 1px solid #e5e5e5;
                    padding: 0 10px;
                    border-radius: 3px;
                }
                .send{
                    cursor: pointer;
                    padding: 0 10px;
                    min-width: 100px;
                    margin-left: 12px;
                    border: 1px solid #ff8a00;
                    border-radius: 3px;
                    text-align: center;
                    color: #ff8a00;
                }
            }
           
        }
    }
    
}
.ENG{
    .lb{
        min-width: 166px;
        text-align: right;
        letter-spacing: 0px !important;
        margin: 0 38px 0 0 !important;
    }
    .safe-setting-list{
        .cnt{
            width: 140px !important;
        }
    }
    
}
</style>
<style>
.ivu-btn-success {
    font-size: 16px;
    width: 120px;
    padding: 3px;
}
</style>

