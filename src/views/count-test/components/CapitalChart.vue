<template>
  <el-row  class="tab-chart">
    <el-col :span="24" >
          <el-row  class="tab-chart">
            <el-col :span="14" >
              <span class="title-chart">项目资金投入总数(万元)</span>
              <div id="tabChart" :style="{width: '100%', height: '420px'}"></div>
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
                        prop="sb"
                        label="申报总额(万元)"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="pz"
                        label="批准总额(万元)"
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
                    data: ['达尔罕茂明安联合旗', '白云鄂博矿区', '土默特右旗', '九原区', '东河区', '青山区', '固阳县', '昆都仑区', '石拐区']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        data: [
                            {value: 335, name: '达尔罕茂明安联合旗', itemStyle: { normal: { color: 'rgb(58, 161, 255)' } }},
                            {value: 310, name: '白云鄂博矿区', itemStyle: { normal: { color: 'rgb(136, 209, 234)' } }},
                            {value: 234, name: '土默特右旗', itemStyle: { normal: { color: 'rgb(54, 203, 203)' } }},
                            {value: 135, name: '九原区', itemStyle: { normal: { color: 'rgb(130, 223, 190)' } }},
                            {value: 335, name: '东河区', itemStyle: { normal: { color: 'rgb(78, 203, 115)' } }},
                            {value: 310, name: '青山区', itemStyle: { normal: { color: 'rgb(242, 199, 168)' } }},
                            {value: 234, name: '固阳县', itemStyle: { normal: { color: 'rgb(172, 223, 130)' } }},
                            {value: 135, name: '昆都仑区', itemStyle: { normal: { color: 'rgb(251, 212, 55)' } }},
                            {value: 135, name: '石拐区', itemStyle: { normal: { color: 'rgb(242, 99, 123)' } }}
                        ],
                        label:{
                            formatter: ' {b}：{c} ({d}%)',
                        }
                    }
                ]
            },
            tableData: [{
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
