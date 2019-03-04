<template>
    <div class="login">
        <img src="../../../../common/assets/images/spread/login-bg.png" alt="">
        <div class="title">登录成功后赠送给TA吧！</div>
        <div class="ipt">
            <div>
                <i class="phone"></i>
                <div class="col">
                    <input type="text" v-model="params.phone" maxlength="11" placeholder="请输入手机号码">
                </div>
            </div>
            <div>
                <i class="pwd"></i>
                <div class="col">
                    <input type="password" v-model="params.password" placeholder="请输入登录密码">
                </div>
            </div>
            <div class="btn">
                <div @click="login">登录</div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import { login } from '@api/api_user';
    import { giftGather } from '@api/api_gift';
	import {Toast,MessageBox,Indicator} from 'mint-ui';
	export default {        
		data() {
			return {
                params:{
                    phone: "",
                    password: ""
                },
                query:{}
			}
		},
		created() {
            document.title = "登录";
        },
        mounted(){
            this.query = this.$route.query;
        },
		methods: {
            login(){
                if(!this.params.phone){
                    Toast('请输入手机号');
                    return false;
                }
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if(!myreg.test(this.params.phone)){ 
                    Toast('手机格式不正确');
                    return false;
                }
                if(!this.params.password){
                    Toast('请输入密码');
                    return false;
                }
                Indicator.open();
                login({
                    phone: this.params.phone,
                    password: this.globalFun.md5(this.params.password)
                }).then(res=>{
                    if(res.code == 200){
                        sessionStorage.setItem("token",res.data.token);
                        if(this.query.type==1){
                            Indicator.close();
                            this.$router.push({
                                path:"/success?flag=1&name="+this.query.name+"&id="+this.query.id,
                            })
                        }else{
                            this.giftGather();
                        }
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
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
</style>