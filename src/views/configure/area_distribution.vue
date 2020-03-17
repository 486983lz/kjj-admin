<template>
    <div class="app-top">
        <div class="app-container" ref="appContainer">
            <!--搜索框-->
            <div class="header" ref="header">

            </div>
            <!--二级单位帐号列表-->
            <el-table
                    border
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                    :data="tableData"
                    :max-height="maxHeight">
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
                        fixed="right"
                        label="地区"
                        width="500">
                    <template slot-scope="scope">
                        <el-select
                                v-model="form.area"
                                filterable
                                clearable
                                placeholder="请选择所属地区"
                                @change="distributionArea($event,scope.row.id)">
                            <el-option
                                    v-for="item in tableArea"
                                    :key="item.area"
                                    :label="item.area"
                                    :value="item.id">
                            </el-option>
                        </el-select>
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

        </div>
    </div>
</template>

<script>
    import {validatePhone} from '@/utils/validate';

    export default {
        name: 'configure_index_distribution',
        data() {
            return {
                form: {},
                tableData: [],
                tableArea: {},
                search: {
                    page: 1,
                    total: 0,
                    pageSize:15,
                },
                maxHeight:'',
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

            //分配二级单位地区
            distributionArea(row,two_company_id) {
                let that = this;
                this.$store.dispatch('distributionArea/distributionArea', {area_id:row,two_company_id:two_company_id})
                    .then((response) => {
                        if (response.errors) {
                            for (const [key, val] of Object.entries(response.errors)) {
                                that.errorMsg[key] = val[0];
                            }
                        } else {
                            // this.getAllTwoCompany();
                        }
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
