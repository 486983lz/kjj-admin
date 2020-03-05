<template>
    <div class="app-container">
        <!--<div class="header">
            二级单位数据字典配置
        </div>-->

        <div class="header">
            <el-button type="primary" @click="TowCompany">添加二级单位</el-button>
            <!--<el-form ref="form" :model="search" label-width="120px" :rules="codeRules" style="display: flex;">
                <el-button type="primary" @click="RecommendAccounts">新增帐号</el-button>
                <el-form-item label="姓名：" style="margin: 0;width: 30%;">
                    <el-input v-model="search.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" style="margin: 0;width: 30%;">
                    <el-input v-model="search.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属单位：" style="margin: 0;width: 30%;">
                    <el-select v-model="search.role" placeholder="请选择二级单位">
                        <el-option label="单位一" value="2"></el-option>
                        <el-option label="单位二" value="3"></el-option>
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
                max-height="600"
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
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="role"
                    label="归属部门">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="phone"
                    label="手机号码">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="created_at"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button type="text" size="medium " @click="editRecommend(scope.row)">编辑</el-button>
                    <el-button type="text" size="medium " @click="deleteRecommend(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block" style="position: absolute;bottom: 5%;right: 5%;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="search.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="search.pageSize"
                    layout="total , prev, pager, next, jumper"
                    :total="search.total">
            </el-pagination>
        </div>

        <!--添加帐号弹框-->
        <el-dialog title="" :visible.sync="dialogFormVisible" width="38%">
            <el-form ref="form" :model="form" label-width="120px" :rules="codeRules">
                <el-form-item label="单位所属地区：" porp="role">
                    <el-select v-model="form.area" placeholder="请选择二级单位">
                        <el-option label="单位一" value="2"></el-option>
                        <el-option label="单位二" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位名称：" :error="errorMsg.level_company_name" prop="level_company_name">
                    <el-input v-model="form.level_company_name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTowCompany">保 存</el-button>
            </div>
        </el-dialog>

        <!--修改帐号信息弹框-->
        <el-dialog title="" :visible.sync="editDialogFormVisible" width="38%">
            <el-form ref="form" :model="editForm" label-width="120px" :rules="codeRules">
                <el-form-item label="用户名：" :error="errorMsg.username" prop="username">
                    <el-input v-model="editForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="二级单位：" porp="role">
                    <el-select v-model="editForm.role" placeholder="请选择二级单位">
                        <el-option label="单位一" value="2"></el-option>
                        <el-option label="单位二" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRecommend">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'Profile',
        data() {

            return {
                form: {},
                editForm:{},
                passwordForm:{},
                tableData: [],
                search: {
                    page: 1,
                    total: 0,
                    pageSize:10,
                    role: '',
                },
                activeTab: 'activity',
                loading: false,
                dialogFormVisible: false,
                editDialogFormVisible: false,
                // 前端验证
                codeRules: {
                    level_company_name: [
                        { required: true, message: '请输入单位名称', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择二级单位', trigger: 'change' }
                    ],
                },
                // 后端验证提示
                errorMsg: {
                    level_company_name: '',
                },
            }
        },
        computed: {

        },
        created() {
            this.getRecommendAccounts();
        },
        methods: {
            //添加二级单位弹窗
            TowCompany(){
                this.dialogFormVisible = true;
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

            //查看所有二级单位账号
            getRecommendAccounts() {
                let that = this;
                this.loading = true;
                this.$store.dispatch('recommend/allRecommendAccounts',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.loading = false;
                    })
                    .catch(() => {
                    });
            },

            //删除二级单位帐号
            deleteRecommend(row) {
                this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.loading = true;
                    this.$store.dispatch('recommend/deleteRecommend',{id : row.id})
                        .then((response) => {
                            that.loading = false;
                            that.getRecommendAccounts();
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
            editRecommend(row) {
                let that = this;
                this.$store.dispatch('recommend/editRecommend',{id : row.id})
                    .then((response) => {
                        this.editForm = response;
                        this.editDialogFormVisible = true;
                    })
                    .catch(() => {

                    });
            },
            updateRecommend() {
                let that = this;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('recommend/updateRecommend', this.editForm)
                            .then((response) => {
                                that.getRecommendAccounts();
                                this.editDialogFormVisible = false;
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },

            //修改账号密码
            editPassword(row) {
                let that = this;
                this.$store.dispatch('recommend/editPassword',{id : row.id})
                    .then((response) => {
                        this.passwordForm = response;
                        this.passworDialogFormVisible = true;
                    })
                    .catch(() => {

                    });
            },
            updatePassword() {
                let that = this;
                this.$refs.passwordForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('recommend/updatePassword', this.passwordForm)
                            .then((response) => {
                                that.getRecommendAccounts();
                                this.passworDialogFormVisible = false;
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },

            searchAll() {
                this.search.page = 1;
                this.getRecommendAccounts();
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
                this.getRecommendAccounts();
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.search.page = val;
                this.getRecommendAccounts();
                // console.log(`当前页: ${val}`);
            },

        }
    }
</script>

<style lang="scss" scoped>
    .header{
        margin-bottom: 30px;
    }
    .el-form-item{
        margin: 0 10% 4% 10%;
    }
    .el-select{
        width: 100%;
    }
    .dialog-footer{
        text-align: center;
    }
</style>
