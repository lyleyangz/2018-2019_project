<template>
    <section class="user-center" :class="$i18n.locale">
        <!-- 设置中心 -->
        <div class="rebate">
            <div class="tip" v-if="data.count === 0 && (data.totalPrice<0.01 || data.totalPrice === 0 )">
                {{$t('userCenter.rebate.lb11')}}<label>10%</label>{{$t('userCenter.rebate.lb12')}}
            </div>
            <div class="tip" v-else>
                {{$t('userCenter.rebate.lb1')}}<label>{{data.count}}</label>{{$t('userCenter.rebate.lb2')}}，
                {{$t('userCenter.rebate.lb3')}}<label>{{globalFun.formatFloat(data.totalPrice || 0, 2)}}</label>CNY{{$t('userCenter.rebate.lb4')}}，
                {{$t('userCenter.rebate.lb5')}}<label>{{data.popularity || 0}}%</label>{{$t('userCenter.rebate.lb6')}}
            </div>        
            
            <ul class="list" :style="`height:`+more.height+`px`" v-if="data.hisList && data.hisList.length>0">
                <li v-for="(item,index) of data.hisList" :key="index">
                    <div>{{globalFun.formatFloat(item.balance,8)}}</div>
                    <div>{{item.currencyName}}</div>
                </li>
            </ul>
            <div v-if="data.hisList && data.hisList.length>6" class="more" :class="more.isOpen?'open':''" @click="loadMore"><div><span></span><span></span></div></div>
        </div>
        <div class="share">
            <div class="share-inner">
                <div class="cnt">
                    <div class="item">
                        <span class="lb">{{$t('userCenter.rebate.lb7')}}：</span>
                        <span class="copy-cnt" id="code">{{inviteCode}}</span>
                        <span><a class="btn" ref="codeCopy" data-clipboard-action="copy" data-clipboard-target="#code" @click="codeCopyFun()">{{$t('userCenter.rebate.btn')}}</a></span>
                    </div>
                    <div class="item">
                        <span class="lb">{{$t('userCenter.rebate.lb8')}}：</span>
                        <span style="flex:1">
                            <p>{{$t('userCenter.rebate.lb9')}}，</p>
                            <p>{{$t('userCenter.rebate.lb10')}}。</p>
                            <p style="display: flex;margin-top: 5px;">
                                <label class="copy-cnt" id="url">{{inviteUrl}}</label>  
                                <span>
                                    <a class="btn" ref="urlCopy" data-clipboard-action="copy" data-clipboard-target="#url" @click="urlCopyFun()">{{$t('userCenter.rebate.btn')}}</a>
                                </span>
                            </p>
                            
                        </span>
                    </div>
                </div>
                <div class="tip">
                    <p class="title">{{$t('userCenter.rebate.tipTitle')}}</p>
                    <p>{{$t('userCenter.rebate.tip1')}}</p>
                    <p>{{$t('userCenter.rebate.tip2')}}</p>
                    <p>{{$t('userCenter.rebate.tip3')}}</p>
                    <p>{{$t('userCenter.rebate.tip4')}}</p>
                    <p>{{$t('userCenter.rebate.tip5')}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getUserDetail,rebateList } from "@api/api_group";
import utils from "@common/utils";
import Big from 'big.js';
import decimalDigits from '@common/settings/decimalDigits';
import { Spin, Message } from 'iview';
import Clipboard from 'clipboard';
export default {
    data() {
        return {
            Big: Big,
            decimalDigits: decimalDigits, 
            isLogin: localStorage.getItem('YJS_isLogin') === 'true'? true: false,
            inviteCode: "",
            inviteUrl: "",
            more: {
                isOpen: false,
                height: 56
            },
            data:{
                count: 0,
                totalPrice: 0
            },
            codeCopy: null, //存储初始化复制按钮事件
            urlCopy: null
        };
    },
    created: function() {
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
    },
    mounted() {
        this.getList();
        this.getUserDetail();
        this.codeCopy = new this.clipboard(this.$refs.codeCopy);
        this.urlCopy = new this.clipboard(this.$refs.urlCopy);
    },
    methods: {
        getList(){
            rebateList().then(res =>{
                if(res && res.success){
                    this.data = res.data;
                    this.data.popularity =Number(new Big(this.globalFun.formatFloat(this.data.popularity || 0, 2)).mul(100));
                }
            });
        },
        getUserDetail() {
            //获取用户详情
            let _this = this;
            Spin.show();
            getUserDetail().then(res => {                
                Spin.hide();
                if (res.success) {
                   _this.inviteCode = res.data.inviteCode;
                   _this.inviteUrl = location.host + "/others.html#/register?phone="+res.data.phone+"&inviteCode=" + res.data.inviteCode;
                }
                if (res.notLogin) {
                    Message.warning({
                        content: this.$t('common.notLogin'),
                        duration: 2
                    });
                    setTimeout(() => {
                        location.href = "./index.html";
                    }, 2000);
                }
            });
        },
        codeCopyFun() {
            var _this = this;
            let clipboard = _this.codeCopy;
            clipboard.on('success', function() {
                Message.success(_this.$t('userCenter.safe.remark4'));
                clipboard.destroy();
                _this.codeCopy = new _this.clipboard(_this.$refs.codeCopy);
            });
        },
        urlCopyFun() {
            var _this = this;
            let clipboard = _this.urlCopy;
            clipboard.on('success', function() {
                Message.success(_this.$t('userCenter.safe.remark4'));
                clipboard.destroy();
                _this.urlCopy = new _this.clipboard(_this.$refs.urlCopy);
            });
        },
        loadMore(){
            if(this.data.hisList.length>6){
                this.more.isOpen = !this.more.isOpen;
                this.more.height = this.more.isOpen?56*Math.ceil(this.data.hisList.length/6)+16:56
            }
        }
    }
};
</script>

<style lang="scss" scoped="scoped">
.user-center {
    width: 1200px;
    margin-bottom: 250px;
    .rebate{
        padding: 70px 128px;
        background: #fff;
        position: relative;
        .tip{
            font-size: 16px;
            color: #666;
            line-height: 22px;
            letter-spacing:2px;
            label{
                font-size: 30px;
                font-weight: 600;
                color: #ff8a00;
                margin: 0 3px;
            }
        }
        .list{
            display: flex;
            flex-wrap: wrap;
            height: 56px;
            margin-top: 54px;
            transition: all 0.6s ease 0s;
            overflow: hidden;
            li{
                width: 16.66%;
                font-size: 16px;
                text-align: center;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                margin:0 0 15px -1px ;
                line-height: 28px;
                div:nth-child(1){
                    font-weight: 600;
                    color: #333;
                    overflow: hidden;
                    margin: 0px 5px;
                }
                div:nth-child(2){
                    color: #666;
                }
                &:nth-child(6n+1){
                    margin:0 0 15px 0;
                }
            }
        }
        .more{
            position: absolute;
            width: 100%;
            height: 30px;
            left: 0;
            bottom: -12px;
            display: flex;
            justify-content: center;
            transition: all 0.3s ease 0s;
            div{
                cursor: pointer;
                width: 30px;
                height: 30px;
                background-color: #ff8a00;
                border-radius: 50%;
                position: relative;
                transition: all 0.3s ease 0s;
                cursor: pointer;
                span{
                    width: 12px;
                    height: 3px;
                    border-radius: 3px;
                    background-color: #fff;
                    position: absolute;
                    top: 15px;
                }
                span:nth-child(1){                   
                    left: 5px;
                    transform: rotate(45deg);
                }
                span:nth-child(2){                   
                    right: 5px;
                    transform: rotate(-45deg);
                }
                &.up{
                    transform: rotate(180deg);
                }
            }    
            &.open{
                div{
                    transform:rotate(180deg);
                }
            }
        }
    }
    .share{
        padding: 50px 45px;
        background-color: #ffffff;
        margin-top: 50px;
        .share-inner{
            background-color: #F0F0F7;
            padding: 48px 60px 94px 60px;
            .cnt{
                background-color: #fff;
                padding: 0 20px 40px 20px;
                .item{
                    font-size: 16px;
                    color: #666;
                    display: flex;
                    .lb{
                        width: 131px;
                        margin-right: 15px;
                    }
                    .copy-cnt{
                        font-size: 17px;
                        color: #b4b4d8;
                        font-weight: 600;
                        flex: 1;
                    }
                    .btn{
                        font-size: 14px;
                        color: #ff8a00;
                        margin-left: 20px;
                    }
                    
                }
                .item:nth-child(1){
                    line-height: 87px;
                    border-bottom: 1px dashed #ddd;
                    margin-bottom: 40px;
                }
            }
            .tip{
                margin: 44px 20px 0 20px;
                font-size: 12px;
                color: #999;            
                .title{
                    font-size: 14px;
                }
                p{
                    line-height: 22px;
                }
            }
        }
    }
}
.ENG{
    .item{
        .lb{
            width: 180px !important;
            margin-right: 0 !important;
        }
    }
}
</style>

