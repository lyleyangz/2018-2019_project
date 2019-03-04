<template>
    <section class="user-center" :class="$i18n.locale">
        <!-- 修改登录密码 -->
        <div class="safe-setting">
            <p class="safe-title">{{$t('userCenter.updateLoginPassword.title')}}</P>
            <div class="safe-setting-list">
                <p class="li">
                    <span class="lb ls-3">{{$t('userCenter.updateLoginPassword.label1')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input common-width" v-model="oldPassword" type="password" :placeholder="$t('userCenter.updateLoginPassword.placeholder1')" autocomplete="new-password" :maxlength="20">
                    </span>
                </p>
                <p class="li">
                    <span class="lb ls-3">{{$t('userCenter.updateLoginPassword.label2')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input common-width" v-model="newPassword" type="password" :placeholder="$t('userCenter.updateLoginPassword.placeholder2')"  autocomplete="new-password" :maxlength="20">
                    </span>
                </p>
                <p class="li">
                    <span class="lb">{{$t('userCenter.updateLoginPassword.label3')}}</span>
                    <span>
                        <!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
                        <input type="password" style="display:none;width:0;height:0;">
                        <input class="ivu-input common-width" v-model="againNewPassword" type="password" :placeholder="$t('userCenter.updateLoginPassword.placeholder3')"  autocomplete="new-password" :maxlength="20">
                    </span>
                </p>
                <p class="li">
                    <span class="lb"></span>
                    <Button class="common-width" type="success" @click="submit()">{{$t('userCenter.updateLoginPassword.button')}}</Button>
                </p>
            </div>
            <div class="setPayRemark">
                <p>{{$t('userCenter.updateLoginPassword.remark.title')}}</p>
                <p>{{$t('userCenter.updateLoginPassword.remark.para1')}}</p>
                <p>{{$t('userCenter.updateLoginPassword.remark.para2')}}</p>    
            </div>
        </div>
    </section>
</template>

<script>
    import { updateLoginPassword } from '@api/api_group'; 
    import md5 from '@common/assets/js/md5.js';
    import {Button, Spin, Message, Notice} from 'iview';

    export default {
        data() {
            return {
                oldPassword:"",
                newPassword:"",
                againNewPassword:""
            }
        },
        created() {
       
        },
        methods: {
            submit:function(){
                let _this = this;
                if(_this.oldPassword.trim() == ''){
                    let config = {
                        title:this.$t('userCenter.updateLoginPassword.alertMes.mes1')
                    }
                    Notice.error(config)
                    return false;
                }
                if(_this.newPassword.trim()==''){
                    let config = {
                        title:this.$t('userCenter.updateLoginPassword.alertMes.mes2')
                    }
                    Notice.error(config)
                    return false;
                }
                if(!this.globalFun.check.password(_this.newPassword)){
					Notice.error({
						title: this.$t('register.alertMes.mes5')
					});
					return false;
				}
                if(_this.againNewPassword.trim() == ''){
                    let config = {
                        title:this.$t('userCenter.updateLoginPassword.alertMes.mes4')
                    }
                    Notice.error(config)
                    return false;
                }
                if(_this.againNewPassword.trim()!=_this.newPassword.trim()){
                    let config = {
                        title:this.$t('userCenter.updateLoginPassword.alertMes.mes5')
                    }
                    Notice.error(config)
                    return false;
                }
                let params = {
                    old:md5(_this.oldPassword).toLowerCase(),
                    newPwd:md5(_this.againNewPassword).toLowerCase(),
                }
                Spin.show();
                updateLoginPassword(params).then((res) => {
                    Spin.hide();
                    if (res.success) {
                        Message.success(this.$t('userCenter.updateLoginPassword.alertMes.success'))
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
                .ls-3{
					letter-spacing: 16px;
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
        min-width: 176px;
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

</style>

