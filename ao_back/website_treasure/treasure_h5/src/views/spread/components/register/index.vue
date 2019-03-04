<template>
	<div class="register">
        <div class="bg">
            <img src="../../../../common/assets/images/spread/register-bg1.png" alt="">
            <img src="../../../../common/assets/images/spread/register-bg2.png" alt="">
            <img src="../../../../common/assets/images/spread/register-bg3.png" alt="">
        </div>
        
            
        <div class="cnt">
            <div>
                <div class="register-btn" @click="btn"></div>
            </div>
            <div class="block">
                <div class="title">注册</div>
                <div class="ipt"><i class="phone"></i><input class="col" v-model="params.phone" type="text" maxlength="11" placeholder="请输入手机号"></div>
                <div class="ipt">
                    <i class="vercode"></i><input class="col"  v-model="params.captchaCode" type="text" maxlength="6" placeholder="请输入手机验证码">
                    <div class="code" v-if="!code.is" @click="getCode">获取验证码</div>
                    <div class="code" v-if="code.is">{{code.time}}s</div>
                </div>
                <div class="ipt"><i class="pwd"></i><input v-model="params.password" class="col" type="password" maxlength="12" placeholder="请输入6-12位数密码"></div>
                <div class="ipt"><i class="pwd"></i><input class="col" v-model="params.passwordAgain" type="password" maxlength="12" placeholder="再次输入密码"></div>
                <div class="agreement">
                    <input type="checkbox" id="cb" v-model="isCheck"><label for="cb">阅读 <a>《用户协议》</a></label>
                </div>
                <div>
                    <div class="btn" @click="submit">立即注册</div>
                </div>
            </div>
            
            <div class="tip">
                <p>1.区块链溯源体系</p>
                <p>2.追溯区块链的前世今生</p>
                <p>3.真正的token当钱花</p>
                <p>4.通证全平台流通</p>
                <p>5.平台购物，邀请好友，每日签到，创建个人资产钱包完成劳动都可以获取token，商品更有惊喜价格!</p>
                <p>6.token可随时兑换通证提现</p>
            </div>
            
        </div>
        
		
	</div>
</template>

<script>
	import { getCode,register } from '@api/api_user';
	import {Toast,MessageBox} from 'mint-ui';
	export default {        
		data() {
			return {
                params:{
                    phone:"",
                    password:"",
                    captchaCode: "",
                    parentId: ""
                },
                isCheck: true,
                code:{
                    is: false,
                    time: 60
                },
			}
		},
		created() {
            this.params.parentId = this.$route.query.parentId || '';
            window.addEventListener("resize", function() {
                if(document.activeElement.tagName == "INPUT") {
                    window.setTimeout(function() {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            })
            window.scrollTo(0,0);
            document.title = "澳绿宝区块链溯源商城";
        },
        mounted(){
            
        },
		methods: {
            getCode(){
                if(!this.params.phone){
                    Toast('请输入手机号');
                    return false;
                }
                getCode({
                    phone: this.params.phone
                }).then(res=>{
                    var code = res.code;
                    if(code == 200){
                        Toast({message: "发送成功"});
                        this.countdown();
                    }else{
                        Toast({message: res.desc});
                    }
                })
            },
            countdown(){
                let _this = this;
                this.code.is = true;
				var interval = setInterval(function(){
					if(_this.code.time<1){
                        _this.code.is = false;
                        clearInterval(interval);
						return false;
					}
					_this.code.time -= 1; 
				},1000);
            },
            btn(){
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let total = 400;
                let step = total / 50
                smoothDown()
                function smoothDown(){
                    if (distance < total) {
                        distance += step
        　　　　　　　   document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        setTimeout(smoothDown, 5)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                    }
                }
                
            },
            register(){
                
            },
            submit(){
                if(!this.params.phone){
                    Toast('请输入手机号');
                    return false;
                }
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(!myreg.test(this.params.phone)){ 
                    Toast('手机格式不正确');
                    return false;
                }
                if(!this.params.captchaCode){
                    Toast('请输入手机验证码');
                    return false;
                }
                if(!this.params.password){
                    Toast('请输入密码');
                    return false;
                }
                if(this.params.password.length<6){
                    Toast('请输入6-12位数密码');
                    return false;
                }
                if(!this.params.passwordAgain){
                    Toast('请再次输入密码');
                    return false;
                }
                if(this.params.password!=this.params.passwordAgain){
                    Toast('两次输入密码不一致');
                    return false;
                }
                if(!this.isCheck){
                    Toast('请选择阅读《用户协议》');
                    return false;
                }
                var params = JSON.parse(JSON.stringify(this.params));
                params.password = this.globalFun.md5(params.password);
                
                if(this.params.parentId){
                    params.parentId = this.params.parentId;
                }
                register(params).then(res=>{
                    if(res.code == 200){
                        this.$router.push({
                            path:"/register/load",
                        })
                    }
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
</style>


