<template>
    <div class="app-top">
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header">

            </div>
            <!--用户列表-->
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
                        prop="username"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="联系人">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="medium " @click="roleToUser(scope.row)">分配角色</el-button>
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

            <el-dialog title="分配角色" :visible.sync="dialogRoleToUser" class="el-dialog1">
                <el-row>
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
                                @change="assignRoleOrCancel">
                            <span slot-scope="{ option }">{{ option.attribute }}</span>
                        </el-transfer>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button type="success" @click="dialogRoleToUser=false">完 成</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'role_assign_user',
        data() {
            return {
                tableData: [],
                trans_data: [],
                trans_value: [],
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                maxHeight:'',
                activeTab: 'activity',
                loading: false,
                dialogRoleToUser:false,
            }
        },
        mounted(){
            this.getMaxHeight();
            this.getAllUser();
        },

        methods: {
            //获取计算表格高度
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },

            //获取全部用户
            getAllUser() {
                let that = this;
                this.$store.dispatch('rbac/getAllUser',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                    })
                    .catch(() => {
                    });
            },

            roleToUser(row){
                this.user_id = row.id;
                this.getRoles();
            },

            getRoles() {
                this.trans_data = [];
                this.trans_value = [];
                let that = this;
                this.$store.dispatch('rbac/getAllRoles')
                    .then((response) => {
                        let res = response.data;
                        // console.log(res);
                        for (let [key, val] of Object.entries(res)) {
                            this.trans_data.push({
                                id: val.id,
                                attribute: val.attribute
                            })
                        }
                        this.getUserRoles();
                    })
                    .catch(() => {
                    });
            },

            getUserRoles(){
                let that = this;
                this.$store.dispatch('rbac/getRoleByUserId',{user_id: this.user_id})
                    .then((response) => {
                        let res = response;
                        for (let [key, val] of Object.entries(res)) {
                            this.trans_value.push(val.id);
                        }
                        this.$forceUpdate();
                        this.dialogRoleToUser = true;
                    })
                    .catch(() => {
                        that.loading = false;
                    });
            },

            assignRoleOrCancel(value, direction, movedKeys) {
                if ('right' === direction) {
                    //授予
                    this.$store.dispatch('rbac/assignRoleToUser', {
                        role_ids: movedKeys,
                        user_id: this.user_id
                    });
                } else if ('left' === direction) {
                    //撤消
                    this.$store.dispatch('rbac/cancelRoleUser', {
                        role_ids: value,
                        user_id: this.user_id
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
                this.getAllUser();
            },
            handleCurrentChange(val) {
                this.search.page = val;
                this.getAllUser();
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
