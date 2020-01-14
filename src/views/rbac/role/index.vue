<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="10" class="normal-form form-container">
                <el-form ref="form" :model="form" label-position="left" label-width="100px" :rules="createRules">
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
                    <el-form-item>
                        <el-button type="danger">删除</el-button>
                        <el-button type="success" class="right" @click="createRole" v-if="!form.id">新增</el-button>
                        <el-button type="primary" class="right" @click="updateRole" v-if="form.id">修改</el-button>
                        <el-button type="info" class="right" @click="cleanForm">清空表单</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="14">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        stripe
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        class="normal-table">
                    <el-table-column
                            prop="id"
                            label="编号">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="标识">
                    </el-table-column>
                    <el-table-column
                            prop="guard_name"
                            label="角色组名">
                    </el-table-column>
                    <el-table-column
                            prop="attribute"
                            label="角色名">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {validRolePermissionName, validRolePermissionAttribute} from '@/utils/validate';

    export default {
        name: "role_list",
        data() {
            const validateName = (rule, value, callback) => {
                if (!validRolePermissionName(value)) {
                    callback(new Error('请输入正确的角色标识'))
                } else {
                    callback()
                }
            };

            const validateAttribute = (rule, value, callback) => {
                if (!validRolePermissionAttribute(value)) {
                    callback(new Error('请输入正确的角色名'))
                } else {
                    callback()
                }
            };

            return {
                form: {
                    id: '',
                    name: '',
                    guard_name: 'api',
                    attribute: ''
                },
                tableData: [],
                createRules: {
                    name: [
                        {required: true, trigger: 'blur', validator: validateName}
                    ],
                    attribute: [
                        {required: true, trigger: 'blur', validator: validateAttribute}
                    ]
                },
                errorMsg: {
                    name: '',
                    attribute: ''
                },
                loading: false
            }
        },
        mounted() {
            this.getRoles();
        },
        methods: {
            getRoles() {
                let that = this;
                this.$store.dispatch('rbac/getAllRoles')
                    .then((response) => {
                        that.tableData = response;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            createRole() {
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
                                    this.getPermissions();
                                    that.cleanForm();
                                }
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },
            updateRole() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('rbac/editRole', this.form)
                            .then((response) => {
                                if (response.errors) {
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }
                                } else {
                                    that.getRoles();
                                    that.cleanForm();
                                }
                            })
                            .catch(() => {

                            });
                    } else {
                        return false;
                    }
                });
            },
            deleteRole() {

            },
            handleCurrentChange(currentRow, oldCurrentRow) {
                this.form = Object.assign({}, currentRow);
                this.$refs.form.clearValidate();
            },
            cleanForm() {
                this.form.id = '';
                this.$refs.form.resetFields();
                this.$refs.form.clearValidate();
            }
        }
    }
</script>

<style scoped>
    .normal-form {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .normal-table {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .right {
        float: right;
    }
</style>