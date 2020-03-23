<template>
  <el-row  class="tab-chart">
    <el-col :span="24" >
      <el-row  class="tab-chart">
        <el-col :span="14" >
          <span class="title-chart">年度立项项目</span>
          <div id="regionChart" :style="{width: '100%', height: '420px'}"></div>
        </el-col>
        <el-col :span="10">
         <!-- <el-table
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
                    prop="sb"
                    label="申报总量"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="pz"
                    label="立项总量"
                    align="center"
            >
            </el-table-column>
          </el-table>-->
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
              return item.marker + item.name + ':' + item.value + '(' + item.percent + '%' + ')';
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
              radius: ['50%', '70%'],
              data: [],
              label: {
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
        /*tableData: [
          {
            region: '达尔罕茂明安联合旗',
            pz: '1245',
            sb: '2305',
          },{
            region: '白云鄂博矿区',
            pz: '515',
            sb: '787',
          },{
            region: '土默特右旗',
            pz: '550',
            sb: '362',
          },{
            region: '九原区',
            pz: '4616',
            sb: '5039',
          },{
            region: '东河区',
            pz: '231',
            sb: '1422',
          },{
            region: '青山区',
            pz: '66',
            sb: '833',
          },{
            region: '固阳县',
            pz: '722',
            sb: '910',
          },{
            region: '昆都仑区',
            pz: '42',
            sb: '872',
          },{
            region: '石拐区',
            pz: '622',
            sb: '837',
          }

        ]*/
      }
    },

    mounted() {
      this.getYearCount();
    },
    methods: {
      getYearCount() {
        this.$store.dispatch('count/getYearCount')
                .then((response) => {
                  let legendData = [];
                  let seriesData = [];
                  for (let i = 0; i < response.length; i++) {
                    legendData.push(response[i].year);
                    seriesData.push({value: response[i].count, name: response[i].year, itemStyle: {normal: { color: this.color[i] } }});
                  }
                  this.pie.legend.data = legendData
                  this.pie.series[0].data = seriesData
                  this.$nextTick(function () {
                    this.initChart()
                  })
                })
                .catch(() => {

                });
      },

      //导出图片
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



<!--
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
            // {
            //     name: '申报数量',
            //     type: 'bar',
            //     barMaxWidth: '10%',
            //     data: [320, 332, 301, 334, 390,320,390, 322, 332, 334, 390,320]
            // },
            {
              name: '立项数量',
              type: 'bar',
              barMaxWidth: '10%',
              data: [220, 182, 191, 234, 290,330,320, 132, 301, 434, 360,340]
            },
            // {
            //     name: '结题验收数量',
            //     type: 'bar',
            //     barMaxWidth: '10%',
            //     data: [150, 232, 201, 154, 190,350,370, 332, 361, 374, 340,350]
            // },
            // {
            //     name: '项目终止数量',
            //     type: 'bar',
            //     barMaxWidth: '10%',
            //     data: [98, 77, 101, 99, 40,390,300, 332, 331, 334, 290,310]
            // }
          ]
        },
      }
    },
    mounted() {
      this.getYearCount();
    },
    methods: {
      getYearCount(){
        this.$store.dispatch('count/getYearCount')
                .then((response) => {
                  let xAxisData = [];
                  let seriesData = [];
                  for(let i=0;i<response.length; i++){
                    xAxisData.push(response[i].year);
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
-->
