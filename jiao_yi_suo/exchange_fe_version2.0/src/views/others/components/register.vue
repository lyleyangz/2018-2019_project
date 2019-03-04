<template>
	<div :class="$i18n.locale" class="register">
		<section class="user-contain"  ref="container">
			<div class="login">
				{{$t('register.goLogin1')}}<a href="./others.html#/login">{{$t('register.goLogin2')}}</a>
			</div>
			<div class="register-body">
                <ul class="ul register-first" v-show="step_this=='1'">
					<li class="li" v-if="from">
						<span class="from"><i></i>{{$t('register.from1')}}<label>{{from}}</label>{{$t('register.from2')}}</span>
				   	</li>
					
					<li class="li">
						<span class="lb ls-3">{{$t('register.label1')}}</span>
						<Select v-model="country" class="country" v-if="!convertingFont">
							<Option value="86" >{{$t('register.option1')}}</Option>
							<Option value="852" >{{$t('register.option2')}}</Option>
							<Option value="853" >{{$t('register.option3')}}</Option>
							<Option value="886" >{{$t('register.option4')}}</Option>
						</Select>
						<input class="ivu-input" v-model="phone" type="number"  :placeholder="$t('register.placeholder1')" style="width: 315px" oninput="if(value.length>20)value=value.slice(0,20)"/>
					</li>
					<li class="li">
						<span class="lb">{{$t('register.label2')}}</span>
						<input class="ivu-input" v-model="code" type="text"  :placeholder="$t('register.placeholder2')" style="width: 280px"  :maxlength="6"/>
						<a class="sendCode"  @click="sendCode('1')">
							<!-- <span>{{$t('register.cnt.sendText')}}</span> -->
							<span>{{send_text}}</span>
						</a>
					</li>
					<li class="li">
						<span class="lb ls-4">{{$t('register.label4')}}</span>
						<!-- 额外元素，防止浏览器保存密码 autoComplete是重点-->
						<input type="password" style="display:none;width:0;height:0;">
						<input class="ivu-input common-width" v-model="password" type="password"  :placeholder="$t('register.placeholder4')" autocomplete="new-password" :maxlength="20"/>
					</li>
					<li class="li">
						<span class="lb ls-4">{{$t('register.label5')}}</span>
						<!-- 额外元素，防止浏览器保存密码  autoComplete是重点-->
						<input type="password" style="display:none;width:0;height:0;">
						<input class="ivu-input common-width" v-model="againPassword" type="password"  :placeholder="$t('register.placeholder5')" autocomplete="new-password" :maxlength="20"/>
					</li>
					<li class="li">	
					  <span class="lb ls-3">{{$t('register.label3')}}</span>
					  <input class="ivu-input common-width" v-model="inviteCode" type="text" :disabled="from"  :placeholder="$t('register.placeholder3')" autocomplete="new-password" />
				  	</li>
					<li class="li agreement">
						<span class="lb"></span>
						<Checkbox v-model="agreement">{{$t('register.agreement1')}}<a href="/text_info.html#/agreement" target="_bank">{{$t('register.agreement2')}}</a></Checkbox>
					</li>
					<li class="li">
						<span class="lb"></span>
						<Button type="success" class="common-width" @click="submit('1')">{{$t('register.button')}}</Button>
					</li>
				</ul>
			
				<ul class="ul register-third" v-show="step_this=='3'">
                    <li class="li" v-show="email!=''">
						<span>{{$t('register.label6')}}</span><label>{{email}}</label>
					</li>
					<li class="success">
						<i class="success-icon"></i>{{$t('register.remark.success')}}
					</li>
				</ul>
			</div>
		</section>
		
	</div>
</template>

<script>
import header from '@components/header/header';
import footer from '@components/footer/footer';
import {getCode,register,bindEmail,getEmail,toLogin} from '@api/api_group';
import md5 from '@common/assets/js/md5.js';
import eventBus from '@common/eventBus/eventBus';
import utils from  '@common/utils';
import reg from '@common/settings/phoneNUmCheck';//手机号正则验证（包含大陆以及港澳台）
import {Button,Input,Select,Option,Spin,Checkbox,Notice,Message} from 'iview';

export default {
    data() {
        return {
			step_this : `1`,
			send_text: "",
			isSend:true,
			time:120,
			phone:``,
			code:``,
			password:``,
			againPassword:``,
			country:`86`,
			email:``,
			emailCode:``,
			interval:``,
			inviteCode: this.$route.query.inviteCode || '',
			convertingFont: false,
			agreement: true,
			from: this.$route.query.phone
        };
    },
    created() {
		document.body.style.backgroundColor="#F6F6FB";
		document.title = this.$t('register.pageTitle');
		this.send_text = this.$t('register.cnt.sendText');
		eventBus.$on('convertFont', () => {
			document.title = this.$t('register.pageTitle');
			this.send_text = this.$t('register.cnt.sendText');
			this.convertingFont = true;
			setTimeout(() => {
				this.convertingFont = false;
			}, 200);
		});
		
	},
	mounted () {
		this.$nextTick(() => {
			if (this.globalFun.mobileCheck()) {
				let h = document.documentElement.clientHeight - 78 - 344;
				this.$refs.container.setAttribute('style', `min-height:${h}px;`);
			}
			
		});	
		// this.$parent.setIsLogin();
		this.$parent.setTip(this.$t('register.headerTitle'));
	},
    methods: {
		sendCode(val) {
			let _this = this;
			if(val == '1'){//手机验证码
				_this.getPhoneCode(); 
			}else{//邮箱验证码
				_this.getEmailCode(); 
			}    
		},
		getPhoneCode() {//获取手机验证码
			let _this = this;
			if(_this.isSend == true){
				if(!_this.phone){
					let config = {
						title: this.$t('register.alertMes.mes1')
					}
					Notice.error(config)
					return;
				}
				let params = {
					phone:_this.phone,
					type:1,
					countryCode:_this.country
				}
				Spin.show();
				getCode(params).then((res) => {
					Spin.hide();
					if (res.success) {
						Message.success(this.$t('register.alertMes.sendCodeSuccess'))
						_this.countDown();
					}else{
						_this.send_text = res.data + this.$t('register.cnt.timeAfterReset');
						_this.time = res.data;
						_this.countDown();
					}
				});
			}
		},
		getEmailCode() {//获取邮箱验证码
			let _this = this;
			if(_this.isSend == true){
				if(_this.email.trim() == ""){
					let config = {
						title:this.$t('register.alertMes.mes2')
					}
					Notice.error(config)
					return;
				}
				let params = {
					email:_this.email,
				}
				Spin.show();
				getEmail(params).then((res) => {
					Spin.hide();
					if (res.success) {
						Message.success(this.$t('register.alertMes.sendCodeSuccess'))
						_this.countDown();
					}else{
						_this.send_text = res.data + this.$t('register.cnt.timeAfterReset');
						_this.time = res.data;
						_this.countDown();
					}
				});
			}
		},
		countDown (){//进入倒计时
			let _this = this;
			_this.isSend = false;
			if(_this.step_this=='1'){
				document.getElementsByClassName("sendCode")[0].disabled = 'disabled';
			}else if(_this.step_this=='2'){
				document.getElementsByClassName("sendCode")[1].disabled = 'disabled';
			}
			_this.interval = setInterval(function() {
				_this.time--;
				_this.send_text = _this.time + _this.$t('register.cnt.timeAfterReset');
				if (_this.time == 0) {
					document.getElementsByClassName("sendCode")[0].disabled = '';
					_this.send_text = _this.$t('register.cnt.sendText');
					_this.isSend = true;
					_this.time = 120;
					clearInterval(_this.interval);
				}
			}, 1000);
		},
		skip (){ //跳过邮箱绑定
			let _this = this;
			_this.step_this = '3';
			setTimeout(()=>{
				window.location.href="./index.html"
			},3000)
		},
		submit(val) {
			let _this = this;
			if(val == '1'){ //注册
				
				
				if(!_this.phone){
					Notice.error({
						title: this.$t('register.alertMes.mes1')
					});
					return false;
				}
				if(_this.code.trim() == ""){
					Notice.error({
						title: this.$t('register.alertMes.mes3')
					});
					return false;
				}
				if(_this.password.indexOf(" ")>-1){
					Notice.error({
						title: this.$t('register.alertMes.mes4')
					});
					return false;
				}
				if(!this.globalFun.check.password(_this.password)){
					Notice.error({
						title: this.$t('register.alertMes.mes5')
					});
					return false;
				}
				if(_this.againPassword == ""){
					Notice.error({
						title: this.$t('register.alertMes.mes6')
					});
					return false;
				}
				if(_this.password.trim()!=_this.againPassword.trim()){
					Notice.error({
						title: this.$t('register.alertMes.mes7')
					})
					return false;
				}
				if(this.from && !this.inviteCode){
					Notice.error({
						title: this.$t('register.placeholder3')
					})
					return false;
				}
				if(!_this.agreement){
					Notice.error({
						title: this.$t('register.alertMes.mes10')
					})
					return false;
				}
				let params = {
					phone:_this.phone,
					password:md5(_this.againPassword).toLowerCase(),
					captcha:_this.code,
					countryCode:_this.country,
					inviteCode:_this.inviteCode
				}
				// if(_this.inviteCode == ""){
				//   delete params.inviteCode
				// }
				Spin.show();
				register(params).then((res) => {
					Spin.hide();
					if (res.success) { //注册成功
						localStorage.setItem('YJS_loginName', this.phone);
						localStorage.setItem('YJS_isLogin', 'true');
						// 暂时屏蔽
						// this.step_this = '2';
						Message.success({content: this.$t('register.alertMes.registerSuccess'), duration: 2});
						setTimeout(() => {
							location.href = './index.html';
						}, 2000);
					}
				});	
				
			}else{//绑定邮箱
				if(_this.email.trim() == ""){
				let config = {
					title: $t('register.alertMes.mes8')
				}
				Notice.error(config)
				}else if(_this.emailCode.trim() == ""){
					let config = {
					title: $t('register.alertMes.mes9')
				}
				Notice.error(config)
				}else{
				let params = {
					email:_this.email,
					code:_this.emailCode
				}
				bindEmail(params).then((res) => {
					if (res.success) {
						_this.step_this = '3';
						setTimeout(()=>{
						window.location.href="./index.html"
						},3000)
					}
				});
				}  
			}
	   },
	   toLogin() {//登录
		   toLogin({
				phone: this.phone,
				password: md5(this.password).toLowerCase(),
				// PIN: this.PIN,
				countryCode: this.country
			}).then((res) => {
				if (res && res.success) {//登录成功
					localStorage.setItem('YJS_loginName', this.phone);
					localStorage.setItem('YJS_isLogin', 'true');
					localStorage.setItem('YJS_systemLoginKey', res.data.systemLoginKey);
					this.step_this = '2';
				}
			});
	   } 
	},
	watch:{
		country:function(newValue, oldValue){
			
        }
	},
    components: {
        'com-header': header,
		'com-footer': footer,
	 	Button,
		Input,
		Select,
		Option,
		Checkbox
    }
}
</script>

<style lang="scss"  scoped="scoped">
.user-contain{
	padding:24px 48px 78px 48px;
	width: 1200px;
	border-top: 2px solid #ff8a00;
	height:auto;
	min-width: 1200px;
	margin: 90px auto 250px auto;
    background-color: #ffffff;
	position: relative;
	.login{
		height: 40px;
		width: 100%;
		font-size: 14px;
		color: #333;
		position: absolute;
		left: 0;
		top: -40px;
		line-height: 40px;
		text-align: right;
		a{
			color: #ff8a00;
		}
	}
	.ivu-input{
		// width: 410px;
		height: 40px;
		line-height: 38px;
		padding: 0 7px;
		border: 1px solid #ddd;
	}
	.ivu-btn {
		border:1px solid #ff8a00;
		background-color: #ff8a00;
		// width: 410px;
		height: 38px;
		font-size: 16px;
		margin-top:24px;
	}
		
	.register-body{
		width:100%;
		.ul{
			font-size:16px;
			color:#333333;
			.li{
				margin-top:26px;
				.lb{
					display: inline-block;
					width:80px;
					color: #999;
					margin-right: 18px;
					white-space: nowrap;
				}
				.ls-3{
					letter-spacing: 16px;
				}
				.ls-4{
					letter-spacing: 5.2px;
				}
				label{
					color:#00b38a;
				}
				.sendCode{
					color:#ff8a00;
					margin-left:12px;
					border: 1px solid #ff8a00;
					text-align: center;
					font-size: 16px;
					padding: 7px 14px;
					border-radius: 3px;
					display: inline-flex;
					vertical-align: top;
				}
				.country{
					width: 90px;
				}
				.common-width{
					width: 410px;
				}
				.from{
					display: flex;
					align-items: center;
					font-size: 14px;
					color: #333;
					letter-spacing: 0.05em;
					i{
						background: url('../../../common/assets/images/invite.png') no-repeat;
						width: 16px;
						height: 16px;
						display: inline-block;
						margin-right: 12px;
					}
					label{
						color: #ff8a00;
						margin: 0 5px;
					}
				}
			}
			.agreement{
				margin-top:15px;
				label{
					color: #999;
				}
				a{
					color: #ff8a00;
				}
			}
			.success{
				margin-top:40px;
				text-align: center;
				.success-icon{
					position: relative;
					top:8px;
					margin-right:10px;
					display: inline-block;
					width:36px;
					height: 36px;
					background: url('../../../common/assets/images/step_now.png') no-repeat center;
					background-size: 36px 36px;
				}
			}
		}
	}
}
.ENG{
	.register-body{
		.lb{
			min-width: 200px;
			text-align: right;
			letter-spacing: 0px !important;
		}
		.country{
			width: 176px !important;
		}
		.common-width{
			width: 496px !important;
		}
	}
}
</style>
<style>
	.register .ivu-input-type .ivu-input:hover {
		border-color: #00b38a;
	}
	.register .ivu-input-type .ivu-input:focus {
		border-color: #00b38a;
	}
	.register .ivu-select{
		vertical-align: top;
	}
	.register .ivu-select-single .ivu-select-selection{
		height: 40px;
	}
	.register .ivu-select-selected-value{
		line-height: 38px !important;
	}
	.register .ivu-checkbox-checked .ivu-checkbox-inner{
		border-color: #ff8a00;
    	background-color: #ff8a00;
	}
</style>