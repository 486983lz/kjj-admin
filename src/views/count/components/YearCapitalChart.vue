<template>
  <div class="position">
    <el-button class="text-btn" type="text" @click="exportImg">导出图片</el-button>
    <div id="yearStageChart" :style="{width: '100%', height: '330px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            yearCapital: {
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
                    data: ['申报资金', '获批资金']
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
                        name: '申报资金',
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
                        name: '获批资金',
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
                    }
                ]
            },

        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    methods: {
        initChart() {
            let tabChart = echarts.init(document.getElementById('yearStageChart'))
            tabChart.setOption(this.yearCapital)
        },
        exportImg() {
            let regionChart = echarts.init(document.getElementById('yearStageChart'))
            let picInfo = regionChart.getDataURL({
                type: 'png',
                pixelRatio: 1.5,
                backgroundColor: '#fff'
            });
            const elink = document.createElement('a');
            elink.download = '统计图';
            elink.style.display = 'none';
            elink.href = picInfo;
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink)
        },
    }
}
</script>

<style lang="scss" scoped>
  .tab-chart {
    background-color: #fff;
    margin-top: 10px;
  }
  .title-chart {
    color: #fff;
    background-color: #409eff;
    display: inline-block;
    height: 35px;
    width: 200px;
    line-height: 35px;
    text-align: center;
    border-radius: 25px;
  }
  .text-btn {
    position: absolute;
    margin-right: 50px;
    height: 40px;
    width: 150px;
    color: rgb(51, 51, 51);
    background-color: rgba(242, 242, 242, 1);
    top: -45px;
    right: 20px;
    z-index: 99999;
  }
  .position {
    position: relative;
    width: 100%;
  }
</style>
