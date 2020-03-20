<template>
    <div class="app-top">
        <el-button type="primary" class='btn_right' @click="createRole">添加角色</el-button>
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
            <!--角色列表-->
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
                        prop="name"
                        label="标识">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="guard_name"
                        label="角色组名">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="attribute"
                        label="角色名"
                        width="300">
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium " @click="updateRole(scope.row)">编辑</el-button>
                        <el-button type="text" size="medium " @click="deleteRole(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="page-block" ref="page">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="search.page"
                        layout="total, prev, pager, next"
                        :total="search.total"
                        :page-size="search.pageSize"
                        background>
                </el-pagination>
            </div>

            <!--添加角色弹框-->
            <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="38%">
                <el-form ref="form" :model="form" label-position="left" label-width="100px" :rules="codeRules">
                    <el-form-item label="角色编号" v-if="form.id">
                        <el-input v-model="form.id" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="角色标识" prop="name" :error="errorMsg.name">
                        <el-input ref="name" name="name" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色分组名">
                        <el-input v-model="form.guard_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="attribute" :error="errorMsg.attribute">
                        <el-input ref="attribute" name="attribute" v-model="form.attribute"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doCreateRole">保 存</el-button>
                </div>
            </el-dialog>

            <!--修改帐号信息弹框-->
            <el-dialog title="编辑二级单位" :visible.sync="editDialogFormVisible" width="38%">
                <el-form ref="editForm" :model="editForm" label-position="left" label-width="100px" :rules="codeRules">
                    <el-form-item label="角色编号" v-if="editForm.id">
                        <el-input v-model="editForm.id" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="角色标识" prop="name" :error="errorMsg.name">
                        <el-input ref="name" name="name" v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色分组名">
                        <el-input v-model="editForm.guard_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="attribute" :error="errorMsg.attribute">
                        <el-input ref="attribute" name="attribute" v-model="editForm.attribute"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdateRole">修 改</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'role',
        data() {
            return {
                form: {
                    id: '',
                    name: '',
                    guard_name: 'api',
                    attribute: ''
                },
                editForm: {
                    id: '',
                    name: '',
                    guard_name: 'api',
                    attribute: ''
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
            this.getRoles();
        },
        methods: {
            //获取计算表格高度
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },

            //添加角色弹框
            createRole(){
                this.dialogFormVisible = true;
            },

            //添加角色
            doCreateRole() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('rbac/createRole', this.form)
                            .then((response) => {
                                if (response.errors) {
                                    that.errors = response.errors;
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }
                                } else {
                                    that.getRoles();
                                    that.cleanForm();
                                    this.dialogFormVisible = false;
                                }
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },

            //查看角色
            getRoles() {
                let that = this;
                this.$store.dispatch('rbac/getAllRoles',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                    })
                    .catch(() => {

                    });
            },

            //删除角色
            deleteRole(row) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that = this;
                    this.$store.dispatch('rbac/deleteRole', {id:row.id})
                        .then((response) => {
                            that.getRoles();
                        })
                        .catch(() => {

                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },

            //编辑角色
            updateRole(currentRow){
                this.editForm = Object.assign({}, currentRow);
                this.editDialogFormVisible = true;
                this.$refs.editForm.clearValidate();

            },
            doUpdateRole() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('rbac/editRole', this.editForm)
                            .then((response) => {
                                if (response.errors) {
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }

                                } else {
                                    that.getRoles();
                                    this.editDialogFormVisible = false
                                }
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },


            cleanForm() {
                this.form = {
                    id: '',
                    name: '',
                    guard_name: 'api',
                    attribute: ''
                };
                this.$refs.form.clearValidate();
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
                this.getRoles();
            },
            handleCurrentChange(val) {
                this.search.page = val;
                this.getRoles();
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
