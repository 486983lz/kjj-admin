<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button class='btn_right btn_right_jb1' type="primary">项目申报库</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right btn_right_jb2' type="primary">项目储备库</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right btn_right_jb3' type="primary">立项项目库</el-button>
            </el-col>
            <el-col :span="6">
                <el-button class='btn_right btn_right_jb4' type="primary">项目电子档案库</el-button>
            </el-col>
        </el-row>
        <div class="pending add-bg-box">
           <p class="pending-p">待处理任务</p>
            <el-row :gutter="20" class="pending-content" type="flex" justify="center">
                <el-col :span="6"><div class="pending-content-item"><span>企业注册审核监督<span class="pending-content-item-num pending-1 add-bg-box">20</span></span></div></el-col>
                <el-col :span="6"><div class="pending-content-item"><span>项目申报待处理<span class="pending-content-item-num pending-2 add-bg-box">16</span></span></div></el-col>
                <el-col :span="6"><div class="pending-content-item"><span>待填报评审评分<span class="pending-content-item-num pending-4 add-bg-box">8</span></span></div></el-col>
                <el-col :span="6"><div class="pending-content-item"><span>待处理任务书审核<span class="pending-content-item-num pending-3 add-bg-box">7</span></span></div></el-col>
                <el-col :span="6"><div class="pending-content-item"><span>科技创新需求征集<span class="pending-content-item-num pending-4 add-bg-box">11</span></span></div></el-col>
            </el-row>
        </div>
        <el-row :gutter="20" style="margin-top: 10px; margin-right: 0">
            <el-col :span="12" >
                <el-row class="add-bg-box project-pie">
                    <el-col :span="8">
                        <p class="pending-p">项目库统计</p>
                        <div class="project-count">
                            <span>上报项目库数量:  303</span>
                            <span>项目储备库数量:  27</span>
                            <span>立项项目库数量:  12</span>
                            <span>电子档案库数量:  95</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="project-pie-box" >
                        <pieChart/>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" class="add-bg-box project-line-box" >
                    <p class="pending-p">项目数年度统计</p>
                    <lineChart/>
                    <!--<div id="myChart-line" class="myChart"  :style="{width: '100%', height: '245px'}"></div>-->
            </el-col>
        </el-row>
        <pigtabChart/>
    </div>
</template>

<script>
    import pieChart from './components/PieChart'
    import lineChart from './components/LineChart'
    import pigtabChart from './components/PigtabChart'
    export default {
        name: 'Dashboard',
        components: { pieChart,lineChart,pigtabChart},
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        },
        created() {

        },
        mounted () {

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
        /*background-color: #709fe1;*/
        border: 0;
        height: 50px;
    }
    .btn_right_jb1 {
        background: linear-gradient(263.105548923687deg, rgba(114, 160, 223, 1) 5%, rgba(255, 255, 255, 1) 143%);
    }
    .btn_right_jb2 {
        background: linear-gradient(251.621611651808deg, rgba(2, 167, 240, 1) 0%, rgba(255, 255, 255, 1) 144%);
    }
    .btn_right_jb3 {
        background: linear-gradient(251.710841649997deg, rgba(2, 125, 180, 1) 0%, rgba(255, 255, 255, 1) 168%);
    }
    .btn_right_jb4 {
        background: linear-gradient(251.875314098429deg, rgba(132, 0, 255, 1) 0%, rgba(255, 255, 255, 1) 158%);
    }
    .pending {
        background-color: #fff;
        margin-top: 20px;
    }
    .pending-p{
        padding-top: 10px;
        margin-left: 5px;
        background-color: #fff;
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
        height: 100%;
    }
    .project-count {
        margin-left: 50px;
    }
    .project-count span{
        display: block;
        height :30px;
        line-height: 30px;
    }
    .project-line-box {
        height: 300px;
        background-color: #fff;
    }




</style>
