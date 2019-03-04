<template>
	<div :class="$i18n.locale" class="forgetLoginPassword">
		<section class="user-contain" ref="container">
			<div class="login">
				<a href="./others.html#/login">{{$t('others.forgetLoginPassword.goLogin')}}</a>
			</div>
			<div class="setp-nav">
				<span :class="step_this>=1?'active':''"> 
					<i>1</i><span>{{$t('others.forgetLoginPassword.stepText1')}}</span><span class="line"></span>
				</span>
				<span :class="step_this>=2?'active':''">
					<i>2</i><span>{{$t('others.forgetLoginPassword.stepText2')}}</span><span class="line"></span>
				</span>
				<span :class="step_this>=3?'active':''">
					<i>3</i><span>{{$t('others.forgetLoginPassword.stepText3')}}</span>
				</span>
			</div>
			<div class="forget-body">
                <ul class="ul forget-first" v-show="step_this=='1'">
					<li class="li">
						<span class="lb ls-4">{{$t('others.forgetLoginPassword.label1')}}</span>
						<Select v-model="verifyType" class="common-width" @on-change="verifyChange()" disabled v-if="!convertingFont">
							<Option value="1" >{{$t('others.forgetLoginPassword.option1.first')}}</Option>
							<Option value="2" >{{$t('others.forgetLoginPassword.option1.second')}}</Option>
						</Select>
					</li>
				    <li class="li" v-show="verifyType=='1'">
					   <span class="lb ls-3">{{$t('others.forgetLoginPassword.label2')}}</span>
					   <Select v-model="country" class="country" v-if="!convertingFont">
							<Option value="86" >{{$t('others.forgetLoginPassword.option2.first')}}</Option>
							<Option value="852" >{{$t('others.forgetLoginPassword.option2.second')}}</Option>
							<Option value="853" >{{$t('others.forgetLoginPassword.option2.third')}}</Option>
							<Option value="886" >{{$t('others.forgetLoginPassword.option2.fourth')}}</Option>
						</Select>
						<input class="ivu-input" v-model="phone" type="number" style="width:315px" :placeholder="$t('others.forgetLoginPassword.placeholder1')" oninput="if(value.length>20)value=value.slice(0,20)"/>
				   	</li>
					<li class="li">
						<span class="lb">{{$t('others.forgetLoginPassword.cnt.codeText1')}}</span>
						<input class="ivu-input" v-model="code" type="text"  :placeholder="$t('others.forgetLoginPassword.placeholder2')" style="width: 287px;" :maxlength="6"/>
						<a class="sendCode"  @click="sendCode()">{{send_text}}</a>
					</li>
					<li class="li">
						<span class="lb"></span>
						<Button type="success" class="common-width" @click="submit('1')">{{$t('others.forgetLoginPassword.button1')}}</Button>
					</li>
				</ul>
				<ul class="ul forget-second" v-show="step_this=='2'">
                    <li class="li">
					  <span class="lb ls-3">{{$t('others.forgetLoginPassword.label3')}}</span>
					  <input class="ivu-input common-width" v-model="newPassword" type="password"  :placeholder="$t('register.placeholder4')"/>
				   </li>
				   <li class="li">
					  <span class="lb">{{$t('others.forgetLoginPassword.label4')}}</span>
					  <input class="ivu-input common-width" v-model="againNewPassword" type="password"  :placeholder="$t('others.forgetLoginPassword.placeholder4')"/>
				   </li>
				   <li class="li">
					   <span class="lb"></span>
					   <Button type="success" class="common-width"  @click="submit()">{{$t('others.forgetLoginPassword.button2')}}</Button>
				   </li>
				</ul>
				<ul class="ul forget-third" v-show="step_this=='3'">
				   <li class="success">
					  <i class="success-icon"></i>
				   </li>
				   <li class="success">
					   <p class="success-lb">{{$t('others.forgetLoginPassword.success')}}</p>
				   </li>
				</ul>
			</div>
			<div class="forget-remark" v-show="step_this!='3'">
				<p>{{$t('others.forgetLoginPassword.remark.title')}}</p>
			   	<p>{{remark1}}</p>
			   	<p>{{remark2}}</p>
			</div>
		</section>
	</div>
</template>

<script>
import {getCode,getEmail,forgetPassword} from '@api/api_group';
import md5 from '@common/assets/js/md5.js';
import eventBus from '@common/eventBus/eventBus';
import {Button,Input,Select,Option,Spin,Notice,Message} from 'iview';

export default {
    data() {
        return {
			step_this : `1`,
			code:``,
			country:`86`,
			verifyType:`1`,
			codeText:this.$t('others.forgetLoginPassword.cnt.codeText1'),
			send_text:this.$t('others.forgetLoginPassword.cnt.sendText'),
			newPassword:``,
			againNewPassword:``,
			remark1: this.$t('others.forgetLoginPassword.remark.para1_1'),
			remark2: this.$t('others.forgetLoginPassword.remark.para2_1'),
			email:"",
			phone:"",
			isSend:true,
			time:120,
			interval : "",
			convertingFont: false
        };
    },
    created() {
		document.body.style.backgroundColor="#F6F6FB";
		document.title = this.$t('others.forgetLoginPassword.pageTitle');
		eventBus.$on('convertFont', () => {
			document.title = this.$t('others.forgetLoginPassword.pageTitle');
			this.convertingFont = true;
			setTimeout(() => {
				this.convertingFont = false;
			}, 100);
		});
	},
	
	updated(){
        let _this = this;
		if(_this.step_this == "1"){//第一步
			 _this.remark1 = this.$t('others.forgetLoginPassword.remark.para1_1');
			 _this.remark2 = this.$t('others.forgetLoginPassword.remark.para2_1');
		}else{//第二步
             _this.remark1 = this.$t('others.forgetLoginPassword.remark.para1_2');
			 _this.remark2 = this.$t('others.forgetLoginPassword.remark.para2_2')
		}
	},
    mounted () {
		this.$nextTick(() => {
			if (this.globalFun.mobileCheck()) {
				let h = document.documentElement.clientHeight - 78 - 344;
				this.$refs.container.setAttribute('style', `min-height:${h}px;`);
			}
		});	
		
		// this.$parent.setIsLogin();
		this.$parent.setTip(this.$t('others.forgetLoginPassword.pageTitle'));
	},
    methods: {
		verifyChange:function(){
            let _this = this;
	    	if(_this.verifyType == "1"){//手机验证
	        	_this.codeText = this.$t('others.forgetLoginPassword.cnt.codeText1');
				_this.isSend=true;
				_this.time=120,
				clearInterval(_this.interval);
				_this.send_text = this.$t('others.forgetLoginPassword.cnt.sendText');
				document.getElementsByClassName("sendCode")[0].disabled = '';
			}else{//邮箱验证
		    	_this.codeText = this.$t('others.forgetLoginPassword.cnt.codeText2');
				_this.isSend=true;
				_this.time=120,
				clearInterval(_this.interval);
				_this.send_text = this.$t('others.forgetLoginPassword.cnt.sendText');
				document.getElementsByClassName("sendCode")[0].disabled = '';
			}
		},
		sendCode:function(){
			let _this = this;
			if(_this.verifyType == "1"){ //手机号验证
				_this.getPhoneCode();
			}else{ //邮箱验证
				_this.getEmailCode();
			}
		},
		getPhoneCode:function(){//获取手机验证码
			let _this = this;
			if(_this.isSend == true){
				if(_this.phone.trim() == ""){
					let config = {
						title: this.$t('others.forgetLoginPassword.alertMes.mes1')
					}
					Notice.error(config)
					return;
				}
				let params = {
					phone:_this.phone,
					type:3,
					countryCode:_this.country
				}
				Spin.show();
				getCode(params).then((res) => {
					Spin.hide();
					if (res.success) {
						Message.success(this.$t('others.forgetLoginPassword.alertMes.sendCodeSuccess'))
						_this.countDown();
					}else{
						_this.send_text = res.data + this.$t('others.forgetLoginPassword.cnt.timeAfterReset');
						_this.time = res.data;
						_this.countDown();
					}
				});
			}
		},
		getEmailCode:function(){//获取邮箱验证码
			let _this = this;
			if(_this.isSend == true){
				if(_this.email.trim() == ""){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes2')
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
						Message.success(this.$t('others.forgetLoginPassword.alertMes.sendCodeSuccess'))
						_this.countDown();
					}else{
						_this.send_text = res.data + this.$t('others.forgetLoginPassword.cnt.timeAfterReset');
						_this.time = res.data;
						_this.countDown();
					}
				});
			}
		},
		countDown:function(){//进入倒计时
			let _this = this;
			_this.isSend = false;
			document.getElementsByClassName("sendCode")[0].disabled = 'disabled';
			_this.interval = setInterval(function() {
				_this.time--;
				_this.send_text = _this.time + _this.$t('others.forgetLoginPassword.cnt.timeAfterReset');
				if (_this.time == 0) {
					document.getElementsByClassName("sendCode")[0].disabled = '';
					_this.send_text = _this.$t('others.forgetLoginPassword.cnt.sendText');
					_this.isSend = true;
					_this.time = 120;
					clearInterval(_this.interval);
				}
			}, 1000);
		},
		submit:function(val){
			let _this = this;
			if(val == '1'){
				if(_this.phone.trim() == ""){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes1')
					}
					Notice.error(config)
					return false;
				}
				if(_this.code.trim() == ""){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes3')
					}
					Notice.error(config)
					return false;
				}
				_this.step_this = '2';
			}else{
				if(_this.newPassword.trim() == ""){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes4')
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
				if(_this.againNewPassword.trim() == ""){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes6')
					}
					Notice.error(config)
					return false;
				}
				if(_this.againNewPassword.trim()!=_this.newPassword.trim()){
					let config = {
						title:this.$t('others.forgetLoginPassword.alertMes.mes7')
					}
					Notice.error(config)
					return false;
				}
				let params = {
				password:md5(_this.againNewPassword).toLowerCase(),
				type:3,
				captcha:_this.code,
				phone:_this.phone,
				countryCode:_this.country
				}
				Spin.show();
				forgetPassword(params).then((res) => {
					Spin.hide();
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
     components: {
	 	Button,
		Input,
		Select,
		Option
    }
}
</script>

<style lang="scss"  scoped="scoped">
.header-outer {
	width: 100%;
	z-index: 9999;
	display: flex;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0px;
	z-index: 9999;
}
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
	.forget-title{
		display: flex;
		font-size: 22px;
		line-height: 22px;
		font-weight: 550;
		color: #333333;
		i{
			width: 10px;
			height: 10px;
			background-color: #ff8a00;
			border-radius: 50%;
			display: -webkit-inline-box;
			display: -ms-inline-flexbox;
			display: inline-flex;
			vertical-align: top;
			margin: 8px 8px 0 0;
		}
	}
	.step-contain{
		padding-top:20px;
		width:80%;
		margin:0 auto;
		.step{
			display: inline-block;
			text-align: center;
			width:32%;
			.step2{
				margin:0 auto;
				display: block;
				width:36px;
				height: 36px;
				background: url('../../../common/assets/images/step2.png') no-repeat center;
				background-size: 36px 36px;
			}
			.step3{
					margin:0 auto;
					display: block;
					width:36px;
					height: 36px;
					background: url('../../../common/assets/images/step3.png') no-repeat center;
					background-size: 36px 36px;
			}
			.stepNow{
					margin:0 auto;
					display: block;
					width:36px;
					height: 36px;
					background: url('../../../common/assets/images/step_now.png') no-repeat center;
					background-size: 36px 36px;
			}
			span{
				display: inline-block;
				margin-top:15px;
				color:#999999;
				font-size:15px;
			}
			.stepColor{
				color:#333333;
			}
		}
	}
	//进度显示
	.setp-nav{
		margin: 24px 0 80px 0;
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
	.ivu-input{
		height: 40px;
		line-height: 38px;
		padding: 0 7px;
		border: 1px solid #ddd;
	}
	.ivu-btn {
		border:1px solid #ff8a00;
		background-color: #ff8a00;		
		height: 38px;
		// margin-left: 103px;
		margin-top:24px;
		font-size: 16px;
	}
	.forget-body{
		margin-top:40px;
		width:100%;
		// height: 380px;
		.ul{
			// padding:30px 40px;
			font-size:16px;
			color:#333333;
			.li{
				margin-top:26px;
				display: flex;
				align-items: center;
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
				span{
					display: inline-block;
					width:100px;
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
					margin-right: 5px;
				}
				.common-width{
					width: 410px;
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
                    width:59px;
                    height: 68px;
                    background: url('../../../common/assets/images/update_success.png') no-repeat center;
                    background-size: 59px 68px;
				}
				.success-lb{
					padding: 0 0 228px 0;
				}
			}
		}
	}
	.forget-remark{
		padding:50px 0 0 0;
		p{
			font-size:12px;
			color:#999;
			margin-top:5px;
		}
	}
}
.ENG{
	.forget-body{
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
	.ivu-input-type .ivu-input:hover {
		border-color: #00b38a;
	}
	.ivu-input-type .ivu-input:focus {
		border-color: #00b38a;
	}
	.ivu-select-single .ivu-select-selection{
		height: 40px;
	}
	.ivu-select-selected-value{
		line-height: 38px !important;
	}
</style>