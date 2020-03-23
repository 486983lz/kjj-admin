<template>
  <div class="position">
    <el-row  class="tab-chart">
      <el-col :span="24" >
        <el-row  class="tab-chart">
          <el-col :span="14" >
            <span class="title-chart">项目涉及行业领域统计图</span>
            <!--<el-button class="text-btn" type="text" @click="exportImg">导出图片</el-button>-->
            <div id="myChart-industry" :style="{width: '100%', height: '650px'}"></div>
          </el-col>
          <el-col :span="10">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
              <el-table-column
                      prop="region"
                      label="行业"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                      prop="pz"
                      label="项目数量"
                      align="center"
              >
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
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
                tableData: [

                ]
            }
        },
        mounted() {
            this.getIndustryCount();
        },
        methods: {
            getIndustryCount(){
                this.$store.dispatch('count/getIndustryCount')
                    .then((response) => {
                        let yAxisData = [];
                        let seriesData = [];
                        for(let i=0;i<response.length; i++){
                            yAxisData.push(response[i].industry_name);
                            seriesData.push( {value: response[i].count, name: response[i].industry_name, itemStyle: { normal: { color: this.color[i] } }});
                            this.tableData.push({
                                region: response[i].industry_name,
                                pz: response[i].count
                            });
                        }
                        this.pie.legend.data = yAxisData
                        this.pie.series[0].data = seriesData
                        console.log(this.pie);
                        this.$nextTick(function () {
                            this.initChart()
                        })
                    })
                    .catch(() => {

                    });
            },
            initChart() {
                let regionChart = echarts.init(document.getElementById('myChart-industry'))
                regionChart.setOption(this.pie)
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
