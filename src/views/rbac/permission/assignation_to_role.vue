<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="14">
                <div class="filter-container">
                    <el-button v-waves :loading="loading" class="filter-item right" type="primary"
                               icon="el-icon-refresh" @click="refresh">
                        刷新
                    </el-button>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        stripe
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        v-loading="loading"
                        element-loading-text="加载中"
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

            <el-col :span="10">
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
                    <span slot-scope="{ option }">{{ option.id + option.attribute }}</span>
                </el-transfer>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'assignation_to_role',
        data() {
            return {
                trans_data: [],
                trans_value: [],
                temp_role_id: 0,
                tableData: [],
                loading: false,
                value: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                }
            }
        },
        mounted() {
            this.getRoles();
        },
        methods: {
            getRoles() {
                let that = this;
                that.loading = true;
                this.$store.dispatch('rbac/getAllRoles')
                    .then((response) => {
                        that.tableData = response;
                        that.loading = false;
                    })
                    .catch(() => {
                        that.loading = false;
                    });
            },
            async getAllPermissions() {
                let promise = this.$store.dispatch('rbac/getAllPermissions');
                let res = await promise;
                for (let [key, val] of Object.entries(res)) {
                    this.trans_data.push({
                        id: val.id,
                        attribute: val.attribute
                    })
                }
                //console.log(res);
            },
            getPermissionsByRole() {
                this.$store.dispatch('rbac/getPermissionsByRole')
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(() => {

                    });
            },
            async handleCurrentChange(currentRow) {
                this.trans_data = [];
                this.trans_value = [];
                this.temp_role_id = currentRow.id;
                this.getAllPermissions();
                let promise = this.$store.dispatch('rbac/getPermissionByRoleName', {role_name: currentRow.name});
                let res = await promise;
                for (let [key, val] of Object.entries(res)) {
                    this.trans_value.push(val.id);
                }
                this.$forceUpdate();
            },
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
            refresh() {
                this.loading = true;
                setTimeout(() => {
                    this.getRoles();
                },500);
                this.trans_data = [];
                this.trans_value = [];
            }
        }
    }
</script>

<style lang="sass">
    .el-transfer-panel
        text-align: left
        display: inline-block
        width: 250px
        height: 400px

        .el-transfer-panel__list.is-filterable
            height: 394px

    .normal-form
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

    .normal-table
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

    .right
        float: right


</style>
