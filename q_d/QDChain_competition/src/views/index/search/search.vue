<template>
  <div class="user-input">
    <div class="explorer-show">
        <div class="text">
            <h1>权盾链 Power Shield Chain</h1>
            <h3>
                <span class="span1"></span>
                原创守护者
                <span class="span2"></span>
            </h3>
        </div>
        <div class="input-search">
            <input v-model="value" placeholder="请输入txid丶文章地址"></input>
            <span class="input-search-icon" @click = "searchUserInput(value)"></span>
        </div>
    </div>
  </div>
</template>

<script>
import {search} from "../../../api/api_group.js";

export default {
  components: {},
  data() {
    return {
      value: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    searchUserInput(value) {
      if (!!this.value) {
        let params = {
          search:value
        }
        search(params).then((res)=> {
            try{
              this.$emit("searchResult",res)
            }catch(err){
              console.log(res.errMsg)
            }
        })
      }
    }
  }
};
</script>

<style lang="scss" scpoed>
.user-input {
    .explorer-show{
        .text {
          text-align: center;
          padding: 30px 0px 10px 0px;
          margin-bottom: 88px;
          h1 {
            font-family: "MicrosoftYahei";
            font-size: 56px;
            color: #ffffff;
            margin-bottom: 10px;
            margin-right: 20px;
            font-weight: lighter;
          }
          h3 {
            font-family: "MicrosoftYahei";
            font-size: 24px;
            color: #ffffff;
            font-weight: lighter;
            .span1 {
              margin-right: 30px;
            }
            .span2 {
              margin-left: 30px;
            }
            span {
              vertical-align: middle;
              border: 1px solid #ffffff;
              display: inline-block;
              width: 250px;
            }
          }
        }
        .input-search {
          margin: 0 auto;
          width: 840px;
          position: relative;
          margin-bottom: 220px;
          input{
              border: 1px solid #ffffff;
              border-radius: 5px;
              width: 840px;
              height: 56px;
              background-color: rgba(255, 255, 255, 0.5);
              overflow: hidden;
              padding-left:24px;
          }
          ::-webkit-input-placeholder{
              color: #1c2e67;
              font-size: 18px;
              font-family: 'MicrosoftYahei';
              line-height: 56px;
          }
          .input-search-icon{
              top: 2px;
              width: 60px;
              height: 50px;
              display: inline-block;
              position: absolute;
              right: 10px;
              vertical-align: middle;
              background: url("../../../common/assets/images/seek.png") center center no-repeat;
              // background-size: contain;
              cursor: pointer;
          }
        }
    }
}
</style>
