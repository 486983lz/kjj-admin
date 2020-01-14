<template>
    <div class="dashboard-container">
        <el-row>
            <el-col :span="17">
                <div class="grid-content bg-purple">
                    <div class="notice_title">
                        <svg-icon icon-class="gonggao" class="gonggao" /><span class="notice">最新公告:</span>
                        <span class="more">[2019-12-06] 关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》...</span>
                    </div>
                    <div class="news_list">
                        <el-col :span="21" class="news_title"> <svg-icon icon-class="right" class="gonggao" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</el-col>
                        <el-col :span="3" class="news_time">[ 2019-12-06 ]</el-col>
                    </div>
                    <div class="news_list">
                        <el-col :span="21" class="news_title"> <svg-icon icon-class="right" class="gonggao" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</el-col>
                        <el-col :span="3" class="news_time">[ 2019-12-06 ]</el-col>
                    </div>
                    <div class="news_list">
                        <el-col :span="21" class="news_title"> <svg-icon icon-class="right" class="gonggao" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</el-col>
                        <el-col :span="3" class="news_time">[ 2019-12-06 ]</el-col>
                    </div>
                    <div class="news_list">
                        <el-col :span="21" class="news_title"> <svg-icon icon-class="right" class="gonggao" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</el-col>
                        <el-col :span="3" class="news_time">[ 2019-12-06 ]</el-col>
                    </div>
                    <div class="news_list">
                        <el-col :span="21" class="news_title"> <svg-icon icon-class="right" class="gonggao" />关于转发《关于征集参加2019全区科技成果展示对接大会项目的通知》的通知</el-col>
                        <el-col :span="3" class="news_time">[ 2019-12-06 ]</el-col>
                    </div>
                    <div class="news_btn_div">
                        <el-button class='news_btn_info' type="info" plain>查看全部</el-button>
                    </div>

                </div>
            </el-col>
            <el-col class="right_top" :span="5" :offset="1">
                <div>
                    <div class="declare">
                        <el-button class='btn_right' type="primary">查看全部</el-button>
                    </div>
                    <div class="declare">
                        <el-button class='btn_right' type="primary">查看全部</el-button>
                    </div>
                    <div class="declare">
                        <el-button class='btn_right' type="primary">查看全部</el-button>
                    </div>
                    <div class="declare">
                        <el-button class='btn_right' type="primary">查看全部</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row  class="bar_charts">
            <el-col :span="23">
                <div class="bar_charts_title">
                    <span>实施中项目</span>
                </div>
                <div class="bar_charts_name">
                    <span class="more">XXXXXX项目</span>
                    <span class="bar_charts_show_info">查看详情</span>
                </div>
            </el-col>
            <el-col :span="23" class="bar_charts_cont">
                <el-tabs tab-position="right" style="height: 550px;">
                    <el-tab-pane label="XXXXXX项目" style="width: 100%;" ref="barEcharts" ><div id="myChart" class="myChart"  :style="{width: '100%', height: '500px'}"></div></el-tab-pane>
                    <el-tab-pane label="XXXXXX项目">配置管理</el-tab-pane>
                    <el-tab-pane label="XXXXXX项目">角色管理</el-tab-pane>
                    <el-tab-pane label="XXXXXX项目">定时任务补偿</el-tab-pane>
                </el-tabs>
                <!--<component :is="currentRole" />-->

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import homeDashboard from './home'
    import echarts from 'echarts'
    export default {
        name: 'Dashboard',
        components: { homeDashboard },
        data() {
            return {
                pie: {
                    tooltip: {//提示框
                        formatter: function (params) {
                            let date = new Date(params.value[1]*1000);
                            let d1 =  date.getFullYear()+'/'+getzf(date.getMonth())+'/'+date.getDate();
                            date = new Date(params.value[2]*1000);
                            let d2 =  date.getFullYear()+'/'+getzf(date.getMonth())+'/'+date.getDate();

                            return params.name + ':' + d1 + '~' +d2;
                            function getzf(num) {
                                return num+1;
                            }
                        }//数据的值
                    },

                    grid: {//绘图网格
                        left: 0,
                        // right: 0,
                        // top: '1%',
                        // bottom: '10%',
                        containLabel: true,
                        // height: 300
                    },
                    xAxis: {
                        position: 'top',
                        nameTextStyle: {
                            fontSize: 14
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    // type: 'time',
                        interval: 86400*5,   //以一个小时递增
                        min:'1524067200', //将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
                        axisLabel: {formatter: function (value,k) {
                                let date = new Date(value*1000);
                                return date.getFullYear()+'/'+getzf(date.getMonth())+'/'+date.getDate();
                                function getzf(num) {
                                    return num+1;
                                }
                            },
                        }
                    },
                    yAxis: {
                        data: ['项目评估', '需求调研', '设计方案报告','系统研发','测试','交付']
                    },
                    series: [
                        // 用空bar来显示三个图例
                        // { name: state[0], type: 'bar', data: [] },
                        // { name: state[1], type: 'bar', data: [] },
                        // { name: state[2], type: 'bar', data: [] },
                        {
                            type: 'custom',
                            renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
                                var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
                                var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                                var end = api.coord([api.value(2), categoryIndex]);
                                var height = api.size([0, 1])[1];
                                return {
                                    type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                                    shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
                                        x: start[0],
                                        y: start[1] - height / 2,
                                        width: end[0] - start[0],
                                        height: height
                                    }, { // 当前坐标系的包围盒。
                                        x: params.coordSys.x,
                                        y: params.coordSys.y,
                                        width: params.coordSys.width,
                                        height: params.coordSys.height
                                    }),
                                    style: api.style()
                                };
                            },
                            encode: {
                                x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
                                y: 0// data 中『维度0』对应到 Y 轴
                            },
                            data: [ // 维度0 维度1 维度2
                                {
                                    itemStyle: { normal: { color: '#3aa1ff' } },//条形颜色
                                    name: '项目评估',
                                    value: [0, '1524326400', '1525017600']//0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
                                },

                                {
                                    itemStyle: { normal: { color: '#3aa1ff' } },
                                    name: '需求调研',
                                    value: [1, '1524067200', '1524326400']
                                },

                                {
                                    itemStyle: { normal: {color: '#3aa1ff' } },
                                    name: '设计方案报告',
                                    value: [2, '1526067200', '1527067200']
                                },
                                {
                                    itemStyle: { normal: { color: '#3aa1ff' } },//条形颜色
                                    name: '系统研发',
                                    value: [3, '1524326400', '1525017600']//0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
                                },

                                {
                                    itemStyle: { normal: { color: '#3aa1ff' } },
                                    name: '测试',
                                    value: [4, '1524067200', '1524326400']
                                },

                                {
                                    itemStyle: { normal: { color: '#3aa1ff' } },
                                    name: '交付',
                                    value: [5, '1525067200', '1526326400']
                                },


                            ]
                        }
                    ]
                }
            }
        },
        computed: {

        },
        methods: {
            drawLine () {
                // 基于准备好的dom，初始化echarts实例
                let me = this;
                this.$nextTick(function () {
                    document.getElementById('myChart').style.width = me.$refs.barEcharts.$el.clientWidth + 'px';
                    myChart.resize();
                })
                let myChart = echarts.init(document.getElementById('myChart'))
                // let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption(this.pie)
                // this.$nextTick(function () {
                //     this.drawLine();
                // });
            },
        },
        created() {

        },
        mounted () { // 注意，必须mounted后绘制
            this.drawLine()
        },
    }
</script>
<style scoped>
    .dashboard-container{
        max-height: calc(100vh - 115px);
        padding: 10px 0 0 20px ;
    }
    .grid-content ,.bar_charts{
        background-color: #FFF;
        border-radius: 0px;
        -moz-box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.0980392156862745);
        -webkit-box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.0980392156862745);
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.0980392156862745);
        padding-bottom: 10px;
    }
    .gonggao {
        margin-right: 10px;
    }
    .notice {
        display: inline-block;
        margin-right: 10px;
    }
    .notice_title ,.bar_charts_name{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        margin: 5px 20px;
        font-size: 16px;
        color: #555555;
        margin-bottom: 10px;
    }
    .news_list {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px dashed #eee;
        margin: 5px 20px;
        font-size: 15px;
        color: #333333;
    }
    .news_btn_div {
        margin: 5px 20px;
    }
    .news_btn_info {
        width: 100%;
        border: 0;
    }
    .btn_right {
        width: 100%;
        background-color: #709fe1;
        border: 0;
        height: 50px;
    }
    .declare {
        height: 90px;
    }
    .right_top {
        padding-top: 10px;
    }
    .bar_charts {
        padding-left: 20px;
        margin-right: 20px;
    }
    .bar_charts /deep/ .el-tabs__nav-wrap::after {
        background-color :#fff !important;
    }
    .bar_charts /deep/ .el-tabs__active-bar {
        display: none;
    }

    .bar_charts /deep/ .el-tabs__item.is-active {

    }
    .bar_charts /deep/ .is-active {
        color: #fff;
        background-color :rgba(114, 160, 223, 1);
    }
    .bar_charts /deep/ .el-tabs__item {
        width: 260px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
    .bar_charts_title {
        display: inline-block;
        margin: 10px 0 0 20px;
        color: #7F7F7F;
    }
    .bar_charts_cont {
        margin-top: -10px;
        max-height: 450px;
    }
    .bar_charts_show_info {
        float: right;
        color: #7F7F7F;
    }
</style>
