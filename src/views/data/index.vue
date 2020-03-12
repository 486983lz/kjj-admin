<template>
    <div class="app-top">
        <el-button type="primary" class='btn_right' @click="TowCompany">添加二级单位</el-button>
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header">
                <!--<el-form ref="form" :model="search" label-width="120px" :rules="codeRules" style="display: flex;">
                    <el-form-item label="姓名：" style="margin: 0;width: 30%;">
                        <el-input v-model="search.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" style="margin: 0;width: 30%;">
                        <el-input v-model="search.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：" style="margin: 0;width: 30%;">
                        <el-select v-model="search.company_id" filterable clearable placeholder="请选择二级单位">
                            <el-option
                                    v-for="item in tableForm"
                                    :key="item.level_company_name"
                                    :label="item.level_company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="info" @click="searchAll" style="margin-left: 1%;">查询</el-button>
                </el-form>-->
            </div>
        <!--二级单位帐号列表-->
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
                    prop="level_company_name"
                    label="部门名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="area"
                    label="所属地区">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="created_at"
                    label="创建时间"
                    width="300">
            </el-table-column>
            <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button type="text" size="medium " @click="editTwoCompany(scope.row)">编辑</el-button>
                    <el-button type="text" size="medium " @click="deleteTwoCompany(scope.row)">删除</el-button>
                </template>
            </el-table-column>
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

        <!--添加帐号弹框-->
        <el-dialog title="添加二级单位" :visible.sync="dialogFormVisible" width="38%">
            <el-form ref="form" :model="form" label-width="120px" :rules="codeRules">
                <el-form-item label="单位所属地区：" porp="area">
                    <el-select v-model="form.area" filterable clearable placeholder="请选择所属地区">
                        <el-option
                                v-for="item in tableArea"
                                :key="item.area"
                                :label="item.area"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位名称：" :error="errorMsg.level_company_name" prop="level_company_name">
                    <el-input v-model="form.level_company_name" autocomplete="off" placeholder="请填写单位名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTowCompany">保 存</el-button>
            </div>
        </el-dialog>

        <!--修改帐号信息弹框-->
        <el-dialog title="编辑二级单位" :visible.sync="editDialogFormVisible" width="38%">
            <el-form ref="editForm" :model="editForm" label-width="120px" :rules="codeRules">
                <el-form-item label="单位所属地区：" porp="area">
                    <el-select v-model="editForm.area" filterable clearable placeholder="请选择所属地区">
                        <el-option
                                v-for="item in tableArea"
                                :key="item.area"
                                :label="item.area"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位名称：" :error="errorMsg.level_company_name" prop="level_company_name">
                    <el-input v-model="editForm.level_company_name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTwoCompany">修 改</el-button>
            </div>
        </el-dialog>
    </div>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'Profile',
        data() {
            return {
                form: {
                    area: '',
                    level_company_name: '',
                },
                editForm:{
                    area: '',
                    level_company_name: '',
                },
                passwordForm:{},
                tableData: [],
                tableArea: {},
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                maxHeight:'',
                activeTab: 'activity',
                loading: false,
                dialogFormVisible: false,
                editDialogFormVisible: false,
                // 前端验证
                codeRules: {
                    level_company_name: [
                        { required: true, message: '请输入单位名称', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请选择二级单位', trigger: 'change' }
                    ],
                },
                // 后端验证提示
                errorMsg: {
                    level_company_name: '',
                },
            }
        },
        mounted(){
            this.getMaxHeight()
        },
        created() {
            this.getAllTwoCompany();
            this.getArea();
        },
        methods: {
            //获取计算表格高度
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },

            //添加二级单位弹窗
            TowCompany(){
                this.dialogFormVisible = true;
            },
            //获取地区
            getArea() {
                let that = this;
                this.$store.dispatch('twoLevelCompany/getArea')
                    .then((response) => {
                        that.tableArea = response;
                        // console.log(that.tableArea);
                    })
                    .catch(() => {
                    });
            },

            //添加二级单位
            saveTowCompany() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('twoLevelCompany/saveTowCompany', this.form)
                            .then((response) => {
                                if (response.errors) {
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }
                                } else {
                                    this.dialogFormVisible = false;
                                    this.getAllTwoCompany();
                                    this.form = {};
                                }
                            })
                            .catch(() => {

                            });

                    } else {
                        return false;
                    }
                });
                // this.dialogFormVisible = true;
            },

            //查看所有二级单位
            getAllTwoCompany() {
                let that = this;
                this.$store.dispatch('twoLevelCompany/getAllTwoCompany',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
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

            //编辑二级单位帐号
            editTwoCompany(row) {
                let that = this;
                this.$store.dispatch('twoLevelCompany/editTwoCompany',{id : row.id})
                    .then((response) => {
                        this.editForm = response;
                        this.editDialogFormVisible = true;
                    })
                    .catch(() => {

                    });
            },
            updateTwoCompany() {
                let that = this;
                this.$store.dispatch('twoLevelCompany/updateTwoCompany', this.editForm)
                    .then((response) => {
                        this.editDialogFormVisible = false;
                        that.getAllTwoCompany();
                    })
                    .catch(() => {

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
                this.getAllTwoCompany();
            },
            handleCurrentChange(val) {
                this.search.page = val;
                this.getAllTwoCompany();
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
