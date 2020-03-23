<template>
  <el-row>
    <el-col :span="6" >
      <div class="project-left">
        <el-row :gutter="20" style="background-color: #aaaaaa">
          <el-col :span="20">总申报</el-col><el-col class="project-left-num" :span="4">455</el-col>
        </el-row>
        <el-row :gutter="20" class="project-top" style="background-color: #81d3f8">
          <el-col :span="20">上报项目</el-col><el-col class="project-left-num" :span="4">303</el-col>
        </el-row>
        <el-row :gutter="20" style="background-color: #f59a23">
          <el-col :span="20">储备库</el-col><el-col class="project-left-num" :span="4">27</el-col>
        </el-row>
        <el-row :gutter="20" style="background-color: #409eff">
          <el-col :span="20">立项项目</el-col><el-col class="project-left-num" :span="4">12</el-col>
        </el-row>
        <el-row :gutter="20" style="background-color: #70b603">
          <el-col :span="20">电子档案库</el-col><el-col class="project-left-num" :span="4">95</el-col>
        </el-row>
        <el-row :gutter="20" class="project-top" style="background-color: #3dc526">
          <el-col :span="20">结题验收</el-col><el-col class="project-left-num" :span="4">88</el-col>
        </el-row>
        <el-row :gutter="20" style="background-color: #df273e">
          <el-col :span="20">终止项目</el-col><el-col class="project-left-num" :span="4">7</el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="18">
      <el-button class="text-btn" type="text" @click="exportImg">导出图片</el-button>
      <div id="projectCountChart" :style="{width: '100%', height: '400px'}"></div>
    </el-col>
  </el-row>

</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
        projectCountChart :{
            tooltip: {
                trigger: 'item',
                formatter: function (item) {
                    return item.marker + item.name+':'+item.value+'('+item.percent+'%'+')';
                }
            },
            legend: {
                bottom: 0,
                data: ['上报库', '储备库', '立项库', '档案库']
            },
            grid: {
                // top: '3%',
                left: 0,
                // right: '4%',
                bottom: '90%',
                // containLabel: true
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    // center:['30%', '50%'],
                    data: [
                        {value: 335, name: '上报库', itemStyle: { normal: { color: '#fbdb5a' } }},
                        {value: 310, name: '储备库', itemStyle: { normal: { color: '#4ecb73' } }},
                        {value: 234, name: '立项库', itemStyle: { normal: { color: '#36cbcb' } }},
                        {value: 135, name: '档案库', itemStyle: { normal: { color: '#3aa1ff' } }}
                    ],
                    label:{
                        formatter: ' {b}：{c} ({d}%)',
                    }
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
        let projectCountChart = echarts.init(document.getElementById('projectCountChart'))
        projectCountChart.setOption(this.projectCountChart)
    },
    exportImg() {
        let regionChart = echarts.init(document.getElementById('projectCountChart'))
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
  .project-left {
    margin-left: 150px;
  }
  .project-left div{
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
  .project-top {
    margin-top: 20px;
  }
  .project-left-num {
    text-align: center;
  }
  .text-btn {
    position: absolute;
    margin-right: 50px;
    height: 40px;
    width: 150px;
    color: rgb(51, 51, 51);
    background-color: rgba(242, 242, 242, 1);
    right: 20px;
    z-index: 99999;
  }
</style>
