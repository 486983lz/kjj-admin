<template>
  <div class="position">
    <el-button class="text-btn" type="text" @click="exportImg">导出图片</el-button>
    <div id="myChart-industry"  :style="{width: '100%', height: '545px'}"></div>
  </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                industry: {
                    color: ['#3aa1ff', '#4ecb73', '#fbd437', '#435188'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        bottom: 0,
                        data: ['申报数量', '立项数量', '结题验收数量', '项目终止数量']
                    },
                    grid: {
                        top: '10px',
                        left: 0,
                        right: '20px',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            axisLabel:{
                                align:'center',
                                rotate:'-10',
                                margin:30,
                                textStyle:{
                                    color:"#222"
                                }},
                            data: ['稀土及新材料', '冶金（钢铁、铝业等）', '装备制造', '化工', '电子信息','新能源','节能环保','农牧业','生物技术','医药卫生','社会发展','其他']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '申报数量',
                            type: 'bar',
                            barMaxWidth: '10%',
                            data: [320, 332, 301, 334, 390,320,390, 322, 332, 334, 390,320]
                        },
                        {
                            name: '立项数量',
                            type: 'bar',
                            barMaxWidth: '10%',
                            data: [220, 182, 191, 234, 290,330,320, 132, 301, 434, 360,340]
                        },
                        {
                            name: '结题验收数量',
                            type: 'bar',
                            barMaxWidth: '10%',
                            data: [150, 232, 201, 154, 190,350,370, 332, 361, 374, 340,350]
                        },
                        {
                            name: '项目终止数量',
                            type: 'bar',
                            barMaxWidth: '10%',
                            data: [98, 77, 101, 99, 40,390,300, 332, 331, 334, 290,310]
                        }
                    ]
                },
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initChart()
            })
        },
        methods: {
            initChart() {
                let regionChart = echarts.init(document.getElementById('myChart-industry'))
                regionChart.setOption(this.industry)
            },
            exportImg() {
                let regionChart = echarts.init(document.getElementById('myChart-industry'))
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
