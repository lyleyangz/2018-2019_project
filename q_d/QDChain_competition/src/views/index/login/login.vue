<template>
<div class="login">
    <div class="login-wrapping-layer">
        <div class="login-title">
            <div class="login-logo">

            </div>
            <div class="login-text">
                <span>欢迎登录</span>
                <span>权盾链</span>
                <sub class="circle-span">
                    <span></span>
                </sub>
            </div>
        </div>
        <!-- <div class="clear-fix"></div> -->
        <div class="login-form">
            <div class="login-list">
                <div class="phone-login">
                    <Icon type="android-phone-portrait" size="23"></Icon>
                    <input type="text" v-model.trim="loginData.phoneNumer" placeholder="请输入手机号" @blur="blurCode()" minlength="11">
                </div>
                <div class="password-login">
                    <Icon type="android-lock" size="23"></Icon>
                    <input type="password" v-model.trim="loginData.passWord" placeholder="请输入登录密码">
                </div>
                <div class="VerificationCode-login">
                    <Icon type="ios-compose" size="23"></Icon>
                    <input type="text" v-model.trim="loginData.VerificationCode" placeholder="请输入验证码">
                    <span class="put-VerificationCode" @click="refreshImg()">
                        <!-- 放验证码的 -->
                        <img :src="getVerificationCode" alt="">
                    </span>
                </div>
            </div>
            <div class="login-btn">
                <Button :loading="submitLogin" @click="login()">
                    <span v-if="!submitLogin">登录</span>
                    <span v-else>登录中...</span>
                </Button>
            </div>
            <div class="to-register-btn">
                <Button :loading="toRegisterBtn" @click="toRegister()">
                    <span v-if="!toRegisterBtn">申请为原创者</span>
                    <span v-else>跳转中...</span>
                </Button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {getImgCode,Login} from "../../../api/api_group.js";
import md5 from '@/common/assets/js/md5.js';
export default {
  data() {
    return {
      // 缓冲按钮
      submitLogin: false,
      // 表单数据
      loginData: {
        phoneNumer: "",
        passWord: "",
        VerificationCode: ""
      },
    //   获取的图片验证码
    getVerificationCode:'',
      //   提交缓冲
      submitLogin: false,
      // 跳转注册缓冲
      toRegisterBtn: false,
      timer:null
    };
  },
  created() {},
  mounted() {
     getImgCode().then((res)=> {
         if(res.success && res.data){
             this.getVerificationCode = `data:image/jpeg;base64,${res.data}`
         }
     })
  },
  methods: {
      blurCode(){
          let params = {
              phone:this.loginData.phoneNumer
          }
          getImgCode(params).then(res => {
        if (res.success && res.data) {
          this.getVerificationCode = `data:image/jpeg;base64,${res.data}`;
        }
      });
      },
    //   更换图片验证码
    refreshImg(){
        if(this.loginData.phoneNumer){
            let params = {
              phone:this.loginData.phoneNumer
          }
            getImgCode(params).then((res)=> {
             if(res.success && res.data){
                 this.getVerificationCode = `data:image/jpeg;base64,${res.data}`
                }
            })
        }else{
            this.$Notice.warning({
                title:'手机号不能为空！'
            })
        }
    },
    // 登录
    login(){
        let params = {
            phone:this.loginData.phoneNumer,
            password:  md5(this.loginData.passWord),
            imgCode:this.loginData.VerificationCode
        }
        Login(params).then((res)=> {
            if(res.success){
                localStorage.setItem(
                'COM_systemLoginKey' , res.data.systemLoginKey,
                );
                sessionStorage.setItem('USER_STATUS', res.data.status);
                sessionStorage.setItem('QDL_isLogin', true);
                this.$Notice.success({
                    title:"登录成功！"
                })
                this.$router.push({path:'/homepage'})
            }else{
                this.refreshImg()
            }
        })
    },
    // 跳转注册页面
    toRegister(){
        this.toRegisterBtn = true;
        this.timer = setTimeout(() => {
            this.$router.push({path:"/header/registerRouter"})
        },1000)
    }
  }
};
</script>
<style lang="scss" scpoed>
.login {
  height: 1080px;
  width: 100%;
  background: url("../../../common/assets/images/loginbackground.jpg") center
    center;
  background-size: cover;
  .login-wrapping-layer {
    position: absolute;
    .login-title {
      text-align: center;
      margin-bottom: 68px;
      .login-text {
        display: inline-block;
        .circle-span {
          span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ff845f;
          }
        }
      }
      .login-text :nth-child(1) {
        color: #768dc9;
        font-size: 36px;
        font-weight: bold;
        font-family: "MicrosoftYahei";
      }
      .login-text :nth-child(2) {
        color: #1c2e67;
        font-size: 36px;
        font-weight: bold;
        font-family: "MicrosoftYahei";
        margin: 0px 8px 0px 12px;
      }
      .login-logo {
        margin: 74px 0px 180px 293px;
        background: url("../../../common/assets/images/loginlogo.png") center
          center no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
      }
    }
    .login-form {
      position: relative;
      width: 600px;
      margin-left: 293px;
      .login-list {
        .ivu-icon {
          vertical-align: middle;
        }
        .phone-login {
        }
        .password-login {
          margin: 42px 0px;
        }
        .VerificationCode-login {
          .put-VerificationCode {
            width: 100px;
            height: 36px;
            display: inline-block;
            vertical-align: middle;
            position: absolute;
            left: 270px;
            cursor: pointer;
            img{
                width: 100px;
            height: 36px;
            }
          }
        }
        input {
          width: 366px;
          height: 36px;
          outline: none;
          border: 0;
          border-bottom: 1px solid #dddddd;
          padding-left: 18px;
          line-height: 36px;
        }
      }
      .login-btn {
        margin-top: 54px;
        button {
          width: 366px;
          height: 40px;
          background-color: #1c2e67;
          color: #ffffff;
          font-family: 'MicrosoftYahei';
          font-size: 16px;
        }
      }
      .to-register-btn {
        position: absolute;
        left: 245px;
        margin-top: 18px;
        button{
            border: none;
            outline: none;
            background-color: transparent;
            color:#768dc9;
            font-size: 16px;
            font-family: "MicrosoftYahei";
        }
      }
    }
  }
}
</style>

