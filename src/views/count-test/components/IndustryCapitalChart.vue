<template>
  <div class="position">
    <el-button class="text-btn" type="text" @click="exportImg">导出图片</el-button>
    <div id="myChart-industry-capital"  :style="{width: '100%', height: '650px'}"></div>
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
                        // data: ['申请资金总数', '获批资金总数']
                        data: ['获批资金总数']
                    },
                    grid: {
                        top: '10px',
                        left: '0',
                        right: '30px',
                        containLabel: true

                    },
                    xAxis: {
                        type: 'value',
                    },
                    yAxis: {
                        type: 'category',
                        data: ['稀土及新材料1', '冶金（钢铁、铝业等）', '装备制造', '化工', '电子信息','新能源','节能环保','农牧业','生物技术','医药卫生','社会发展','其他'],
                        nameTextStyle:{
                            fontStyle:'oblique'
                        }
                    },
                    series: [
                        {
                            name: '申请资金总数',
                            type: 'bar',
                            barMaxWidth: '25%',
                            data: [18203, 23489, 29034, 104970, 131744, 630230,18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        // {
                        //     name: '获批资金总数',
                        //     type: 'bar',
                        //     barMaxWidth: '25%',
                        //     data: [19325, 23438, 31000, 121594, 134141, 681807,18203, 23489, 29034, 104970, 131744, 630230]
                        // }
                    ]
                },
            }
        },
        mounted() {
            this.getIndustryCapitalCount();
            // this.$nextTick(function () {
            //     this.initChart()
            // })
        },
        methods: {
            getIndustryCapitalCount(){
                this.$store.dispatch('count/getIndustryCapitalCount')
                    .then((response) => {
                        let xAxisData = [];
                        let seriesData = [];
                        for(let i=0;i<response.length; i++){
                            xAxisData.push(response[i].industry_name);
                            seriesData.push(response[i].count);
                        }
                        this.industry.xAxis[0].data = xAxisData
                        this.industry.series[0].data = seriesData
                        this.$nextTick(function () {
                            this.initChart()
                        })
                    })
                    .catch(() => {

                    });
            },
            initChart() {
                let regionChart = echarts.init(document.getElementById('myChart-industry-capital'))
                regionChart.setOption(this.industry)
            },
            exportImg() {
                let regionChart = echarts.init(document.getElementById('myChart-industry-capital'))
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
