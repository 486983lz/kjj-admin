<template>
  <el-row  class="tab-chart">
    <el-col :span="24" >
      <el-row  class="tab-chart">
        <el-col :span="14" >
          <span class="title-chart">项目数量地区分布</span>
          <div id="regionChart" :style="{width: '100%', height: '650px'}"></div>
        </el-col>
        <el-col :span="10">
          <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%">
            <el-table-column
                    prop="region"
                    label="地区"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="pz"
                    label="立项总量"
                    align="center"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
                        formatter: function (item) {
                            return item.marker + item.name+':'+item.value+'('+item.percent+'%'+')';
                        }
                    },
                    legend: {
                        bottom: 0,
                        data: []
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            // radius: ['50%', '70%'],
                            data: [

                            ],
                            label:{
                                formatter: ' {b}：{c} ({d}%)',
                            }
                        }
                    ]
                },
                tableData: [
                ],
                color:[
                    'rgb(58, 161, 255)',
                    'rgb(136, 209, 234)',
                    'rgb(54, 203, 203)',
                    'rgb(130, 223, 190)',
                    'rgb(78, 203, 115)',
                    'rgb(242, 199, 168)',
                    'rgb(172, 223, 130)',
                    'rgb(251, 212, 55)',
                    'rgb(242, 99, 123)',
                    '#8e7fea',
                    '#d465ac',
                ],
            }
        },
        mounted() {
            this.getAreaCount();
        },
        methods: {
            getAreaCount(){
                this.$store.dispatch('count/getAreaCount')
                    .then((response) => {
                        let yAxisData = [];
                        let seriesData = [];
                        for(let i=0;i<response.length; i++){
                            yAxisData.push(response[i].area_name);
                            seriesData.push( {value: response[i].count_num, name: response[i].area_name, itemStyle: { normal: { color: this.color[i] } }});
                            this.tableData.push({
                                region: response[i].area_name,
                                pz: response[i].count_num
                            });
                        }
                        this.pie.legend.data = yAxisData
                        this.pie.series[0].data = seriesData
                        this.$nextTick(function () {
                            this.initChart()
                        })
                    })
                    .catch(() => {

                    });
            },
            initChart() {
                let regionChart = echarts.init(document.getElementById('regionChart'))
                regionChart.setOption(this.pie)
            }
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

</style>
