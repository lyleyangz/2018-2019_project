<template>
    <div class="chart-pie" ref="chartPie"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/grid';
    import 'echarts/lib/component/markPoint'
    import utils from '@common/utils';
    import colorOptions from '@common/settings/colorOptions'
    export default {
        props: {
            lbList: {
                type: Array,
                default() {
                    return []
                }
            },
            dataList: {
                type: Array,
                default() {
                    return [
                       
                    ]
                }
            },
            has: {
                type: Boolean,
                default() {
                    return false;
                }
            }
            
        },
        data() {
            return {
                chart: {}
            };
        },
        mounted() {
            this.init();
           
        },
        methods: {  
            init() {
                this.chart = echarts.init(this.$refs.chartPie);
                setTimeout(() => {
                    this.setDefaultOption();
                }, 500);
            },
            // 绘制饼状图
            setDefaultOption(id){
                var _this = this;
                let tooltip = {
                    trigger: 'item',
                    formatter: "{b} {a} <br/> "+_this.$t('fund.balance.pie.lb2')+"：{c}"
                }
                if(!_this.has){
                    tooltip = {
                        trigger: 'item',
                        show: false
                    }
                }
                _this.chart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        top: 20,
                        left:320,
                        data: this.lbList
                    },
                    tooltip : tooltip,
                   
                    series : [{
                        name: _this.$t('fund.balance.pie.lb1')+' CNY', 
                        type: 'pie',
                        radius:'75%',
                        center: this.has?['36%', '50%']:['50%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: !this.has,
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: "#999"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: _this.dataList, // 扇形区域数据
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    
                                    var colorList = [
                                        '#ff5d1e','#ffb648','#e2f0ff','#ffedb2','#8e77f0'
                                    ];
                                    
                                    if(!_this.has){
                                        colorList = [
                                            '#ddd'
                                        ];
                                    }
                                    return colorList[params.dataIndex]
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                })
            }
        },
        components: {}
    }
</script>

<style lang="scss" scoped="scoped">
    .chart-pie {
        width: 100%;
        height: 100%;
    }
</style>