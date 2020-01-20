<template>
  <el-row  class="add-bg-box tab-chart">
    <el-col :span="24" >
      <el-tabs tab-position="left" class="tab-chart-tabs" style="height: 420px;">
        <el-tab-pane label="地域地区项目统计" style="width: 100%;" ref="barEcharts" >
          <el-row  class="tab-chart">
            <el-col :span="14" >
              <div id="tabChart" :style="{width: '100%', height: '420px'}"></div>
            </el-col>
            <el-col :span="10">
              <el-table
                      :data="tableData"
                      stripe
                      style="width: 100%">
                <el-table-column
                        prop="date"
                        label="行业领域"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="数量"
                        align="center"
                        >
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="行业领域资金投入统计">行业领域资金投入统计</el-tab-pane>
        <el-tab-pane label="行业领域项目统计">行业领域项目统计</el-tab-pane>
        <el-tab-pane label="地域地区资金投入统计">地域地区资金投入统计</el-tab-pane>

      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            pie: {
                tooltip: {
                    trigger: 'item',
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    formatter: function (item) {
                        return item.marker + item.name+':'+item.value+'('+item.percent+'%'+')';
                    }
                },
                legend: {
                    bottom: '10%',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '搜索引擎1', '搜索引擎2', '搜索引擎3', '搜索引擎4', '搜索引擎5', '搜索引擎6', '搜索引擎7', '搜索引擎8']
                },
                series: [
                    {

                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '40%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'},
                            {value: 1548, name: '搜索引擎1'},
                            {value: 1548, name: '搜索引擎2'},
                            {value: 1548, name: '搜索引擎3'},
                            {value: 1548, name: '搜索引擎4'},
                            {value: 1548, name: '搜索引擎5'},
                            {value: 1548, name: '搜索引擎6'},
                            {value: 1548, name: '搜索引擎7'},
                            {value: 1548, name: '搜索引擎8'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label:{
                            formatter: ' {b}：{c} ({d}%)',
                        }
                    }
                ]
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
            }, {
                date: '2016-05-04',
                name: '王小虎',
            }, {
                date: '2016-05-01',
                name: '王小虎',
            }, {
                date: '2016-05-03',
                name: '王小虎',
            },
            {
                date: '2016-05-02',
                name: '王小虎',
            }, {
                date: '2016-05-04',
                name: '王小虎',
            }, {
                date: '2016-05-01',
                name: '王小虎',
            }, {
                date: '2016-05-03',
                name: '王小虎',
            },
            ]
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    methods: {
        initChart() {
            let tabChart = echarts.init(document.getElementById('tabChart'))
            tabChart.setOption(this.pie)
        }
    }
}
</script>

<style lang="scss" scoped>
  .tab-chart {
    background-color: #fff;
    margin-top: 10px;
  }
  .tab-chart-tabs /deep/ .el-tabs__item {
    width: 260px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }
  .tab-chart-tabs /deep/ .el-tabs__nav-wrap::after {
    background-color :#fff !important;
  }
  .tab-chart-tabs /deep/ .is-active {
    color: #fff;
    background-color :rgba(114, 160, 223, 1);
  }
  .tab-chart-tabs /deep/ .el-tabs__active-bar {
    display: none;
  }
  .tab-chart-tabs /deep/ .el-table__row>td{
    border: none;
  }
  .tab-chart-tabs /deep/ .el-table::before {
    height: 0px;
  }
</style>
