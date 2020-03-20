<template>
    <div class="app-top">
        <router-link :to="{path: 'resource-create'}"><el-button class='btn_right' type="primary">发布资料</el-button></router-link>
        <div class="app-container" ref="appContainer">
            <div class="header"  ref="header">
                <el-form ref="form" :model="where" label-width="120px" style="display: flex;">
                    <el-form-item label="标题:" label-width="100px" style="margin: 0;width: 30%;">
                        <el-input v-model="where.title" placeholder="请输入资料标题" ></el-input>
                    </el-form-item>
                    <el-button type="info" @click="searchInfo" style="margin-left: 1%;">查询</el-button>
                </el-form>
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
                                label="资料标题"
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
                                prop="source"
                                label="来源部门"
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
                                align="center"
                                label="资料状态"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.status">已发布</span>
                                <span v-if="!scope.row.status">已撤回</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="updateList(scope.row.id)" type="text" size="small">编辑</el-button>
                                <el-button @click="showList(scope.row.id)" type="text" size="small">预览</el-button>
                                <el-button @click="deleteList(scope.row.id)" type="text" size="small">删除</el-button>
                                <el-button v-if="scope.row.status == 0" @click="releaseList(scope.row.id)" type="text" size="small">发布</el-button>
                                <el-button v-if="scope.row.status == 1" @click="withdrawList(scope.row.id)" type="text" size="small">撤回</el-button>
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
                    where:{type:2},
                },
                where:{
                    type:2
                },
                loading: false,
                tableData: [],
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
                this.$store.dispatch('notice/getNoticeList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            updateList(id){
                this.$router.push({name: 'resource_update',query:{id:id}});
            },
            showList(id){
                this.$router.push({name: 'resource_show',query:{id:id}});
            },
            releaseList(id){
                this.$store.dispatch('notice/updateStatusNotice',{id:id,status:1})
                    .then((response) => {
                        if(response){
                            this.$message({
                                type: 'success',
                                message: '发布成功!'
                            });
                            this.getList()
                        }else{
                            this.$message({
                                type: 'info',
                                message: '发布失败!'
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '发布失败'
                        });
                    });
            },
            withdrawList(id){
                this.$store.dispatch('notice/updateStatusNotice',{id:id,status:0})
                    .then((response) => {
                        if(response){
                            this.$message({
                                type: 'success',
                                message: '撤回成功!'
                            });
                            this.getList()
                        }else{
                            this.$message({
                                type: 'info',
                                message: '撤回失败!'
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '撤回失败'
                        });
                    });
            },
            deleteList(id){
                this.$confirm('此操作将永久删除该资料信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('notice/updateStatusNotice',{id:id,status:3})
                        .then((response) => {
                            if(response){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getList()
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '删除失败'
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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