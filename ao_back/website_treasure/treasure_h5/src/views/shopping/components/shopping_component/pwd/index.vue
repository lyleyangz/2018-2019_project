<template>
<div class="modal" @click="pwdClose">
  <div class="pay-tool"  @click.stop="fun()">
    <div class="pay-tool-title border-bottom">
        <div>输入钱包支付密码</div>
    </div>
    <div class="pay-tool-content">
      <div class="pay-tool-inputs">
        <div class="item" v-for="(index,i) in items">
        		<span v-show="Span>index-1">●</span>
        </div>
      </div>
    </div>
    <div class="forget" @click="forget">忘记密码</div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click.stop="keyUpHandle($event,index)" v-for="(val,index) in keys">
          {{ val }}
        </li>
        <li class="del" @click.stop="delHandle"><span class="icon-del"><</span></li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import eventBus from "../../../../../common/eventBus/eventBus.js";
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  // let sendFlag = true // 防止重复发送密码
  export default {
    props: {
        pwdObj: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    
    data () {
      return {
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
       	Span:-1,
        password: []
      }
    },
    created() {
      
      
    },
    methods: {
      fun(){

      },
    	hello(){
    		  this.$emit('change-type');
    	},
      keyUpHandle (e) {
        let text = e.currentTarget.innerText
        let len = this.password.length
        if (!text || len >= 6) return
        this.password.push(text)
        this.Span=len;
        this.ajaxData()
      },
      delHandle () {
        if (this.password.length <= 0) return false
        this.password.shift()
        this.Span--;
      },
      ajaxData () {
        if (this.password.length >= 6) {
          var val = parseInt(this.password.join(' ').replace(/\s/g, ''));
          eventBus.$emit("pwdOver",val)

          // console.log(parseInt(this.password.join(' ').replace(/\s/g, '')));
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      },
      pwdClose(){
        eventBus.$emit("pwdClose")
      },
      forget(){
        window.android_client.goResetPayPwd();
      }
    }
  }
</script>
 
<style lang="scss" scoped>
@import "../../../../../common/styles/mixin.scss";
  .modal{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4)
  }
  .pay-tool {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    &-title {
      width: 100%;
      padding: .666667rem 0;
      text-align: center;
      @include font-dpr(14px);
      
    }
    &-content {
      padding: 0 1.653333rem;
      .pay-tool-inputs {
        width: 100%;
        height: 1.093333rem;
        border: 1px solid #b9b9b9;
        
        display: flex;
        .item {
          width: 100%;
          border-right: 1px solid #b9b9b9;
          line-height: 1.093333rem;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: inline-block;
            width: 0.51111111rem;
            height: 0.51111111rem;
            background-size: cover;
          }
        }
      }
 
    }
    .forget{
      padding: 0 1.653333rem;
      text-align: right;
      margin: .2rem 0 .906667rem 0;
      color: #16b773;
    }
    .pay-tool-keyboard {
      
    
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33.1%;
          height: 1.3rem;
          line-height: 1.3rem;
          text-align: center;
          border-right: 1px solid #aeaeae;
          border-bottom: 1px solid #aeaeae;
          @include font-dpr(20px);
          font-weight: bold;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
      }
    }
  }
</style>