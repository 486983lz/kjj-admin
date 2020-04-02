<template>
    <div class="app-top">
        <div class="app-container" ref="appContainer">
            <el-row>
                <el-col>
                    <el-table
                            :data="tableData"
                            stripe
                            :max-height="maxHeight"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                prop="project_num"
                                label="项目名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="project_name"
                                label="项目名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="industry_name"
                                label="所属领域"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="level_company_name"
                                label="推荐管理部门">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="create_time"
                                label="申报时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="状态">
                            <template slot-scope="scope">
                                {{getStatusName(5,scope.row.flow_status)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'show'}}"><el-button type="text" size="small">预览</el-button></router-link>
                                <router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'update'}}"><el-button type="text" size="small">编辑</el-button></router-link>
                                <el-button  @click="declareProject(scope.row)" type="text" size="small">申报</el-button>
                                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div class="page-block" ref="page">
                <el-pagination
                        @current-change="handleCurrentChanges"
                        :current-page="search.page"
                        layout="total, prev, pager, next"
                        :total="search.total"
                        :page-size="search.pageSize"
                        background>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import {getStatusName} from '@/utils/status-conf';
    export default {
        data() {
            return {
                search:{
                    page: 1,
                    total: 0,
                    pageSize:10,
                },
                tableData: [],
                loading:false,
            }
        },
        computed: {

        },
        created() {
            this.getProjectList();
        },
        mounted(){
            this.getMaxHeight()
        },
        methods: {
            getStatusName,
            declareProject(row){
                this.loading = true
                let that = this
                this.$store.dispatch('project/declareProject',{projectNum:row.project_num})
                    .then((response) => {
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    });
            },
            getProjectList(){
                this.loading = true
                let that = this
                this.$store.dispatch('projectSb/getRecommendProjectList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    });


            },
            handleCurrentChanges(val){
                this.search.page = val;
                this.getProjectList();
            },
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-page-40;
            },
        }
    }
</script>
<style scoped>
    .app-container {
        height: calc(100vh - 215px);
    }
    .btn_right {
        width: 190px;
        background-color: #709fe1;
        border: 0;
        height: 40px;
        margin: 20px 0 0px 20px;
    }
</style>