<template>
    <div class="register">
        <div class="register-step">
            <Steps :current="current">
                <Step title="手机号码注册"></Step>
                <Step title="提交认证信息"></Step>
                <Step title="上传证件照片"></Step>
                <Step title="提交账号信息"></Step>
            </Steps>
        </div>
        <div class="register-step-one" v-show="current === 0">
            <div class="step-one-phone">
                <label>手机号码</label>
                <input class="input" v-model.trim="phoneRegister.phone" type="text" placeholder="请输入注册手机号码" @blur="blurCode()" minlength="11">
            </div>
            <div class="step-one-phonecode">
                <label>手机验证码</label>
                <input class="input" v-model.trim="phoneRegister.phonecode" type="text" placeholder="" maxlength="6">
                <Button type="primary" :loading="getPhoneCodeBol" size="large" @click="getPhoneCode()">
                    <span v-if="!getPhoneCodeBol">获取验证码</span>
                    <span v-else v-model="phonecodeTime">{{phonecodeTime}}s</span>
                </Button>
            </div>
            <div class="step-one-imgcode">
                <label>图形验证码</label>
                <input class="input" v-model.trim="phoneRegister.imgCode" type="text" placeholder="">
                <span class="step-one-getimgcode" @click="refreshImg()">
                    <!-- 一张图片验证码 -->
                    <img :src="getVerificationCode" alt="">
                </span>
            </div>
            <div class="step-one-password">
                <label>登录密码</label>
                <input class="input" v-model.trim="phoneRegister.password" type="password" placeholder="请输入8-20位密码" minlength="6">
            </div>
            <div class="step-one-issurepassword">
                <label>确认密码</label>
                <input class="input" v-model.trim="phoneRegister.issurepassword" type="password" placeholder="请输入8-20位密码">
            </div>
        </div>
        <div class="register-step-two" v-show="current === 1">
            <Tabs type="card"  @on-click="clickStepTwoTab">
                <TabPane v-model="value" label="个人" name="person">
                    <div class="register-step-two-per">
                        <div class="register-step-two-per-realname">
                            <label>真实姓名</label>
                            <input class="input" v-model.trim="submittingInformation.realname" type="text" placeholder="请输入姓名" maxlength="10">
                        </div>
                        <div class="register-step-two-per-id">
                            <label>身份证号码</label>
                            <input class="input" v-model.trim="submittingInformation.IDcardNo" type="text" placeholder="请输入身份证号码" maxlength="18">
                        </div>
                    </div>
                </TabPane>
                <TabPane v-model="value" label="公司" name="company">
                    <div class="register-step-two-company">
                        <div class="register-step-two-company-name">
                            <label>公司名称</label>
                            <input class="input" v-model.trim="submittingInformation.companyname" type="text" placeholder="请输入公司名称" maxlength="50">
                        </div>
                        <div class="register-step-two-company-id">
                            <label>工商执照注册号</label>
                            <input class="input" v-model.trim="submittingInformation.companyID" type="text" placeholder="请输入工商注册号" maxlength="18">
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div class="register-step-three" v-show="current === 2">
            <Tabs type="card"  @on-click="clickStepID">
                <TabPane v-model="value" label="个人" name="personID">
                    <div class="register-step-three-uploadIDF">
                        <div class="register-step-three-uploadID-text">
                            身份证正面照
                        </div>
                        <div class="register-step-three-uploadID-warn">
                            <span></span>
                            <span>上传图片以便于今后的维权</span>
                        </div>
                        <label id="labelrF" class="register-step-three-uploadID-show" for="pop_img1" v-if="!fileUpload.FacadeIDcard">
                            <div class="put-imgIDF"></div>
                        </label>
                        <label id="labelrF" class="register-step-three-uploadID-show" for="pop_img1" v-if="fileUpload.FacadeIDcard">
                            <div class="put-imgIDF"></div>
                             <span>从新选择图片</span>
                             <img :src="fileUpload.FacadeIDcard">
                        </label>
                        <div class="upload-fontID">
                            <input :style="{display:'none'}" id="pop_img1" type="file" @change="uploadFile($event,'1')" ref="file" />
                        </div>
                    </div>  
                    <div class="register-step-three-uploadIDB">
                        <div class="register-step-three-uploadID-text">
                            身份证反面照
                        </div>
                        <label id="labelrB" class="register-step-three-uploadID-show" for="pop_img2" v-if="!fileUpload.ReverseIDcard">
                            <div class="put-imgIDB"></div>
                        </label>
                        <label id="labelrB" class="register-step-three-uploadID-show" for="pop_img2" v-if="fileUpload.ReverseIDcard">
                            <div class="put-imgIDB"></div>
                            <span>从新选择图片</span>
                            <img :src="fileUpload.ReverseIDcard">
                        </label>
                        <div class="upload-fontID">
                            <input :style="{display:'none'}" id="pop_img2" type="file" @change="uploadFile($event,'2')" ref="file" />
                        </div>
                    </div>
                </TabPane>
                <TabPane v-model="value" label="公司" name="companyID">
                    <div class="register-step-three-uploadcompany">
                        <div class="register-step-three-uploadcompany-text">
                            营业执照
                        </div>
                        <div class="register-step-three-uploadcompany-warn">
                            <span></span>
                            <span>上传图片以便于今后的维权</span>
                        </div>
                        <label id="labelrC" class="register-step-three-uploadcompany-show" for="pop_img3" v-if="!fileUpload.companyImag">
                            <div class="put-imgcompany"></div>
                        </label>
                        <label id="labelrC" class="register-step-three-uploadcompany-show" for="pop_img3" v-if="fileUpload.companyImag">
                            <div class="put-imgcompany"></div>
                            <span>从新选择图片</span>
                            <img :src="fileUpload.companyImag">
                        </label>
                        <div class="upload-fontcompany">
                            <input :style="{display:'none'}" id="pop_img3" type="file" @change="uploadFile($event,'3')" ref="file" />
                        </div>
                    </div>
                </TabPane>
            </Tabs>       
        </div>
        <div class="register-step-four"v-show="current === 3">
            <div class="register-step-four-per">
                <div class="register-step-four-select-warn">
                            <span></span>
                            <span>请提交个人/公司名下权重最高的自媒体账号，以便通过审核</span>
                        </div>
                <div class="register-step-four-per-option">
                    <label>发布平台：</label>
                    <Select v-model="stepFourData.model1" style="width:410px;display:inline-bolck">
                        <Option v-for="item in stepFourData.cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="register-step-four-per-name">
                    <label>账号名称：</label>
                    <input class="input" v-model.trim="stepFourData.AccountName" type="text" placeholder="">
                </div>
            </div>
        </div>
        <div class="step-btn" v-show="current<3">
            <Button  @click.stop="next">下一步</Button>
        </div>
        <div class="step-btn" v-show="current===3">
            <Button  @click="submitAll">提交</Button>
        </div>
    </div>
</template>

<script>
import {
  getImgCode,
  Register,
  getPhoneCode,
  RegisterOtherStep,
  uploadImgFile
} from "../../../api/api_group.js";

import md5 from "@/common/assets/js/md5.js";

export default {
  components: {},
  data() {
    return {
      type: "person",
      // step-one 手机注册数据
      phoneRegister: {
        phone: "",
        password: "",
        phonecode: "",
        imgCode: "",
        issurepassword: "",
        // 加个字段，验证
        success: false
      },
      //   step-two 真实信息认证
      submittingInformation: {
        realname: "",
        IDcardNo: "",
        companyname: "",
        companyID: "",
        // 加个字段，验证
        success: false
      },
      //   获取手机验证码倒计时功能
      phonecodeTime: 60,
      //  step-three 三个图片路劲
      fileUpload: {
        FacadeIDcard: "",
        ReverseIDcard: "",
        companyImag: "",
        success: false
      },
      //   图片上传的全路径
      fileUploadImage: {
        identityFrontImg: "",
        identityBackImg: "",
        businessLicenseImg: ""
      },
      // 获取手机验证码
      getPhoneCodeBol: false,
      //   注册到第几步了
      current: 0,
      value: "",
      //   step-four 选择平台数据
      stepFourData: {
        cityList: [
          {
            value: "1",
            label: "微信"
          },
          {
            value: "2",
            label: "今日头条"
          },
          {
            value: "3",
            label: "百度百家"
          },
          {
            value: "4",
            label: "搜狐"
          },
          {
            value: "0",
            label: "其它"
          }
        ],
        model1: "",
        // 账号名称
        AccountName: "",
        success: false
      },
      //   step234数据合并
      stepDataAssign: {},
      //   图片验证码src  base64
      getVerificationCode: "",
      timer: null,
      stepCurrentShowIdUpload: true
    };
  },
  created() {},
  mounted() {
    this.$Notice.config({
      top: 100
    });
    if (this.current === 0) {
      getImgCode().then(res => {
        if (res.success && res.data) {
          this.getVerificationCode = `data:image/jpeg;base64,${res.data}`;
        } else {
          this.getVerificationCode = "";
        }
      });
    }
  },
  methods: {
    //   失去焦点重新获取图片验证码
    blurCode() {
      if(this.phoneRegister.phone){
        let params = {
          phone: this.phoneRegister.phone
        };
        getImgCode(params).then(res => {
          if (res.success && res.data) {
            this.getVerificationCode = `data:image/jpeg;base64,${res.data}`;
          }
        });
      }
    },
    //   获取手机验证码
    getPhoneCode() {
      if (this.phoneRegister.phone) {
        this.getPhoneCodeBol = true;
        this.phoneCountDown(60);
        let params = {
          phone: this.phoneRegister.phone,
          type: 1
        };

        getPhoneCode(params).then(res => {
          if (res && res.success) {
          } else {
            this.getPhoneCodeBol = false;
            this.phonecodeTime = 60;
            clearInterval(this.timer);
          }
        });
      } else {
        this.$Notice.warning({
          title: "手机号不能为空！"
        });
      }
    },
    // 手机验证码20s倒计时功能
    phoneCountDown(time) {
      this.timer = setInterval(() => {
        if (this.phonecodeTime <= 0) {
          this.getPhoneCodeBol = false;
          this.phonecodeTime = time;
          clearInterval(this.timer);
        }
        this.phonecodeTime--;
      }, 1000);
    },
    //   更换图片验证码
    refreshImg() {
        let params = {
          phone: this.phoneRegister.phone
        };
        getImgCode(params).then(res => {
          if (res.success && res.data) {
            this.getVerificationCode = `data:image/jpeg;base64,${res.data}`;
          }
        });
    },
    //   身份证ID上传功能
    uploadFile: function(ev, typer) {
      let _this = this;
      if (ev.target.files.length != 0) {
        var formData = new FormData();
        formData.append("file", ev.target.files[0]); // { 'file1': Object }
        // 限制用户上传图片的大小  在 500kb之内
        if (ev.target.files[0].size > 500 * 1024) {
          _this.$Notice.warning({
            title: "图片大小不能大于500KB，请重新上传！"
          });
          return;
        }
        // 肥肉不
        if (this.stepCurrentShowIdUpload && typer != "3") {
          if (typer === "1") {
            _this.fileUpload.FacadeIDcard = _this.checkUploadIma(
              ev.target.files[0]
            );
            uploadImgFile(formData).then(res => {
              if (res && res.success) {
                this.fileUploadImage.identityFrontImg = res.data.url;
                _this.$Notice.success({
                  title: "身份证正面上传成功！"
                });
              } else {
                _this.$Notice.error({
                  title: "身份证正面上传失败！"
                });
              }
            });
          }
          if (typer === "2") {
            _this.fileUpload.ReverseIDcard = _this.checkUploadIma(
              ev.target.files[0]
            );
            uploadImgFile(formData).then(res => {
              if (res && res.success) {
                this.fileUploadImage.identityBackImg = res.data.url;
                _this.$Notice.success({
                  title: "身份证反面上传成功！"
                });
              } else {
                _this.$Notice.error({
                  title: "身份证反面上传失败！"
                });
              }
            });
          }
        }
        if (!this.stepCurrentShowIdUpload && typer != "3") {
          _this.$Notice.warning({
            title: "身份证件证明无需上传，请上传公司营业执照！"
          });
        }
        if (typer === "3") {
          _this.fileUpload.companyImag = _this.checkUploadIma(
            ev.target.files[0]
          );
          uploadImgFile(formData).then(res => {
            if (res && res.success) {
              this.fileUploadImage.businessLicenseImg = res.data.url;
              _this.$Notice.success({
                title: "营业执照上传成功！"
              });
            } else {
              _this.$Notice.error({
                title: "营业执照上传失败！"
              });
            }
          });
        }
      }
    },
    checkUploadIma(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //   注册第二步切换tab=》 未用到
    clickStepTwoTab(name) {
      //   alert(name);
      this.type = name;
    },
    // 第三部切换个人/公司
    clickStepID(name) {
      this.typeID = name;
    },
    // 注册接口
    next() {
      let _this = this;
      // 分块验证思想  利用this.current的下标值
      //   第一步手机注册数据
      let params = {
        phone: this.phoneRegister.phone,
        password: md5(this.phoneRegister.password),
        captcha: this.phoneRegister.phonecode,
        imgCode: this.phoneRegister.imgCode,
        countryCode: "86"
      };
      if (this.current === 0) {
        if (this.phoneRegister.password.length < 8) {
          this.$Notice.warning({
            title: "密码至少8位!"
          });
          return;
        } else if (this.phoneRegister.password.length > 20) {
          this.$Notice.warning({
            title: "密码不能大于20位!"
          });
          return;
        }

        if (
          !!this.phoneRegister.phone &&
          !!this.phoneRegister.password &&
          !!this.phoneRegister.phonecode &&
          !!this.phoneRegister.imgCode
        ) {
          if (
            this.phoneRegister.password == this.phoneRegister.issurepassword
          ) {
            Register(params).then(res => {
              if (res.success) {
                localStorage.setItem(
                  "COM_systemLoginKey",
                  res.data.systemLoginKey
                );
                this.phoneRegister.success = true;
                this.current += 1;
              } else {
                this.getPhoneCodeBol = false;
                this.phonecodeTime = 60;
                clearInterval(this.timer);
              }
            });
          } else {
            this.current = 0;
            this.phoneRegister.issurepassword = "";
            _this.$Notice.error({
              title: "两次输入密码不一致！"
            });
          }
        } else {
          this.current = 0;
          _this.$Notice.error({
            title: "不能为空！"
          });
        }
      }
      //   第二步 后三个步骤注册
      // accountName 账户名称
      // realName 真实姓名
      // identityNum 身份证号码
      // companyName 公司名称
      // businessLicenseNum 工商执照注册号
      // identityFrontImg 身份证正面照
      // identityBackImg 身份证反面照
      // businessLicenseImg 企业营业执照
      // platform 平台(1微信,2今日头条,3百度百家,4搜狐,0其他)
      // source 来源(1.Android 2.ios3.other)
      // weMedia 是否为自媒体(0是1否)
      if (this.current === 1) {
        let params2 = {
          // 个人，公司认证信息
          realName: this.submittingInformation.realname,
          identityNum: this.submittingInformation.IDcardNo,
          companyName: this.submittingInformation.companyname,
          businessLicenseNum: this.submittingInformation.companyID
        };

        if (this.type == "person") {
          if (!params2.realName) {
            this.showWarningMsg("姓名", "2");
          }
          if (!params2.identityNum) {
            this.showWarningMsg("身份证号码", "2");
          }
          if (params2.realName.length < 2) {
            this.$Notice.warning({
              title: "姓名不能小于2个字!"
            });
            return;
          }
          if (!this.globalFun.checkId(params2.identityNum)) {
            this.$Notice.warning({
              title: "身份证号不合法!"
            });
            return;
          }
          if (params2.identityNum.length != 18) {
            this.$Notice.warning({
              title: "身份证号码不是18位数!"
            });
            return;
          }
          if (params2.realName.length > 10) {
            this.$Notice.warning({
              title: "姓名不能大于10个字!"
            });
            return;
          }
          if (params2.realName && params2.identityNum) {
            params2.companyName = "";
            params2.businessLicenseNum = "";
            this.submittingInformation.success = true;
            this.current += 1;
            this.stepDataAssign = params2;
            this.stepCurrentShowIdUpload = true;
          }
        } else if (this.type == "company") {
          if (!params2.companyName) {
            this.showWarningMsg("公司名称", "2");
          }
          if (!params2.businessLicenseNum) {
            this.showWarningMsg("工商执照注册号", "2");
          }
          if (params2.companyName.length > 50) {
            this.$Notice.warning({
              title: "公司名称不能超过50个字!"
            });
            return;
          }
          let reg = new RegExp(/[A-Z].*[0-9]|[0-9].*[A-Z]/);
          if (params2.businessLicenseNum.length != 18) {
            this.$Notice.warning({
              title: "工商执照注册号不合法，必须为18位!"
            });
            return;
          }
          if (!reg.test(params2.businessLicenseNum)) {
            this.$Notice.warning({
              title: "工商执照注册号必须是大写字母和数字组合!"
            });
            return;
          }
          if (params2.companyName && params2.businessLicenseNum) {
            params2.realName = "";
            params2.identityNum = "";
            this.submittingInformation.success = true;
            this.current += 1;
            this.stepDataAssign = params2;
            this.stepCurrentShowIdUpload = false;
          }
          // }else {
          //     this.submittingInformation.success = true;
          //   this.current += 1;
          //   this.stepDataAssign = params2;
        }

        return false;
      }
      if (this.current === 2) {
        let params3 = {
          // 第三部身份证以及企业的照片
          identityFrontImg: this.fileUploadImage.identityFrontImg,
          identityBackImg: this.fileUploadImage.identityBackImg,
          businessLicenseImg: this.fileUploadImage.businessLicenseImg
        };
        if (this.type == "person") {
          if (!params3.identityFrontImg) {
            this.showWarningMsg("身份证正面照", "3");
          }
          if (!params3.identityBackImg) {
            this.showWarningMsg("身份证反面照", "3");
          }
          if (!params3.businessLicenseImg) {
            this.showWarningMsg("公司营业执照", "3");
          }
          if (
            params3.identityFrontImg &&
            params3.identityBackImg &&
            params3.businessLicenseImg
          ) {
            this.fileUpload.success = true;
            this.current += 1;
            this.stepDataAssign = Object.assign(this.stepDataAssign, params3);
            return;
          }
        } else {
          if (!params3.businessLicenseImg) {
            this.showWarningMsg("公司营业执照", "3");
          }
          if (params3.businessLicenseImg) {
            this.fileUpload.success = true;
            this.current += 1;
            this.stepDataAssign = Object.assign(this.stepDataAssign, params3);
            return;
          }
        }
      }
    },
    // 提示哪空为空的警告信息
    showWarningMsg(msg, step) {
      if (step === "2") {
        this.$Notice.warning({
          title: `${msg}不能为空！`
        });
        return "";
      }
      if (step == "3") {
        this.$Notice.warning({
          title: `${msg}未上传，请重新上传！`
        });
        return "";
      }
    },
    // 提交全部信息/调接口
    submitAll() {
      if (this.current === 3) {
        let params4 = {
          // 第四部发布平台和账号名称
          platform: this.stepFourData.model1,
          source: 3,
          accountName: this.stepFourData.AccountName
            ? this.stepFourData.AccountName
            : "",
          weMedia: this.type == "person" ? 0 : 1,
          identityType: this.type == "person" ? 1 : 2
        };
        if (!params4.platform) {
          this.showWarningMsg("发布平台", "2");
        }
        if (!params4.accountName) {
          this.showWarningMsg("账号名称", "2");
        }
        if (
          params4.platform &&
          params4.accountName &&
          this.submittingInformation.success &&
          this.fileUpload.success
        ) {
          let params = Object.assign({}, this.stepDataAssign, params4);
          RegisterOtherStep(params).then(res => {
            if (res.success) {
              this.$Notice.success({
                title: `申请为原创者成功！恭喜`
              });
              this.$nextTick(() => {
                this.$router.push({ path: "/homepage" });
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scpoed>
.register {
  width: 1000px;
  margin: 0 auto;
  .register-step {
    padding-top: 20px;
    text-align: center;
    margin-bottom: 10px;
    .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
      border-color: #ff845f;
      background-color: #ff845f;
    }
  }
  .register-step-one {
    margin: 0 auto;
    width: 800px;
    // height: 400px;
    .step-one-phone {
      margin: 80px 0px 5px 100px;
    }
    .step-one-imgcode {
      margin: 0px 0px 5px 100px;
      .step-one-getimgcode {
        display: inline-block;
        width: 118px;
        height: 40px;
        // border: 1px solid blue;
        vertical-align: bottom;
        margin-left: 12px;
        cursor: pointer;
      }
      img {
        width: 118px;
        height: 40px;
      }
      input {
        width: 280px;
      }
    }
    .step-one-phonecode {
      margin: 0px 0px 5px 100px;
      input {
        width: 280px;
      }
      button {
        width: 118px;
        color: #1c2e67;
        font-family: "MicrosoftYahei";
        font-size: 16px;
        border: 1px solid #1c2e67;
        border-radius: 3px;
        margin-left: 12px;
        outline: none;
        background-color: transparent;
      }
    }
    .step-one-password {
      margin: 0px 0px 5px 100px;
    }
    .step-one-issurepassword {
      margin: 0px 0px 5px 100px;
    }
  }
  .register-step-two {
    margin: 0 auto;
    width: 800px;
    text-align: center;
    .ivu-tabs-nav {
      float: none;
    }
    .ivu-tabs-tab {
      width: 205px;
      height: 30px;
    }
    .register-step-two-per {
      margin-top: 100px;
      .register-step-two-per-realname {
        margin-bottom: 20px;
      }
      .register-step-two-per-id {
      }
    }
    .register-step-two-company {
      margin-top: 100px;
      .register-step-two-company-name {
        margin-bottom: 20px;
      }
      .register-step-two-company-id {
      }
    }
  }
  .register-step-three {
    margin: 0 auto;
    width: 800px;
    text-align: center;
    .ivu-tabs-tab {
      width: 205px;
      height: 30px;
    }
    .ivu-tabs-nav {
      float: none;
    }
    .register-step-three-uploadIDF {
      .register-step-three-uploadID-text {
        width: 450px;
        text-align: center;
        padding: 10px 0px;
        font-size: 15px;
      }
      .register-step-three-uploadID-warn {
        float: right;
      }
      .register-step-three-uploadID-warn :nth-child(1) {
        width: 13px;
        height: 13px;
        vertical-align: middle;
        display: inline-block;
        background: url("../../../common/assets/images/notes.png") center center
          no-repeat;
        background-size: contain;
      }
      .register-step-three-uploadID-warn :nth-child(2) {
        color: #ff845f;
        font-size: 12px;
        font-family: "MicrosoftYaHei";
      }
      .register-step-three-uploadID-show {
        width: 260px;
        height: 170px;
        display: block;
        font-size: 14px;
        font-family: "MicrosoftYaHei";
        color: rgba(153, 153, 153, 1);
        background: rgba(250, 250, 250, 1);
        position: relative;
        margin: 0 auto;
        .put-imgIDF {
          display: inline-block;
          height: 30px;
          width: 30px;
          background: url("../../../common/assets/images/choose.png") center
            center no-repeat;
          background-size: contain;
          position: absolute;
          left: 115px;
          top: 70px;
        }
        span {
          font-size: 1px;
          display: inline-block;
          height: 20px;
          width: 80px;
          background-size: contain;
          position: absolute;
          left: 96px;
          top: 100px;
        }
        img {
          width: 260px;
          height: 170px;
        }
      }
      .upload-fontID {
      }
    }
    .register-step-three-uploadIDB {
      .register-step-three-uploadID-text {
        width: 450px;
        text-align: center;
        padding: 10px 0px;
        font-size: 15px;
      }
      .register-step-three-uploadID-show {
        width: 260px;
        height: 170px;
        display: block;
        font-size: 14px;
        font-family: "MicrosoftYaHei";
        color: rgba(153, 153, 153, 1);
        background: rgba(250, 250, 250, 1);
        position: relative;
        margin: 0 auto;
        .put-imgIDB {
          display: inline-block;
          height: 30px;
          width: 30px;
          background: url("../../../common/assets/images/choose.png") center
            center no-repeat;
          background-size: contain;
          position: absolute;
          left: 115px;
          top: 70px;
        }
        span {
          font-size: 1px;
          display: inline-block;
          height: 20px;
          width: 80px;
          background-size: contain;
          position: absolute;
          left: 96px;
          top: 100px;
        }
        img {
          width: 260px;
          height: 170px;
        }
      }
      .upload-fontID {
      }
    }
    .register-step-three-uploadcompany {
      .register-step-three-uploadcompany-text {
        width: 450px;
        text-align: center;
        padding: 10px 0px;
        font-size: 15px;
      }
      .register-step-three-uploadcompany-warn {
        float: right;
      }
      .register-step-three-uploadcompany-warn :nth-child(1) {
        width: 13px;
        height: 13px;
        vertical-align: middle;
        display: inline-block;
        background: url("../../../common/assets/images/notes.png") center center
          no-repeat;
        background-size: contain;
      }
      .register-step-three-uploadcompany-warn :nth-child(2) {
        color: #ff845f;
        font-size: 12px;
        font-family: "MicrosoftYaHei";
      }
      .register-step-three-uploadcompany-show {
        width: 416px;
        height: 270px;
        display: block;
        font-size: 14px;
        font-family: "MicrosoftYaHei";
        color: rgba(153, 153, 153, 1);
        background: rgba(250, 250, 250, 1);
        position: relative;
        margin: 0 auto;
        .put-imgcompany {
          display: inline-block;
          height: 30px;
          width: 30px;
          background: url("../../../common/assets/images/choose.png") center
            center no-repeat;
          background-size: contain;
          position: absolute;
          left: 193px;
          top: 120px;
        }
        span {
          font-size: 1px;
          display: inline-block;
          height: 20px;
          width: 80px;
          background-size: contain;
          position: absolute;
          left: 176px;
          top: 150px;
        }
        img {
          width: 416px;
          height: 270px;
        }
      }
      .upload-fontcompany {
      }
    }
  }
  .register-step-four {
    .register-step-four-per {
      width: 800px;
      margin: 0 auto;
      .register-step-four-select-warn {
        margin: 50px 0px 0px 52px;
      }
      .register-step-four-select-warn :nth-child(1) {
        width: 13px;
        height: 13px;
        vertical-align: middle;
        display: inline-block;
        background: url("../../../common/assets/images/notes.png") center center
          no-repeat;
        background-size: contain;
        margin-right: 6px;
      }
      .register-step-four-select-warn :nth-child(2) {
        color: #ff845f;
        font-size: 12px;
        font-family: "MicrosoftYaHei";
      }
      .register-step-four-per-option {
        margin: 28px 0px 18px 52px;
      }
      .register-step-four-per-name {
        margin-left: 52px;
      }
    }
  }
  .step-btn {
    padding-top: 46px;
    text-align: center;
    width: 800px;
    margin: 0 auto;
    button {
      color: #ffffff;
      font-size: 16px;
      font-family: "MicrosoftYahei";
      width: 410px;
      height: 38px;
      background-color: #1c2e67;
      border: 1px solid transparent;
      border-radius: 3px;
    }
  }
  //   整体input 和 label 的样式统一
  input {
    border: 1px solid #dddddd;
    border-radius: 3px;
    height: 40px;
    padding: 5px 5px;
    width: 410px;
    outline: none;
    line-height: 40px;
  }
  label {
    color: #999999;
    font-family: "MicrosoftYahei";
    font-size: 16px;
    display: inline-block;
    // text-align: left;
    width: 130px;
  }
}
</style>
