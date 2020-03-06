<template>
    <div class="app-top">

        <el-button class='btn_right' @click='showCreate' type="primary">添加专家</el-button>
        <div class="app-container" ref="appContainer">
            <div class="header"  ref="header">
                <el-form ref="form" :model="search" label-width="120px" :rules="codeRules" style="display: flex;">
                    <el-form-item label="姓名:" label-width="100px" style="margin: 0;width: 30%;">
                        <el-input v-model="search.where.name" placeholder="请输入专家姓名" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" label-width="100px" style="margin: 0;width: 30%;">
                        <el-input v-model="search.where.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="所属领域" label-width="100px" style="margin: 0;width: 30%;">
                        <el-select v-model="search.where.industry_id" placeholder="所属领域">
                            <el-option
                                    v-for="item in List"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="info" @click="" style="margin-left: 1%;">查询</el-button>
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
                                prop="name"
                                label="姓名"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="phone"
                                label="电话"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="created_at"
                                label="创建时间"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center">
                            <template slot-scope="scope">

                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--align="center"-->
                                <!--label="操作"-->
                                <!--width="200">-->
                            <!--<template slot-scope="scope">-->
                                <!--<router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'show'}}"><el-button type="text" size="small">预览</el-button></router-link>-->
                                <!--<router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'update'}}"><el-button type="text" size="small">编辑</el-button></router-link>-->

                                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>-->
                                <!--<el-button type="text" size="small">申报</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog title="新增专家" :visible.sync="dialogFormCreate" width='650px'>
                <el-form :model="createFrom">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="专家姓名" label-width="100px">
                                <el-input v-model="createFrom.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="手机号码" label-width="100px">
                                <el-input v-model="createFrom.phone" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="性别" label-width="100px">
                                <el-input v-model="createFrom.sex" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="备注" label-width="100px">
                                <el-input v-model="createFrom.bz" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="行业领域" label-width="100px">
                                <el-select v-model="createFrom.industry_id" placeholder="行业领域">
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
                    where:{}
                },
                loading: false,
                tableData: [],
                dialogFormCreate:false,
                createFrom:{},
                List:{},
                maxHeight:''
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
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;

                this.maxHeight = appContainer-header-page-40;
            },
            getList(){
                this.loading = true;
                let that = this
                this.$store.dispatch('expert/getExpertList',this.search)
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
                this.dialogFormCreate = true;

            },
            doCreate(){
                let that = this
                this.$store.dispatch('expert/createExpert',this.createFrom)
                    .then((response) => {
                        this.getList();
                        this.dialogFormCreate = false;
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
</style>