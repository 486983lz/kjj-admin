<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="7" class="normal-form form-container">
                <el-form ref="form" :model="form" label-position="left" label-width="100px" :rules="createRules">
                    <el-form-item label="权限编号" v-if="form.id">
                        <el-input v-model="form.id" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="权限标识" prop="name" :error="errorMsg.name">
                        <el-input ref="name" name="name" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权限分组名">
                        <el-input v-model="form.guard_name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限名称" prop="attribute" :error="errorMsg.attribute">
                        <el-input ref="attribute" name="attribute" v-model="form.attribute"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger">删除</el-button>
                        <el-button type="success" class="right" @click="createPermission" v-if="!form.id">新增
                        </el-button>
                        <el-button type="primary" class="right" @click="updatePermission" v-if="form.id">修改
                        </el-button>
                        <el-button type="info" class="right" ref="refresh" @click="cleanForm">清空表单</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="17">
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
                            label="权限组名">
                    </el-table-column>
                    <el-table-column
                            prop="attribute"
                            label="权限名">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {validRolePermissionName, validRolePermissionAttribute} from '@/utils/validate';

    export default {
        name: "permission_list",
        data() {
            const validateName = (rule, value, callback) => {
                if (!validRolePermissionName(value)) {
                    callback(new Error('请输入正确的权限标识'))
                } else {
                    callback()
                }
            };

            const validateAttribute = (rule, value, callback) => {
                if (!validRolePermissionAttribute(value)) {
                    callback(new Error('请输入正确的权限名'))
                } else {
                    callback()
                }
            };

            return {
                form: {
                    id: '',
                    name: '',
                    attribute: '',
                    guard_name: 'api'
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
        created() {
            this.getPermissions();
        },
        methods: {
            getPermissions() {
                let that = this;
                this.loading = true;
                this.$store.dispatch('rbac/getAllPermissions')
                    .then((response) => {
                        that.tableData = response;
                        that.loading = false;
                    })
                    .catch(() => {
                    });
            },
            createPermission() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('rbac/createPermission', this.form)
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
                    } else {
                        return false;
                    }
                });
            },
            updatePermission() {
                let that = this;
                this.$store.dispatch('common/resetObj', this.errorMsg);
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('rbac/editPermission', this.form)
                            .then((response) => {
                                if (response.errors) {
                                    for (const [key, val] of Object.entries(response.errors)) {
                                        that.errorMsg[key] = val[0];
                                    }
                                } else {
                                    that.getPermissions();
                                    that.cleanForm();
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            handleCurrentChange(currentRow) {
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