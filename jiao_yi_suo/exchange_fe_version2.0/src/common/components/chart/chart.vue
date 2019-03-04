<template>
    <div class="chart" ref="chart"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/candlestick';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/dataZoom';
    import 'echarts/lib/component/grid';
    import 'echarts/lib/component/markLine'
    import colorOptions from '@common/settings/colorOptions'
    import utils from  '@common/utils';
    export default {
        props: {
            chartLang: {
                type: String,
                default() {
                    return 'CN_Sim';
                }
            },
            chartType: {
                type: String,
                default() {
                    return 'candlestick';
                }
            },
            chartData: {
                type: Object,
                default() {
                    return {
                        // 数据：xAxiData为时间戳， exData为[[open,close,lowest,highest]...]数组，barData为[{value:
                        // '', type: ''}...]数组(type是柱状图用以判断涨跌改变颜色)
                        timeData: [],
                        exData: [],
                        barData: []
                    }
                }
            }
        },
        data() {
            return {chart: {}};
        },
        mounted() {
            this.init();
            this.setDefaultOption();
        },
        methods: {
            init() {
                this.chart = echarts.init(this.$refs.chart);
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
            // 将barData转化为带option的数组
            exBarData() {
                let arr = [];
                this
                    .chartData
                    .barData
                    .map(item => {
                        let [color, borderColor] = [];
                        if (item.type === 'equal') {
                            color = colorOptions.barequalCOlor;
                            borderColor = colorOptions.barequalBorderColor;
                        } else if (item.type === 'up') {
                            color = colorOptions.barupColor;
                            borderColor = colorOptions.barupBorderColor;
                        } else {
                            color = colorOptions.downColor;
                            borderColor = colorOptions.bardownBorderColor;
                        }
                        let member = {
                            value: item.value,
                            itemStyle: {
                                normal: {
                                    color: color,
                                    borderColor: borderColor
                                }
                            }
                        }
                        arr.push(member);
                    });
                return arr;
            },
            // 获取线状图的数据
            exLineData() {
                let arr = [];
                this
                    .chartData
                    .exData
                    .map(item => {
                        arr.push(item[1]);
                    });
                return arr;
            },
            setDefaultOption() {
                const _this = this;
                this
                    .chart
                    .setOption({
                        animation: false,
                        grid: [
                            // 上方k线图表
                            {
                                top: 10,
                                left: 0,
                                right: 80,
                                height: 340,
                                zlevel: 9999
                            },
                            // 下方柱状图表
                            {
                                left: 0,
                                right: 80,
                                height: 100,
                                top: 350,
                                zlevel: 999
                            }
                        ],
                        xAxis: [
                            // 上方图表x轴设置
                            {
                                // name: '时间轴',
                                type: 'category',
                                position: 'bottom',
                                griIndex: 0,
                                scale: true,
                                boundaryGap: true,
                                splitLine: {
                                    show: true,
                                    interval: 5,
                                    lineStyle: {
                                        color: ['#f7f8fa']
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#b5b7c2",
                                        width: 1
                                    }
                                },
                                axisLabel: {
                                    show: false
                                },
                                axisTick: {
                                    show: false,
                                    alignWithLabel: true
                                },
                                axisPointer: {
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            // 下方图表x轴设置
                            {
                                // name: '时间轴',
                                type: 'category',
                                position: 'bottom',
                                gridIndex: 1,
                                scale: true,
                                boundaryGap: true,
                                splitLine: {
                                    show: true,
                                    interval: 5,
                                    lineStyle: {
                                        color: ['#f7f8fa']
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    color: '#b5b7c2',
                                    margin: 6,
                                    formatter: function (v, index) {
                                        if (index === 0) { return ''; }
                                        let fDate = utils.dateFormat(v, 'yyyy-MM-dd hh:mm:ss');
                                        let [year, month, day, hour, min, second] = [
                                            fDate.split(' ')[0].split('-')[0],
                                            fDate.split(' ')[0].split('-')[1],
                                            fDate.split(' ')[0].split('-')[2],
                                            fDate.split(' ')[1].split(':')[0],
                                            fDate.split(' ')[1].split(':')[1],
                                            fDate.split(' ')[1].split(':')[2],
                                        ];
                                        if (min !== '00' || hour !== '00') {
                                            return `${day}日 ${hour}:${min}`;
                                        } 
                                        // else if (day !== '01') {
                                        //     if (day[0] === '0') {
                                        //         let val = day.substr(1);
                                        //         return `${val}日`;
                                        //     }
                                        //     return `${day}日`;
                                        // } 
                                        // else if (month !== '01') {
                                        //     if (month[0] === '0') {
                                        //         let val = month.substr(1);
                                        //         return `${val}月`;
                                        //     }
                                        //     return `${day}月`;
                                        // } 
                                        // else {
                                        //     return `${year}年`;
                                        // }
                                        return fDate.split(' ')[0];
                                    }
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
                                axisPointer: {
                                    label: {
                                        formatter: (v) => {
                                            return utils.dateFormat(v.value, 'yyyy-MM-dd hh:mm:ss');
                                        }
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            // 上方图表y轴设置
                            {
                                // name: '报价',
                                scale: true,
                                position: "right",
                                type: 'value',
                                gridIndex: 0,
                                splitNumber: 5,
                                boundaryGap: [
                                    '1%', '0'
                                ],
                                min: (res) => {
                                    return res.min * 0.965;
                                },
                                axisTick: {
                                    show: true,
                                    alignWithLabel: true
                                },
                                axisLabel: {
                                    margin: 6,
                                    color: '#b5b7c2',
                                    formatter: (v, index) => {
                                        if (index !== 0) {
                                            return utils.formatFloat(v, 2);
                                        }
                                    }
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#ccc'
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: ['#f7f8fa']
                                    }
                                }
                            },
                            // 下方图表y轴设置
                            {
                                // name: '成交量',
                                scale: true,
                                position: "right",
                                type: 'value',
                                gridIndex: 1,
                                splitNumber: 2,
                                axisTick: {
                                    show: true,
                                    alignWithLabel: true
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#ccc"
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: ['#f7f8fa']
                                    }
                                },
                                axisLabel: {
                                    // show:false
                                    margin: 6,
                                    color: '#b5b7c2',
                                    formatter: (v, index) => {
                                        if (index !== 0) {
                                            return v;
                                        }
                                    }
                                }
                            }
                        ],
                        // 走势图数据
                        series: [
                            // 上方图表数据（k线）
                            {
                                name: '报价_k',
                                type: 'candlestick',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                itemStyle: {
                                    normal: {
                                        color: colorOptions.upColor,
                                        color0: colorOptions.downColor,
                                        borderColor: colorOptions.upBorderColor,
                                        borderColor0: colorOptions.downBorderColor
                                    }
                                },
                                markLine: {
                                    silent: true,
                                    symbol: 'none',
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    },
                                    label: {
                                        normal: {
                                            formatter: (v) => {
                                                return utils.formatFloat(v.value, 2)
                                            }
                                        }
                                    }
                                }
                            },
                            // 下方图图表数据（柱状）
                            {
                                name: '成交量',
                                type: 'bar',
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                barWidth: '90%',
                                markLine: {
                                    silent: true,
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                color: '#63a3e5',
                                                type: 'solid',
                                                opacity: 0
                                            },
                                            barBorderColor: '#63a3e5',
                                            label: {
                                                formatter: function (params) {
                                                    return utils.formatFloat(params.value, 2);
                                                },
                                                position: 'end',
                                                textStyle: {
                                                    color: '#63a3e5',
                                                    fontSize: 12
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            // 上方纯线状走势图数据
                            {
                                name: '报价_line',
                                type: 'line',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                symbol: 'none',
                                smooth: false, //平滑参数
                                itemStyle: {
                                    normal: {
                                        lineStyle: {
                                            width: 1,
                                            color: '#bbbdc7'
                                        }
                                    }
                                },
                                markLine: {
                                    silent: true,
                                    symbol: 'none',
                                    lineStyle: {
                                        normal: {
                                            width: 1
                                        }
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts
                                            .graphic
                                            .LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: '#f6f7f8'
                                                }, {
                                                    offset: 1,
                                                    color: '#f6f7f8'
                                                }
                                            ])
                                    }
                                }
                            }
                        ],
                        // 缩放组件，用的inside模式，即动作在表本身发生会导致缩放触发，不会有额外的缩放条
                        dataZoom: [
                            {
                                type: 'inside',
                                xAxisIndex: [
                                    0, 1
                                ],
                                minValueSpan: 10,
                                // maxValueSpan: 200
                            }
                        ],
                        // 标线和刻度文本
                        axisPointer: {
                            lineStyle: {
                                type: 'dashed'
                            },
                            link: {
                                xAxisIndex: [0, 1]
                            },
                            label: {
                                backgroundColor: '#777'
                            }
                        },
                        // 鼠标指到走势图上时显示的信息
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            },
                            showContent: true,
                            // alwaysShowContent: true,
                            position: [
                                -5, -5
                            ],
                            backgroundColor: 'transparent',
                            padding: 0,
                            textStyle: {
                                fontSzie: 10,
                                color: '#333'
                            },
                            padding: 10,
                            formatter: function (v) {
                                let [open, close, lowest, highest, createTime, volume] = [];
                                createTime = utils.dateFormat(v[0].axisValue, 'yyyy-MM-dd hh:mm:ss');
                                v.map(item => {
                                    if (item.componentSubType === 'candlestick') {
                                        [, open, close, lowest, highest] = [...item.data];
                                    } else if (item.componentSubType === 'bar') {
                                        volume = item.data.value;
                                    } else if (item.componentSubType === 'line') {
                                        [open, close, lowest, highest] = [..._this.chartData.exData[item.dataIndex]];
                                    }
                                });
                                let color = v[1].color;
                                let html = `
                                    <span>开=</span><span style="color: ${color}">${open}</span>
                                    <span>收=</span><span style="color: ${color}">${close}</span>
                                    <span>低=</span><span style="color: ${color}">${lowest}</span>
                                    <span>高=</span><span style="color: ${color}">${highest}</span>
                                `;
                                return html;
                            }
                        },
                        // 禁用工具栏
                        toolbox: {
                            show: false
                        }
                    });
            },
            resize(params = {}) {
                this.chart.resize(params);
            },
            refreshChart() {
                const _this = this;
                const markLineColor = _this.chartData.exData[_this.chartData.exData.length - 1][1] >= _this.chartData.exData[_this.chartData.exData.length - 1][0]? colorOptions.upColor: colorOptions.downColor;
                this
                    .chart
                    .setOption({
                        xAxis: [
                            {
                                // name: '时间轴',
                                griIndex: 0,
                                data: _this.chartData.timeData
                            }, {
                                // name: '时间轴',
                                data: _this.chartData.timeData
                            }
                        ],
                        series: [
                            {
                                name: '报价_k',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data: _this.chartType === 'candlestick'? _this.chartData.exData: [],
                                markLine: {
                                    lineStyle: {
                                        normal: {
                                            color: markLineColor
                                        }
                                    },
                                    data: [
                                        {
                                            yAxis: _this.chartData.exData.length > 0 && _this.chartType === 'candlestick'? utils.formatFloat(_this.chartData.exData[_this.chartData.exData.length - 1][1], 2): '',
                                            name: '现价'
                                        } //显示当前最新值
                                    ]
                                },
                            }, {
                                name: '报价_line',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                data: _this.chartType === 'line'? _this.exLineData(): [],
                                markLine: {
                                    lineStyle: {
                                        normal: {
                                            color: markLineColor
                                        }
                                    },
                                    data: [
                                        {
                                            yAxis: _this.exLineData().length > 0 && _this.chartType === 'line'? utils.formatFloat(_this.exLineData()[_this.exLineData().length - 1]): '',
                                            name: '现价'
                                        } //显示当前最新值
                                    ]
                                }
                            }, {
                                name: '成交量',
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                data: _this.exBarData()
                            }
                        ]
                    });
            }
        },
        components: {}
    }
</script>

<style lang="scss" scoped="scoped">
    .chart {
        // width: 800px;
        height: 100%;
    }
</style>