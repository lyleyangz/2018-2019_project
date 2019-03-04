<template>
    <div class="interlocution">
        <div class="banner"></div>
        <div class="cnt">
            <div class="cnt-left" :class="menuList?'':'loading'">
                <div class="menuList" :class="currIndex === index?'open':''" v-for="(item,index) of menuList" :key="index"  @click.stop="openMneu(index,item.type)">
                    <div class="title">{{item.type}}</div>
                    <ul class="subList">
                        <li :class="(subCurrIndex === index+'-'+subIndex)?'active':''" v-for="(subItem,subIndex) of item.titleList  " :key="subIndex" @click.stop="checkItem(subItem,index,subIndex)">
                            {{subItem.title}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cnt-right" :class="info?'':'loading'">
                 <div class="title" v-if="info">{{info.title}}</div>
                <div class="answer" v-if="info" v-html="info.answer"></div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@common/utils";
import { getInterlocutionType,getInterlocutionTitle,getInterlocutionInfo } from "@api/api_interlocution";

export default {
    data() {
        return {
            currIndex: 0,
            subCurrIndex: "0-0",
            menuList:null,
            subList:[],
            info: null
        };
    },
    created() {
        document.title = "百问百答 - 国家大数据专业委员会官网";
        this.getType();
    },
    methods: {
        getType(){
            var _this = this;
            getInterlocutionType().then(res=>{
                if(res.code == 200){
                    this.$Spin.hide();
                    _this.menuList = res.data;    
                    _this.getInfo(_this.menuList[0].titleList[0].id);
                }else {
                    this.$Spin.hide();
                }
            });
        },
        getInfo(id){
            this.info = null;
            getInterlocutionInfo({
                id: id
            }).then(res=>{
                if(res.code == 200){
                    this.info = res.data || null;
                }
            });
        },
        openMneu(index,type){
            if(this.currIndex != index){
                this.currIndex = index;
            }
        },
        checkItem(item,index,subIndex){
            
            var subCurrIndex = index+"-"+subIndex;
            if(this.subCurrIndex != subCurrIndex){
                this.subCurrIndex = subCurrIndex;
                this.getInfo(item.id);
            }
            
        }
    }
};
</script>
<style lang="scss" scoped="scoped">

.interlocution{
    .banner{
        background: url('../../../../common/assets/images/interlocution.jpg');
        width: 100%;
        height: 582px;
    }
    .cnt{
        display: flex;
        width: 1200px;
        margin: 40px auto 200px auto;
        .cnt-left{
            width: 338px;
            min-height: 680px;
            background-color: #f6f6fb;
            margin-right: 20px;
            .menuList{
                .title{
                    height: 58px;
                    line-height: 58px;
                    font-size: 16px;
                    margin: 0 25px;
                    color: #333;
                    padding: 0 23px;
                    border-top: 1px solid #ccc;
                    cursor: pointer;

                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                &:nth-child(1){
                    .title{
                        border-top: 0;
                    }
                }
                .subList{
                    display: none;
                    li{
                        height: 44px;
                        line-height: 44px;
                        font-size: 14px;
                        padding: 0 24px 0 48px;
                        color: #666;
                        cursor: pointer;
                        &.active{
                            background: #eee;
                        }
                        &:hover{
                            background: #eee;
                        }
                        word-break: break-all;
                        word-wrap: break-word;
                        font-size: 14px;                      
                      
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
                &.open{
                    .subList{
                        display: block;
                    }
                }
                
            }
        }
        .cnt-right{
            flex: 1;
            min-height: 680px;
            background: #f6f6fb;
            padding: 60px 56px;
            min-height: 680px;
            .title{
                font-size: 16px;
                color: #333;
            }
            .answer{
                margin-top: 22px;
                font-size: 14px;
                color: #666;
                word-break:break-all;
                word-wrap:break-word;
                white-space:pre-wrap;
            }
        }
    }
}
</style>