<template>
    <div class="app-container" ref="appContainer">
        <div class="header"  ref="header">
            <el-form ref="form" :model="where" label-width="120px" style="display: flex;">
                <el-form-item label="姓名:" label-width="100px" style="margin: 0;width: 30%;">
                    <el-input v-model="where.name" placeholder="请输入专家姓名" ></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" label-width="100px" style="margin: 0;width: 30%;">
                    <el-input v-model="where.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="专业领域" label-width="100px" style="margin: 0;width: 30%;">
                    <!--<el-select v-model="where.industry_id" clearable placeholder="所属领域">-->
                    <!--<el-option-->
                    <!--v-for="item in List"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <el-input v-model="where.major" placeholder="请输入专业领域"></el-input>
                </el-form-item>
                <el-button type="info" @click="searchInfo" style="margin-left: 1%;">查询</el-button>
            </el-form>
        </div>

        <el-row>
            <el-col>
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
                            label="姓名"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.name}}</span>
                            <el-popover
                                    v-if="scope.row.bz"
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :content="scope.row.bz">
                                <el-button slot="reference">
                                    <svg-icon icon-class="shuoming1"  />
                                </el-button>
                            </el-popover>
                            <svg-icon v-if="!scope.row.bz" icon-class="shuoming2"  />
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="phone"
                            label="电话"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="company"
                            label="单位"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="major"
                            label="专业领域"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="title"
                            label="职称、职务"
                    >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <div class="page-block" ref="page">
            <el-pagination
                    @current-change="handleCurrentChanges"
                    :current-page="search.page"
                    layout="total, prev, pager, next"
                    :total="search.total"
                    :page-size="search.pageSize"
                    background>
            </el-pagination>
        </div>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                search:{
                    page: 1,
                    total: 0,
                    pageSize:10,
                },
                where:{},
                loading: false,
                tableData: [],
                dialogFormCreate:false,
                createFrom:{},
                List:{},

            }
        },
        mounted(){
            this.getMaxHeight()
        },

        computed: {


        },
        created() {
            this.getList();
            this.getIndustry();
        },
        methods: {

            searchInfo(){
                this.search.page = 1;
                this.search.where = { ...this.where }
                this.getList();
            },
            getMaxHeight(){
                let appContainer= this.$refs.appContainer.scrollHeight;
                let header= this.$refs.header.scrollHeight;
                let page= this.$refs.page.scrollHeight;
                this.maxHeight = appContainer-header-page-40;
            },
            getList(){
                this.loading = true;
                let that = this
                this.$store.dispatch('expert/getExpertList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                        that.loading = false;
                    })
                    .catch(() => {

                    });
            },
            getIndustry(){
                let that = this
                this.$store.dispatch('projectIndustry/getAll')
                    .then((response) => {
                        response.shift()
                        that.List = response;
                    })
                    .catch(() => {

                    });
            },

            handleCurrentChanges(val){
                this.search.page = val;
                this.getList();

            },
            //设置表格表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #ecf5ff;color: black;font-weight: 700;'
                }
            },
        },

    }
</script>
<style scoped>
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
    .el-select{
        width: 100%;
    }
    .el-popover__reference {
        border: 0;
        padding: 0;
    }
</style>