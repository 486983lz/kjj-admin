<template>
    <div class="app-top">
        <div class="app-container" ref="appContainer">
            <div class="header"  ref="header">
                <el-row>
                    <!--<el-col :span="6">-->
                        <!--<span>需求征集列表</span>-->
                    <!--</el-col>-->
                    <el-col :span="18">
                        <el-form ref="form" :model="where" label-width="120px" style="display: flex;">
                            <el-form-item label="标题:" label-width="100px" style="margin: 0;width: 30%;">
                                <el-input v-model="where.title" placeholder="请输入难题标题" ></el-input>
                            </el-form-item>
                            <el-button type="info" @click="searchInfo" style="margin-left: 1%;">查询</el-button>
                        </el-form>
                    </el-col>
                </el-row>


            </div>

            <el-row>
                <el-col>
                    <el-table
                            :header-cell-style="tableHeaderColor"
                            :data="tableData"
                            border
                            :max-height="maxHeight"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                prop="title"
                                label="难题标题"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="发布人"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="phone"
                                label="联系电话"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="created_at"
                                label="发布时间"
                                width="300"
                        >
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                align="center"
                                width="200">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == 0" >待申请发布</span>
                                <span v-if="scope.row.status == 1" >待审核发布</span>
                                <span v-if="scope.row.status == 2" >已发布</span>
                                <span v-if="scope.row.status == 4" >已驳回</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="200">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.status == 1" @click="updateList(scope.row.id,2)" type="text" size="small">发布</el-button>
                                <el-button v-if="scope.row.status == 1" @click="updateList(scope.row.id,4)" type="text" size="small">驳回</el-button>
                                <el-button  @click="showList(scope.row.id)" type="text" size="small">预览</el-button>
                                <el-button @click="updateList(scope.row.id,3)" type="text" size="small">删除</el-button>
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


    export default {
        name: 'notice_index',
        data() {
            return {
                search:{
                    page: 1,
                    total: 0,
                    pageSize:10,
                },
                loading: false,
                tableData: [],
                where:{}
            }
        },
        mounted(){
            this.getMaxHeight()
        },

        computed: {


        },
        created() {
            this.getList();
        },
        methods: {

            searchInfo(){
                this.search.page = 1;
                this.search.where = { ...this.where }
                this.getList();
            },
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },
            getList(){
                this.loading = true;
                let that = this
                this.$store.dispatch('problem/getProblemList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            updateList(id,status){
                this.$store.dispatch('problem/updateProblemStatus',{id:id,status:status})
                    .then((response) => {
                        this.getList()
                    })
                    .catch(() => {

                    });
            },
            showList(id){
                this.$router.push({name: 'problem_show',query:{id:id}});
            },



            handleCurrentChanges(val){
                this.search.page = val;
                this.getList();

            },
            //设置表格表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #ecf5ff;color: black;font-weight: 700;'
                }
            },
        },

    }
</script>
<style scoped>
    .btn_right {
        width: 190px;
        background-color: #709fe1;
        border: 0;
        height: 40px;
        margin: 20px 0 0px 20px;
    }
    .header {
        padding-bottom: 30px;
    }
    .el-select{
        width: 100%;
    }
    .el-popover__reference {
        border: 0;
        padding: 0;
    }
</style>