<template>
    <div class="app-top">

        <el-button class='btn_right' @click='dialogFormCreateTab = true' type="primary">创建标签</el-button>

        <div class="app-container">
            <el-row>
                <el-col>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                prop="name"
                                label="标签名称"
                        >
                        </el-table-column>

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="industry_name"
                                label="所属领域"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'show'}}"><el-button type="text" size="small">预览</el-button></router-link>
                                <router-link :to="{path: 'project-show',query:{projectNum:scope.row.project_num, type:'update'}}"><el-button type="text" size="small">编辑</el-button></router-link>

                                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">申报</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-dialog title="创建标签" :visible.sync="dialogFormCreateTab" width='650px'>
                <el-form :model="createTabFrom">
                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="标签名称" label-width="100px">
                                <el-input v-model="createTabFrom.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="16" :offset="3">
                            <el-form-item label="父级标签" label-width="100px">
                                <el-select v-model="createTabFrom.education" placeholder="请选学历">
                                    <el-option
                                            v-for="item in xlArr"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormCreateTab = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormCreateTab = false">确 定</el-button>
                </div>
            </el-dialog>
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
                dialogFormCreateTab:false,
                createTabFrom:[]
            }
        },
        computed: {

        },
        created() {
            this.getTabList();
        },
        methods: {
            getTabList(){
                let that = this
                this.$store.dispatch('projectTab/getAll',this.search)
                    .then((response) => {
                        that.tableData = response;
                    })
                    .catch(() => {

                    });


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