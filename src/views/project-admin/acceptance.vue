<template>
    <div class="app-top">
        <!--<el-button type="primary" class='btn_right' @click="TowCompany">添加二级单位</el-button>-->
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header">
                <el-form ref="form" :model="search" label-width="120px" style="display: flex;">
                    <el-form-item label="项目编号：" style="margin: 0;width: 30%;">
                        <el-input v-model="search.contract_num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="申报单位：" style="margin: 0;width: 30%;">
                        <el-input v-model="search.company_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称：" style="margin: 0;width: 30%;">
                        <el-input v-model="search.project_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="科室：" style="margin: 0;width: 30%;">
                        <el-select v-model="search.project_department" filterable clearable placeholder="请选择科室">
                            <el-option
                                    v-for="item in tableForm"
                                    :key="item.department_name"
                                    :label="item.department_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="领域：" style="margin: 0;width: 30%;">
                        <el-select v-model="search.industryid" filterable clearable placeholder="请选择领域">
                            <el-option
                                    v-for="item in tableIndustry"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="info" @click="searchAll" style="margin-left: 1%;">查询</el-button>
                </el-form>
            </div>
            <!--二级单位列表-->
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
                        fixed
                        align="center"
                        prop="id"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contract_num"
                        label="项目编号"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="project_name"
                        label="项目名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="company_name"
                        label="承担单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="area"
                        label="所属地区"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="department_name"
                        label="负责科室"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="所属领域"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="year"
                        label="项目年度"
                        width="90">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="status"
                        label="状态"
                        width="120">
                    <template scope="scope">
                        <span v-if="scope.row.status=='200'">已立项</span>
                    </template>
                </el-table-column>
                <!--<el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium " @click="editTwoCompany(scope.row)">编辑</el-button>
                        <el-button type="text" size="medium " @click="deleteTwoCompany(scope.row)">删除</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <!--分页-->
            <div class="page-block" ref="page">
                <el-pagination
                        @current-change="handleCurrentChange"
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
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'project_admin_acceptance',
        data() {
            return {
                tableData: [],
                tableIndustry: [],
                tableForm: [],
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                maxHeight:'',
                activeTab: 'activity',
                loading: false,
            }
        },
        mounted(){
            this.getMaxHeight()
        },
        created() {
            this.getApproval();
            this.getAllTwoCompany();
            this.getAllIndustry();
        },
        methods: {
            //获取计算表格高度
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },

            //查看立项项目数据
            getApproval() {
                let that = this;
                this.$store.dispatch('approval/getApproval',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                    })
                    .catch(() => {
                    });
            },

            //搜索
            searchAll() {
                this.search.page = 1;
                this.getApproval();
            },

            //查看所有归口科室
            getAllTwoCompany() {
                let that = this;
                this.$store.dispatch('department/allDepartment')
                    .then((response) => {
                        that.tableForm = response;
                    })
                    .catch(() => {
                    });
            },

            //查看所有领域
            getAllIndustry() {
                let that = this;
                this.$store.dispatch('approval/getAllIndustry')
                    .then((response) => {
                        that.tableIndustry = response;
                    })
                    .catch(() => {
                    });
            },

            //删除二级单位
            deleteTwoCompany(row) {
                this.$confirm('此操作将永久删除改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$store.dispatch('twoLevelCompany/deleteTwoCompany',{id : row.id})
                        .then((response) => {
                            that.getAllTwoCompany();
                        }).catch(() => {

                    });
                    this.dialogFormVisible = false;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //设置表格表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #ecf5ff;color: black;font-weight: 700;'
                }
            },
            //分页
            handleSizeChange(val) {
                this.search.pageSize = val;
                this.getApproval();
            },
            handleCurrentChange(val) {
                this.search.page = val;
                this.getApproval();
            },

        }
    }
</script>

<style lang="scss" scoped>
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
    .el-form-item{
        margin: 0 10% 4% 10%;
    }
    .header {
        padding-bottom: 30px;
    }
    .el-select{
        width: 100%;
    }
    .dialog-footer{
        text-align: center;
    }
</style>
