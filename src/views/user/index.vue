<template>
    <div class="app-container">
        <el-button type="primary" @click="RecommendAccounts">新增帐号</el-button>

        <!--添加帐号弹框-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: 'Profile',
        data() {
            return {
                user: {},
                form: {},
                activeTab: 'activity',
                dialogFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        computed: {

        },
        created() {

        },
        methods: {
            RecommendAccounts(){
                console.log(123);
                this.dialogFormVisible = true;
            }
        }
    }
</script>
