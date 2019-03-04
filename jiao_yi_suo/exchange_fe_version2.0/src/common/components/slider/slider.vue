<template>
    <div class="slider-selfcon-outer" ref="sliderOuter">
        <div class="slider-selfcon f-pr" ref="slider">
            <div class="slider-bg f-pa">
                <span class="point f-db f-pa" :class="{over: sliderVal > 0}"></span>
                <span class="point f-db f-pa" :class="{over: sliderVal >= (1 / 3 * 100)}"></span>
                <span class="point f-db f-pa" :class="{over: sliderVal >= (2 / 3 * 100)}"></span>
                <span class="point f-db f-pa" :class="{over: sliderVal >= 100}"></span>
            </div>
            <div class="slider-con f-pa">
                <Slider @on-input="dragSlider" :value="sliderVal" :min="min" :max="max" :show-tip="`never`" :disabled="maxCoin <= 0"></Slider>
            </div>
            <div class="showval f-pr">
                <div class="min f-fl">0 {{coinType}}</div>
                <div class="max f-fr">{{maxCoin}} {{coinType}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Slider } from 'iview'
    export default {
        props: {
            min: {
                type: Number,
                default() {
                    return 0;
                }
            },
            max: {
                type: Number,
                default() {
                    return 100;
                }
            },
            maxCoin: {
                default() {
                    return 0;
                }
            },
            coinType: {
                type: String,
                default() {
                    return '';
                }
            },
            wareVal: {
                default() {
                    return 0;
                }
            }
        },
        data() {
            return {
                sliderVal: 0
            }
        },
        mounted() {
            // 绕过组件，自定义抛出数据事件
            let button = this.$refs.sliderOuter.getElementsByClassName('ivu-slider-button-wrap')[0];
            button.addEventListener('mousedown', () => {
                document.addEventListener('mousemove', () => {
                    let sliderVal = button.style.left.split('%')[0];
                    this.$emit('update:wareVal', sliderVal);
                })
            });
        },
        methods: {
            dragSlider(v) {
                this.sliderVal  = v;
            },
            setVal(v) {
                this.sliderVal = v;
            }
        },
        components: {
            Slider
        }
    }

</script>

<style lang="scss" scoped="scoped">
    .slider-selfcon-outer {
        padding: 0 6px;
        .slider-selfcon {
            width: 100%;
            height: 36px;
            display: flex;
            align-items: center;
            .slider-bg {
                width: 100%;
                height: 4px;
                border-radius: 2px;
                background-color: #292c33;
                .point {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    top: 50%;
                    background-color: #292c33;
                    &:nth-child(1) {
                        left: 0;
                        transform: translate(-50%, -50%);
                    }
                    &:nth-child(2) {
                        left: 33.3333%;
                        transform: translate(-50%, -50%);
                    }
                    &:nth-child(3) {
                        left: 66.6666%;
                        transform: translate(-50%, -50%);
                    }
                    &:nth-child(4) {
                        right: 0;
                        transform: translate(50%, -50%);
                    }
                    &.over {
                        background-color: #ffd6a5 !important;
                    }
                }
            }
            .slider-con {
                width: 100%;
                z-index: 999;
            }
            .showval {
                width: 100%;
                font-size: 12px;
                padding-top: 44px;
                .min {
                    transform: translateX(-5px);
                }
                .max {
                    transform: translateX(5px);
                }
            }
        }
    }
</style>
<style>
    #app.light .slider-bg, #app.light .slider-bg .point {
        background-color: #f0f0f7;
    }
    .slider-selfcon .ivu-slider-wrap{
        background-color: transparent;
    }
    .slider-selfcon .ivu-slider-button-wrap {
        top: -6px !important;
    }
    .slider-selfcon .ivu-slider-button-wrap .ivu-slider-button {
        width: 14px !important;
        height: 14px !important;
    }
</style>
