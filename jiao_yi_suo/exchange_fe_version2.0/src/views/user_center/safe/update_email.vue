<template>
    <section class="user-center">
       <!-- 修改手机号 -->
       <div class="safe-setting">
          <p class="safe-title">安全中心</P>
          <div class="safe-setting-list">
              <span class="user-name">修改手机号</span>
              <div class="step-contain">
                <span class="step">
                    <i class="stepNow" ></i>
                    <span class="stepColor">解绑现有邮箱</span>
                </span>
                <span class="step">
                    <i class="step2" v-bind:class="{stepNow:step_this>='2'}"></i>
                    <span v-bind:class="{stepColor:step_this>='2'}">绑定新邮箱</span>
                </span>
                <span class="step">
                    <i class="step3" v-bind:class="{stepNow:step_this>='3'}"></i>
                    <span v-bind:class="{stepColor:step_this>='3'}">修改成功</span>
                </span>
              </div>
              <!-- 第一步 -->
              <div v-show="step_this == '1'">
                <p class="li">
                    <span>原电子邮箱</span>
                    <span><label>{{oldEmail}}</label></span>
                </p>
                <p class="btn">
                    <span><Button type="success" @click="submit('1')" style="width:300px">发送验证码</Button></span>
                </p>
              </div>
              <!-- 第二步 -->
              <div v-show="step_this == '2'">
                <p class="li">
                    <span>原邮箱验证码</span>
                    <span><Input v-model="oldCode" placeholder="请输入原邮箱验证码" style="width: 300px;"></Input></span>
                </p>
                <p class="li">
                    <span>新电子邮箱</span>
                    <span><Input v-model="newEmail" placeholder="请输入新电子邮箱" style="width: 300px;"></Input></span>
                </p>
                <p class="li">
                        <span>邮箱验证码</span>
                        <span><Input v-model="newCode" placeholder="请输入验证码" style="width: 200px;"></Input></span>
                        <Button type="ghost" class="sendCode"  @click="sendCode()">{{send_text}}</Button>
                </p>
                <p class="btn">
                    <span><Button type="success" @click="submit('2')" style="width:300px">立即绑定</Button></span>
                </p>
              </div>
              <!-- 第三步 -->
              <div v-show="step_this == '3'">
                  <p class="li">
                    <span>新电子邮箱</span>
                    <span><label>{{newEmail}}（已绑定）3s后返回</label></span>
                </p>
              </div>
          </div>
          <div class="setPayRemark" v-show="step_this!=3">
              <span class="remark-title">修改电子邮箱须知</span>
              <ul v-show="step_this==1">
                  <li>获取原电子邮箱验证码</li>
                  <li>点击发送验证码</li>
              </ul>
              <ul v-show="step_this==2">
                  <li>输入新电子邮箱，获取验证码</li>
                  <li>点击立即绑定</li>
              </ul>
          </div>
       </div>
    </section>
</template>

<script>
    import { getEmail ,updateEmail} from '@api/api_group'; 
    export default {
        data() {
            return {
              step_this : "1",
              oldEmail : "",
              isSend:true,
              send_text:"发送验证码",
              time:120,
              oldCode:"",
              newEmail:"",
              newCode:"",
            }
        },
        updated(){
            let _this = this;
           if(this.step_this == '1'){
                
           }else{
                 
           }
        },
        created() {
            let _this = this;
             _this.oldEmail = this.$route.query.email;
          
        },
        methods: {
           sendCode:function(){
              let _this = this;
                  if(_this.isSend == true){
                      if(_this.newEmail.trim() == ''){
                         let config = {
							title:"请输入新电子邮箱"
						}
						this.$Notice.error(config)
                        return;
                       }
				        let params = {
                            email:_this.newEmail
                        }
                        _this.$Spin.show();
                        getEmail(params).then((res) => {
                            _this.$Spin.hide();
                            if (res.success) {
                            this.$Message.success(this.$t('userCenter.safe.modal.sendSuccess'))
                            _this.isSend = false;
                                document.getElementsByClassName("sendCode")[0].disabled = 'disabled';
                                let interval = setInterval(()=> {
                                    _this.time--;
                                    _this.send_text = _this.time + '秒后重试';
                                    if (_this.time == 0) {
                                        document.getElementsByClassName("sendCode")[0].disabled = '';
                                        _this.send_text = this.$t('userCenter.safe.modal.senText');
                                        _this.isSend = true;
                                        _this.time = 120;
                                        clearInterval(interval);
                                    }
                                }, 1000);
                            }
                        });
             }
          },
          bindNewEmail:function(){
               let _this = this;
               let params = {
                     newEmail:_this.newEmail,
                     oldCaptcha:_this.oldCode,
                     newCaptcha:_this.newCode
                  }
                  _this.$Spin.show();
				  updateEmail(params).then((res) => {
                      _this.$Spin.hide();
				 	if(res.success) {
                        _this.step_this = '3';
                        setTimeout(()=>{
                           window.location.href="./user_center.html"
                        },3000)
				    }
				 }); 
          },
          submit:function(val){
              let _this = this;
              if(val == '1'){ //第一步
                 let params = {
					 email:_this.oldEmail
                  }
                  _this.$Spin.show();
				  getEmail(params).then((res) => {
                      _this.$Spin.hide();
				 	if(res.success) {
                        _this.step_this = '2';
				    }
				 });  
              }else{//第二步
               if(_this.oldCode == ""){
                  let config = {
                        title:"请输入原邮箱验证码"
                    }
                    this.$Notice.error(config)
               }
                else if(_this.newEmail.trim()==''){
                     let config = {
							title:"请输入新电子邮箱"
						}
						this.$Notice.error(config)
                 }
                 else if(_this.newCode.trim() == ''){
                        let config = {
							title:"请输入验证码"
						}
						this.$Notice.error(config)
                 }else{
                     _this.bindNewEmail();
                 }
              }
          }
        }
    }
</script>

<style lang="scss" scoped="scoped">
 .user-center{
     background-color: #ffffff;
     width:1000px;
     .safe-setting{
         height:800px;
         //标题
       .safe-title{
           border-bottom: 1px solid #f8f9fb;
           font-size: 20px;
           font-weight: 550;
           color:#333333;
           padding:15px 35px;
       }
       // 设置列表
       .safe-setting-list{
          .user-name{
                display: inline-block;
                font-size: 18px;
                color:#333333;
                padding:20px 35px;
          }
           .step-contain{
              width:80%;
              margin:30px auto;
            .step{
                display: inline-block;
                text-align: center;
                width:32%;
                .step2{
                        margin:0 auto;
                        display: block;
                        width:36px;
                        height: 36px;
                        background: url('./../../../common/assets/images/step2.png') no-repeat center;
                        background-size: 36px 36px;
                }
                .step3{
                        margin:0 auto;
                        display: block;
                        width:36px;
                        height: 36px;
                        background: url('./../../../common/assets/images/step3.png') no-repeat center;
                        background-size: 36px 36px;
                }
                .stepNow{
                        margin:0 auto;
                        display: block;
                        width:36px;
                        height: 36px;
                        background: url('./../../../common/assets/images/step_now.png') no-repeat center;
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
          .li{
             font-size:16px;
             padding:20px 160px;
             span:nth-child(1){
                display: inline-block;
                width:100px;
                color:#999999;
            }
             span:nth-child(2){
                display: inline-block;
                margin-left:20px;
                color:#333333;
            }
            label{
                color:#00b38a;
            }
            .sendCode{
                color:#00b38a;
                margin-left:3px;
                width:92px;
                text-align: center;
                &:hover{
                    border-color:#00b38a;
                }
            }
          }
          .success{
				  margin-top:60px;
				  text-align: center;
                  font-size:16px;
                   .success-icon{
						position: relative;
						top:8px;
                        margin-right:10px;
                        display: inline-block;
                        width:36px;
                        height: 36px;
                        background: url('./../../../common/assets/images/step_now.png') no-repeat center;
                        background-size: 36px 36px;
                     }
			    }
          .btn{
              margin-top:30px;
              padding-left:283px;
          }
       }
       .setPayRemark{
           margin:40px 160px;
           .remark-title{
               font-size:14px;
               color:#00b38a;
           }
            li{
              list-style:disc;
              font-size:14px;
              color:#666666;
              margin-top:10px;
            }
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
    .ivu-btn-success{
     font-size:16px;
     width:120px;
     padding:3px;
 }
</style>

