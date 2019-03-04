<template>
    <div class="chart-depth" ref="chartDepth"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/grid';
    import 'echarts/lib/component/markPoint'
    import utils from '@common/utils';
    import colorOptions from '@common/settings/colorOptions'
    export default {
        props: {
            chartLang: {
                type: String,
                default() {
                    return 'CN_Sim'
                }
            },
            chartData: {
                type: Object,
                default() {
                    return {
                        //需求数据data{buy: [[委托价格，委托量]...], sell：[]};
                        buy: [],
                        sell: [],
                    }
                }
            }
        },
        data() {
            return {chart: {}, colorOption: colorOptions, symbol: require('./images/depth_point.png')};
        },
        mounted() {
            this.init();
            setTimeout(() => {
                this.setDefaultOption();
            }, 100);
        },
        methods: {
            init() {
                this.chart = echarts.init(this.$refs.chartDepth);
            },
            showToolTip() {
                const _this = this;
                this
                    .chart
                    .dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: _this.chartData.exData.length - 1
                    });
            },
            setDefaultOption() {
                // console.log(JSON.stringify(this.chartData))
                const _this = this;
                this
                    .chart
                    .setOption({
                        animation: false,
                        grid: [
                            {
                                top: 30,
                                left: 30,
                                // right: 50,
                                // height: 320,
                                bottom: 20,
                                zlevel: 999
                            },
                        ],
                        xAxis: [
                            // x轴设置
                            {
                                // name: '时间轴',
                                type: 'value',
                                position: 'bottom',
                                gridIndex: 0,
                                scale: true,
                                splitNumber: 3,
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    show: true,
                                    color: '#b5b7c2',
                                    margin: 6,
                                    formatter: function (v, index, k) {
                                        if (index === 0) { return ''; }
                                        return v;
                                    }
                                },
                                axisTick: {
                                    show: true,
                                    alignWithLabel: true,
                                    formatter: function (v, index) {
                                        if (index == 0) { return false; }
                                        return true;
                                    }
                                },
                                axisLine: {
                                    onZero: false,
                                    lineStyle: {
                                        color: "#b5b7c2",
                                        width: 1
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            // 上方图表y轴设置
                            {
                                // name: '报价',
                                show: true,
                                scale: true,
                                position: "right",
                                type: 'value',
                                gridIndex: 0,
                                splitLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: true,
                                    alignWithLabel: true
                                },
                                axisLine: {
                                    onZero: false,
                                    lineStyle: {
                                        color: "#b5b7c2",
                                        width: 1
                                    }
                                },
                                axisLabel: {
                                    margin: 6,
                                    color: '#b5b7c2',
                                    formatter: (v, index) => {
                                        if (index !== 0) {
                                            return (utils.formatFloat(v, 2));
                                        }
                                    }
                                }
                            }
                        ],
                        // 走势图数据
                        series: [
                            // 买入委托
                            {
                                name: '买入',
                                type: 'line',
                                // smooth: 0.5,
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                lineStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: '#ff4444',
                                        opacity: 0.3
                                    }
                                },
                                symbol: `image://${_this.symbol}`,
                                symbolSize: 18,
                                showSymbol: false
                            },
                            {
                                name: '卖出',
                                type: 'line',
                                // smooth: 0.5,
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                lineStyle: {
                                    normal: {
                                        opacity: 0
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: '#00b38a',
                                        opacity: 0.3
                                    }
                                },
                                symbol: `image://${_this.symbol}`,
                                symbolSize: 18,
                                showSymbol: false
                            }
                        ],
                        // 鼠标指到走势图上时显示的信息
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line',
                                lineStyle: {
                                    opacity: 0
                                }
                            },
                            backgroundColor: '#ffffff',
                            extraCssText: 'box-shadow: 0 0 4px #ebebeb;width: 174px;height: 76px;',
                            textStyle: {
                                color: '#61688a'
                            },
                            formatter: (v) => {
                                let html = `
                                <div style="width: 100%; height: 100%;">
                                    <p style="margin-top: 5px;text-indent: 10px;height: 28px;line-height: 28px">
                                        <span style="margin-right: 35px;">委托价</span>${v[0].data[0]}
                                    </p>
                                    <p style="text-indent: 10px;height: 28px;line-height: 28px">
                                        <span style="margin-right: 35px;">累计</span>${v[0].data[1]}
                                    </p>
                                </div>    
                                `;
                                return html;
                            }
                        },
                        // 禁用工具栏
                        toolbox: {
                            show: false
                        },
                        // 开启动画
                        animation: true
                    });
            },
            refreshChart() {
                const _this = this;
                
                _this.chartData.sell.reverse();
                this
                    .chart
                    .setOption({
                        xAxis: [
                            {
                                scale: true,
                                min: _this.chartData.buy.length > 0? _this.chartData.buy[_this.chartData.buy.length - 1][0]: 0,
                                max: _this.chartData.sell.length > 0? _this.chartData.sell[0][0]: 0
                            }
                        ],
                        series: [
                            {
                                name: '买入',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data: _this.chartData.buy
                            }, {
                                name: '卖出',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data: _this.chartData.sell
                            }
                        ]
                    });
            }
        },
        components: {}
    }
</script>

<style lang="scss" scoped="scoped">
    .chart-depth {
        width: 100%;
        height: 100%;
    }
</style>