<template>
    <section class="user-center" :class="$i18n.locale">
        <div class="identity-setting">
            <div class="identity-setting-list">
                <!-- <div class="setp-nav">
                    <span :class="step_this>=1?'active':''"> 
                        <i>1</i><span>{{$t('userCenter.identity.idVerNotice.stepTitle1')}}</span><span class="line"></span>
                    </span>
                    <span :class="step_this>=2?'active':''">
                        <i>2</i><span>{{$t('userCenter.identity.idVerNotice.stepTitle2')}}</span><span class="line"></span>
                    </span>
                    <span :class="step_this>=3?'active':''">
                        <i>3</i><span>{{$t('userCenter.identity.idVerNotice.stepTitle3')}}</span>
                    </span>
                </div> -->
                <!-- 身份认证第一步 -->
                <section v-show="step_this == '1'">
                    <div class="message-list">
                        <span class="lb ls-2">{{$t('userCenter.identity.step.label1')}}</span>
                        <input class="ivu-input" v-model.trim="name" :placeholder="$t('userCenter.identity.step.placeholder1')" maxlength="10">
                    </div>
                    <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label2')}}</span>
                        <span>{{$t('userCenter.identity.step.label3')}}</span>
                    </div>
                    <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label4')}}</span>
                        <input class="ivu-input" v-model.trim="IDcard" :placeholder="$t('userCenter.identity.step.placeholder2')" maxlength="18">
                    </div>
                    <div class="message-list submit">
                        <span class="lb"></span>
                        <Button  @click="submit(1)">{{$t('userCenter.identity.step.button1')}}</Button>
                    </div>
                </section>
                <!-- 身份认证第二步 -->
                <section v-show="step_this == '2'" class="stepSecondThird">
                    <div class="message-list">
                        <span class="lb ls-2">{{$t('userCenter.identity.step.label1')}}</span>
                        <span>{{name}}</span>
                    </div>
                    <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label2')}}</span>
                        <span>{{$t('userCenter.identity.step.label3')}}</span>
                    </div>
                    <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label4')}}</span>
                        <span>{{IDcard}}</span>
                    </div>
                    <div class="message-list">
                        <span class="img-title lb">{{$t('userCenter.identity.step.label5')}}</span>
                        <div class="img">
                            <img v-if="uploadImg1" :src="uploadImg1" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                            <i class="front-right"></i>
                            <p class="remark">{{$t('userCenter.identity.step.remark1')}}</p>
                            <div class="uploadBtn">{{$t('userCenter.identity.step.button2')}}<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"   class="img-submit"  @change="onFileChange('btn_img1')" id="btn_img1" ></div>
                        </div>

                    </div>
                    <div class="message-list">
                        <span class="img-title lb">{{$t('userCenter.identity.step.label6')}}</span>
                        <div class="img">
                            <img v-if="uploadImg2" :src="uploadImg2" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                            <i class="reverse-right"></i>
                            <p class="remark">{{$t('userCenter.identity.step.remark1')}}</p>
                            <div class="uploadBtn">{{$t('userCenter.identity.step.button2')}}<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"    class="img-submit" @change="onFileChange('btn_img2')" id="btn_img2"></div>
                        </div>
                    </div>
                    <div class="message-list">
                        <span class="img-title lb">{{$t('userCenter.identity.step.label7')}}</span>
                        <div class="img">
                            <img v-if="uploadImg3" :src="uploadImg3" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                            <i class="hand-right"></i>
                            <p class="remark">{{$t('userCenter.identity.step.remark1')}}</p>
                            <div class="uploadBtn">{{$t('userCenter.identity.step.button2')}}<input type="file"  accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"   class="img-submit"  @change="onFileChange('btn_img3')" id="btn_img3"></div>
                        </div>
                    </div>
                    <div class="message-list submit">
                        <span class="lb"></span>
                        <Button type="success" @click="submit(2)">{{$t('userCenter.identity.step.button1')}}</Button>
                    </div>
                </section>
                <!-- 身份认证第三步 -->
                <section v-show="step_this == '3'" class="stepSecondThird">
                    <div class="tip">
                        <i></i>{{$t('userCenter.identity.passTip')}}
                    </div>
                    <div class="message-list">
                        <span class="lb ls-2">{{$t('userCenter.identity.step.label1')}}</span>
                        <span>{{name}}</span>
                    </div>
                    <!-- <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label2')}}</span>
                        <span>{{$t('userCenter.identity.step.label3')}}</span>
                    </div> -->
                    <div class="message-list">
                        <span class="lb ls-4">{{$t('userCenter.identity.step.label4')}}</span>
                        <span>{{IDcard}}</span>
                    </div>
                    <!-- <div class="message-list">
                        <span class="img-title-success lb">{{$t('userCenter.identity.step.label5')}}</span>
                        <div class="img">
                             <img v-if="uploadImg1" :src="uploadImg1" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                        </div>
                    </div>
                    <div class="message-list">
                        <span class="img-title-success lb">{{$t('userCenter.identity.step.label6')}}</span>
                        <div class="img">
                            <img v-if="uploadImg2" :src="uploadImg2" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                        </div>
                    </div>
                    <div class="message-list">
                        <span class="img-title-success lb">{{$t('userCenter.identity.step.label7')}}</span>
                        <div class="img">
                            <img v-if="uploadImg3" :src="uploadImg3" class="front-left successImg">
                            <i v-else class="front-left successImg"></i>
                        </div>
                    </div> -->
                </section>
            </div>
        </div>

    </section>
</template>

<script>
    import {getUserDetail,bindCardImg,bindCard } from '@api/api_group';
    import utils from '@common/utils';
    import {Button,Input, Notice, Message, Spin} from 'iview';
    
    export default {
        data() {
            return {
                isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
                step_this : `-1`,
                name:``,
                IDcard:``,
                isRealName:``,
                uploadImg1:null,
                uploadImg2:null,
                uploadImg3:null,
               
            }
        },
        created() {
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
        },
        methods: {
            onFileChange:function(event) {
                let _this = this;
                let str = document.getElementById(event);
                let fileObj = str.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(fileObj);
                reader.onloadend = function(ev) {
                    let image = new Image();
                    image.src = ev.target.result;
                    if (event == 'btn_img1') {
                        _this.uploadImg1 = image.src;
                    } else if (event == 'btn_img2') {
                        _this.uploadImg2 = image.src;
                    }else{
                        _this.uploadImg3 = image.src;
                    }
                };
            },
            getUserDetail:function(){//获取用户详情
                let _this = this;
                Spin.show();
                getUserDetail().then((res) => {
                    Spin.hide();
                    if (res.success) {
                        res = res.data;
                        _this.isRealName = res.status; //是否实名认证  1已认证   3未上传图片
                        if(_this.isRealName=='1'){
                            _this.step_this='3';
                            // _this.uploadImg1 = 'data:image/jpeg;base64,'+res.imgs[0];
                            // _this.uploadImg2 = 'data:image/jpeg;base64,'+res.imgs[1];
                            // _this.uploadImg3 = 'data:image/jpeg;base64,'+res.imgs[2];
                        }else if(_this.isRealName=='3'){
                            _this.step_this='1';
                        }
                         _this.name = res.name;
                        _this.IDcard = res.icNo;
                        
                    }
                    if (res.notLogin) {
                        Message.warning({
                            content: this.$t('common.notLogin'),
                            duration: 2
                        });
                        setTimeout(() => {
                            location.href = './index.html';
                        }, 2000);
                    }
                });
            },
            submit:function(val){
                let _this = this;
                if(val=='1'){ //提交姓名和身份证号
                    if(_this.name==="" || !_this.name){
                        Notice.error({
                            title: this.$t('userCenter.identity.step.remark2')
                        })
                        return false;
                    }
                    if (this.IDcard === '' || !this.IDcard) {
                        Notice.error({
                            title: this.$t('userCenter.identity.step.remark6')
                        })
                        return false;
                    }
                    let params = {
                        name:_this.name,
                        icNo:_this.IDcard
                    }
                    Spin.show();
                    bindCard(params).then((res) => {
                        Spin.hide();
                        if (res.success) {
                            _this.step_this='3';
                        }
                    });
                }else{ 
                    //提交身份证照片
                    // if(!_this.uploadImg1){
                    //     Notice.error({
                    //         title: this.$t('userCenter.identity.step.remark3')
                    //     })
                    //     return false;
                    // }
                    // if(!_this.uploadImg2){
                    //     Notice.error({
                    //         title: this.$t('userCenter.identity.step.remark4')
                    //     });
                    //     return false;
                    // }
                    // if(!_this.uploadImg3){
                    //     Notice.error({
                    //         title: this.$t('userCenter.identity.step.remark5')
                    //     });
                    //     return false;
                    // }
                    
                    // let formData = new FormData();
                    // const promiseFun0 = new Promise((resolve, reject) => {
                    //     this.globalFun.imgCompress(document.getElementsByClassName("img-submit")[0].files[0], 0.5, (error, data) => {
                    //         formData.append('file1', data);
                    //         resolve();
                    //     });
                    // });
                    // const promiseFun1 = new Promise((resolve, reject) => {
                    //     this.globalFun.imgCompress(document.getElementsByClassName("img-submit")[1].files[0], 0.5, (error, data) => {
                    //         formData.append('file2', data);
                    //         resolve();
                    //     });
                    // });
                    // const promiseFun2 = new Promise((resolve, reject) => {
                    //     this.globalFun.imgCompress(document.getElementsByClassName("img-submit")[2].files[0], 0.5, (error, data) => {
                    //         formData.append('file3', data);
                    //         resolve();
                    //     });
                    // });
                    // Promise.all([promiseFun0, promiseFun1, promiseFun2]).then((values) => {
                    //     Spin.show();
                    //     bindCardImg(formData).then((res) => {
                    //         Spin.hide();
                    //         if (res.success) {
                    //             _this.step_this='3';
                    //         }
                    //     });
                    // }); 
                }
            }
        },
        components: {
            Button,
            Input,
        },
    }
</script>

<style lang="scss" scoped="scoped">
.user-center{
    background-color: #ffffff;
    width:1200px;
    margin-bottom: 250px;
    .identity-setting{
        .identity-setting-list{
            padding: 0 50px;
            font-size: 16px;
            min-height: 200px;
            //进度显示
            .setp-nav{
                margin-bottom: 80px;
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
                width: 410px;
                height: 40px;
                line-height: 38px;
                padding: 0 7px;
                border: 1px solid #ddd;
            }
            // 认证列表
            .message-list{
                padding-bottom: 40px;
                .lb{
                    display: inline-block;
                    color:#999999;
                    font-size:16px;
                    width: 80px;
                    margin-right: 20px;
                    white-space: nowrap;
                }
                .ls-2{
					letter-spacing: 48px;
				}
				.ls-4{
					letter-spacing: 5.2px;
				}
                .img-title{
                    position: relative;
                    // top:-220px;
                    vertical-align: top;
                    display: inline-block;
                }
                .img-title-success{
                    position: relative;
                    top:-156px;
                }
                span:nth-child(2){
                    color:#333333;
                }
                .img{
                    display: inline-block;
                    .front-left{
                        display: inline-block;
                        width:260px;
                        height: 168px;
                        background-color: #f2f2f2;
                        border:1px dashed #cccccc;
                        border-radius: 3px;
                    }
                    .front-right{
                        margin-left:20px;
                        display: inline-block;
                        width:260px;
                        height: 168px;
                        background: url('../../../common/assets/images/front.png') no-repeat center;
                        background-size: 260px 168px;
                    }
                    .reverse-right{
                        margin-left:20px;
                        display: inline-block;
                        width:260px;
                        height: 168px;
                        background: url('../../../common/assets/images/back.png') no-repeat center;
                        background-size: 260px 168px;
                    }
                    .hand-right{
                        margin-left:20px;
                        display: inline-block;
                        width:260px;
                        height: 168px;
                        background: url('../../../common/assets/images/in_hand.png') no-repeat center;
                        background-size: 260px 168px;
                    }
                    .remark{
                        width:545px;
                        color: #999;
                        margin: 16px 0 28px 0;
                    }
                    .img-submit{
                        position: absolute;
                        top:0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        // width: 100px;
                        opacity: 0;
                        cursor: pointer;
                    }
                    .uploadBtn{
                        position: relative;
                        margin-top:20px;
                        display:inherit;
                        // width:100px;
                        height: 28px;
                        line-height: 26px;
                        border-radius: 3px;
                        background-color: transparent;
                        color:#ff8a00;
                        border: 1px solid #ff8a00;
                        text-align: center;
                        font-size:14px;
                        padding: 0 25px;
                        // cursor: pointer;
                    }
                    .uploadBtn:hover{
                        background-color: #ff8a00;
                        color: #fff;
                        transition: all 0.6s ease 0s;
                    }
                }
            }
            .submit{
                margin-top:10px;
                button{
                    font-size: 16px;
                }
            }
            .ivu-btn {
                border:1px solid #ff8a00;
                background-color: #ff8a00;
                width: 410px;
                height: 38px;
                color: #fff;
                font-size: 16px;
            }
            .successImg{
                width: 260px;
                height: 168px;
            }
            .tip{
                display: flex;
                align-items: center;
                i{
                    width: 17px;
                    height: 17px;
                    background: url('../../../common/assets/images/wanc-.png') no-repeat center;
                    margin-right: 10px;
                }
                font-size: 16px;
                color: #ff8a00;
                margin-bottom: 46px;
            }
        }
    }
}
.ENG{
    .lb{
        min-width: 166px;
        text-align: right;
        letter-spacing: 0px !important;
    }
}
</style>

