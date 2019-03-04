<template>
    <div class="registerGift">
        <img src="../../../../common/assets/images/spread/login-bg.png" alt="">
        <div class="title">注册成功后转赠给TA吧！</div>
        <div class="ipt">
            <div>
                <i class="phone"></i>
                <div class="col">
                    <input type="text" v-model="params.phone" maxlength="11" placeholder="请输入手机号码">
                </div>
            </div>
             <div>
                <i class="vercode"></i>
                <div class="col">
                    <div class="row">
                        <input class="col" type="text" v-model="params.captchaCode" placeholder="请输入服务密码">
                        <div class="code" v-if="!code.is" @click="getCode">获取验证码</div>
                        <div class="code" v-if="code.is">{{code.time}}s</div>
                    </div>
                </div>
                
            </div>
            <div>
                <i class="pwd"></i>
                <div class="col">
                    <input type="password" v-model="params.password" placeholder="请输入6-12位数密码">
                </div>
            </div>
            <div>
                <i class="pwd"></i>
                <div class="col">
                    <input type="password" v-model="params.passwordAgain" placeholder="再次输入密码">
                </div>
            </div>
            <div class="agreement">
                <input type="checkbox" id="cb" v-model="isCheck"><label for="cb">阅读 <a>《用户协议》</a></label>
            </div>
            <div class="btn">
                <div @click="submit">立即注册</div>
            </div>
        </div>
        <div class="login">
            已有账号,<a @click="goLogin">登录领取</a>
        </div>
        <div class="tip">
            <p>注册下载APP，登录APP，进入“个人中心”-“礼品”，</p>
            <p>查看收到的礼品，并及时补全收货信息，方便我们及时为您发货！</p>
        </div>
    </div>
    
</template>
<script>
    import { getCode,login,register } from '@api/api_user';
    import { giftGather } from '@api/api_gift';
	import {Toast,MessageBox,Indicator} from 'mint-ui';
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
                query:{}
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
            this.query = this.$route.query;
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
                Indicator.open();
                register(params).then(res=>{
                    if(res.code == 200){
                        if(this.query.type==1){
                            Indicator.close();
                            this.$router.push({
                                path:"/success?flag=2&name="+this.query.name+"&id="+this.query.id,
                            })
                        }else{
                            this.login();
                        }
                    }else{
                        Indicator.close();
                    }
                })
            },
            login(){
                login({
                    phone: this.params.phone,
                    password: this.globalFun.md5(this.params.password)
                }).then(res=>{
                    if(res.code == 200){
                        sessionStorage.setItem("token",res.data.token);
                        this.giftGather();
                    }else{
                        Indicator.close();
                    }
                })
            },
            giftGather(){
                giftGather({
                    giftId: this.query.id
                }).then(res=>{
                    Indicator.close();
                    if(res.code == 200){
                        if(res.data == 1401){
                            this.$router.push({
                                path:"/success?flag=4",
                            })
                        }else{
                            this.$router.push({
                                path:"/success?flag=3",
                            })
                        }
                    }
                })
            },
            goLogin(){
                var url = "/login";
                if(this.query.name){
                    url += "?name="+this.query.name+"&id="+this.query.id+"&type="+this.query.type;
                }
                this.$router.push({
                    path:url,
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
</style>