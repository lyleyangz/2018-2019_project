<template>
    <section class="user-center" :class="$i18n.locale">
        <ul class="type-select">
            <li class="u-member f-fl active">{{$t('fund.address.title')}}</li>
        </ul>
        <div class="data-list">
            <ul class="title">
                <li>{{$t('fund.address.lb1')}}</li>
                <li style="flex:3">{{$t('fund.address.lb2')}}</li>
                <li>{{$t('fund.address.lb3')}}</li>
                <li class="operation">{{$t('fund.balance.operation')}}</li>
            </ul>
            <ul class="data">
                <li class="item" v-for="(item,index) of list" :key="index">
                    <span>{{item.currencyName}}</span>
                    <span style="flex:3">{{item.address}}</span>
                    <span>{{item.remark}}</span>
                    <span>
                        <button class="btn-solid" @click="del(item.id,index)">{{$t('fund.address.btn')}}</button>
                    </span>
                </li> 
                <li v-if="list.length == 0" class="no-data">
                    <span>{{$t('fund.balance.nodate')}}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { 
    withdrawAddressList,delWithdrawAddress
} from "@api/api_group";
import eventBus from '@common/eventBus/eventBus';
import md5 from '@common/assets/js/md5.js';


import { Message, Spin, Notice, Modal,Button,Page } from 'iview';
import i18n from '@common/i18n';

export default {
    data() {
        return {
            list:[] 
        };
    },
    created() {
        this.getList();
    },
 
    methods: {
        getList(){
            withdrawAddressList().then(res =>{
                this.list = res.data || [];
            })
        },
        del(id,index){
            let _this = this;
            Modal.confirm({
                title: this.$t('fund.address.modal.title'),
                content: this.$t('fund.address.modal.content'),
                loading: true,
                onOk: () => {
                    Modal.remove();
                    delWithdrawAddress({
                        id: id
                    }).then(res =>{
                        if(res && res.success){
                            _this.list.splice(index,1);
                        }
                    })
                }
            });
        }
        
    },
    components: {
        Button,Modal,Page
    },
};
</script>

<style lang="scss" scoped="scoped">
.user-center{
    width: 100%;
    background-color: #ffffff;
    .type-select {
        width: 100%;
        height: 73px;
        padding:0 48px;
        .u-member {
            height: 73px;
            line-height: 73px;
            color: #666666;
            font-size: 16px;
            padding: 0 29px;
            border-top: 2px solid transparent;
            transition: border 0.2s;
            cursor: pointer;
            &.active {
                color: #ff8a00;
                border-color: #ff8a00;
            }
        }
    }
    .data-list{
        padding:0 48px 220px 48px;
        
        .title{
            height: 70px;
            line-height: 70px;
            margin: 0 50px;
            display: flex;
            text-align: center;
            font-size: 14px;
            color: #333;
            li{
                flex: 1;
            }
        }
        .data{
            background: #f0f0f7;
            color: #666;
            font-size: 14px;
            margin-bottom: 90px;
            li{
                margin: 0 50px;
                text-align: center;
                display: flex;
                height: 80px;
                line-height: 80px;
                border-bottom:1px dashed #ddd;               
                span{
                    flex: 1;
                }
                button{
                    line-height: 22px;
                    padding: 0 9px;
                    font-size: 14px;
                    border-radius: 3px;
                }
                .btn-solid{
                    border: 1px solid #ff8a00;
                    color: #ffffff;
                    background-color: #ff8a00;
                }
                
            }
            .no-data{
                background: #f0f0f7;
                font-size: 14px;
                border: 0;
            }
        }
    }
}
.ENG{
    
}
</style>