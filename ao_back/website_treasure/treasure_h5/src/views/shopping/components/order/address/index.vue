<template>
 <div class='address'>
    <div class="ul">
       <div class="li" @click="setDefault(item)" v-for="(item,index) of addressList" :key="index" :class="item.isDefault=='1'?'active':''">
            <div class="select">
                <span @click.stop="setDef(item)" >
                    <img v-if="item.isDefault=='1'" src="../../../../../common/assets/images/address/select.png" alt="">
                    <img v-if="item.isDefault!='1'" src="../../../../../common/assets/images/address/noSelect.png" alt="">
                </span>
                <span>默认地址</span>
                <span @click.stop ="$router.push({path:'/address/addAddress',query:{id:item.id}})"><img src="../../../../../common/assets/images/address/edit.png" alt=""></span>
            </div>
            <div class="info">
                <div class="info_left f-dib">
                    <p class="img"><img src="../../../../../common/assets/images/address/contacts.png" alt=""></p>
                    <p class="name">{{item.uName}}</p>
                </div>
                <div class="info_right f-dib">
                    <p>联系电话：{{item.phone}}</p>
                    <p>收货地址：{{item.address}}</p>
                </div>
            </div>
        </div>
        
    </div>
    <div class="btn">
        <mt-button type="primary" @click="$router.push({name:'addAddress'})"><i class="icon f-dib"></i>新建地址</mt-button>
    </div>

 </div>
</template>
 
<script>
import { getList, defalutAddress } from "@/api/api_address.js";
import { Toast } from "mint-ui";
import eventBus from "@/common/eventBus/eventBus.js";
export default {
  data() {
    return {
      current: "",
      outside: this.$route.query.outside,
      addressList: []
    };
  },
  created() {
      window.scrollTo(0,0);
    document.title='地址管理'
    
  },
  mounted() {
      var token = this.$route.query.token;
      if(token){
          sessionStorage.setItem("token",token)
      }
      this.init()
  },
  watch: {},
  methods: {
      init() {
          this.getList();this.getList();
      },
    getList() {
      getList().then(res => {
        if (res.code == 200) {
          this.addressList = res.data || [];
        }
      });
    },
    setDefault(item) {
      if (this.outside) {
        eventBus.$emit("addressObj", item);
        this.$router.go(-1);
      }
    },
    setDef(item) {
      if (item.isDefault != 1) {
        defalutAddress({
          id: item.id
        }).then(res => {
          if (res.code == 200) {
            Toast("设置默认成功");
            this.getList();
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../../../../../common/styles/mixin.scss";
.address {
  background-color: #f4f4f4;
  min-height: 100vh;
  .ul {
      overflow: hidden;
    .li {
      background-color: #fff;
      padding-bottom: .533333rem;
      border-radius: 0.106667rem;
      margin: 0.533333rem 0.106667rem;
      &:nth-of-type(1){
      margin-top: .266667rem;          
      }
      &.active {
        box-shadow: 2px 2px 10px 2px rgba(27, 192, 126, 0.01),
          2px -2px 10px 2px rgba(27, 192, 126, 0.01),
          -2px 2px 10px 2px rgba(27, 192, 126, 0.3),
          -2px -2px 10px 2px rgba(27, 192, 126, 0.01);
      }
      .select {
        height: 1.2rem;
        padding: 0.32rem 0.586667rem 0rem 0rem;
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
      .info {
        display: flex;
        .info_left {
          vertical-align: top;
          height: 100%;
          padding:0 .533333rem;
          flex: 1;
          .img {
              text-align: center;
            img {
              width: .96rem;
            }
          }
          .name {
            text-align: center;
            color: #333;
            @include font-dpr(13px);
            line-height: 0.293333rem;
            padding-top: 0.266667rem;
          }
        }
      }
      .info_right {
        vertical-align: top;
        width: 5.706667rem;
        flex: 4;
        padding-right: .533333rem;
        p {
          color: #333;
          @include font-dpr(13px);
          width: 100%;
          &:nth-of-type(1) {
            padding-bottom: 0.48rem;
          }
          &:nth-of-type(2) {
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
    }
  }
  .btn {
    text-align: center;
    padding: 0.88rem;
    button {
      width: 6.133333rem;
      height: 0.8rem;
      background-color: #1bc07e;
      @include font-dpr(13px);
      color: #fff;
      vertical-align: middle;
      .mint-button-text {
        vertical-align: middle;
      }
      .icon {
        width: 0.373333rem;
        height: 0.393333rem;
        background: url("../../../../../common/assets/images/address/add.png")
          no-repeat;
        background-size: 100%;
        vertical-align: middle;
        margin-right: 0.213333rem;
      }
    }
  }
}
</style>
 