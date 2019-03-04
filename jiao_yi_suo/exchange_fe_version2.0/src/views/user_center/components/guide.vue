<template>
	<div class="guide">
        <p class="title">
            <span><i></i>{{$t('userCenter.guide.title')}}</span>
            <span class="tip"><em></em>{{$t('userCenter.guide.tip')}}</span>
        </P>
        <div class="setp-nav">
            <span :class="currIndex == index?'active':''" v-for="(item,index) of navList" :key="index" > 
                <i>{{index+1}}</i><span class="lb" @click="checkItem(item.name,index)">{{item.title}}</span>
                <span class="line" v-if="index<navList.length-1"></span>
            </span>          
        </div>
        <identity v-if="currName === 'identity'"></identity>

        <div class="setPayPassword" v-if="currName === 'setPayPassword'">
            <div class="tip" v-if="isSetPay == 1">已设置资金密码</div>
            <setPayPwd v-if="isSetPay == 2"></setPayPwd>
        </div>
	</div>
</template>

<script>

import eventBus from '@common/eventBus/eventBus';
import identity from './../guide/identity';
import setPayPwd from './../guide/set_pay_password';
import { getUserDetail } from '@api/api_group'; 
export default {
    data() {
        return {
           navList:[{
                "name": "identity",
                "title": this.$t('userCenter.identity.idVerNotice.title')
            },{
                "name": "setPayPassword",
                "title": this.$t('userCenter.setPayPassword.title')
            }],
           currIndex: 0,
           currName: "",
           isSetPay: 0
        };
    },
    created() {
        document.title = this.$t('userCenter.guide.title');
        eventBus.$on('convertFont', () => {
			document.title = this.$t('userCenter.guide.title');
		});
    },
    mounted() {
        this.currIndex = this.$route.query.name==='setPayPassword'?1:0        
        this.setCurrName();
        this.getUserDetail();
    },
    methods: {
        checkItem(name,index){
            this.currIndex = index;
            this.setCurrName();
        },
        setCurrName(){
             this.currName = this.navList[this.currIndex].name;
        },
        getUserDetail(){
            getUserDetail().then(res => {                
                if (res.success) {
                    this.isSetPay = res.data.paySet?1:2;
                }
            });
        }
    },
    components: {
        setPayPwd,identity
    }
};
</script>

<style lang="scss"  scoped="scoped">
.guide{
    background: #fff;
    .title{
        display: flex;
        font-size: 22px;
        line-height: 22px;
        font-weight: 550;
        color: #333333;
        padding: 50px 50px 48px 50px;
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
        .tip{
            font-size: 12px;
            color: #b4b4d8;
            flex: 1;
            text-align: right;
            em{
                background: url('../../../common/assets/images/prompt.png') no-repeat;
                width: 14px;
                height: 14px;
                display: inline-block;
                vertical-align: top;
                margin: 4px 8px 0 0;
            }
        }
    }
    .setp-nav{
        margin-bottom: 40px;
        font-size: 14px;
        color: #999;
        padding: 0 50px;
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
        .lb{
            cursor: pointer;
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
    .setPayPassword{
        min-height: 100px;
        .tip{
            height: 50px;
            color: #999;
            font-size: 14px;
            padding-left: 90px;
        }
    }
}
</style>
