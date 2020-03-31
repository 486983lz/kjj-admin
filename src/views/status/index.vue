<template>
    <div class="app-top">

        <el-button class='btn_right' @click='showCreate' type="primary">添加流程状态</el-button>
        <div class="app-container" ref="appContainer">
            <el-row>
                <el-col>
                    <el-table
                            :header-cell-style="tableHeaderColor"
                            :data="tableData"
                            :max-height="maxHeight"
                            style="width: 100%"
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            :row-key="getRowKey"
                            border
                            default-expand-all
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

                        <el-table-column
                                prop="status_name"
                                label="名称"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="library_name"
                                label="菜单名"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="状态名"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="200">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.status_name" @click="createStatusToLibrary(scope.row.id)" type="text" size="small">增加菜单显示名称</el-button>
                                <el-button v-if="!scope.row.status_name" @click="updateStatusToLibrary(scope.row)" type="text" size="small">修改</el-button>
                                <el-button v-if="!scope.row.status_name" @click="deleteStatusToLibrary(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog :title="dialogTile" :visible.sync="dialogFormCreate" width='650px'>
                <el-form ref="createFrom" :model="createFrom" :rules="createFromRules">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="流程状态名称" label-width="150px" prop="status_name">
                                <el-input v-model="createFrom.status_name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="备注" label-width="150px">
                                <el-input v-model="createFrom.bz" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreate = false">取 消</el-button>
                    <el-button v-if="dialogTile =='新增状态'" type="primary" @click="doCreate">确 定</el-button>
                    <el-button v-if="dialogTile =='修改状态'" type="primary" @click="doUpdate">修 改</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="dialogStatusTile" :visible.sync="dialogFormCreateStatusToLibrary" width='650px'>
                <el-form ref="createStatusFrom" :model="createStatusFrom" >
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="菜单列表" label-width="150px" prop="industry_id">
                                <el-select v-model="createStatusFrom.library_id" placeholder="菜单">
                                    <el-option
                                    v-for="item in List"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="显示名称" label-width="150px">
                                <el-input v-model="createStatusFrom.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="备注" label-width="150px">
                                <el-input v-model="createStatusFrom.bz" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreateStatusToLibrary = false">取 消</el-button>
                    <el-button v-if="dialogStatusTile =='新增关系'" type="primary" @click="doCreateStatusToLibrary">确 定</el-button>
                    <el-button v-if="dialogStatusTile =='修改关系'" type="primary" @click="doUpdateStatusToLibrary">修 改</el-button>
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
    // import {getStatusName} from '@/utils/status-conf';

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
                dialogFormCreateStatusToLibrary:false,
                dialogTile:'新增状态',
                dialogStatusTile:'新增关系',
                createFrom:{},
                createStatusFrom:{},
                List:{},
                createFromRules:{
                    status_name: [
                        { required: true, message: '请输入状态名', trigger: 'blur' }
                    ],

                }
            }
        },
        mounted(){
            this.getMaxHeight()
        },

        computed: {


        },
        created() {
            this.getList();
            this.getLibrary();
        },
        methods: {
            // getStatusName,
            getRowKey(row){
                if(row.status_id !== undefined){
                    return row.id + row.status_id.toString() + 'a'
                }else{
                    return row.id +'b'
                }
            },
            createStatusToLibrary(id){

                // console.log(this.$store.getters.statusConf);return ;
                this.createStatusFrom = {};
                this.createStatusFrom.status_id = id
                this.dialogStatusTile = '新增关系'
                this.dialogFormCreateStatusToLibrary = true;
            },
            updateStatusToLibrary(row){
                this.createStatusFrom =  { ...row }
                this.dialogStatusTile = '修改关系'
                this.dialogFormCreateStatusToLibrary = true;
            },
            doCreateStatusToLibrary(){
                let that = this
                this.$store.dispatch('status/createStatusToLibrary',this.createStatusFrom)
                    .then((response) => {
                        if(!response){
                            this.$message.error('菜单已占用');
                        }
                        this.dialogFormCreateStatusToLibrary = false;
                        this.getList();
                    })
                    .catch(() => {

                    });
            },
            doUpdateStatusToLibrary(){
                let that = this
                this.$store.dispatch('status/updateStatusToLibrary',this.createStatusFrom)
                    .then((response) => {
                        this.dialogFormCreateStatusToLibrary = false;
                        this.getList();

                    })
                    .catch(() => {

                    });
            },
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
                this.loading = true;
                let that = this
                this.$store.dispatch('status/getStatusList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            getLibrary(){
                let that = this
                this.$store.dispatch('status/getLibraryAll')
                    .then((response) => {
                        that.List = response;
                    })
                    .catch(() => {

                    });
            },
            showCreate(){
                this.dialogTile = '新增状态';
                this.createFrom = {};
                this.dialogFormCreate = true;
            },
            updateList(row){
                this.dialogTile = '修改状态';
                this.createFrom = { ...row };
                if(this.$refs['createFrom'] != undefined){
                    this.$refs['createFrom'].clearValidate();
                }

                this.dialogFormCreate = true;
            },
            deleteStatusToLibrary(row){
                this.$confirm('此操作将永久删除该菜单信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('status/deleteStatusToLibrary',{status_id:row.status_id,library_id:row.library_id})
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
                        this.$store.dispatch('status/createStatus',this.createFrom)
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
                        this.$store.dispatch('expert/updateExpert',this.createFrom)
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