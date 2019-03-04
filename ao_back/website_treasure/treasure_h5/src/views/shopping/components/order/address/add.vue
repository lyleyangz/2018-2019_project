<template>
 <div class='add'>
    <div class="ul">
        <div class="li">
            <span class="title f-ib">姓名：</span><span class="input f-ib"><input type="text" placeholder="请输入收件人" v-model="params.uName" maxlength="10"></span>
        </div>
        <div class="li">
            <span class="title f-ib">联系电话：</span><span class="input f-ib"><input type="number" v-model="params.phone" placeholder="请输入手机号" maxlength="11" @input="maxlengthFn(params.phone)"></span>
        </div>
        <!-- <div class="li">
            <span class="title f-ib">输入省市：</span><span class="input f-ib"><input type="text" v-model="params.address" placeholder="省份，城市，区县"></span>
        </div> -->
        <div class="li">
            <div class="title f-ib">详细地址：</div>
            <div class="textarea">
                <textarea class="f-ib" v-model="params.address" id="textarea">海市浦东新区华夏东路孙环路德高一村24栋22号332</textarea>
            </div>
        </div>
        <div class="li select">
            <span @click="params.isDefault = '0'" v-if="params.isDefault == '1'"><img src="../../../../../common/assets/images/address/select.png" alt=""></span>
            <span @click="params.isDefault = '1'" v-if="params.isDefault == '0'"><img src="../../../../../common/assets/images/address/noSelect.png" alt=""></span>
            <span>默认地址</span>
        </div>
    </div>
    <div class="btn">
        <mt-button type="primary" @click="submit()">保存</mt-button>
    </div>
 </div>
</template>
 
<script>
import { Toast } from "mint-ui";
import {addAddress,editAddress,detailAddress} from '@/api/api_address.js'
import eventBus from '@/common/eventBus/eventBus.js'
export default {
  data() {
    return {
        params:{
            id:this.$route.query.id,
            uName:"",
            phone:"",
            address:"",
            isDefault:"0"
        }
    };
  },
  created() {
    window.scrollTo(0,0);
    document.title=`${this.params.id?'修改':'新增'}地址`
  },
  mounted() {
      this.getDetailAddress(this.$route.query.id)
  },
  watch: {},
  methods: {
      getDetailAddress(id){
          detailAddress({id:id,isDefault:"0"}).then((res)=>{
              if(res.code == "200"){
                  this.params = {
                        id:res.data.id,
                        uName:res.data.uName,
                        phone:res.data.phone,
                        address:res.data.address,
                        isDefault:"0"
                  }
              }
          })
      },
      maxlengthFn(val){
          if(val.length > 11) {
              this.params.phone = val.slice(0, 11)
          }
      },
      submit(){
          if(!this.params.uName){
              Toast('请输入姓名');
              return false;
          }
          if(!this.params.phone){
              Toast('请输入联系电话');
              return false;
          }
          if(!this.globalFun.phoneCheck(this.params.phone)){
			Toast('手机号格式不正确');
			return false;
		    }
          if(!this.params.address){
              Toast('请输入详细地址');
              return false;
          }
          if(this.params.id){
              editAddress(this.params).then(res => {
                  if(res.code == 200) {
                      Toast('编辑成功');
                      setTimeout(()=> {
                          this.$router.go(-1)
                      },500)
                  }
              })
          }else {
              addAddress(this.params).then(res => {
                  if(res.code == 200) {
                      Toast('新增成功');
                      setTimeout(()=> {
                          this.$router.go(-1)
                      },500)
                  }
                  eventBus.$emit('addressObj',this.params);
              })
          }
      }
  }
};
</script>
<style lang='scss' scoped>
@import "../../../../../common/styles/mixin.scss";
.add {
  background-color: #ffffff;
  min-height: 100vh;
  .ul {
    padding: 1.413333rem .8rem;
    .li {
      padding-top: 0.266667rem;
      .title {
        width: 2rem;
        text-align: right;
      }
      .input {
        width: 70%;
        height: 100%;
        border: 1px solid #949494;
        padding-left: 0.266667rem;
        background-color: #f4f4f4;
        input {
          border: none;
          outline: none;
          -webkit-appearance: none;
          line-height: 0.666667rem;
          width: 100%;
          background-color: #f4f4f4;
          color: #666666;
          @include font-dpr(12px);
        }
      }
      .textarea {
          padding: .16rem 0rem 0rem .426667rem;
        #textarea {
            text-indent: 2em;
          width: 92%;
          height: 2.346667rem;
          padding: .213333rem;
          background-color: #f4f4f4;
          color: #666666;
          @include font-dpr(12px);
          resize:none;
        }
      }
    }
    .select {
        height: 1.2rem;
        padding-top: 0.32rem;
        text-align: right;
        span {
          line-height: 0.693333rem;
          vertical-align: middle;
          img {
            vertical-align: middle;
          }
          &:nth-of-type(3) {
            margin-left: 0.533333rem;
            img {
              width: 0.32rem;
              height: 0.32rem;
            }
          }
          &:nth-of-type(2) {
            @include font-dpr(12px);
            color: #1bc07e;
            margin-left: 0.16rem;
          }
          &:nth-of-type(1) {
            img {
              width: 0.213333rem;
              height: 0.213333rem;
            }
          }
        }
      }
  }
  .btn {
    text-align: center;
    button {
      width: 6.133333rem;
      height: 0.8rem;
      background-color: #1bc07e;
      @include font-dpr(13px);
      color: #fff;
      vertical-align: middle;
    }
  }
}
</style>
 