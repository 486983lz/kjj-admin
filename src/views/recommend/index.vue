<template>
    <div class="app-container">
        <div>
            <el-row>
                <el-col :span="10">
                    <div class="wait-examine">
                        <p class="wait-examine-title">待处理注册审核</p>
                        <p><span  class="wait-examine-detail">查看详情</span><span  class="wait-examine-num">302</span></p>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div>
                        <projectStatusChart/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import projectStatusChart from './components/ProjectStatusChart'
    export default {
        name: 'Profile',
        components: {projectStatusChart },

        data() {
            return {
                user: {},
                activeTab: 'activity'
            }
        },
        computed: {

        },
        created() {

        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .dashboard-container{
        max-height: calc(100vh - 115px);
        padding: 10px 20px 0 20px ;
    }
    .wait-examine {
        position: relative;
        background-color: rgba(114, 160, 223, 1);
        color: #fff;
        width: 80%;
        height: 200px;
        margin-left: 40px;
    }
    .wait-examine-title {
        position: absolute;
        top: 15px;
        left: 30px;
        font-size: 28px;
    }
    .wait-examine-detail {
        position: absolute;
        bottom: 30px;
        left: 30px;
        font-size: 20px;
    }
    .wait-examine-num {
        position: absolute;
        bottom: 60px;
        right: 40px;
        font-size: 38px;
    }





</style>