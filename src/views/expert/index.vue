<template>
    <div class="app-top">

        <el-button class='btn_right' @click='showCreate' type="primary">添加专家</el-button>

        <div class="app-container">
            <el-row>
                <el-col>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                prop="id"
                                label="id"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="标签名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="fName"
                                label="父级名称"
                        >
                        </el-table-column>

                        <el-table-column
                                label="申报选择"
                                align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="是否设为申报选择项" placement="top">
                                    <el-switch
                                            v-model="scope.row.is_show"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            :active-value="1"
                                            @change="createShow(scope.row)"
                                            :inactive-value="0">
                                    </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="搜索项"
                                align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="是否设为搜索项" placement="top">
                                    <el-switch
                                            v-model="scope.row.is_search"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            :active-value="1"
                                            @change="createSearch(scope.row)"
                                            :inactive-value="0">
                                    </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--align="center"-->
                                <!--label="操作"-->
                                <!--width="200">-->
                            <!--<template slot-scope="scope">-->
                                <!--<router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'show'}}"><el-button type="text" size="small">预览</el-button></router-link>-->
                                <!--<router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'update'}}"><el-button type="text" size="small">编辑</el-button></router-link>-->

                                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>-->
                                <!--<el-button type="text" size="small">申报</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog title="创建标签" :visible.sync="dialogFormCreate" width='650px'>
                <el-form :model="createFrom">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="标签名称" label-width="100px">
                                <el-input v-model="createFrom.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="父级标签" label-width="100px">
                                <el-select v-model="createFrom.fid" placeholder="请选择父级标签">
                                    <el-option
                                            v-for="item in List"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreate = false">取 消</el-button>
                    <el-button type="primary" @click="doCreate">确 定</el-button>
                </div>
            </el-dialog>

            <div class="page-block">
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
                tableData: [],
                dialogFormCreate:false,
                createFrom:{},
                List:{},
            }
        },
        computed: {

        },
        created() {
            this.getList();
        },
        methods: {
            getList(){
                let that = this
                this.$store.dispatch('projectTab/getTabList',this.search)
                    .then((response) => {
                        that.tableData = response.data;
                        that.search.total = response.total;
                        that.search.pageSize = response.per_page;
                    })
                    .catch(() => {

                    });
            },
            showCreate(){
                this.dialogFormCreate = true;
                let that = this
                this.$store.dispatch('projectTab/getAll')
                    .then((response) => {
                        that.List = response;
                    })
                    .catch(() => {

                    });
            },
            doCreate(){
                let that = this
                this.$store.dispatch('projectTab/createTab',this.createFrom)
                    .then((response) => {
                        this.getList();
                        this.dialogFormCreate = false;
                    })
                    .catch(() => {

                    });
            },
            createShow(row){
                let that = this;
                this.$store.dispatch('projectTab/createShow',{id:row.id,is_show:row.is_show})
                    .then((response) => {

                    })
                    .catch(() => {

                    });

            },
            createSearch(row){
                let that = this;
                this.$store.dispatch('projectTab/createSearch',{id:row.id,is_search:row.is_search})
                    .then((response) => {
                        that.getlogo()
                    })
                    .catch(() => {

                    });

            },
            handleCurrentChanges(val){
                this.search.page = val;
                this.getList();

            },
        }
    }
</script>
<style scoped>
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
</style>