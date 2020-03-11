<template>
    <div class="app-top">

        <el-button class='btn_right' @click='showCreate' type="primary">创建标签</el-button>

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
                                prop="id"
                                label="序号"
                                width="50"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="标签名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="fName"
                                label="父级名称"
                        >
                        </el-table-column>

                        <el-table-column
                                label="申报选择"
                                align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="是否设为申报选择项" placement="top">
                                    <el-switch
                                            v-model="scope.row.is_show"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            :active-value="1"
                                            @change="createShow(scope.row)"
                                            :inactive-value="0">
                                    </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="搜索项"
                                align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="是否设为搜索项" placement="top">
                                    <el-switch
                                            v-model="scope.row.is_search"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            :active-value="1"
                                            @change="createSearch(scope.row)"
                                            :inactive-value="0">
                                    </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog title="创建标签" :visible.sync="dialogFormCreate" width='650px'>
                <el-form :model="createFrom" ref="createFrom" :rules="createFromRules">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="标签名称" label-width="100px" prop="name">
                                <el-input v-model="createFrom.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="父级标签" label-width="100px" prop="fid">
                                <el-select v-model="createFrom.fid" placeholder="请选择父级标签">
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

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreate = false">取 消</el-button>
                    <el-button type="primary" @click="doCreate">确 定</el-button>
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
                tableData: [],
                dialogFormCreate:false,
                createFrom:{},
                List:{},
                loading:false,
                createFromRules:{
                    name: [
                        { required: true, message: '请填写标签名称', trigger: 'blur' }
                    ],
                    fid: [
                        { required: true, message: '请选择父级标签', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
        },
        created() {
            this.getList();
        },
        mounted(){
            this.getMaxHeight()
        },
        methods: {
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-page-40;
            },
            getList(){
                this.loading=true;
                let that = this
                this.$store.dispatch('projectTab/getTabList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        this.loading=false;
                    })
                    .catch(() => {

                    });
            },
            showCreate(){
                this.createFrom = {}
                if(this.$refs['createFrom'] != undefined){
                    this.$refs['createFrom'].clearValidate();
                }
                this.dialogFormCreate = true;
                let that = this
                this.$store.dispatch('projectTab/getAll')
                    .then((response) => {
                        that.List = response;
                    })
                    .catch(() => {

                    });
            },
            doCreate(){
                let that = this
                this.$refs.createFrom.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('projectTab/createTab',this.createFrom)
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
            createShow(row){
                let that = this;
                this.$store.dispatch('projectTab/createShow',{id:row.id,is_show:row.is_show})
                    .then((response) => {

                    })
                    .catch(() => {

                    });

            },
            createSearch(row){
                let that = this;
                this.$store.dispatch('projectTab/createSearch',{id:row.id,is_search:row.is_search})
                    .then((response) => {

                    })
                    .catch(() => {

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