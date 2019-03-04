<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <com-header></com-header>
        <div class="content f-pr">
            <div class="info f-pa">
                <h2 class="title">子理妈妈果园管理后台</h2>
                <ul class="input-wraper-list">
                    <li class="input-wraper">
                        <span class="icon f-db"></span>
                        <input class="input" v-model.trim="formInfo.userName" type="text" placeholder="登录账号" @blur="refreshPINimg">
                    </li>
                    <li class="input-wraper">
                        <span class="icon f-db"></span>
                        <input class="input" v-model.trim="formInfo.password" type="password" placeholder="登录密码">
                    </li>
                </ul>
                <div class="submit">
                    <Button class="button" @click="handleSubmit" :loading="login.is">{{login.name}}</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, getValCode,addLogin } from '../../api/api_group.js';
import header from '../../common/components/header/header';
import md5 from '../../common/libs/md5.js';
export default {
    data () {
        return {
            formInfo: {
                userName: '',
                password: '',
                // valCode: ''
            },
            formInfoEmptyMessage: {
                userName: '请输入用户名',
                password: '请输入密码',
                // valCode: '请输入验证码'
            },
            PINsrc: '',
            login:{
                is: false,
                name: '登录'
            }
            
        };
    },
    created() {
    },
    mounted() {
        // this.refreshPINimg();
    },
    methods: {
        refreshPINimg() {
            getValCode({
                userName: this.formInfo.userName
            }).then((res) => {
                if (res.code == 200) {
                    console.log(res.data.code)
                    // this.PINsrc = `data:image/jpeg;base64,${res.data}`;
                    // this.$refs.PINimg.setAttribute('src', this.PINsrc);
                }
            });
        },
        handleSubmit () {
            
            for (let i in this.formInfo) {
                if (this.globalFun.isStrEmpty(this.formInfo[i])) {
                    this.$Message.error(this.formInfoEmptyMessage[i]);
                    return;
                }
            }
            if (this.formInfo.password.length > 15 || this.formInfo.password.length < 6) {
                this.$Message.error('请输入6-15位密码');
                return false;
            } 
            if(!this.login.is){
                this.login = {
                    is: true,
                    name: '登录中...'
                };
                login({
                    userName: this.formInfo.userName,
                    password: md5(this.formInfo.password),
                    // imgCode: this.formInfo.valCode
                }).then((res) => {
                    this.login = {
                        is: false,
                        name: '登录'
                    };
                    if (res.code == 200) {
                        if(res.data.flag){
                            this.$Message.success({
                                content: '登录成功，即将跳转首页',
                                duration: 3
                            });
                            sessionStorage.setItem("userName",this.formInfo.userName);
                            sessionStorage.setItem("token",res.data.token);
                            
                            setTimeout(() => {
                                this.$router.push({
                                    path: '/noticeList'
                                });
                            }, 1000);
                        }else{
                            this.$Message.error("用户名或密码错误");
                        }
                        
                    }
                })
            }
            
        },
        redirect(path) {
            this.$router.push({
                name: 'register'
            });
        } 
    },
    components: {
        'com-header': header
    }
};
</script>

<style>

</style>
