<template>
    <div class="app-top">
        <el-button type="primary" class='btn_right' @click="RecommendAccounts">新增帐号</el-button>
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header">
                <el-form ref="form" :model="search" label-width="120px" :rules="codeRules" style="display: flex;">
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
                </el-form>
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
                        prop="level_company_name"
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
                        <el-button type="text" size="medium " @click="editPassword(scope.row)">修改密码</el-button>
                        <el-button type="text" size="medium " @click="deleteRecommend(scope.row)">删除</el-button>
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
            <el-dialog title="添加二级单位帐号" :visible.sync="dialogFormVisible" width="38%">
                <el-form ref="form" :model="form" label-width="120px" :rules="codeRules">
                    <el-form-item label="用户名：" :error="errorMsg.username" prop="username">
                        <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="phone">
                        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="repassword">
                        <el-input type="password" v-model="form.repassword" autocomplete="off" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="二级单位：" porp="company_id">
                        <el-select v-model="form.company_id" filterable clearable placeholder="请选择二级单位">
                            <el-option
                                    v-for="item in tableForm"
                                    :key="item.level_company_name"
                                    :label="item.level_company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRecommendAccounts">保 存</el-button>
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
                        <el-select v-model="editForm.company_id" filterable clearable placeholder="请选择二级单位">
                            <el-option
                                    v-for="item in tableForm"
                                    :key="item.level_company_name"
                                    :label="item.level_company_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateRecommend">修 改</el-button>
                </div>
            </el-dialog>

            <!--添加帐号弹框-->
            <el-dialog title="" :visible.sync="passworDialogFormVisible" width="38%">
                <el-form ref="passwordForm" :model="passwordForm" label-width="120px" :rules="codeRules">
                    <el-form-item label="新密码：" prop="passwords">
                        <el-input type="password" v-model="passwordForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="respassword">
                        <el-input type="password" v-model="passwordForm.respassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="passworDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePassword">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'user_index_company',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.repassword !== '') {
                        this.$refs.form.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passwordForm.respassword !== '') {
                        this.$refs.passwordForm.validateField('respassword');
                    }
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    name: '',
                    phone: '',
                    password: '',
                    repassword: '',
                    role: '2',     //二级单位 角色id为2
                    company_id: '',
                },
                maxHeight:'',
                editForm:{},
                passwordForm:{},
                tableData: [],
                tableForm: [],
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                activeTab: 'activity',
                loading: false,
                dialogFormVisible: false,
                editDialogFormVisible: false,
                passworDialogFormVisible: false,
                // 前端验证
                codeRules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    phone: [
                        {required: true, trigger: 'blur', validator: validatePhone}
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    passwords: [
                        { validator: validatePass3, trigger: 'blur' }
                    ],
                    respassword: [
                        { validator: validatePass4, trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择二级单位', trigger: 'change' }
                    ],
                },
                // 后端验证提示
                errorMsg: {
                    username: '',
                },
            }
        },
        mounted(){
            this.getMaxHeight()
        },
        created() {
            this.getRecommendAccounts();
            this.getAllTwoCompany();
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
            RecommendAccounts(){
                this.dialogFormVisible = true;
            },

            //查看所有二级单位
            getAllTwoCompany() {
                let that = this;
                this.$store.dispatch('twoLevelCompany/getAllTwoCompanyOption',this.search)
                    .then((response) => {
                        that.tableForm = response;
                    })
                    .catch(() => {
                    });
            },

            //添加管理员帐号---二级单位帐号
            saveRecommendAccounts() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('recommend/saveAccounts', this.form)
                            .then((response) => {
                                if (response.errors) {
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }
                                } else {
                                    this.dialogFormVisible = false;
                                    that.getRecommendAccounts();
                                    this.form = {
                                        role: '2',
                                    };
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
                this.$store.dispatch('recommend/allRecommendAccounts',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                    })
                    .catch(() => {
                    });
            },

            //删除二级单位帐号
            deleteRecommend(row) {
                this.$confirm('此操作将永久删除该帐号, 是否继续?', '提示', {
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
                        that.editForm = response;
                        that.editDialogFormVisible = true;
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
                                that.getRecommendAccounts();
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
                        that.passwordForm = response;
                        that.passworDialogFormVisible = true;
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
