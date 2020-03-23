<template>
    <div class="app-container add-bg-box">
        <!--<el-tabs v-model="activeTab" type="border-card" @tab-click="" stretch>-->
            <!--<el-tab-pane label="地区统计" name="fourth" lazy>-->
                <!--<div class="region-box">-->
                    <!--<el-row>-->
                        <!--<el-col :span="24">-->
                            <!--<mapChart />-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--&lt;!&ndash;<capitalChart/>&ndash;&gt;-->
                    <!--<regionChart/>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="年度统计" name="second" lazy>-->
                <!--<div class="region-box">-->
                    <!--<p>项目阶段年度统计折现图 (项目阶段分为: 申报、二级单位推荐上报、初审、专家评审、项目立项、结题验收、终止)</p>-->
                    <!--<yearStageChart/>-->
                    <!--<div class="border-bottom"></div>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="行业统计" name="third" lazy>-->
                <!--<div class="region-box">-->
                    <!--&lt;!&ndash;<p>项目涉及行业领域统计图</p>&ndash;&gt;-->
                    <!--&lt;!&ndash;<p>(行业领域分为: 稀土及新材料、冶金（钢铁、铝业等）、装备制造、化工、电子信息、新能源、节能环保、农牧业、生物技术、医药卫生、社会发展、其他)</p>&ndash;&gt;-->
                    <!--<industryChart/>-->
                    <!--<div class="border-bottom"></div>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="资金统计" name="activity" lazy>-->
                <!--<div class="region-box">-->
                    <!--&lt;!&ndash;<p>行业领域资金分布统计图 (统计单位: 万元)</p>&ndash;&gt;-->
                    <!--<industryCapitalChart/>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
        <!--</el-tabs>-->
            <el-row>
                <el-col :span="24">
                    <mapChart />
                </el-col>
            </el-row>
            <!--<capitalChart/>-->
            <regionChart/>
            <industryChart/>
            <div class="border-bottom"></div>
            <industryCapitalChart/>
            <yearStageChart/>
        </div>
</template>

<script>
    import mapChart from './components/MapChart'
    import capitalChart from './components/CapitalChart'
    import regionChart from './components/RegionChart'
    import industryChart from './components/IndustryChart'
    import industryCapitalChart from './components/IndustryCapitalChart'
    import yearCapitalChart from './components/YearCapitalChart'
    import yearStageChart from './components/YearStageChart'
    import projectCount from './components/ProjectCount'
    import projectProportion from './components/ProjectProportion'

    export default {
        name: 'Profile',
        components: {mapChart ,capitalChart,regionChart,industryChart,industryCapitalChart ,yearCapitalChart ,yearStageChart,projectCount,projectProportion},
        data() {
            return {
                user: {},
                activeTab: 'third'
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
    .app-container {
        padding: 50px;
    }
    .app-container /deep/ .el-tabs--border-card {
        background: #fff;
        border: 0;
        -webkit-box-shadow: unset;
        box-shadow:unset;
    }
    .app-container /deep/ .el-tabs--border-card>.el-tabs__header {
        background-color: #fff;
    }
    .app-container /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        border: 0;
    }
    .app-container /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        color: #7ca7e2;
        background-color :#ecf5ff;
        border: 0;
    }
    .app-container /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
        color: #7ca7e2;
    }
    .app-container /deep/ .el-tab-pane {
        width: 100%;
    }
    .region-box {
        width: calc(100% - 5px);
        padding-right: 20px;
        overflow-y: auto;
        height: calc(100vh - 234px);
        margin-left: 20px;
    }
    .border-bottom {
        height: 20px;
        border-bottom: 1px dashed #eee;
        margin-bottom: 30px;
    }
</style>
