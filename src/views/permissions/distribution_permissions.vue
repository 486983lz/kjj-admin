<template>
    <div class="app-top">
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header"></div>
            <!--角色列表-->
            <el-table
                    :header-cell-style="tableHeaderColor"
                    :data="tableData"
                    border
                    :max-height="maxHeight"
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
                        <el-button type="text" size="medium " @click="permissionsToRole(scope.row)">分配权限</el-button>
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

            <!--分配权限-->
            <el-dialog title="分配权限" :visible.sync="dialogPermissionsToRole" width="41%">
                <el-row style="background-color: #fff">
                    <el-col :span="16" :offset="4">
                        <el-transfer
                                filterable
                                filter-placeholder=""
                                v-model="trans_value"
                                :props="{
                                key: 'id',
                                label: 'attribute'
                            }"
                                :titles="['未分配', '已分配']"
                                :data="trans_data"
                                @change="assignOrCancel">
                            <span slot-scope="{ option }">{{ option.attribute }}</span>
                        </el-transfer>
                    </el-col>
                </el-row>

                <div slot="footer" class="dialog-footer">
                    <el-button type="success" @click="dialogPermissionsToRole=false">完 成</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'permission_assign_role',
        data() {
            return {
                trans_data: [],
                trans_value: [],
                temp_role_id: 0,
                tableData: [],
                value: [],
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                maxHeight:'',
                dialogPermissionsToRole: false,
            }
        },
        mounted(){
            this.getMaxHeight();
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
            //获取所有权限
            async getAllPermissions() {
                let promise = this.$store.dispatch('rbac/getAllPermissions',{pageSize: 100});
                let res = await promise;
                for (let [key, val] of Object.entries(res.data)) {
                    this.trans_data.push({
                        id: val.id,
                        attribute: val.attribute
                    })
                }
                //console.log(res);
            },
            async permissionsToRole(row) {
                this.trans_data = [];
                this.trans_value = [];
                this.temp_role_id = row.id;
                this.getAllPermissions();
                let promise = this.$store.dispatch('rbac/getPermissionByRoleName', {role_name: row.name});
                let res = await promise;
                for (let [key, val] of Object.entries(res)) {
                    this.trans_value.push(val.id);
                }
                this.$forceUpdate();
                this.dialogPermissionsToRole = true;
            },
            //分配
            assignOrCancel(value, direction, movedKeys) {
                if ('right' === direction) {
                    //授予
                    this.$store.dispatch('rbac/assignPermissionsToRole', {
                        permission_ids: movedKeys,
                        role_id: this.temp_role_id
                    });
                } else if ('left' === direction) {
                    //撤消
                    this.$store.dispatch('rbac/cancelPermissionsOfRole', {
                        permission_ids: movedKeys,
                        role_id: this.temp_role_id
                    });
                }
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
