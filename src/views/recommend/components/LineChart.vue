<template>
  <div id="myChart-line" class="myChart"  :style="{width: '100%', height: '245px'}"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                line :{
                    tooltip: {
                        trigger: 'axis',
                        axisPointer:{
                            type: 'none'
                        },
                        // backgroundColor:'#fff',
                        textStyle:{
                            color:'#666',
                            height:80,
                            lineHeight:80,

                        },
                        extraCssText:'background:rgba(255,255,255,0.8); box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                        padding:[10, 20,10, 20]
                    },
                    legend: {
                        bottom: 0,
                        data: ['上报', '储备', '立项', '结题', '终止']
                    },
                    grid: {
                        top: '3%',
                        left: '3%',
                        right: '4%',
                        bottom: '13%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },

                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:'dashed'
                            }
                        }

                    },
                    series: [
                        {
                            name: '上报',
                            type: 'line',
                            data: [120, 132, 101, 134, 90, 230, 210],
                            itemStyle: {
                                normal: {
                                    color: '#1890ff',
                                    lineStyle:{
                                        width:4//设置线条粗细
                                    }
                                }
                            },
                        },
                        {
                            name: '储备',
                            type: 'line',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            itemStyle: {
                                normal: {
                                    color: '#2fc25b',
                                    lineStyle:{
                                        width:4//设置线条粗细
                                    }
                                }
                            },
                        },
                        {
                            name: '立项',
                            type: 'line',
                            data: [150, 232, 201, 154, 190, 330, 410],
                            itemStyle: {
                                normal: {
                                    color: '#facc14',
                                    lineStyle:{
                                        width:4//设置线条粗细
                                    }
                                }
                            },
                        },
                        {
                            name: '结题',
                            type: 'line',
                            data: [320, 332, 301, 334, 390, 330, 320],
                            itemStyle: {
                                normal: {
                                    color: '#223273',
                                    lineStyle:{
                                        width:4//设置线条粗细
                                    }
                                }
                            },
                        },
                        {
                            name: '终止',
                            type: 'line',
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            itemStyle: {
                                normal: {
                                    color: '#8543e0',
                                    lineStyle:{
                                        width:4//设置线条粗细
                                    }
                                }
                            },
                        }
                    ]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },

        methods: {
            initChart() {
                let me = this;
                let mylineChart = echarts.init(document.getElementById('myChart-line'))
                mylineChart.setOption(this.line)
            }
        }
    }
</script>
