<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button class='btn_right' type="primary">待审核项目</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right' type="primary">待立项项目</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right' type="primary">待验收项目</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right' type="primary">项目电子档案库</el-button>
            </el-col>
        </el-row>
        <div class="pending add-bg-box">
           <p>待处理</p>
            <el-row :gutter="20" class="pending-content" type="flex" justify="center">
                <el-col span="6"><div class="pending-content-item"><span>未审核注册企业<span class="pending-content-item-num pending-1 add-bg-box">20</span></span></div></el-col>
                <el-col span="6"><div class="pending-content-item"><span>待处理项目初审<span class="pending-content-item-num pending-2 add-bg-box">20</span></span></div></el-col>
                <el-col span="6"><div class="pending-content-item"><span>待填报项目评分<span class="pending-content-item-num pending-3 add-bg-box">20</span></span></div></el-col>
                <el-col span="6"><div class="pending-content-item"><span>新发布难题<span class="pending-content-item-num pending-4 add-bg-box">20</span></span></div></el-col>
            </el-row>
        </div>
        <el-row :gutter="20" style="margin-top: 10px;">
            <el-col span="16" >
                <el-row :gutter="10" class="add-bg-box project-pie">
                    <el-col :span="8">
                        111
                    </el-col>
                    <el-col :span="16" class="project-pie-box" ref="barEcharts">
                        <div id="myChart" class="myChart"  :style="{width: '100%', height: '100%'}"></div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col span="8" class="add-bg-box">
                2222
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
                pie :{
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        bottom: 10,
                        data: ['档案库', '立项库', '储备库', '上报库']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            data: [
                                {value: 335, name: '档案库'},
                                {value: 310, name: '立项库'},
                                {value: 234, name: '储备库'},
                                {value: 135, name: '上报库'}
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

                myChart.setOption(this.pie)

            },
        },
        created() {

        },
        mounted () { // 注意，必须mounted后绘制
            this.drawLine()
        },
    }
</script>
<style lang="scss" scoped>
    .dashboard-container{
        max-height: calc(100vh - 115px);
        padding: 10px 20px 0 20px ;
    }

    .btn_right {
        width: 100%;
        background-color: #709fe1;
        border: 0;
        height: 50px;
    }
    .pending {
        background-color: #fff;
        margin-top: 20px;
    }
    .pending p{
        padding-top: 5px;
        margin-left: 5px;
    }
    .pending-content {
        text-align: center;
        height: 55px;
    }
    .pending-content-item {
        height: 40px;
        line-height: 40px;
        width: 260px;
        margin: 0 auto;
        cursor:pointer;
    }
    .pending-content-item-num {
        float: right;
        height: 40px;
        width: 40px;
        margin-right: 20px;
        border-radius: 5px;
        color:#FFF;
    }
    .pending-content-item:hover {
        color:#888;
    }
    .pending-1 {
        background-color: rgba(236, 128, 141, 1);
    }
    .pending-2 {
        background-color: rgba(112, 182, 3, 1);
    }
    .pending-3 {
        background-color: rgba(250, 205, 145, 1);
    }
    .pending-4 {
        background-color: rgba(58, 137, 230, 1);
    }
    .project-pie {
        width: 100%;
        height: 300px;
        background-color: #fff;
    }
    .project-pie-box {
        width: 60%;
        height: 100%;
    }

</style>
