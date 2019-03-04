<style lang="less" scoped>
    @import '../../../common/styles/common.less';
    @import 'index.less';
</style>


<template>
    <div class="preview" v-if="obj.is" @click="close">
        <div class="cnt">
            <div class="left" @click.stop="left"></div>
            <div class="imgList" ref="imgList">
                <img :src="imgList[currIndex]" :style="`width:`+imgObj.width+`;height:`+imgObj.height">
            </div>
            <div class="right" @click.stop="right"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-preview',
    props: {
        obj:{
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    data () {
        return {
            imgList : [],
            imgObj:{
                width:0,
                height:0
            },
            currIndex: 0
        };
    },
    methods: {
        left(){
            if(this.currIndex == 0){
                this.$Message.info('已经是第一个');
                return false;
            }
            this.currIndex = this.currIndex - 1;
            this.setImg();
        },
        right(){
            if(this.currIndex == this.imgList.length-1){
                this.$Message.info('已经是最后一个');
                return false;
            }
            this.currIndex = this.currIndex+1;
            this.setImg();
        },
        setImg(){
            var height = document.documentElement.clientHeight;
            var width = this.$refs.imgList.offsetWidth;
            var ratio = width/height;
            var img = new Image();
            img.src = this.imgList[this.currIndex];
            var _this = this;
            img.onload = function(){
                if(img.width < width*0.9 && img.height < height*0.9){
                    _this.imgObj = {
                        width: img.width + "px",
                        height: img.height + "px"
                    }                    
                }else {
                    var r = img.width / img.height;
                    if(ratio>r){
                        _this.imgObj = {
                            width: "auto",
                            height: (height*0.9)+"px"
                        }   
                    }else if(ratio==r){
                        _this.imgObj = {
                            width: (width*0.9) + "px",
                            height: (height*0.9)+"px"
                        }  
                    }else{
                        _this.imgObj = {
                            width: (width*0.9) + "px",
                            height: "auto"
                        }   
                    }
                }
            }
        },
        close(){
            this.obj.is = false;
        }
    },
    mounted () {
        console.log(1111)
        this.imgList = this.obj.list;
        
        this.currIndex = this.obj.curr;
        this.setImg();
        
    }
};
</script>
