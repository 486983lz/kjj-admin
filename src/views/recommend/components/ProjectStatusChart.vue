<template>
  <div id="myChart" class="myChart"  :style="{width: '100%', height: '200px'}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
        pie :{
            tooltip: {
                trigger: 'item',
                formatter: function (item) {
                    return item.marker + item.name+':'+item.value+'('+item.percent+'%'+')';
                }
            },
            legend: {
                bottom: 0,
                data: ['档案库', '立项库', '储备库', '上报库']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                        {value: 335, name: '档案库',color:'#fbdb5a', itemStyle: { normal: { color: '#fbdb5a' } }},
                        {value: 310, name: '立项库',color:'#fbdb5a', itemStyle: { normal: { color: '#4ecb73' } }},
                        {value: 234, name: '储备库',color:'#fbdb5a', itemStyle: { normal: { color: '#36cbcb' } }},
                        {value: 135, name: '上报库',color:'#fbdb5a', itemStyle: { normal: { color: '#3aa1ff' } }}
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
        let me = this;
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption(this.pie)
    }
  }
}
</script>
