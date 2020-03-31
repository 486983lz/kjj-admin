<template>
    <div class="app-top">

        <el-button class='btn_right' @click='showCreate' type="primary">添加流程</el-button>
        <div class="app-container" ref="appContainer">
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
                                prop="flow_name"
                                label="流程名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="bz"
                                label="流程描述"
                        >
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button @click="updateList(scope.row)" type="text" size="small">基础信息修改</el-button>
                                <router-link :to="{path: 'configure-panel',query:{id:scope.row.id}}"><el-button type="text" size="small">编辑流程</el-button></router-link>
                                <el-button @click="deleteList(scope.row.id)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-dialog :title="dialogTile" :visible.sync="dialogFormCreate" width='650px'>
                <el-form ref="createFrom" :model="createFrom" :rules="createFromRules">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="流程名称" label-width="100px" prop="name">
                                <el-input v-model="createFrom.flow_name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="描述" label-width="100px" prop="name">
                                <el-input v-model="createFrom.bz" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreate = false">取 消</el-button>
                    <el-button v-if="dialogTile =='新增流程'" type="primary" @click="doCreate">确 定</el-button>
                    <el-button v-if="dialogTile =='修改流程'" type="primary" @click="doUpdate">修 改</el-button>
                </div>
            </el-dialog>
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
        data() {
            return {
                search:{
                    page: 1,
                    total: 0,
                    pageSize:10,
                },
                where:{},
                loading: false,
                tableData: [],
                dialogFormCreate:false,
                dialogTile:'新增流程',
                createFrom:{},

            }
        },
        mounted(){
            this.getMaxHeight()
        },

        computed: {


        },
        created() {
            this.getList();
            this.getIndustry();
        },
        methods: {
            searchInfo(){
                this.search.page = 1;
                this.search.where = { ...this.where }
                this.getList();
            },
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-page-40;
            },
            getList(){
                let that = this
                this.$store.dispatch('flow/getFlowList')
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            getIndustry(){
                let that = this
                this.$store.dispatch('projectIndustry/getAll')
                    .then((response) => {
                        response.shift()
                        that.List = response;
                    })
                    .catch(() => {

                    });
            },
            showCreate(){
                this.dialogTile = '新增流程';
                this.createFrom = {};
                this.dialogFormCreate = true;
            },
            updateList(row){
                this.dialogTile = '修改流程';
                this.createFrom = { ...row };
                if(this.$refs['createFrom'] != undefined){
                    this.$refs['createFrom'].clearValidate();
                }

                this.dialogFormCreate = true;
            },
            deleteList(id){
                this.$confirm('此操作将永久删除该专家信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('expert/deleteExpert',{id:id})
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
            doCreate(){
                let that = this
                this.$refs.createFrom.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('flow/createFlow',this.createFrom)
                            .then((response) => {
                                this.getList();
                                this.dialogFormCreate = false;
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },
            doUpdate(){
                let that = this
                this.$refs.createFrom.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('flow/updateFlow',this.createFrom)
                            .then((response) => {
                                this.getList();
                                this.dialogFormCreate = false;
                            })
                            .catch(() => {

                            });
                        } else {
                            return false;
                        }
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