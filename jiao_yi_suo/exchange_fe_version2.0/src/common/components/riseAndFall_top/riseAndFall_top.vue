<template>
    <div class="riseandfall" ref="riseandfall">
        <!-- loop 会导致重叠，暂时去掉 -->
        <div class="swiper-container">
            <div class="swiper-wrapper carousel">
                <div class="swiper-slide f-pr CarouselItem"  v-for="(item, index) in showDataList" :key="index">
                    <ul class="list">
                        <li class="list-member f-fl" v-for="(ditem, dindex) in item" :key="dindex" v-if="!coldingCurrencyList.contractType.includes(ditem.contractType)">
                            <div class="contract-type">
                                <span>{{ditem.contractTypeStr}}</span>
                            </div>
                            <div class="current">
                                <span class="num" :class="ditem.colorClass" v-if="ditem.current">{{ditem.current.split('/')[0] | formatFloat(decimalDigits.contractType[ditem.contractType].price)}}</span>
                            </div>
                            <span class="uptriangle" :class="ditem.colorClass" v-if="ditem.colorClass === 'upColor'"></span>
                            <span class="downtriangle" :class="ditem.colorClass"  v-if="ditem.colorClass === 'downColor'"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getKinfoList } from '@api/api_group';
    import eventBus from '@common/eventBus/eventBus';
    import BCarousel from 'iview/src/components/carousel';
    import BCarouselItem from 'iview/src/components/carousel-item';
    import contractTypeGroup from "@common/settings/contractTypeGroup";
    import decimalDigits from '@common/settings/decimalDigits';
    import coldingCurrencyList from '@common/settings/coldingCurrencyList';
    import Swiper from '@common/assets/js/swiper.js';
    import 'swiper/dist/css/swiper.css';
    export default {
        props: {
            exchangeType: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                showDataList: [],
                kInfoData: {},
                requestFlag: true,
                contractTypeGroup: contractTypeGroup,
                decimalDigits: decimalDigits,
                coldingCurrencyList: coldingCurrencyList,
                swiper:{}
            }
        },
        mounted(){
            
           
        },
        created() {
            this.getKinfoList((data) => {
                this.refreshData();
                eventBus.$emit('riseAndFallUpdate', data);
                this.$nextTick(() => {
                    this.initSwiper();
                });
            });
            setInterval(() => {
                if (!this.requestFlag) { return; };
                this.getKinfoList((data) => {
                    this.refreshData();
                    eventBus.$emit('riseAndFallUpdate', data);
                });
            }, 2000);
        },
        methods: {
            initSwiper(){
                this.swiper = new Swiper('.swiper-container', {
                    // autoplay:true,//等同于以下设置
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop : true,
                });
            },
            getKinfoList(callback) {
                this.requestFlag = false;
                getKinfoList().then((res) => {
                    this.requestFlag = true;
                    if (res.success) {
                        this.kInfoData = res.data.transactionInfo;
                        for (let i in this.kInfoData) {
                            this.kInfoData[i].forEach((element) => {
                                element.contractTypeStr = `${this.contractTypeGroup[element.contractType].split('_')[1]}/${this.contractTypeGroup[element.contractType].split('_')[0]}`;
                                if (element.change !== '--') {
                                    element.colorClass = element.change.split('%')[0] - 0 >= 0? 'upColor': 'downColor';
                                }
                            });
                        }
                        if (callback) {
                            callback(this.kInfoData);
                        }
                    }
                });
            },
            refreshData() {
                let showDataList = [];
                for (let i in this.kInfoData) {
                    if (this.exchangeType.includes(i)) {
                        this.kInfoData[i].forEach((element) => {
                            showDataList.push(element);
                        });
                    }
                }
                const SplitArray = (length, arr) => {
                    var R = [],F;
                    for (F = 0;F < arr.length;) R.push(arr.slice(F,F += length))
                    return R
                }
                this.showDataList = SplitArray(6, showDataList);
            },
            // 计算比例
            calculateRate(open, close) {
                let val = (close - open) / open; 
                return val >= 0? `+${this.globalFun.formatFloat(val * 100, 2)}%`:  `${this.globalFun.formatFloat(val * 100, 2)}%`
            },
        },
        components: {
            'b-carousel': BCarousel,
            'b-carouselItem': BCarouselItem
        }
    }

</script>

<style lang="scss" scoped="scoped">
    @import '../../settings/colorOptions.scss';
    .riseandfall {
        width: 100%;
        height: 30px;
        left: 0;
        top: 0;
        background-color: #222222;
        .carousel {
            width: 100%;
            height: 100%;
            .CarouselItem {
                height: 100% !important;
                .list-member {
                    // width: 16.666666%;
                    height: 30px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                    .contract-type {
                        font-size: 14px;
                        color: #ffffff;
                        font-weight: 100;
                    }
                    .current {
                        font-size: 14px;
                        margin-left: 15px;
                    }
                    .uptriangle {
                        width: 0; 
                        height: 0; 
                        border-left: 4px solid transparent; 
                        border-right: 4px solid transparent; 
                        border-bottom: 10px solid $upColor; 
                        transform: translateY(-1px);
                        margin-left: 5px;
                    }
                    .downtriangle {
                        width: 0; 
                        height: 0; 
                        border-left: 4px solid transparent; 
                        border-right: 4px solid transparent; 
                        border-top: 10px solid $downColor; 
                        transform: translateY(-1px);
                        margin-left: 5px;
                    }
                }
            } 
        }
    }
</style>
